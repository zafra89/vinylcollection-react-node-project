import React from 'react'
import './LoginPage.scss';
import { useForm } from "react-hook-form";
import { API } from '../../shared/services/api';

export default function LoginPage() {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        API.post('users/login', data).then(res => {
            localStorage.setItem('token', res.data.token);
            if (res.data.logged) {
                window.location.href = "/"
            }
        })
            .catch((error) => {
                alert('Incorrect LogIn.')
            })
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="c-registerForm">
                <label htmlFor="userName">
                    <input type="text" className="" name="userName" id="userName" placeholder="Username"
                           ref={register({ required: true/*, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ */})}/>
                           {errors.userName && <span className="">Username is required</span>}
                </label>
                <label htmlFor="password">
                    <input type="password" className="" name="password" id="password" placeholder="Password"
                           ref={register({ required: true/*, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/*/})}/>
                           {errors.password && <span className="">Password is required</span>}
                </label>
                <div>
                    <button type="submit" className="">LogIn</button>
                </div>
            </form>
        </div>
    )
}
