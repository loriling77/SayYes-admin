import api from '../common/axiosConfig'

export const getCategoryData = (params: { name: string, page: number, page_size: number }) => {
    return api.get('/category', params);
};

export const CreateCategoryData = (params: any) => {
    return api.post('/category', params);
};

export const DeleteCategoryData = (params: string) => {
    return api.delete(`/category/${params}`,);
};
export const UpdateCategoryData = (category_id: string, params: FormData) => {
    return api.put(`/category/${category_id}`, params);
};