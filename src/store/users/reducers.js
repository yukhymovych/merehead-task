import { GET_UPDATED_USERS } from './actions';

const defaultState = [];

export const usersReducer = (state = defaultState, action) => {
   if (action.type === GET_UPDATED_USERS) {
      return action.payload;
   }
   
   return state;
};