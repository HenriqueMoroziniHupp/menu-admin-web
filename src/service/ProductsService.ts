import { IProduct } from '@/interfaces/IProduct';
import { API } from '../settings/axios';

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

    async postProduct(data: IProduct) {
        return API({
            method: 'POST',
            url: '/admin/products',
            data,
        });
    },

    async putProduct(id: number, data: IProduct) {
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
    },

    async getCategoriesWithProducts(slug: string) {
        return API({
            method: 'GET',
            url: `${slug}/products`
        })
    }
};
