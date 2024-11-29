<script setup lang="ts">
import { IProduct } from '@/interfaces/IProduct';
import categoryAPI from '@/service/CategoryService';
import productsAPI from '@/service/ProductsService';
import { useUserStore } from '@/store/userStore';
import CropperCanvas from '@cropper/element-canvas';
import CropperHandle from '@cropper/element-handle';
import CropperImage from '@cropper/element-image';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';
import { useBreakpoint } from '@/layout/composables/breakpoints'
import { IPrice } from '@/interfaces/IPrice';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
CropperCanvas.$define()
CropperImage.$define()
CropperHandle.$define()
const __cropperCanvas = ref<InstanceType<typeof CropperCanvas>>()
const __cropperImage = ref<InstanceType<typeof CropperImage>>()

const { xs } = useBreakpoint()
const userStore = useUserStore()
const toast = useToast();
const __dt = ref();
const loading = ref(false)
const loadingTable = ref(false)
const loadingCategory = ref(false)
const categoriesOptions = ref();
const product = ref({} as IProduct | null);
const productTemp = ref({} as IProduct | null);
const products = ref<IProduct[]>();
const selectedProducts = ref();
const editorDialog = ref(false);
const deleteDialog = ref(false);
const submitted = ref(false);
const statusOptions = ref([
    { label: t('PRODUCTS.STATUS.ACTIVE'), value: 'ACTIVE' },
    { label: t('PRODUCTS.STATUS.INACTIVE'), value: 'INACTIVE' },
    { label: t('PRODUCTS.STATUS.OUTOFSTOCK'), value: 'OUTOFSTOCK' }
]);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const payloadProduct = computed(() => {
    const diff = {} as IProduct;
    const keys = new Set([...Object.keys(product.value)]);

    keys.forEach(key => {
        if (product.value[key] !== productTemp.value[key]) {
            diff[key] = product.value[key];
        }
    });

    const prices = product.value.prices.filter((price => price.name && price.price))
    return { ...diff, prices };
})

const fetchProducts = async () => {
    try {
        loadingTable.value = true
        const response = await productsAPI.getProducts(userStore.slug)
        products.value = response.data
    } catch (error) {
        toast.add({ severity: 'error', summary: t('TOAST.SUMMARY.ERROR'), detail: t('PRODUCTS.TOAST.FETCH_ERROR'), life: 5000 });
    } finally {
        loadingTable.value = false
    }
}

const fetchCategories = async () => {
    if(categoriesOptions.value) return

    try {
        loadingCategory.value = true
        const response = await categoryAPI.getCategories(userStore.slug)
        categoriesOptions.value = response.data
    } catch (error) {
        toast.add({ severity: 'error', summary: t('TOAST.SUMMARY.ERROR'), detail: t('CATEGORIES.TOAST.FETCH_ERROR'), life: 5000 });
    } finally {
        loadingCategory.value = false
    }
}

const resetProduct = (): IProduct => {
    return {
        name: undefined,
        status: 'ACTIVE',
        description: undefined,
        category: undefined,
        id: undefined,
        idCategory: undefined,
        prices: [
            {
                name: t('PRODUCTS.PRICES.SMALL'),
                price: null,
            },
            {
                name: t('PRODUCTS.PRICES.MEDIUM'),
                price: null,
            },
            {
                name: t('PRODUCTS.PRICES.LARGE'),
                price: null,
            }
        ]
    }
}

const pushPrice = () => {
    product.value.prices.push({} as IPrice)
}

const openNew = () => {
    product.value = resetProduct()
    imageSelected.value = null
    submitted.value = false;
    editorDialog.value = true;
};

const openEdit = (item: IProduct) => {
    product.value = { ...item, idCategory: item.category.id };
    productTemp.value = { ...product.value }
    editorDialog.value = true;
};

const openDelete = (item: IProduct) => {
    product.value = item;
    deleteDialog.value = true;
};

const hideDialog = () => {
    product.value = resetProduct()
    imageSelected.value = null
    editorDialog.value = false;
    submitted.value = false;
    loading.value = false
};

const isValid = computed(() =>
    !!product.value?.name
    && !!product.value?.idCategory
    && !!product.value.status
    && !!imageUrl.value
)

const onSubmit = async () => {
    submitted.value = true;
    if (!isValid.value) return
    const isEdit = !!product.value.id

    try {
        loading.value = true;
        if(imageSelected.value) await onCropper()

        isEdit ?
            await productsAPI.putProduct(product.value.id, toFormData(payloadProduct.value) as IProduct)
            :await productsAPI.postProduct(toFormData(payloadProduct.value) as IProduct)
        await fetchProducts()
        editorDialog.value = false;
        toast.add({ severity: 'success', summary: t('TOAST.SUMMARY.SUCCESS'), detail: t('PRODUCTS.TOAST.SUBMIT.SUCCESS'), life: 5000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: t('TOAST.SUMMARY.ERROR'), detail: t('PRODUCTS.TOAST.SUBMIT.ERROR'), life: 5000 });
    } finally {
        loading.value = false
    }
};

const onSubmitDelete = async () => {
    try {
        loading.value = true;
        await productsAPI.deleteProduct(product.value.id)
        await fetchProducts()
        deleteDialog.value = false;
        toast.add({ severity: 'success', summary: t('TOAST.SUMMARY.SUCCESS'), detail: t('TOAST.SUCCESS.DELETE'), life: 5000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: t('TOAST.SUMMARY.ERROR'), detail: t('TOAST.ERROR.DELETE'), life: 5000 });
    } finally {
        loading.value = false
    }
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'ACTIVE':
            return 'success';

        case 'INACTIVE':
            return 'danger';

        case 'OUTOFSTOCK':
            return 'warn';

        default:
            return null;
    }
};

onMounted(async() => {
    await fetchProducts()
});

const imageSelected = ref();

const upload = (file) => {
    imageSelected.value = file.files.slice(-1)[0]
};

const imageUrl = computed(() =>  imageSelected.value?.objectURL || product.value.imageUrl)

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

function toFormData(obj: Record<string, any>, parentKey = ''): FormData {
    const formData = new FormData();

    function appendFormData(objData: any, parentKey: string) {
        if (Array.isArray(objData)) {
            objData.forEach((value, index) => {
                const key = `${parentKey}[${index}]`;
                appendFormData(value, key);
            });
        } else if (typeof objData === 'object' && !(objData instanceof File) && objData !== null) {
            for (const key in objData) {
                if (objData.hasOwnProperty(key) && objData[key] !== undefined) {
                    appendFormData(objData[key], parentKey ? `${parentKey}.${key}` : key);
                }
            }
        } else {
            formData.append(parentKey, objData);
        }
    }

    appendFormData(obj, parentKey);
    return formData;
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
                    product.value.image = file;
                    resolve();
                } else {
                    reject(new Error("Failed to create Image Blob."));
                }
            }, 'image/webp', 0.6);
        })
    } catch (error) {
        toast.add({ severity: 'error', summary: t('TOAST.SUMMARY.ERROR'), detail: t('TOAST.IMAGE_ERROR'), life: 5000 });
        throw new Error(error)
    }
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button :label="$t('PRODUCTS.BUTTONS.NEW')" icon="pi pi-plus" severity="primary" class="mr-2" @click="openNew" />
                </template>
            </Toolbar>

            <DataTable
                ref="__dt"
                v-model:selection="selectedProducts"
                :value="products"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords} produtos"
                :loading="loadingTable"
                tableStyle="min-width: 55rem"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">{{ $t('PRODUCTS.DESCRIPTION') }}</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" :placeholder="$t('PRODUCTS.SEARCH')" />
                        </IconField>
                    </div>
                </template>

                <Column header="Imagem" style="width: 7rem;">
                    <template #body="slotProps">
                        <img :src="slotProps.data.imageUrl" :alt="slotProps.data.image" class="rounded" style="width: 100%" @click="openEdit(slotProps.data)"/>
                    </template>
                </Column>
                <Column field="name" :header="$t('PRODUCTS.TABLE.NAME')" sortable></Column>
                <Column field="category.name" :header="$t('PRODUCTS.TABLE.CATEGORY')" sortable></Column>
                <Column field="status" :header="$t('PRODUCTS.TABLE.STATUS')" sortable>
                    <template #body="slotProps">
                        <Tag :value="$t(`PRODUCTS.STATUS.${slotProps.data.status}`).toLocaleUpperCase()" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
                <Column :exportable="false">
                    <template #body="slotProps">
                        <div class="flex">
                            <Button icon="pi pi-pencil" outlined rounded severity="success" class="mr-2" @click="openEdit(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="openDelete(slotProps.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog :class="['select-none', { 'p-dialog-maximized': xs }]" v-model:visible="editorDialog" :style="{ width: '450px' }" :header="$t('PRODUCTS.MODAL_TITLE')" :modal="true" @show="fetchCategories" @hide="hideDialog">
            <form @submit="onSubmit">
                <div class="dialog__container flex flex-col gap-6">
                    <div class="product-image">
                        <FileUpload ref="fileUpload" name="image" accept="image/*" :maxFileSize="50000000" @select="upload">
                            <template #header="{ chooseCallback, files }">
                                <div v-show="imageUrl" class="flex flex-wrap justify-between items-center gap-4 pb-4">
                                        <Button @click="chooseCallback()" :label="$t('COMMON.BUTTONS.IMAGE')" icon="pi pi-images" rounded outlined severity="secondary"/>
                                        <Button v-show="files.length" :label="$t('COMMON.BUTTONS.ADJUST')" icon="pi pi-arrow-down-left-and-arrow-up-right-to-center" style="font-size: 1rem" rounded outlined :disabled="!files.length" @click="__cropperImage.$center('cover')"/>
                                </div>
                            </template>
                            <template v-if="imageUrl" #content="{ files, messages }">
                                    <img v-if="!files.length" :src="imageUrl" :alt="product.name" draggable="false" class="select-none block m-auto rounded-border aspect-video w-full object-cover" />
                                    <cropper-canvas
                                        v-else
                                        class="rounded-border aspect-video w-full"
                                        :disabled="!imageSelected"
                                        ref="__cropperCanvas"
                                        background
                                    >
                                        <cropper-image
                                            ref="__cropperImage"
                                            :src="imageUrl"
                                            alt="Picture"
                                            initial-center-size="cover"
                                            scalable
                                            translatable
                                            @transform="onCropperImageTransform"
                                        />
                                        <cropper-handle
                                            action="move"
                                            plain
                                        />
                                    </cropper-canvas>
                                {{ messages[0] }}
                            </template>
                            <template #empty v-if="!product.imageUrl">
                                <div class="flex items-center justify-center flex-col">
                                    <i @click="fileUpload.choose" class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color cursor-pointer" />
                                    <p class="mt-6 mb-0">{{ $t('COMMON.UPLOADER.DESCRIPTION') }}</p>
                                    <small v-if="submitted && !imageUrl" class="text-red-500">{{ $t('COMMON.UPLOADER.REQUIRED') }}</small>
                                </div>
                            </template>
                        </FileUpload>
                    </div>
                    <div class="product-name">
                        <label for="name" class="block font-bold mb-3">{{ $t('PRODUCTS.INPUT.NAME.TITLE') }}</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid :disabled="loading"/>
                        <small v-if="submitted && !product.name" class="text-red-500">{{ $t('PRODUCTS.INPUT.NAME.REQUIRED') }}</small>
                    </div>
                    <div class="product-description">
                        <label for="description" class="block font-bold mb-3">{{ $t('PRODUCTS.INPUT.DESCRIPTION') }}</label>
                        <Textarea id="description" v-model="product.description" :disabled="loading" rows="3" cols="20" fluid />
                    </div>
                    <div class="product-category">
                        <label for="productCategory" class="block font-bold mb-3">{{ $t('PRODUCTS.INPUT.CATEGORY.TITLE') }}</label>
                        <Select id="productCategory" v-model="product.idCategory" :invalid="submitted && !product.idCategory" :options="categoriesOptions" :disabled="loading" optionLabel="name" optionValue="id" :placeholder="$t('PRODUCTS.INPUT.CATEGORY.PLACEHOLDER')" fluid :loading="loadingCategory"></Select>
                        <small v-if="submitted && !product.idCategory" class="text-red-500">{{ $t('PRODUCTS.INPUT.CATEGORY.REQUIRED') }}</small>
                    </div>
                    <div class="product-status">
                        <label for="productStatus" class="block font-bold mb-3">Status</label>
                        <Select id="productStatus" v-model="product.status" :options="statusOptions" optionLabel="label" optionValue="value" fluid :disabled="loading"></Select>
                    </div>
                    <div class="product-price">
                        <label for="productCategory" class="block font-bold mb-3">{{ $t('PRODUCTS.INPUT.PRICE') }}</label>
                        <div class="product-price__wrapper flex flex-col gap-4">
                            <InputGroup v-for="(price, index) in product.prices">
                                <InputText v-if="!price.id" v-model="price.name" placeholder="Nome personalizado"/>
                                <InputGroupAddon v-else>
                                    {{ price.name }}
                                </InputGroupAddon>
                                <InputNumber placeholder="Insira o valor" :disabled="loading" :minFractionDigits="2" mode="currency" currency="BRL" v-model="price.price"/>
                                    <Button :icon="product.prices[index].id ? 'pi pi-trash' : 'pi pi-times'" :severity="product.prices[index].id ? 'danger' : 'secondary'" @click="product.prices.splice(index,1)"/>
                            </InputGroup>
                            <Button class="w-40" :label="$t('PRODUCTS.BUTTONS.NEW_PRICE')" icon="pi pi-plus" @click="pushPrice" />
                        </div>
                    </div>
                </div>
            </form>

            <template #footer>
                <Button :label="$t('COMMON.BUTTONS.CANCEL')" icon="pi pi-times" text @click="editorDialog = false" />
                <Button :label="$t('COMMON.BUTTONS.SAVE')" icon="pi pi-check" type="submit" @click="onSubmit" :loading />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteDialog" :style="{ width: '480px' }" :header="$t('PRODUCTS.DELETE_MODAL.TITLE')" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >{{ $t('PRODUCTS.DELETE_MODAL.DESCRIPTION') }} <b>{{ product.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button :label="$t('COMMON.BUTTONS.YES')" icon="pi pi-check" text @click="onSubmitDelete" />
                <Button :label="$t('COMMON.BUTTONS.NO')" icon="pi pi-times" @click="deleteDialog = false" />
            </template>
        </Dialog>
    </div>
</template>

<style lang="scss">
.p-dialog-header {
    padding-bottom: 0.5rem !important;
}
.p-fileupload-content, .p-fileupload-header {
    padding: 0 !important;
}

.p-fileupload {
    border: none !important
}
</style>
