import { useState } from 'react'
import { CreateCategoryData } from '../../../api/category'
import { useForm } from 'antd/es/form/Form'
import type { UploadProps } from 'antd';

import { Modal, Form, Input, Upload, message } from 'antd'
import type { UploadFile } from 'antd';


type FieldType = {
    name?: string;
    icon?: string
};
interface Editinter {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void
}



export default function Edit({ isModalOpen, setIsModalOpen }: Editinter) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = useForm()

    const handleOk = async () => {

        try {
            let formData = new FormData()
            formData.append('name', form.getFieldValue('name'))
            formData.append('icon', fileList[0].response.data[0].semi_path)
            const response = await CreateCategoryData(formData);
            message.success(response?.message)
            setIsModalOpen(false)
        } catch (error: any) {
            message.error(error.response[0].data.detail)
        }
    }
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };



    return (
        <>

            <Modal

                title="Add Category"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => { setIsModalOpen(false) }}
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
                        name="icon"
                        rules={[{ required: true, message: 'Please input icon!' }]}
                    >
                        {

                        }
                        <Upload
                            action="http://127.0.0.1:8081/upload/files"
                            listType="picture-card"
                            fileList={fileList}
                            maxCount={1}
                            onChange={onChange}
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

