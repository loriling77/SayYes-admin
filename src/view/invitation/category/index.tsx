import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Form, Input, Button } from 'antd';
import type { TableProps } from 'antd';
import { getCategoryData } from '../../../api/category'
import Edit from './edit'


interface DataType {
    key: string;
    name: string;
    icon: string;
    created_at: string

}


type FieldType = {
    name?: string;

};


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
                <Button color="primary" variant="solid">
                    Edit
                </Button>
                <Button color="danger" variant="outlined">
                    Delete
                </Button>
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

const App: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([])

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchingCategories();
    }, [])

    const fetchingCategories = async () => {
        try {
            setLoading(true);
            const response = await getCategoryData({ page: 1, page_size: 10 });
            if (response.data?.items && Array.isArray(response.data.items)) {
                const tableData: any[] = response.data.items.map(
                    (item: any) => ({
                        key: item.category_id,
                        name: item.name,
                        icon: `http://127.0.0.1:8081/${item.icon}`,
                        created_at: item.created_at,
                    })
                );
                setCategories(tableData)
                console.log('获取分类成功：', tableData)

            }

        } catch (error) {
            console.error('获取分类失败：', error);
        } finally {
            setLoading(false)
        }
    }
    const [isModalOpen, setIsModalOpen] = useState(false)

    return <>

        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}

            autoComplete="off"
        >
            <div style={{ display: 'flex' }}>
                <Form.Item<FieldType>
                    label="分类名称"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>



                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                </Form.Item>
                <Form.Item label={null} style={{ marginLeft: 20 }}>
                    <Button type="primary" htmlType="submit" onClick={() => { setIsModalOpen(true) }}>
                        Add
                    </Button>
                </Form.Item>

            </div>

        </Form>

        <Table<DataType> loading={loading} columns={columns} dataSource={categories} />
        <Edit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>


        </Edit>
    </>


};

export default App;