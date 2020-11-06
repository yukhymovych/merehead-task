import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import User from '../user/User';
import { setUsers } from '../../store/users/actions';
import { Link, useLocation } from "react-router-dom";



const Users = () => {
   const store = useSelector(store => store);
   const dispatch = useDispatch();

   const editForm = useRef();

   const location = useLocation();

   const [usersList, setUsersList] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [editFormData, setEditFormData] = useState({});

   useEffect(() => {
      setUsersList(store.users);
   });

   useEffect(() => {
      if(location.pathname[1])
         setCurrentPage(location.pathname[1]);
   }, [currentPage]);


   const pageNumbers = [];

   for(let i = 1; i <= Math.ceil(usersList.length / 5); i++) {
      pageNumbers.push(i);
   }

   const renderPageNumbers = pageNumbers.map(number => {
     return (
       <Link className="nav-link" to={`/${number}`} key={number} onClick={() => {setCurrentPage(number)}}>
         {number}
       </Link>
     );
   });


   const removeUser = (userId) => {
      let newUsersList = store.users.filter((item) => {
         if(item.id !== userId)
            return item;
      });

      dispatch(setUsers(newUsersList));

      async function makeDeleteRequest() {
         let res = await axios.delete(`http://77.120.241.80:8811/api/user/${userId}`);

         console.log(res.data);
      }
     
      makeDeleteRequest();
   }

   const editUser = (userData) => {
      setEditFormData({
         id: userData.id,
         name: userData.name,
         surname: userData.surname,
         desc: userData.desc,
         avatar: userData.avatar,
      });
   }

   const saveUser = () => {
      let newUsersList = store.users.map((item) => {
         if(item.id === editFormData.id){
            item = {
               id: editFormData.id,
               name: editForm.current.childNodes[0].value,
               surname: editForm.current.childNodes[1].value,
               desc: editForm.current.childNodes[2].value,
               avatar: editFormData.avatar,
            }
         }
         return item;
      });

      dispatch(setUsers(newUsersList));

      const newUserInfo = {
         id: editFormData.id,
         name: editForm.current.childNodes[0].value,
         surname: editForm.current.childNodes[1].value,
         desc: editForm.current.childNodes[2].value,
         avatar: null,
      }

      async function makePutRequest() {
         let res = await axios.put(`http://77.120.241.80:8811/api/user/${newUserInfo.id}`, newUserInfo);
      }
     
      makePutRequest();
   }

   const indexOfLastUser = currentPage * 5;
   const indexOfFirstUser = indexOfLastUser - 5;
   const currentUser = usersList.slice(indexOfFirstUser, indexOfLastUser);

   const renderUsers = currentUser.map((item) => {
     return (
         <User key={item.id} userInfo={item} removeUser={removeUser} editUser={editUser} />
      )
   });

   const handleInputChange = (e) => {
      setEditFormData({
         ...editFormData, 
         [e.target.name]: e.target.value
      });
   };
   

   
   return (
      <div>
         <div className="users">
            {renderUsers}
         </div>
         <div className="pagination">
            {renderPageNumbers}
         </div>
         <div className="form edit-form" ref={editForm}>
            <input type="text" name="name" placeholder="Name" value={editFormData.name} onChange={handleInputChange} />
            <input type="text" name="surname" placeholder="Surname" value={editFormData.surname} onChange={handleInputChange}  />
            <input type="text" name="desc" placeholder="Description" value={editFormData.desc} onChange={handleInputChange}  />
            <button onClick={saveUser}>Save</button>
         </div>
      </div>
   );
}

export default Users;