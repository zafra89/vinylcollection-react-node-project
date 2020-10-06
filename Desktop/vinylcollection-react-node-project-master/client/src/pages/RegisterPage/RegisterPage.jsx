import React from 'react';
import './RegisterPage.scss';
import { useForm } from "react-hook-form";
import { API } from '../../shared/services/api';

export default function RegisterPage() {
    const { register, handleSubmit, errors } = useForm();
    /*const refForm =  useRef(null);*/
    //const [profImage, setProfImage] =  useState(null)

    const onSubmit = (data) => {
        console.log(data);
        /*const formData = new FormData(refForm.current);*/

        API.post('users', data/*formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }*/).then(res => {
            console.log(res)
            //localStorage.setItem('token', res.data.token);
            //window.location.href = "/register-contact";
        })
    };

    return (
        <div>
            <form /*action="/users" method="post" encType="multipart/form-data"*/
                  onSubmit={handleSubmit(onSubmit)} className="" /*ref={refForm}*/>
                {/*<label htmlFor="profileImage" >
                    <div className="">
                        <img className="" src={profImage} alt=""/>
                    </div>
                    <input type="file" className=""  name="profileImage" id="file" alt=""  ref={register}
                           onChange={(e) => setProfImage(URL.createObjectURL(e.target.files[0]))} hidden />
                    <label htmlFor="file" className="">Upload a profile image</label>
                </label>*/}
                <label htmlFor="fullName">
                    <input type="text" className="" name="fullName" id="fullName" placeholder="Full Name"
                           ref={register ({ required: true })}/>
                    {errors.fullName && <span className="">Full name is required</span>}
                </label>
                <label htmlFor="userName">
                    <input type="text" className="" name="userName" id="userName" placeholder="Username"
                           ref={register ({ required: true })}/>
                    {errors.userName && <span className="">Username is required</span>}
                </label>
                <label htmlFor="email">
                    <input type="text" className="" name="email" id="email" placeholder="Email"
                           ref={register ({ required: true })}/>
                    {errors.email && <span className="">Email is required</span>}
                </label>
                <label htmlFor="password">
                    <input type="password" className="" name="password" id="password" placeholder="Password"
                           ref={register({ required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/})}/>
                    {errors.password && <span className="">
                        Password must be 8-16 characters and must contains (uppercase and lowercase) letters and numbers
                    </span>}
                </label>
                <button type="submit" className="">Submit</button>
            </form>
        </div>
    )
}
