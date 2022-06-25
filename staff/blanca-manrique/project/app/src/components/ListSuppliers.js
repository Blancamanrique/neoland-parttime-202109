import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { retrieveSuppliers, filterSuppliers } from '../logic'
import { IoChevronBack, IoChevronForwardOutline, IoAdd, IoSearch } from "react-icons/io5"
import './ListSuppliers.css'

function ListSuppliers() {
    const [suppliers, setSuppliers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredResults, setFilteredResults] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        try {
            retrieveSuppliers(sessionStorage.token)
                .then(suppliers => {
                    setSuppliers(suppliers)
                })
                .catch(error => alert(error.message))

        } catch (error) {
            alert(error.message)
        }

    }, [])

    const handleSupplierDetail = supplierId => { //Para ir al detalle del proveedor
        navigate(`/suppliers/${supplierId}`)
    }
    const handleCreateSupplier = () => {   //Para abrir el compo de Create Supplier
        navigate('/suppliers/new-supplier')
    }
    const goBack = () => { //Volvemos a Home
        navigate('/')
    }

    const searchSuppliers = query => {
        setSearchTerm(query)
        
        setFilteredResults(filterSuppliers(query, suppliers))
    }


    return <div>
        <IoChevronBack className='IconBack' onClick={goBack} />

        <div className='Suppliers'>
            <div>
                <input
                    type="text"
                    placeholder='Search supplier...'
                    onChange={(e) => searchSuppliers(e.target.value)}
                />
                <IoSearch />
            </div>

            {searchTerm.length > 1 ? (
                filteredResults.map((supplier) => {
                    return (
                        <li className='Suppliers__items-li' key={supplier.id} onClick={() => handleSupplierDetail(supplier.id)}>
                            <span className='Suppliers__items-li-text'>{supplier.name}</span>
                            <IoChevronForwardOutline className='Suppliers__items-li-icon' />
                        </li>

                    )
                })
            ) : (
                suppliers.map((supplier) => {
                    return (
                        <li className='Suppliers__items-li' key={supplier.id} onClick={() => handleSupplierDetail(supplier.id)}>
                            <span className='Suppliers__items-li-text'>{supplier.name}</span>
                            <IoChevronForwardOutline className='Suppliers__items-li-icon' />
                        </li>

                    )
                })
            )}

            <IoAdd className='Suppliers__addIcon' onClick={handleCreateSupplier} />
        </div>

    </div>

}
export default ListSuppliers