
import { Space, Table, Tag, Button } from 'antd';
import type { TableProps } from 'antd';

import { useLocation } from 'react-router-dom';



interface UserDataType {
    id: number;
    key: string;
    username: string;
    password: string
    age: number;
    gender: string;
    email: string;
    address: string;
    tags: string[];
}

interface InvitationDataType {
    id: number;
    key: string;
    // key和id的区别
    title: string;
    cover_image: string;
    image_list: string;
    start_time: Date;
    create_at: Date;
    music: string;
    address: string;

    // 时间类型？


    // 添加婚纱照和文案编辑

}

export interface CategoryDataType {
    id: number;
    key: string;
    name: string;
    icon: string;

    // can be biginterger?


}

const CategoryColumns: TableProps<CategoryDataType>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: number) => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        render: (text: string) => <a>{text}</a>,
    },


]



const InvitationColumns: TableProps<InvitationDataType>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: number) => <a>{text}</a>,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Cover_image',
        dataIndex: 'cover_image',
        key: 'cover_image',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Image_list',
        dataIndex: 'image_list',
        key: 'image_list',
    },
    {
        title: 'Start_time',
        dataIndex: 'start_time',
        key: 'start_time',
    },
    {
        title: 'Music',
        dataIndex: 'music',
        key: 'music',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: (text: string) => <a>{text}</a>,
    },






];


const UserColumns: TableProps<UserDataType>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'Bride' || tag === 'Groom') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
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





const TableList = (dataSource: any) => {
    const location = useLocation()
    const pathname = location.pathname;




    switch (pathname) {
        case '/user':
            return <Table<UserDataType> columns={UserColumns} dataSource={dataSource} />;
        case '/invitation/invitationTemplate':
            return <Table<InvitationDataType> columns={InvitationColumns} dataSource={dataSource} />;
        case '/invitation/category':
            return <Table<CategoryDataType> columns={CategoryColumns} dataSource={dataSource} />;
        default:
            return <h1>no information</h1>
    }

}

export default TableList;