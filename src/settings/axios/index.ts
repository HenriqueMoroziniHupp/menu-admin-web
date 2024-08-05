import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json'

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export { API }
