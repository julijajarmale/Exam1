import BackContext from './BackContext';
import Nav from './Nav';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import Admin from './Admin/Admin';
import { useEffect, useState } from 'react';
import ServiceCrud from './Services/Crud';



function Back({show}) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [services, setServices] = useState(null)
    const [createService, setCreateService] = useState(null)
    const [deleteService, setDeleteService] = useState(null)

//READ BOOKS 
useEffect(() => {
    axios.get('http://localhost:3003/admin/services', authConfig())
        .then(res => setServices(res.data));
}, [lastUpdate]);


//CREATE BOOKS

useEffect(() => {
    if (null === createService) return;
    axios.post('http://localhost:3003/admin/services', createService, authConfig())
    .then(res => {
        setLastUpdate(Date.now());
    })
    
}, [createService]);


//DELETE BOOKS
useEffect(() => {
    if (null === deleteService) return;
    axios.delete('http://localhost:3003/admin/services/' + deleteService.id, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
    
}, [deleteService]);

// EDIT BOOK
//useEffect(() => {
//        
//    if (null === editBook) return;
//    axios.put('http://localhost:3003/admin/books/' + editBook.id, editBook, authConfig())
//        .then(res => {
//            setLastUpdate(Date.now());
//        })
//       
//}, [editBook]);


    return (
        <BackContext.Provider value={{
          services,
          setCreateService,
          setDeleteService,
        
            
        }}>
              {
                show === 'admin' ?
                    <>
                    
                    <Nav/>
                    <Admin/>
                    
                    </>
                    : show === 'masters' ?
                    <>
                    
                    <Nav/>
                    
                    
                    </>
                    
                    : 
                    show === 'services' ?  <>
                    
                    <Nav/>
                    <ServiceCrud/>
                    
                    
                    </>: 
                        null
            }
        </BackContext.Provider>
    )
}
export default Back;