import BackContext from './BackContext';
import Nav from './Nav';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import Admin from './Admin/Admin';
import { useEffect, useState } from 'react';
import ServiceCrud from './Services/Crud';
import MasterCrud from './Masters/Crud';



function Back({show}) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [services, setServices] = useState(null)
    const [createService, setCreateService] = useState(null)
    const [deleteService, setDeleteService] = useState(null)
    const [editService, setEditService] = useState(null)
    const [modalService, setModalService] = useState(null)

    const [masters, setMasters] = useState(null)
    const [createMaster, setCreateMaster] = useState(null)
    const [deleteMaster, setDeleteMaster] = useState(null)


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

//READ Master
useEffect(() => {
    axios.get('http://localhost:3003/admin/masters', authConfig())
        .then(res => setMasters(res.data));
}, [lastUpdate]);


//CREATE BOOKS

useEffect(() => {
    if (null === createMaster) return;
    axios.post('http://localhost:3003/admin/masters', createMaster, authConfig())
    .then(res => {
        setLastUpdate(Date.now());
    })
    
}, [createMaster]);

//DELETE Master
useEffect(() => {
    if (null === deleteMaster) return;
    axios.delete('http://localhost:3003/admin/masters/' + deleteMaster.id, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
    
}, [deleteMaster]);

    return (
        <BackContext.Provider value={{
          services,
          setCreateService,
          setDeleteService,
          setEditService,
          modalService,
          setModalService,
          masters,
          setCreateMaster,
          setDeleteMaster,
        
            
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
                    <MasterCrud/>
                    
                    
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