import Cookies from 'js-cookie';
import getAxios from './getAxios';

const access_token = Cookies.get('access_token');
// Index
export const getReminders = async (limit) => {
    try {

        // Passing token to headers
        getAxios.defaults.headers.Authorization = `Bearer ${access_token}`;

        const response = await getAxios.get(`/reminders?limit=${limit}`);
        return response.data.data;
    } catch (error) { }
};

// Store
export const storeReminders = async (form) => {
    try {
        // Convert remind_at dateTime to epoch
        const epochPublishDate = Date.parse(`${form.remind_at}T00:00:00`) / 1000;

        // Passing token to headers
        getAxios.defaults.headers.Authorization = `Bearer ${access_token}`;

        const response = await getAxios.post('/reminders', { ...form, remind_at: epochPublishDate })
        return response.data
    } catch (error) { }
};

// Show
export const getReminder = async (id) => {
    try {
        // Passing token to headers
        getAxios.defaults.headers.Authorization = `Bearer ${access_token}`;

        const response = await getAxios.get(`/reminders/${id}`);
        return response.data.data;
    } catch (error) { }
};

// Update
export const updateReminder = async (form, id) => {
    try {
        // Convert remind_at dateTime to epoch
        const epochPublishDate = Date.parse(`${form.remind_at}T00:00:00`) / 1000;

        // Passing token to headers
        getAxios.defaults.headers.Authorization = `Bearer ${access_token}`;

        const response = await getAxios.patch(`/reminders/${id}`, { ...form, remind_at: epochPublishDate })
        return response.data
    } catch (error) {
        return error
    }
}

// Delete
export const deleteReminder = async (id) => {
    try {
        // Passing token to headers
        getAxios.defaults.headers.Authorization = `Bearer ${access_token}`;

        const response = await getAxios.delete(`/reminders/${id}`)
        return response.data
    } catch (error) { }
}
