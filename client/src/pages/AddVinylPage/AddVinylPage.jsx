import React from 'react';
import {useForm} from "react-hook-form";
import { API } from '../../shared/services/api';

export default function AddVinylPage() {
    const { register, handleSubmit, errors } = useForm();
    /*const refForm =  useRef(null);*/
    //const [profImage, setProfImage] =  useState(null)

    const onSubmit = (data) => {
        console.log(data);
        /*const formData = new FormData(refForm.current);*/

        API.post('vinyls', data/*formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }*/).then(res => {
            console.log(res)
            //localStorage.setItem('token', res.data.token);
            /*window.location.href = "/";*/
        })
    };

    return (
        <div className="c-addvinyl">
            <form /*action="/users" method="post" encType="multipart/form-data"*/
                onSubmit={handleSubmit(onSubmit)} className="c-register__registerForm" /*ref={refForm}*/>
                {/*<label htmlFor="profileImage" >
                    <div className="">
                        <img className="" src={profImage} alt=""/>
                    </div>
                    <input type="file" className=""  name="profileImage" id="file" alt=""  ref={register}
                           onChange={(e) => setProfImage(URL.createObjectURL(e.target.files[0]))} hidden />
                    <label htmlFor="file" className="">Upload a profile image</label>
                </label>*/}
                <label htmlFor="album">
                    <input type="text" className="" name="album" id="album"
                           placeholder="Album name" ref={register ({ required: true })}/>
                    {errors.fullName && <span className="">Full name is required</span>}
                </label>
                <label htmlFor="artist">
                    <input type="text" className="" name="artist" id="artist" placeholder="Artist"
                           ref={register ({ required: true })}/>
                    {errors.userName && <span className="">Username is required</span>}
                </label>
                <label htmlFor="year">
                    <input type="text" className="" name="year" id="year" placeholder="Year of release"
                           ref={register ({ required: true })}/>
                    {errors.email && <span className="">Email is required</span>}
                </label>
                <label htmlFor="genre">
                    <input type="text" className="" name="genre" id="genre"
                           placeholder="Genre" ref={register({ required: true })}/>
                    {errors.password && <span className="">
                        Password must be 8-16</span>}
                </label>
                <label htmlFor="cover">
                    <input type="text" className="" name="cover" id="cover"
                           placeholder="Cover url" ref={register({ required: true })}/>
                    {errors.password && <span className="">
                        Password must be 8-16</span>}
                </label>
                <button type="submit" className="">Submit</button>
            </form>
        </div>
    )
}
