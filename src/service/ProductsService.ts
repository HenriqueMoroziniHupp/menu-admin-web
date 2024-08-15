import { API } from '../settings/axios';

interface IPostCategory {
    name: string;
    status: string;
    icon?: string
}
export default {
    async getProducts(slug: string) {
        return API({
            method: 'GET',
            url: `/products/${slug}`,
        });
    },

    async getProductByCategory(slug: string, idCategory: number) {
        return API({
            method: 'GET',
            url: `/products/${slug}/${idCategory}`,
        });
    },

    async postProduct(data: IPostCategory) {
        return API({
            method: 'POST',
            url: '/admin/products',
            data
        });
    },

    async putProduct(id: number, data: IPostCategory) {
        return API({
            method: 'PUT',
            url: `/admin/products/${id}`,
            data
        });
    },

    async deleteProduct(id: number) {
        return API({
            method: 'DELETE',
            url: `/admin/products/${id}`,
        });
    }
};
