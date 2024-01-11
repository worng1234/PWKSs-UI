import axios from '../api/structure';

export default {
    //Auth

    login: data => {
        return axios.api.post('/auth/login-teacher', data).then(response => response.data);
    },

    //Schedule
    getScheduleById: data => {
        return axios.api.post(`/schedule/byId`, data).then(response => response.data);
    },

    addAndEditSchedule: data => {
        return axios.api.post(`/schedule/addandedit`, data).then(response => response.data);
    },

    removeSchedule: data => {
        return axios.api.post(`/schedule/removeschedule`, data).then(response => response.data);
    }
}