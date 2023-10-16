import React, { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginPage from '../LoginPage/LoginPage';
import { LaunchPage } from '../LaunchPage/LaunchPage';

export const RouterPage: React.FC = () => {
    const [role,setRole]=useState('')
    const [data,setData]:any=useState()
    const setRoleLogin=(role:string,dataLogin:any)=>
    {
        setRole(role)
        setData(dataLogin)
    }
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path='/'element={<LoginPage role={setRoleLogin}/>}></Route>
            
            <Route path='/LaunchPage'element={<LaunchPage role={role} data={data}/>}></Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}