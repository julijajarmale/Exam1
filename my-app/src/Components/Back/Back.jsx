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
    const [editService, setEditService] = useState(null)
    const [modalService, setModalService] = useState(null)


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
useEffect(() => {
        
    if (null === editService) return;
    axios.put('http://localhost:3003/admin/services/' + editService.id, editService, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
       
}, [editService]);


    return (
        <BackContext.Provider value={{
          services,
          setCreateService,
          setDeleteService,
          setEditService,
          modalService,
          setModalService,
        
            
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