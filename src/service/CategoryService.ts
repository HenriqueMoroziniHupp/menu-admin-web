import { API } from '../settings/axios';

interface IPostCategory {
    name: string;
    status: string;
    icon?: string
}
export default {
    async getCategories(slug: string) {
        return API({
            method: 'GET',
            url: `/categories/${slug}`,
        });
    },

    async postCategory(data: IPostCategory) {
        return API({
            method: 'POST',
            url: '/admin/categories',
            data
        });
    },

    async putCategory(id: number, data: IPostCategory) {
        return API({
            method: 'PUT',
            url: `/admin/categories/${id}`,
            data
        });
    },

    async deleteCategory(id: number) {
        return API({
            method: 'DELETE',
            url: `/admin/categories/${id}`,
        });
    }
};
