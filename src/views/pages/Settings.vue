<script setup lang="ts">
import type { IClientSettings } from '@/interfaces/IClient';
import userAPI from '@/service/UserService';
import { useUserStore } from '@/store/userStore';
import CropperCanvas from '@cropper/element-canvas';
import CropperHandle from '@cropper/element-handle';
import CropperImage from '@cropper/element-image';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
CropperCanvas.$define()
CropperImage.$define()
CropperHandle.$define()
const __cropperCanvas = ref<InstanceType<typeof CropperCanvas>>()
const __cropperImage = ref<InstanceType<typeof CropperImage>>()

const userStore = useUserStore()
const toast = useToast();
const loading = ref(false)
const client = ref({} as IClientSettings | null);
const clientTemp = ref({} as IClientSettings | null);
const submitted = ref(false);

const putClient = computed(() => {
    const diff = {} as IClientSettings;
    const keys = new Set([...Object.keys(client.value)]);

    keys.forEach(key => {
        if (client.value[key] !== clientTemp.value[key]) {
            diff[key] = client.value[key];
        }
    });

    return diff;
})

const fetchClient = async () => {
    try {
        loading.value = true
        const response = await userAPI.getClientSettings(userStore.slug)
        client.value = response.data
        clientTemp.value = { ...client.value }
    } catch (error) {
        toast.add({ severity: 'error', summary: t('TOAST.SUMMARY.ERROR'), detail: t('TOAST.ERROR.FETCH'), life: 5000 });
    } finally {
        loading.value = false
    }
}

const isValid = computed(() =>
    !!client.value?.name
    && !!bannerUrl.value
)

const onSubmit = async () => {
    submitted.value = true;
    if (!isValid.value) return

    try {
        loading.value = true;
        if (imageSelected.value) await onCropper()

        await userAPI.putClientSettings(userStore.slug, toFormData(putClient.value) as unknown as IClientSettings)
        await fetchClient()
        toast.add({ severity: 'success', summary: t('TOAST.SUMMARY.SUCCESS'), detail: t('SETTINGS.TOAST.SUBMIT.SUCCESS'), life: 5000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: t('TOAST.SUMMARY.ERROR'), detail: t('SETTINGS.TOAST.SUBMIT.ERROR'), life: 5000 });
    } finally {
        loading.value = false
    }
};

onMounted(async () => {
    await fetchClient()
});

const imageSelected = ref();

const upload = (file) => {
    imageSelected.value = file.files.slice(-1)[0]
};

const bannerUrl = computed(() => imageSelected.value?.objectURL || client.value.bannerUrl)

const fileUpload = ref()

function onCropperImageTransform(event: CustomEvent) {
    const cropperCanvas = __cropperCanvas.value;

    if (!cropperCanvas) return;

    const cropperImage = __cropperImage.value;
    const cropperCanvasRect = cropperCanvas.getBoundingClientRect();

    // 1. Clone the cropper image.
    const cropperImageClone = cropperImage.cloneNode() as CropperImage;

    // 2. Apply the new matrix to the cropper image clone.
    cropperImageClone.style.transform = `matrix(${event.detail.matrix.join(', ')})`;

    // 3. Make the cropper image clone invisible.
    cropperImageClone.style.opacity = '0';

    // 4. Append the cropper image clone to the cropper canvas.
    cropperCanvas.appendChild(cropperImageClone);

    // 5. Compute the boundaries of the cropper image clone.
    const cropperImageRect = cropperImageClone.getBoundingClientRect();

    // 6. Remove the cropper image clone.
    cropperCanvas.removeChild(cropperImageClone);

    if (cropperImageRect.top > cropperCanvasRect.top
        || cropperImageRect.right < cropperCanvasRect.right
        || cropperImageRect.bottom < cropperCanvasRect.bottom
        || cropperImageRect.left > cropperCanvasRect.left) event.preventDefault();
}

function toFormData(obj: IClientSettings) {
    const formData = new FormData();

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
            formData.append(key, obj[key]);
        }
    }

    return formData
}

async function onCropper() {
    try {
        const canvas = await __cropperCanvas.value.$toCanvas({
            height: 480,
        })

        await new Promise<void>((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], Date.now().toString(), { type: 'image/webp' });
                    client.value.image = file;
                    resolve();
                } else {
                    reject(new Error("Failed to create Image Blob."));
                }
            }, 'image/webp', 0.6);
        })
    } catch (error) {
        toast.add({ severity: 'error', summary: t('TOAST.SUMMARY.ERROR'), detail: t('TOAST.ERROR.IMAGE'), life: 5000 });
        throw new Error(error)
    }
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button :label="$t('COMMON.BUTTONS.SAVE')" icon="pi pi-check" type="submit" @click="onSubmit"
                        :loading />
                </template>
            </Toolbar>

            <form @submit="onSubmit">
                <div class="flex flex-col gap-6">
                    <div class="product-image">
                        <label for="name" class="block font-bold mb-3">{{ $t('SETTINGS.BANNER.TITLE') }}</label>
                        <FileUpload ref="fileUpload" name="image" accept="image/*" :maxFileSize="50000000"
                            @select="upload">
                            <template #header="{ chooseCallback, files }">
                                <div v-show="bannerUrl" class="flex flex-wrap justify-between items-center gap-4 pb-4">
                                    <Button @click="chooseCallback()" :label="$t('COMMON.BUTTONS.IMAGE')"
                                        icon="pi pi-images" rounded outlined severity="secondary" />
                                    <Button v-show="files.length" :label="$t('COMMON.BUTTONS.ADJUST')"
                                        icon="pi pi-arrow-down-left-and-arrow-up-right-to-center"
                                        style="font-size: 1rem" rounded outlined :disabled="!files.length"
                                        @click="__cropperImage.$center('cover')" />
                                </div>
                            </template>
                            <template v-if="bannerUrl" #content="{ files, messages }">
                                <div class="w-full md:max-w-2xl">
                                    <img v-if="!files.length" :src="bannerUrl" :alt="$t('SETTINGS.BANNER.TITLE')"
                                        draggable="false"
                                        class="select-none rounded-border aspect-video object-cover" />
                                    <cropper-canvas v-else class="rounded-border aspect-video"
                                        :disabled="!imageSelected" ref="__cropperCanvas" background>
                                        <cropper-image ref="__cropperImage" :src="bannerUrl" alt="Picture"
                                            initial-center-size="cover" scalable translatable
                                            @transform="onCropperImageTransform" />
                                        <cropper-handle action="move" plain />
                                    </cropper-canvas>
                                    {{ messages[0] }}
                                </div>
                            </template>
                            <template #empty v-if="!client.bannerUrl">
                                <div class="flex items-center justify-center flex-col">
                                    <i @click="fileUpload.choose"
                                        class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color cursor-pointer" />
                                    <p class="mt-6 mb-0">{{ $t('COMMON.UPLOADER.DESCRIPTION') }}</p>
                                    <small v-if="submitted && !client.image" class="text-red-500">{{
                                        $t('COMMON.UPLOADER.REQUIRED') }}</small>
                                </div>
                            </template>
                        </FileUpload>
                    </div>
                    <div class="product-name">
                        <label for="name" class="block font-bold mb-3">{{ $t('SETTINGS.NAME.TITLE') }}</label>
                        <InputText id="name" v-model.trim="client.name" required="true" autofocus
                            :invalid="submitted && !client.name" fluid :disabled="loading" />
                        <small v-if="submitted && !client.name" class="text-red-500">{{ $t('SETTINGS.NAME.REQUIRED')
                            }}</small>
                    </div>
                    <div class="product-description">
                        <label for="description" class="block font-bold mb-3">{{ $t('SETTINGS.DESCRIPTION') }}</label>
                        <Textarea id="description" v-model="client.description" :disabled="loading" rows="3" cols="20"
                            fluid />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
.p-fileupload-content,
.p-fileupload-header {
    padding: 0 !important;
}

.p-fileupload {
    border: none !important
}
</style>
