import axios from "axios"

const getAllSeller = () => {
  return axios.get('http://localhost:5000/api/auth/getsellers')
}

const requestAppointment = (title, description, sellerId, username, aTime) => {
  return axios.post('http://localhost:5000/api/appointments/createappointment',
   {
    'title': title,
    'description': description,
    'sellerid': sellerId,
    'username': username,
    'atime': aTime
   })
}

const WebServices = {
    getAllSeller,
    requestAppointment
}

export default WebServices