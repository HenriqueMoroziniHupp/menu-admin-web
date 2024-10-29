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
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' }
]);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const putProduct = computed(() => {
    const diff = {} as IProduct;
    const keys = new Set([...Object.keys(product.value)]);

    keys.forEach(key => {
        if (product.value[key] !== productTemp.value[key]) {
            diff[key] = product.value[key];
        }
    });

    return diff;
})

const fetchProducts = async () => {
    try {
        loadingTable.value = true
        const response = await productsAPI.getProducts(userStore.slug)
        products.value = response.data
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to load product', life: 3000 });

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
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to load categories', life: 3000 });

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
        idCategory: undefined
    }
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
)

const onSubmit = async () => {
    submitted.value = true;
    if (!isValid.value) return
    const isEdit = !!product.value.id

    try {
        loading.value = true;
        if(imageSelected.value) await onCropper()

        isEdit ?
            await productsAPI.putProduct(product.value.id, toFormData(putProduct.value) as IProduct)
            :await productsAPI.postProduct(toFormData(product.value) as IProduct)
        await fetchProducts()
        editorDialog.value = false;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Success to save product', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to save product', life: 3000 });
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
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Success to delete', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to delete', life: 3000 });
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

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
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

function toFormData(obj: IProduct) {
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
                    product.value.image = file;
                    resolve();
                } else {
                    reject(new Error("Failed to create Image Blob."));
                }
            }, 'image/webp', 0.6);
        })
    } catch (error) {
        console.error('Cropper failed: ',error)
    }
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New Product" icon="pi pi-plus" severity="primary" class="mr-2" @click="openNew" />
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
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                :loading="loadingTable"
                tableStyle="min-width: 55rem"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Manage Products</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column header="Image">
                    <template #body="slotProps">
                        <img :src="slotProps.data.imageUrl" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                <Column field="name" header="Nome" sortable></Column>
                <Column field="category.name" header="Category" sortable></Column>
                <Column field="status" header="Status" sortable>
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
                <Column :exportable="false">
                    <template #body="slotProps">
                        <div class="flex">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="openEdit(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="openDelete(slotProps.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog :class="['select-none', { 'p-dialog-maximized': xs }]" v-model:visible="editorDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" @show="fetchCategories" @hide="hideDialog">
            <form @submit="onSubmit">
                <div class="dialog__container flex flex-col gap-6">
                    <div class="product-image">
                        <FileUpload ref="fileUpload" name="image" accept="image/*" :maxFileSize="50000000" @select="upload">
                            <template #header="{ chooseCallback, files }">
                                <div v-show="imageUrl" class="flex flex-wrap justify-between items-center gap-4 pb-4">
                                        <Button @click="chooseCallback()" label="Change Image" icon="pi pi-images" rounded outlined severity="secondary"/>
                                        <Button v-show="files.length" label="Cover" icon="pi pi-arrow-down-left-and-arrow-up-right-to-center" style="font-size: 1rem" rounded outlined :disabled="!files.length" @click="__cropperImage.$center('cover')"/>
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
                                    <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                                </div>
                            </template>
                        </FileUpload>
                    </div>
                    <div class="product-name">
                        <label for="name" class="block font-bold mb-3">Name</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid :disabled="loading"/>
                        <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
                    </div>
                    <div class="product-description">
                        <label for="description" class="block font-bold mb-3">Description (Optional)</label>
                        <Textarea id="description" v-model="product.description" :disabled="loading" rows="3" cols="20" fluid />
                        <!-- <small v-if="submitted && !product.description" class="text-red-500">Description is required.</small> -->

                    </div>
                    <div class="product-status">
                        <label for="productStatus" class="block font-bold mb-3">Product Status</label>
                        <Select id="productStatus" v-model="product.status" :options="statusOptions" optionLabel="label" optionValue="value" va placeholder="Select a Status" fluid :disabled="loading"></Select>
                    </div>
                    <div class="product-category">
                        <label for="productCategory" class="block font-bold mb-3">Product Category</label>
                        <Select id="productCategory" v-model="product.idCategory" :invalid="submitted && !product.idCategory" :options="categoriesOptions" :disabled="loading" optionLabel="name" optionValue="id" placeholder="Select a Category" fluid :loading="loadingCategory"></Select>
                        <small v-if="submitted && !product.idCategory" class="text-red-500">Category is required.</small>
                    </div>


                    <div class="product-price">
                        <label for="productCategory" class="block font-bold mb-3">Price</label>
                        <div class="product-price__wrapper flex flex-col gap-4">
                            <Message v-if="product.priceSingle" severity="warn">Será exibido no item apenas o valor do preço unico</Message>
                            <InputGroup >
                                <InputGroupAddon>
                                    Preço Unico
                                </InputGroupAddon>
                                <InputNumber placeholder="Insira o valor" :disabled="loading" :minFractionDigits="2" mode="currency" currency="BRL" v-model="product.priceSingle"/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon>
                                    P
                                </InputGroupAddon>
                                <InputNumber placeholder="Insira o valor" :disabled="loading" :minFractionDigits="2" mode="currency" currency="BRL" v-model="product.priceSmall"/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon>
                                    M
                                </InputGroupAddon>
                                <InputNumber placeholder="Insira o valor" :disabled="loading" :minFractionDigits="2" mode="currency" currency="BRL" v-model="product.priceMedium"/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon>
                                    G
                                </InputGroupAddon>
                                <InputNumber placeholder="Insira o valor" :disabled="loading" :minFractionDigits="2" mode="currency" currency="BRL" v-model="product.priceLarge"/>
                            </InputGroup>

                        </div>
                    </div>

                </div>
            </form>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="editorDialog = false" />
                <Button label="Save" icon="pi pi-check" type="submit" @click="onSubmit" :loading />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Are you sure you want to delete <b>{{ product.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="onSubmitDelete" />
            </template>
        </Dialog>
    </div>
</template>

<style lang="scss">
.p-dialog-header {
    /* padding-bottom: 0.5rem !important; */
}
.p-fileupload-content, .p-fileupload-header {
    padding: 0 !important;
}

.p-fileupload {
    border: none !important
}
</style>
