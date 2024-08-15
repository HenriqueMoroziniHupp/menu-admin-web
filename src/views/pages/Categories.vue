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
const categories = ref();
const categoryDialog = ref(false);
const deleteCategoryDialog = ref(false);

type TCategoryStatus = 'ACTIVE' | 'INACTIVE'

interface ICategory {
    id: number,
    name: string,
    icon: string | null,
    status: TCategoryStatus,
}
const category = ref({} as ICategory);
const selectedCategories = ref();
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
    categoryDialog.value = true;
};
const hideDialog = () => {
    categoryDialog.value = false;
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
        categoryDialog.value = false;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Success to save category', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to save category', life: 3000 });
    } finally {
        loading.value = false
    }
};
const editProduct = (item: ICategory) => {
    category.value = { ...item };
    categoryDialog.value = true;
};
const confirmDeleteProduct = (item: ICategory) => {
    category.value = item;
    deleteCategoryDialog.value = true;
};
const deleteProduct = async () => {
    try {
        loading.value = true;
        await categoryAPI.deleteCategory(category.value.id)
        await fetchCategories()
        deleteCategoryDialog.value = false;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Error to delete', life: 3000 });
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
                    <Button label="New Category" icon="pi pi-plus" severity="primary" class="mr-2" @click="openNew" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                v-model:selection="selectedCategories"
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
                <Column field="id" header="Id" sortable style="min-width: 5rem"></Column>
                <Column field="name" header="Nome" sortable style="min-width: 16rem"></Column>
                <Column field="status" header="Status" sortable style="min-width: 12rem">
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

        <Dialog v-model:visible="categoryDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
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
                <Button label="Save" icon="pi pi-check" @click="saveCategory" :loading />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteCategoryDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="category"
                    >Are you sure you want to delete <b>{{ category.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteCategoryDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>
    </div>
</template>
