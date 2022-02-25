import axios from 'axios';
import React from 'react'
import RegisterForm from '../components/RegisterForm'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {

  var navigate = useNavigate()

  var register = (value: any) =>{
    var promise = axios.post('http://api.training.div3.pgtest.co/api/v1/auth/register',{
      email: value.email,
      password: value.password,
      repeatPassword: value.confirm,
      name: value.fullname,
      gender: value.gender,
      region: value.National,
      state: value.City
    });
    promise.then((result) =>{
      Swal.fire(
        'Register success !',
        '',
        'success'
      )
      navigate('/login');
    })
    promise.catch((err) => {
      Swal.fire(
        'Register Failed !',
        '',
        'error'
      )
    })
  }

  return (
    <RegisterForm onRegister = { register }/>
  )
}
