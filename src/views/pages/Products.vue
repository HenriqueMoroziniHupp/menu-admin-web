<script setup lang="ts">
import { IProduct, IPutProduct } from '@/interfaces/IProduct';
import categoryAPI from '@/service/CategoryService';
import productsAPI from '@/service/ProductsService';
import { useUserStore } from '@/store/userStore';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore()
const toast = useToast();
const dt = ref();
const loading = ref(false)
const loadingTable = ref(false)
const loadingCategory = ref(false)
const categoriesOptions = ref();
const product = ref({} as IProduct | null);
const productAux = ref({} as IProduct | null);
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
    const diferencas = {} as IPutProduct;
    const chaves = new Set([...Object.keys(product.value)]);

    chaves.forEach(chave => {
        if (product.value[chave] !== productAux.value[chave]) {
            diferencas[chave] = product.value[chave];
        }
    });

    return diferencas;
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
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to load categoryes', life: 3000 });

    } finally {
        loadingCategory.value = false
    }
}

const openNew = () => {
    product.value = resetProduct()
    submitted.value = false;
    editorDialog.value = true;
};

const openEdit = (item: IProduct) => {
    product.value = { ...item, idCategory: item.category.id };
    productAux.value = { ...product.value }
    editorDialog.value = true;
};

const openDelete = (item: IProduct) => {
    product.value = item;
    deleteDialog.value = true;
};

const hideDialog = () => {
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

onMounted(async() => {
    await fetchProducts()
});
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
                ref="dt"
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

        <Dialog v-model:visible="editorDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" @show="fetchCategories">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid :disabled="loading"/>
                    <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" fluid />
                    <small v-if="submitted && !product.description" class="text-red-500">Description is required.</small>

                </div>
                <div>
                    <label for="productStatus" class="block font-bold mb-3">Product Status</label>
                    <Select id="productStatus" v-model="product.status" :options="statusOptions" optionLabel="label" optionValue="value" va placeholder="Select a Status" fluid :disabled="loading"></Select>
                </div>
                <div>
                    <label for="productCategory" class="block font-bold mb-3">Product Category</label>
                    <Select id="productCategory" v-model="product.idCategory" :invalid="submitted && !product.idCategory" :options="categoriesOptions" optionLabel="name" optionValue="id" placeholder="Select a Category" fluid :loading="loadingCategory"></Select>
                    <small v-if="submitted && !product.idCategory" class="text-red-500">Category is required.</small>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
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
