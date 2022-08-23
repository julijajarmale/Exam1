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
                    : show === 'books' ? <div>books crud</div>: 
                        null
            }
        </BackContext.Provider>
    )
}
export default Back;