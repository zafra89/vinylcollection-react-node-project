import React from 'react';
import './RegisterPage.scss';
import { useForm } from "react-hook-form";
import { API } from '../../shared/services/api';

export default function RegisterPage() {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        API.post('users', data).then(res => {
            console.log(res)
            window.location.href = "/";
        })
    };

    return (
        <div className="c-register">
            <form onSubmit={handleSubmit(onSubmit)} className="c-register__registerForm">
                <label htmlFor="fullName">
                    <input type="text" className="c-register__registerForm__input" name="fullName" id="fullName" 
                    placeholder="Full Name" ref={register ({ required: true })}/>
                    {errors.fullName && <span className="">Full name is required</span>}
                </label>
                <label htmlFor="userName">
                    <input type="text" className="c-register__registerForm__input" name="userName" id="userName" placeholder="Username"
                           ref={register ({ required: true })}/>
                    {errors.userName && <span className="">Username is required</span>}
                </label>
                <label htmlFor="email">
                    <input type="text" className="c-register__registerForm__input" name="email" id="email" placeholder="Email"
                           ref={register ({ required: true })}/>
                    {errors.email && <span className="">Email is required</span>}
                </label>
                <label htmlFor="password">
                    <input type="password" className="c-register__registerForm__input" name="password" id="password" 
                    placeholder="Password" ref={register({ required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/})}/>
                    {errors.password && <span className="">
                        Password must be 8-16 characters and must contains (uppercase and lowercase) letters and numbers
                    </span>}
                </label>
                <button type="submit" className="c-register__registerForm__submit-btn">Submit</button>
            </form>
        </div>
    )
}
