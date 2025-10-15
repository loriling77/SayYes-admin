import { useState } from 'react'



import { Modal, Form, Input, Upload } from 'antd'
import { useRoutes } from 'react-router-dom';

type FieldType = {
    name?: string;

};




export default function Edit(props: { isModalOpen: boolean, openModal: () => void }) {


    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

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

                title="Add user"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.isModalOpen}
                // onOk={handleOk}
                onCancel={props.openModal}
                centered

            >
                <Form>
                    <Form.Item<FieldType>
                        label="username"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>


                </Form>





            </Modal>
        </>
    )
}

