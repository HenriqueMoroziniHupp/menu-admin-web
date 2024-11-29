<script setup lang="ts">
import { ICategory } from '@/interfaces/ICategory';
import categoryAPI from '@/service/CategoryService';
import { useUserStore } from '@/store/userStore';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const userStore = useUserStore()

onMounted(async() => {
    await fetchCategories()
});

const fetchCategories = async () => {
    try {
        loadingTable.value = true
        const response = await categoryAPI.getCategories(userStore.slug)
        categories.value = response.data
    } catch (error) {
        toast.add({ severity: 'error', summary: t('TOAST.SUMMARY.ERROR'), detail: t('CATEGORIES.TOAST.FETCH_ERROR'), life: 5000 });
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

const category = ref({} as ICategory);
const selectedCategories = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const statusOptions = ref([
{ label: t('CATEGORIES.STATUS.ACTIVE'), value: 'ACTIVE' },
{ label: t('CATEGORIES.STATUS.INACTIVE'), value: 'INACTIVE' },
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
const onSubmit = async () => {
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
        toast.add({ severity: 'success', summary: t('TOAST.SUMMARY.SUCCESS'), detail: t('CATEGORIES.TOAST.SUBMIT.SUCCESS'), life: 5000 });

    } catch (error) {
        toast.add({ severity: 'error', summary: t('TOAST.SUMMARY.ERROR'), detail: t('CATEGORIES.TOAST.SUBMIT.ERROR'), life: 5000 });

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
const onSubmitDelete = async () => {
    try {
        loading.value = true;
        await categoryAPI.deleteCategory(category.value.id)
        await fetchCategories()
        deleteCategoryDialog.value = false;
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
                    <Button :label="$t('CATEGORIES.BUTTONS.NEW')" icon="pi pi-plus" severity="primary" class="mr-2" @click="openNew" />
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
                currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords} categorias"
                :loading="loadingTable"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">{{ $t('CATEGORIES.DESCRIPTION') }}</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" :placeholder="$t('CATEGORIES.SEARCH')" />
                        </IconField>
                    </div>
                </template>
                <Column field="name" :header="$t('CATEGORIES.TABLE.NAME')" sortable></Column>
                <Column field="status" :header="$t('CATEGORIES.TABLE.STATUS')" sortable>
                    <template #body="slotProps">
                        <Tag :value="$t(`CATEGORIES.STATUS.${slotProps.data.status}`).toUpperCase()" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
                <Column :exportable="false">
                    <template #body="slotProps">
                        <div class="flex">
                            <Button icon="pi pi-pencil" outlined rounded severity="success" class="mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="categoryDialog" :style="{ width: '450px' }" :header="$t('CATEGORIES.MODAL_TITLE')" :modal="true">
            <form @submit="onSubmit()">
                <div class="flex flex-col gap-6">
                    <div>
                        <label for="name" class="block font-bold mb-3">{{ $t('CATEGORIES.INPUT.NAME.TITLE') }}</label>
                        <InputText id="name" v-model.trim="category.name" required="true" autofocus :invalid="submitted && !category.name" fluid :disabled="loading"/>
                        <small v-if="submitted && !category.name" class="text-red-500">{{ $t('CATEGORIES.INPUT.NAME.REQUIRED') }}</small>
                    </div>
                    <div>
                        <label for="inventoryStatus" class="block font-bold mb-3">{{ $t('CATEGORIES.INPUT.STATUS') }}</label>
                        <Select id="inventoryStatus" v-model="category.status" :options="statusOptions" optionLabel="label" optionValue="value" fluid :disabled="loading"></Select>
                    </div>
                </div>
            </form>

            <template #footer>
                <Button :label="$t('COMMON.BUTTONS.CANCEL')" icon="pi pi-times" text @click="hideDialog" />
                <Button :label="$t('COMMON.BUTTONS.SAVE')" icon="pi pi-check" type="submit" @click="onSubmit" :loading />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteCategoryDialog" :style="{ width: '480px' }" :header="$t('PRODUCTS.DELETE_MODAL.TITLE')" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <i18n-t v-if="category" keypath="CATEGORIES.DELETE_MODAL.DESCRIPTION" tag="span" scope="global">
                    <b>{{ category.name }}</b>
                    <b>{{ $t('CATEGORIES.DELETE_MODAL.1') }}</b>
                </i18n-t>
            </div>
            <template #footer>
                <Button :label="$t('COMMON.BUTTONS.YES')" icon="pi pi-check" text @click="onSubmitDelete" />
                <Button :label="$t('COMMON.BUTTONS.NO')" icon="pi pi-times" @click="deleteCategoryDialog = false" />
            </template>
        </Dialog>
    </div>
</template>
