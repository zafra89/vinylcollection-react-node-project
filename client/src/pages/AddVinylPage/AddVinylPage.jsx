import React from 'react';
import {useForm} from "react-hook-form";
import { API } from '../../shared/services/api';
import './AddVinylPage.scss';

export default function AddVinylPage() {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        API.post('vinyls', data).then(res => {
            console.log(res)
            window.location.href = "/user-menu";
        })
    };

    return (
        <div className="c-addvinyl">
            <form onSubmit={handleSubmit(onSubmit)} className="c-addvinyl__registerForm">
                <label htmlFor="album">
                    <input type="text" className="c-addvinyl__registerForm__input" name="album" id="album"
                           placeholder="Album name" ref={register ({ required: true })}/>
                    {errors.fullName && <span className="">Album name is required</span>}
                </label>
                <label htmlFor="artist">
                    <input type="text" className="c-addvinyl__registerForm__input" name="artist" id="artist" placeholder="Artist"
                           ref={register ({ required: true })}/>
                    {errors.userName && <span className="">Artist is required</span>}
                </label>
                <label htmlFor="year">
                    <input type="text" className="c-addvinyl__registerForm__input" name="year" id="year" placeholder="Year of release"
                           ref={register ({ required: true })}/>
                    {errors.email && <span className="">Year is required</span>}
                </label>
                <label htmlFor="genre">
                    <input type="text" className="c-addvinyl__registerForm__input" name="genre" id="genre"
                           placeholder="Genre" ref={register({ required: true })}/>
                    {errors.password && <span className="">
                        Genre is required</span>}
                </label>
                <label htmlFor="cover">
                    <input type="text" className="c-addvinyl__registerForm__input" name="cover" id="cover"
                           placeholder="Cover url" ref={register({ required: true })}/>
                    {errors.cover && <span className="">
                        A cover url is required</span>}
                </label>
                <button type="submit" className="c-addvinyl__registerForm__submit_btn">Submit</button>
            </form>
        </div>
    )
}
