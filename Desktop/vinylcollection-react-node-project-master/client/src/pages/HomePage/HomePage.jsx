import React from 'react';
import './HomePage.scss';
import vinylIcon from '../../shared/assets/images/vinyl-icon.png';
import {useForm} from "react-hook-form";
import {API} from "../../shared/services/api";

export default function HomePage() {

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

    return(
        <div className="c-homepage">
            <div className="c-homepage__logo">
                <img className="c-homepage__logo__img" src={vinylIcon} alt=""/>
            </div>
            <div className="c-homepage__title">
                <h1 className="c-homepage__title__text">
                    My vinyl collection
                </h1>
            </div>
            <div className="c-homepage__login">
                <form onSubmit={handleSubmit(onSubmit)} className="c-homepage__login__registerForm">
                    <label htmlFor="userName">
                        <input type="text" className="c-homepage__login__registerForm__input" name="userName" id="userName" placeholder="Username"
                               ref={register({ required: true/*, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ */})}/>
                        {errors.userName && <span className="">Username is required</span>}
                    </label>
                    <label htmlFor="password">
                        <input type="password" className="c-homepage__login__registerForm__input" name="password" id="password" placeholder="Password"
                               ref={register({ required: true/*, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/*/})}/>
                        {errors.password && <span className="">Password is required</span>}
                    </label>
                    <div>
                        <button type="submit" className="c-homepage__login__registerForm__submit-btn">LogIn</button>
                    </div>
                </form>
            </div>
            <div>
                <a href="/register" className="c-homepage__register">Register for free{/*<span className="pi-chevron-right"></span>*/}</a>
            </div>
        </div>
    )
}
