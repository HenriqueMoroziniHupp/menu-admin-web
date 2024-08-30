<script setup lang="ts">
import { IProduct, IPutProduct } from '@/interfaces/IProduct';
import categoryAPI from '@/service/CategoryService';
import productsAPI from '@/service/ProductsService';
import { useUserStore } from '@/store/userStore';
import type CropperCanvas from '@cropper/element-canvas';
import type CropperImage from '@cropper/element-image';
import { FilterMatchMode } from '@primevue/core/api';
import Compressor from 'compressorjs';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

const __cropperCanvas = ref<CropperCanvas>()
const __cropperImage = ref<CropperImage>()

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
    const diff = {} as IPutProduct;
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
        const response = await productsAPI.getProducts(userStore.getSlug)
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
        const response = await categoryAPI.getCategories(userStore.getSlug)
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
    && !!product.value.description
    && !!product.value.status
)

const onSubmit = async () => {
    submitted.value = true;
    if (!isValid.value) return
    const isEdit = !!product.value.id

    try {
        loading.value = true;
        isEdit ?
            await productsAPI.putProduct(product.value.id, putProduct.value)
            :await productsAPI.postProduct(product.value)
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

const REFdownloadLink = ref()

async function processImageToBlob() {
    if (!imageSelected.value) return

    new Compressor(imageSelected.value, {
        quality: 0.7,
        maxWidth: 566,
        convertTypes: ['image/png', 'image/webp'],
        success(file) {
            console.log('%cfile: ', 'color: MidnightBlue; background: Aquamarine;', file);
            const url = URL.createObjectURL(file)
            console.log('%curl: ', 'color: MidnightBlue; background: Aquamarine;', url);

            const downloadLink = REFdownloadLink.value;
            // Define o href e o nome do arquivo
            downloadLink.href = url;
            downloadLink.download = file.name;

            // Simula o clique para iniciar o download
            downloadLink.click();
            // URL.revokeObjectURL(url);
        },
        error(error) {
            console.warn(error)
        },
    })
}

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

async function onCropper() {
    let img = await __cropperCanvas.value.$toCanvas({
        height: 480,
    })

    let url = img.toDataURL()

    const downloadLink = document.getElementById('REFdownloadLink') as HTMLAnchorElement;
    downloadLink.href = url;
    downloadLink.download = 'filename.png';
    // downloadLink.click();
    // REFdownloadLink.value.href = img.toDataURL()
    // REFdownloadLink.value.download = 'img.png'
    // REFdownloadLink.value.click()


    // let container = document.getElementById('cropper-container')
    // container.appendChild(img)



    // img.toBlob(function(blob) {
    //     // Converter o Blob em um objeto File
    //     const file = new File([blob], 'imagem-canvas.webp', {
    //         type: 'image/webp',
    //         lastModified: new Date().getTime()
    //     });

    //     // Agora você pode usar o objeto File como desejar
    //     console.log(file);

    //     // Exemplo: Enviar o arquivo via um formulário ou uma requisição AJAX
    //     // const formData = new FormData();
    //     // formData.append('file', file);
    //     // enviarParaServidor(formData);
    //     }, 'image/webp');

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

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="Id" sortable style="min-width: 5rem"></Column>
                <Column header="Image">
                    <template #body="slotProps">
                        <img :src="slotProps.data.imageUrl" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                <Column field="name" header="Nome" sortable style="min-width: 16rem"></Column>
                <Column field="category.name" header="Category" sortable style="min-width: 10rem"></Column>
                <Column field="status" header="Status" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 10rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="openEdit(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="openDelete(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog class="select-none" v-model:visible="editorDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" @show="fetchCategories" @hide="hideDialog">
            <div class="dialog__container flex flex-col gap-6">
                <div class="product-image">
                    <FileUpload ref="fileUpload" name="image" @uploader="processImageToBlob" accept="image/*" :maxFileSize="5000000" @select="upload">
                        <template #header="{ chooseCallback, files }">
                            <div class="flex flex-wrap justify-between items-center gap-4 pb-4">
                                    <Button @click="chooseCallback()" :label="files.length ? 'Change Image' : 'Select Image'" icon="pi pi-images" rounded outlined severity="secondary"/>
                                    <Button v-show="imageUrl" label="Cover" icon="pi pi-window-maximize" rounded outlined :disabled="!files.length" @click="__cropperImage.$center('cover')"/>
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
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" fluid />
                    <small v-if="submitted && !product.description" class="text-red-500">Description is required.</small>

                </div>
                <div class="product-status">
                    <label for="productStatus" class="block font-bold mb-3">Product Status</label>
                    <Select id="productStatus" v-model="product.status" :options="statusOptions" optionLabel="label" optionValue="value" va placeholder="Select a Status" fluid :disabled="loading"></Select>
                </div>
                <div class="product-category">
                    <label for="productCategory" class="block font-bold mb-3">Product Category</label>
                    <Select id="productCategory" v-model="product.idCategory" :invalid="submitted && !product.idCategory" :options="categoriesOptions" optionLabel="name" optionValue="id" placeholder="Select a Category" fluid :loading="loadingCategory"></Select>
                    <small v-if="submitted && !product.idCategory" class="text-red-500">Category is required.</small>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="editorDialog = false" />
                <Button label="Save" icon="pi pi-check" @click="onSubmit" :loading />
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
