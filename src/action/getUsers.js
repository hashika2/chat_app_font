import axios from 'axios';
import { API, Bearer, config } from '../shared/constant';
import  LOGGED_USER  from './types'

export const getUsers = (authToken)=> async dispatch => {
    try{
        const config = {
            headers: {  
              'Content-Type': 'application/json',
              "Authorization" : `${Bearer} ${authToken}`
            }
        }
        const res = await axios.get(`${API}/api/user/getUsers`,config);
        console.log(res)
        dispatch({
            type: LOGGED_USER,  
            payload: res.data
        })
    }catch(error){
        if(error){
            console.log("error "+error)
            // dispatch(setAlert(error,'danger'))
        }
        dispatch({
            type:"REGISTER_FAIL"
        })
    }
}