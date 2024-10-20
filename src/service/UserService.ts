import { IClientSettings } from '@/interfaces/IClient';
import { API } from '../settings/axios';

export default {
    async getClients() {
        return API({
            method: 'GET',
            url: '/admin/users',
        });
    },

    async postClient(data) {
        return API({
            method: 'POST',
            url: '/admin/users',
            data,
        });
    },

    async putClient(data, id: number) {
        return API({
            method: 'PUT',
            url: `/admin/users/${id}`,
            data,
        });
    },

    async deleteClient(id: number) {
        return API({
            method: 'GET',
            url: `/admin/users/${id}`,
        });
    },

    async getLoggedAccount() {
        return API({
            method: 'GET',
            url: '/admin/me',
        });
    },

    async getClientSettings(slug: string) {
        return API({
            method: 'GET',
            url: `/admin/settings/${slug}`,
        });
    },

    async putClientSettings(slug: string, data: IClientSettings) {
        return API({
            method: 'PUT',
            url: `/admin/settings/${slug}`,
            data,
        });
    },

};
