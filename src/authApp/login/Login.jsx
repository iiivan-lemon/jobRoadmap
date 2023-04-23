/* eslint-disable */
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {authActions, userActions} from '../_store';
import styles from './../../pages/newUserPage/NewUserPage.module.css'
import  './../styles/auth.css'
import {loadingProfile} from "../../models/user/userActions";
import {loginOrLogout} from "../../models/auth/authActions";
import styleSearch from "../../components/search/Search.module.css";


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
    useEffect(() => {
        dispatch(loadingProfile())
            .then((res) => {
                if (res === true) {
                    history('/favorites');
                }

                if (res === 500) {
                }
            });
    }, [])
    // form validation rulesв
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('введите эл. почту'),
        password: Yup.string().required('введите пароль')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit({email, password}) {
        const res = await dispatch(loginOrLogout(true, {email, password}));

        if (res === true) {
            nav('/favorite');
        }
    }

    return (
        <div className='authPage'>
            <div className='authModal'>
                <h4 className="card-header">Вход</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input placeholder='электронная почта' name="email" type="text" {...register('email')} className={styleSearch.search + ` ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <input placeholder='пароль' name="password" type="password" {...register('password')} className={styleSearch.search + ` ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={isSubmitting} className={styles.tag + ' submitBtn'}>
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Войти
                        </button>
                        {authError &&
                            <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                        }
                    </form>
                </div>
                <span onClick={()=>{ history('/signup')}}>зарегистрироваться</span>
            </div>
        </div>
    )
}
