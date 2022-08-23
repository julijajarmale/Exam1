import BackContext from './BackContext';
import Nav from './Nav';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import Admin from './Admin/Admin';
import { useEffect, useState } from 'react';



function Back({show}) {
   

    return (
        <BackContext.Provider value={{
          
           

            
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
                    
                    
                    </>: 
                        null
            }
        </BackContext.Provider>
    )
}
export default Back;