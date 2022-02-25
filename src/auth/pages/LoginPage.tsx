import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import Swal from 'sweetalert2'

export default function LoginPage() {

  var navigate = useNavigate()

  var login = (values:any)=>{
    var promise = axios.post('http://api.training.div3.pgtest.co/api/v1/auth/login',{
      email: values.email,
      password: values.password,
    })
    promise.then((results)=>{
      Swal.fire(
        'Login success !',
        '',
        'success'
      )
      localStorage.setItem('account', JSON.stringify(values));
      navigate('/home');
    })
    promise.catch((err) => {
      Swal.fire(
        'Login error !',
        '',
        'error'
      )
    })
  }

  return (
    <LoginForm onLogin={login}/>
  )
}
