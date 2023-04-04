/* eslint-disable */
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {authActions, userActions} from '../_store';

import  './../styles/auth.css'


export { Login };

function Login() {
    const history = useNavigate()
    const dispatch = useDispatch();
    const authUser = useSelector(x => x?.auth?.user);
    const authError = useSelector(x => x?.auth?.error);
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        document.getElementById('header')?.classList.remove('headerFix')
        // redirect to home if already logged in
        if (authUser) history('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // form validation rules
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ email, password }) {
        dispatch(authActions.login({ email, password }))
            .then((res) => {
                
                if (res.payload === true) {
                    history('/favorites');
                }

                if (res.payload === 500) {
                    alert('ошибка на сервере', res.payload)
                }
            })
            .catch(e => console.log(111))
    }

    return (
        <div className='authPage'>
            <div className='authModal'>
                <h4 className="card-header">Вход</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={isSubmitting} className="submitBtn">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Войти
                        </button>
                        {authError &&
                            <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                        }
                    </form>
                </div>
                <span onClick={()=>{ history('/signup')}}> зарегистрироваться</span>
            </div>
        </div>
    )
}
