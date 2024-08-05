import { API } from '../settings/axios';

interface IAuthData {
    email: string;
    password: string;
}
export default {
    async postAuth(data: IAuthData) {
        return API({
            method: 'POST',
            url: '/admin/auth',
            data
        });
    }
};
