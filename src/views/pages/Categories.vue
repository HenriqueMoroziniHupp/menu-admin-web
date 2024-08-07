<script setup lang="ts">
import categoryAPI from '@/service/CategoryService';
import { useUserStore } from '@/store/userStore';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const userStore = useUserStore()

onMounted(async() => {
    await fetchCategories()
});

const fetchCategories = async () => {
    try {
        loadingTable.value = true
        const response = await categoryAPI.getCategories(userStore.getSlug)
        categories.value = response.data
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to load categoryes', life: 3000 });

    } finally {
        loadingTable.value = false
    }
}

const loading = ref(false)
const loadingTable = ref(false)
const toast = useToast();
const dt = ref();
const products = ref();
const categories = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);

type TCategoryStatus = 'ACTIVE' | 'INACTIVE'

interface ICategory {
    id: number,
    name: string,
    icon: string | null,
    status: TCategoryStatus,
}
const category = ref({} as ICategory);
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const statusOptions = ref([
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' }
]);

const openNew = () => {
    category.value = { status: 'ACTIVE' } as ICategory;
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
    loading.value = false
};
const saveCategory = async () => {
    submitted.value = true;
    if (!category.value.name) return
    const isEdit = !!category.value.id

    try {
        loading.value = true;
        isEdit ?
            await categoryAPI.putCategory(category.value.id, { name: category.value.name, status: category.value.status })
            :await categoryAPI.postCategory(category.value)
        await fetchCategories()
        productDialog.value = false;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Success to save category', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to save category', life: 3000 });
    } finally {
        loading.value = false
    }
};
const editProduct = (item: ICategory) => {
    category.value = { ...item };
    productDialog.value = true;
};
const confirmDeleteProduct = (item: ICategory) => {
    category.value = item;
    deleteProductDialog.value = true;
};
const deleteProduct = async () => {
    try {
        loading.value = true;
        await categoryAPI.deleteCategory(category.value.id)
        await fetchCategories()
        deleteProductDialog.value = false;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Error to delete', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to delete', life: 3000 });
    } finally {
        loading.value = false
    }
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'ACTIVE':
            return 'success';

        case 'INACTIVE':
            return 'warn';

        default:
            return null;
    }
};
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                v-model:selection="selectedProducts"
                :value="categories"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                :loading="loadingTable"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Manage Categories</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="Id" sortable style="min-width: 12rem"></Column>
                <Column field="name" header="Nome" sortable style="min-width: 16rem"></Column>
                <Column field="inventoryStatus" header="Status" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
            <pre>{{ category }}</pre>
            <div class="flex flex-col gap-6">
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="category.name" required="true" autofocus :invalid="submitted && !category.name" fluid :disabled="loading"/>
                    <small v-if="submitted && !category.name" class="text-red-500">Name is required.</small>
                </div>
                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                    <Select id="inventoryStatus" v-model="category.status" :options="statusOptions" optionLabel="label" optionValue="value" va placeholder="Select a Status" fluid :disabled="loading"></Select>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveCategory" :loading/>
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="category"
                    >Are you sure you want to delete <b>{{ category.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="category">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>
