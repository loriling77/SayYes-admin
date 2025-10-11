import { Outlet } from 'react-router-dom'
import SearchForm from '../../components/searchForm'

export default function invitation() {
    return (
        <>

            <SearchForm></SearchForm>
            <Outlet></Outlet>
            {/* component which renders children compnents */}

        </>

    )
}
