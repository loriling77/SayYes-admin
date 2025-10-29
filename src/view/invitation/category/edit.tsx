import { useEffect, useState } from 'react'
import { CreateCategoryData, UpdateCategoryData } from '../../../api/category'
import { useForm } from 'antd/es/form/Form'


import { Modal, Form, Input, Upload, message } from 'antd'
import { useRoutes } from 'react-router-dom';

type FieldType = {
    name?: string;

};




export default function Edit(props: { isModalOpen: boolean, typeAction: string, setIsModalOpen: (value: boolean) => void, fetchingCategories(): object, editData: { [key: string]: any } }) {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = useForm()

    useEffect(() => {
        if (!props.editData) {
            //  添加
            form.resetFields()
            setFileList([])
        } else {
            //  编辑
            form.setFieldsValue(props.editData)
            setFileList([{ url: props.editData?.icon }])
        }
    }, [props.isModalOpen])
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    //   添加 和编辑的调用接口
    const handleOk = async () => {
        try {
            if (!props.editData) {
                let formData = new FormData()
                formData.append('name', form.getFieldValue('name'))
                formData.append('icon', fileList[0].response.data[0].semi_path)
                const response = await CreateCategoryData(formData);
                message.success(response?.message)
            } else {
                let formData = new FormData()
                formData.append('name', form.getFieldValue('name'))
                formData.append('icon', !!fileList[0].url ? fileList[0].url.replace(/^https?:\/\/[^/]+\/?/, "") : fileList[0].response.data[0].semi_path)
                const response = await UpdateCategoryData(props.editData.category_id, formData);
                message.success(response?.message)
            }

            props.setIsModalOpen(false)
            props.fetchingCategories()

        } catch (error) {
            console.error('获取分类失败：', error);
        }
    }

    const onCancel = () => {
        props.setIsModalOpen(false);
        form.resetFields()
    }

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <>

            <Modal

                title="Add Category"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.isModalOpen}

                onOk={handleOk}
                onCancel={onCancel}
                centered
            >
                <Form form={form}>
                    <Form.Item<FieldType>
                        label="分类名称"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Upload Icon"
                    >
                        {

                        }
                        <Upload
                            action="http://127.0.0.1:8081/upload/files"
                            listType="picture-card"
                            accept="png,jpg,svg"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            maxCount={1}
                            name='files'
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

