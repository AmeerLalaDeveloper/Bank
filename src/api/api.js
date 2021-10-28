import axios from "axios";
const API="https://6177fd119c328300175f5cce.mockapi.io/users/";

export const getUsers = async () => {
    return await axios.get(API)
}
export const postUsers=async(user)=>{
    return await axios.post(API,user)
}

export const updateUser=async(id,obj)=>{
    return await axios.put(`${API}${id}`,obj)
}

export const getLocation=async(lat,lon)=>{
    return await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&${lon}&locality`)
}

export const getSingleUser=async(id)=>{
    return await axios.get(`${API}${id}`)
}


export const getBankTransitions=async(id)=>{
    return await axios.get(`${API}${id}/bankAccount`)
}

export const postTransaction=async (id,obj)=>{
    return await axios.post(`${API}${id}/bankAccount`,obj)
}
