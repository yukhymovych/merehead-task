import React from 'react';



const User = (props) => {
   const removeUser = () => {
      props.removeUser(props.userInfo.id);
   }

   const editUser = () => {
      props.editUser(props.userInfo);
   }

   return (
      <div className="user">
         <div className="user__name">{props.userInfo.name}</div>
         <div className="user__surname">{props.userInfo.surname}</div>
         <div className="user__desc">{props.userInfo.desc}</div>
         <button className="user__edit" onClick={editUser}>Edit</button>
         <button className="user__remove" onClick={removeUser}>Remove</button>
         <br/>
      </div>
   );
}

export default User;