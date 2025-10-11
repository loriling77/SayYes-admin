import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import '../App.css'



const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};



const App: React.FC = () => {
    const [form] = Form.useForm();



    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };


    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <div className='Form'>

                <Form.Item name="note" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form style={{ marginLeft: "20px" }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Add
                        </Button>
                    </Space>
                </Form>



            </div>
        </Form>
    );
};

export default App;