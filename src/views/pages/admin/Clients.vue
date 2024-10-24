<script setup lang="ts">
import userAPI from '@/service/UserService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

interface IClient {
    id?: number,
    slug: string,
    email: string,
    name: string,
    password: string,
    description?: string,
    bannerUrl?: string,
    status: 'PENDING' | 'ACTIVE' | 'BLOCKED' | 'TERMINATED' | 'TRIAL'
}

const toast = useToast();
const __dt = ref();
const loading = ref(false)
const loadingTable = ref(false)
const client = ref({} as IClient | null);
const clientTemp = ref({} as IClient | null);
const clients = ref<IClient[]>();
const editorDialog = ref(false);
const deleteDialog = ref(false);
const submitted = ref(false);
const statusOptions = ref([
    { label: 'Pending', value: 'PENDING' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Blocked', value: 'BLOCKED' },
    { label: 'Terminated', value: 'TERMINATED' },
    { label: 'Trial', value: 'TRIAL' }
]);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const putClient = computed(() => {
    const diff = {} as IClient;
    const keys = new Set([...Object.keys(client.value)]);

    keys.forEach(key => {
        if (client.value[key] !== clientTemp.value[key]) {
            diff[key] = client.value[key];
        }
    });

    return diff;
})

const fetchClients = async () => {
    try {
        loadingTable.value = true
        const response = await userAPI.getClients()
        clients.value = response.data
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to load clients', life: 3000 });

    } finally {
        loadingTable.value = false
    }
}

const resetClient = (): IClient => {
    return {
        name: undefined,
        status: 'PENDING',
        email: undefined,
        password: undefined,
        slug: undefined,
        description: undefined,
    }
}

const isEditMode = computed(() => !!clientTemp.value.id)

const openNew = () => {
    client.value = resetClient()
    submitted.value = false;
    editorDialog.value = true;
};

const openEdit = (item: IClient) => {
    client.value = { ...item };
    clientTemp.value = { ...client.value }
    editorDialog.value = true;
};

const openDelete = (item: IClient) => {
    client.value = item;
    deleteDialog.value = true;
};

const hideDialog = () => {
    client.value = resetClient()
    editorDialog.value = false;
    submitted.value = false;
    loading.value = false
};

const isValid = computed(() => {
    if (!isEditMode && !!client.value.password) return false

    return !!client.value?.name
    && !!client.value?.slug
    && !!client.value.email
})

const onSubmit = async () => {
    submitted.value = true;
    if (!isValid.value) return
    const isEdit = !!client.value.id

    try {
        loading.value = true;
        isEdit ?
            await userAPI.putClient(putClient.value, client.value.id)
            :await userAPI.postClient(client.value)
        await fetchClients()
        editorDialog.value = false;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Success to save client', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to save client', life: 3000 });
    } finally {
        loading.value = false
    }
};

const onSubmitDelete = async () => {
    try {
        loading.value = true;
        await userAPI.deleteClient(client.value.id)
        await fetchClients()
        deleteDialog.value = false;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Success to delete', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Successful', detail: 'Error to delete', life: 3000 });
    } finally {
        loading.value = false
    }
};

const getStatusLabel = (status: 'PENDING' | 'ACTIVE' | 'BLOCKED' | 'TERMINATED' | 'TRIAL') => {
    switch (status) {
        case 'ACTIVE':
            return 'success';

        case 'TRIAL':
            return 'info';

        case 'PENDING':
            return 'warn';

        case 'BLOCKED':
            return 'contrast';

        case 'TERMINATED':
            return 'danger';

        default:
            return null;
    }
};


onMounted(async() => {
    await fetchClients()
});

const submitForm = () => {
    const form = document.getElementById('formClient') as HTMLFormElement

    form.submit()
}

</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New Client" icon="pi pi-plus" severity="primary" class="mr-2" @click="openNew" />
                </template>
            </Toolbar>

            <DataTable
                ref="__dt"
                :value="clients"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} clients"
                :loading="loadingTable"
                tableStyle="min-width: 55rem"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Manage Clients</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="Id" sortable></Column>
                <Column field="slug" header="Slug" sortable></Column>
                <Column header="Image">
                    <template #body="slotProps">
                        <img :src="slotProps.data.bannerUrl" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                <Column field="name" header="Nome" sortable></Column>
                <Column field="email" header="E-mail" sortable></Column>
                <Column field="status" header="Status" sortable>
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
                <Column :exportable="false" style="width: 8rem;">
                    <template #body="slotProps">
                        <div class="flex">
                            <Button icon="pi pi-external-link" outlined severity="info" as="a" target="blank" :href="`https://${slotProps.data.slug}.upzini.com`" rounded class="mr-2"/>
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="openEdit(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="openDelete(slotProps.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog class="select-none" v-model:visible="editorDialog" :style="{ width: '450px' }" header="Client Data" :modal="true" @hide="hideDialog">
            <form id="formClient" @submit="onSubmit">
                <div class="dialog__container flex flex-col gap-6">
                    <div class="client-name">
                        <label for="name" class="block font-bold mb-3">Name</label>
                        <InputText id="name" v-model.trim="client.name" required="true" autofocus :invalid="submitted && !client.name" fluid :disabled="loading"/>
                        <small v-if="submitted && !client.name" class="text-red-500">Name is required.</small>
                    </div>

                    <div class="client-email">
                        <label for="email" class="block font-bold mb-3">E-mail</label>
                        <InputText id="email" type="email" v-model.trim="client.email" required="true" autofocus :invalid="submitted && !client.email" fluid :disabled="loading"/>
                        <small v-if="submitted && !client.email" class="text-red-500">E-mail is required.</small>
                    </div>

                    <div class="client-password" v-if="!isEditMode">
                        <label for="password" class="block font-bold mb-3">Password Temp</label>
                        <InputText id="password" v-model.trim="client.password" required="true" autofocus :invalid="submitted && !client.password" fluid :disabled="loading"/>
                        <small v-if="submitted && !client.password" class="text-red-500">Password is required.</small>
                    </div>

                    <div class="client-slug">
                        <label for="slug" class="block font-bold mb-3">Slug</label>
                        <InputText id="slug" v-model.trim="client.slug" required="true" autofocus :invalid="submitted && !client.slug" fluid :disabled="loading || isEditMode"/>
                        <small v-if="submitted && !client.slug" class="text-red-500">Slug is required.</small>
                    </div>

                    <div class="client-description">
                        <label for="description" class="block font-bold mb-3">Description (Optional)</label>
                        <Textarea id="description" v-model="client.description" :disabled="loading" rows="3" cols="20" fluid />

                    </div>
                    <div class="client-status">
                        <label for="clientStatus" class="block font-bold mb-3">Client Status</label>
                        <Select id="clientStatus" v-model="client.status" :options="statusOptions" optionLabel="label" optionValue="value" va placeholder="Select a Status" fluid :disabled="loading"></Select>
                    </div>
                </div>

                <div class="flex justify-end gap-2 pt-4">
                    <Button label="Cancel" icon="pi pi-times" text @click="editorDialog = false" />
                    <Button label="Save" icon="pi pi-check" type="submit" :loading @click="onSubmit"/>
                </div>
            </form>

            <!-- <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="editorDialog = false" />
                <Button label="Save" icon="pi pi-check" type="submit" :loading @click="onSubmit"/>
            </template> -->
        </Dialog>

        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="client"
                    >Are you sure you want to delete <b>{{ client.name }}</b
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
