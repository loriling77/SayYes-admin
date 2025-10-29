import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Form, Input, Button, Popconfirm, message } from 'antd';
import type { TableProps } from 'antd';
import { getCategoryData, DeleteCategoryData } from '../../../api/category'
import Edit from './edit'
import { useForm } from 'antd/es/form/Form'


interface DataType {
    key: string;
    name: string;
    icon: string;
    created_at: string
    category_id: string

}


type FieldType = {
    name?: string;

};




const App: React.FC = () => {
    const [editData, setEditData] = useState(null)

    const confirm = async (category_id: string) => {

        await DeleteCategoryData(category_id)
        fetchingCategories()


        message.success('Detele succedded')

    }

    const [form] = Form.useForm()



    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (path) => <img width={50} height={50} src={path}></img>,
        },
        {
            title: 'Created_at',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button color="primary" variant="solid"

                        onClick={() => editOpen(record)}>
                        Edit
                    </Button>
                    < Popconfirm
                        title="delete the task"
                        description="are you sure to delete this task?"

                        onConfirm={() => confirm(record.category_id)}
                        okText='yes'
                        cancelText="No">
                        <Button color="danger" variant="outlined">
                            Delete
                        </Button>
                    </Popconfirm>

                </Space>
            ),
        },

    ];

    const data: DataType[] = [
        // {
        //     // key: '1',
        //     // name: '',
        //     // icon: '',
        //     // created_at: ''
        // },
    ];
    const [categories, setCategories] = useState<any[]>([])

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchingCategories();
    }, [])

    const fetchingCategories = async () => {
        try {
            setLoading(true);
            const response = await getCategoryData({ name: form.getFieldValue('name') == undefined ? '' : form.getFieldValue('name'), page: 1, page_size: 10 });
            if (response.data?.items && Array.isArray(response.data.items)) {
                const tableData: any[] = response.data.items.map(
                    (item: any) => ({
                        key: item.category_id,
                        name: item.name,
                        icon: `http://127.0.0.1:8081/${item.icon}`,
                        created_at: item.created_at,
                        category_id: item.category_id,
                    })
                );
                setCategories(tableData)
            }

        } catch (error) {
            console.error('获取分类失败：', error);
        } finally {
            setLoading(false)
        }
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    const editOpen = (item: any) => {
        setEditData(item)
        setIsModalOpen(true)
    }
    return <>

        <Form
            name="f"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={fetchingCategories}
            autoComplete="off"

        >
            <div style={{ display: 'flex' }}>
                <Form.Item<FieldType>
                    label="分类名称"
                    name="name"
                >
                    <Input />
                </Form.Item>



                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                </Form.Item>
                <Form.Item label={null} style={{ marginLeft: 20 }}>
                    <Button type="primary" htmlType="submit" onClick={() => { setEditData(null); setIsModalOpen(true) }}>
                        Add
                    </Button>
                </Form.Item>

            </div>

        </Form>

        <Table<DataType> loading={loading} columns={columns} dataSource={categories} />
        <Edit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editData={editData} fetchingCategories={fetchingCategories}>


        </Edit>
    </>


};

export default App;