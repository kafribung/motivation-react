import Cookies from 'js-cookie';
import getAxios from './getAxios';

const access_token = Cookies.get('access_token');
// Index
export const getMotivations = async (limit) => {
    try {
        const response = await getAxios.get(`/motivation?limit=${limit}`);
        return response.data.data;
    } catch (error) { }
};

// Store
export const storeMotivation = async (form) => {
    try {
        // Passing token to headers
        getAxios.defaults.headers.Authorization = `Bearer ${access_token}`;

        const response = await getAxios.post('/motivation', form)
        return response.data.data
    } catch (error) {
        return error.response.data
    }
};

// Show
export const getMotivation = async (slug) => {
    try {
        // Passing token to headers
        getAxios.defaults.headers.Authorization = `Bearer ${access_token}`;

        const response = await getAxios.get(`/motivation/${slug}`);
        return response.data?.data;
    } catch (error) { }
};

// Update
export const updateMotivation = async (form, slug) => {
    try {
        // Passing token to headers
        getAxios.defaults.headers.Authorization = `Bearer ${access_token}`;

        const response = await getAxios.patch(`/motivation/${slug}`, form)
        return response.data.data
    } catch (error) {
        return error.response.data
    }
}

// Delete
export const deleteMotivation = async (slug) => {
    try {
        // Passing token to headers
        getAxios.defaults.headers.Authorization = `Bearer ${access_token}`;

        const response = await getAxios.delete(`/motivation/${slug}`)
        return response.data.data
    } catch (error) { }
}
