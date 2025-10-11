import api from '../common/axiosConfig'

export const getCategoryData = (params: any) => {
    return api.get('/category/', params);
};