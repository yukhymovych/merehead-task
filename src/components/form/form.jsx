import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../../store/users/actions';
import axios from "axios";



const Form = () => {
   const store = useSelector(store => store);
   const dispatch = useDispatch();
   const formInfo = useRef();

   const addUser = () => {
      let newUsersList = [...store.users];

      const newUser = {
         id: newUsersList[newUsersList.length - 1].id + 1,
         name: formInfo.current.childNodes[0].value,
         surname: formInfo.current.childNodes[1].value,
         desc: formInfo.current.childNodes[2].value,
         avatar: null,
      }

      newUsersList.push(newUser);

      dispatch(setUsers(newUsersList));

      async function makePostRequest() {
         let res = await axios.post('http://77.120.241.80:8811/api/users', newUser);
     }
     
     makePostRequest();
   }

   return (
      <div className="form add-form" ref={formInfo}>
         <input type="text" name="name" placeholder="Name" />
         <input type="text" name="surname" placeholder="Surname" />
         <input type="text" name="description" placeholder="Description" />
         <button onClick={addUser}>Add user</button>
      </div>
   );
}

export default Form;