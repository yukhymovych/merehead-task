import './App.css';
import React, { useEffect } from 'react';
import axios from "axios";
import Form from './components/form/Form';
import Users from './components/users/Users';
import { setUsers } from './store/users/actions';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";



const App = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchData = async () => {
         const result = await axios('http://77.120.241.80:8811/api/users',);
         dispatch(setUsers(result.data));
      };

      fetchData();
   });

   return (
      <div className="App">
         <Router>
            <Form />
            <Users />
         </Router>
      </div>
   );
}

export default App;
