import axios from '../api/structure';

export default {
    //!Auth
    login: data => {
        return axios.api.post('/auth/login-teacher', data).then(response => response.data);
    },

    //!Schedule
    getScheduleById: data => {
        return axios.api.post(`/schedule/byId`, data).then(response => response.data);
    },

    addAndEditSchedule: data => {
        return axios.api.post(`/schedule/addandedit`, data).then(response => response.data);
    },

    removeSchedule: data => {
        return axios.api.post(`/schedule/removeschedule`, data).then(response => response.data);
    },

    //!Teacher Subject
    getSubjectByTId: data => {
        return axios.api.post(`/subject/byTId`, data).then(response => response.data);
    },

    getSubjectByYearAndYear: data => {
        return axios.api.post(`/subject/byTermAndYear`, data).then(response => response.data);
    },

    addTeacherSubject: data => {
        return axios.api.post(`/subject/insert`, data).then(response => response.data);
    },

    editTeacherSubject: data => {
        return axios.api.post(`/subject/edit`, data).then(response => response.data);
    },

    removeTeacherSubject: data => {
        return axios.api.post(`/subject/remove`, data).then(response => response.data);
    },

    //!Teacher Consult
    getConsult: data => {
        return axios.api.post(`/consult/byTId`, data).then(response => response.data);
    },

    editConsult: data => {
        return axios.api.post(`/consult/edit`, data).then(response => response.data);
    },
}