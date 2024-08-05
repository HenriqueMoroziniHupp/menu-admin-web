import { API } from '../settings/axios';


export default {
    async getLoggedAccount() {
        return API({
            method: 'GET',
            url: '/admin/me',
        });
    }
};
