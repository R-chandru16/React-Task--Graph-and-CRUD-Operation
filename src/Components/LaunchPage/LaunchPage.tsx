import React, { useEffect, useState } from 'react';
import './LaunchPage.css';
import { useNavigate, Link } from 'react-router-dom';
import {Modal,FormControl} from 'react-bootstrap';
import EndUserDashBoard from '../EndUserDashboard/EndUserDashboard';
import avatorimage from '../Images/image1.png';
import avatorimage2 from '../Images/image2.png';
export const LaunchPage= (props:any) => {
    const navigate = useNavigate();
    
    const [user,setUser]=useState({
    //List of json
        id:"",
        name:"",
        EmailId:"",
        department:"",
        password:"",
        role:"",
        status:"",
       
    })
    const [JsonAdmin,setJsonAdmin]:any=useState([])
    const [isEdit,setIsEdit]=useState(false)
    const [show,setShow]=useState(false)
    
    useEffect(()=>
    {
        if(props.data.length!==0 && props.role==='Admin')
        {
            setJsonAdmin(props.data)
        }
    },[])
   
    const onClickAddUsers=()=>
    {
        const updatedDataList=JsonAdmin
        updatedDataList.push(user)
        setJsonAdmin(updatedDataList)
        const userTemp={
            id:"",
            name:"",
            EmailId:"",
            department:"",
            password:"",
            role:"",
            status:"",
            
            
        }

        if (!user.name || !user.EmailId || !user.department || !user.status) {
          alert('Please fill out all mandatory fields.');
          return;
        }
        setUser(userTemp);
        setShow(false)
    }
    const onClickEditUsers=(id:string)=>
    {
        const updatedDataList = JsonAdmin.map((item:any) => {
            if (item.id === id) {
              return { ...item,name:user.name,department:user.department,EmailId:user.EmailId,status:user.status };
            }
            return item;
          });
          setJsonAdmin(updatedDataList)
          const userTemp={
            id:"",
            name:"",
            EmailId:"",
            department:"",
            password:"",
            role:"",
            status:""
        }
        setUser(userTemp);
        setShow(false)
    }
    // const onClickDeleteUsers=(id:any)=>
    // {
    //     const updatedDataList = JsonAdmin.map((item:any) => {
    //         if (item.id === id) {
    //           return { ...item,status:"Deleted" };
    //         }
    //         return item;
    //       });
    //       setJsonAdmin(updatedDataList)
    // }

    const onClickDeleteUsers = (id: any) => {
      const updatedDataList = JsonAdmin.map((item: { id: any; }) => {
        if (item.id === id) {
          // Create a copy of the item and update the status
          const updatedItem = { ...item, status: "Deleted" };
          return updatedItem;
        }
        return item;
      });
    
      // Update the state with the copied array
      setJsonAdmin(updatedDataList);
    };
    
    const handleLogout = () => {
       
        navigate('/');
      };
      
      const onClickEdit=(id:any)=>
      {
          JsonAdmin.map((n:any)=>
          {
              if(n.id===id)
              {
                  setUser(n)
              }
          })
          setIsEdit(true)
          setShow(true)
      }
    return(<>
   <div className='dashboard-container'>
        
    {props.role==='User'?
        <div className='dashboard-navbar'>
        <span>User-DashBoard</span>
        </div>
        :props.role==='Admin'?
        <div className='dashboard-navbar'>
        <span>Admin-DashBoard</span>
        </div>:''}
    <div className='dashboard-main'>
    {props.role==='Admin'?
    <div className='dashboard-admin-table-container'>
    <div className='dashboard-table-heading'>
        <span></span>
      <span><h1>Table value indicating Employee Details</h1></span>
        <span><button className='btn' onClick={()=>setShow(true)}>Create</button></span>
       <span>
        <img src={avatorimage} className="img" alt="avator" width={30} />
                  <button className='btn-Ad-logout' onClick={handleLogout}>Logout</button>
                </span>
    </div>
    <table className="table">
<thead>
<tr>
  <th scope="col">Name</th>
  <th scope="col">Email ID</th>
  <th scope="col">Department</th>
  <th scope='col'>Role</th>
  <th scope="col">Status</th>
  <th scope='col'>Edit</th>
  <th scope='col'>Delete</th>
</tr>
</thead>
<tbody>
{JsonAdmin.map((n:any)=>{
    return(
    <tr>
    <td>{n.name}</td>
    <td>{n.EmailId}</td>
    <td>{n.department}</td>
    <td>{n.role}</td>
    <td>{n.status}</td>
    {n.role==='Admin'?<></>
    :<>
    <td><button className='btn' onClick={()=>onClickEdit(n.id)}>Edit user</button></td>
    <td><button className='btn' onClick={()=>onClickDeleteUsers(n.id)}>Delete user</button></td>
    </>}
    </tr>)
})}
</tbody>
</table>
<Modal show={show}>
  <div className="custom-modal">
    <button className="close-btn" onClick={() => { setShow(false); setIsEdit(false); }}>
      X
    </button>
    <div className="modal-content">
      <div className="modal-header">
        <h4>{isEdit ? 'Edit User' : 'Add User'}</h4>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label>ID</label>
          <FormControl
            type="text"
            value={user.id}
            placeholder="ID"
            onChange={(e) => setUser({ ...user, id: e.target.value })}
            disabled={isEdit ? true : false}
          ></FormControl>
        </div>
        <div className="form-group">
          <label>Name</label>
          <FormControl
            type="text"
            value={user.name}
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          ></FormControl>
        </div>
        <div className="form-group">
          <label>Department</label>
          <FormControl
            type="text"
            value={user.department}
            placeholder="Department"
            onChange={(e) => setUser({ ...user, department: e.target.value })}
          ></FormControl>
        </div>
        <div className="form-group">
          <label>Email ID</label>
          <FormControl
            type="text"
            value={user.EmailId}
            placeholder="Email ID"
            onChange={(e) => setUser({ ...user, EmailId: e.target.value })}
          ></FormControl>
        </div>
        <div className="form-group">
          <label>Password</label>
          <FormControl
            type="password"
            value={user.password}
            placeholder="Password"
            disabled={isEdit ? true : false}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          ></FormControl>
        </div>
        <div className="form-group">
          <label>Role</label>
          <FormControl
            type="text"
            value={user.role}
            placeholder="Role"
            disabled={isEdit ? true : false}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          ></FormControl>
        </div>
        <div className="form-group">
          <label>Status</label>
          <FormControl
            type="text"
            value={user.status}
            placeholder="Status"
            onChange={(e) => setUser({ ...user, status: e.target.value })}
          ></FormControl>
        </div>
      </div>
      <div className="modal-footer">
        <span>
          {isEdit ? (
            <button className="btn btn-primary" onClick={() => onClickEditUsers(user.id)}>
              Edit
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => onClickAddUsers()}>
              Add
            </button>
          )}
        </span>
      </div>
    </div>
  </div>
</Modal>
</div>:
    props.role==='User'?
    <>
     <img src={avatorimage2} className="img-user" alt="avator" width={30} />
     <button className='btn-user-logout' onClick={handleLogout}>Logout</button>
    <EndUserDashBoard data={props.data}/>
    </>
    :''
    }
    </div>
</div>
    </>)
}
