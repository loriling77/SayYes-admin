import { useEffect, useState } from 'react'

import Table, { type CategoryDataType } from '../../components/table'
import { getCategoryData } from '../../api/category'

export default function basicInformation() {

    const [category, setCategory] = useState([])

    const getCategoryApi = async () => {

        const categoryData = await getCategoryData({ page: 1, 'page_size': 10 })
        console.log(categoryData)
        const processData = categoryData.data.items.map((item: any) => {
            id: item.category_id;
            name: item.name;
            icon: item.icon;
        })
        setCategory(processData)

    }

    useEffect(() => {
        getCategoryApi()



    }, [])

    return (
        <>

            <div className='table'>
                <Table dataSource={category} ></Table>
            </div>
        </>
    )
}

