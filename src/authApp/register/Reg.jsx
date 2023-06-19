/* eslint-disable */
import {useEffect, useRef, useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '../_helpers';
import {authActions, userActions} from '../_store';
import {useNavigate} from "react-router-dom";
import {loadingProfile, registration} from "../../models/user/userActions";
import {loginOrLogout} from "../../models/auth/authActions";
import './reg.css'
import styles from "../../pages/newUserPage/NewUserPage.module.sass";
import styleSearch from "../../components/search/Search.module.sass";
// export { Reg };

export const Reg = () => {
    const refLinkCon = useRef();
    const refRegCon = useRef();
    const dispatch = useDispatch();
    const authUser = useSelector(x => x?.auth?.user);
    const authError = useSelector(x => x?.auth?.error);


    const [link, setLink] = useState('');
    const regLink = () => {
        window.location.href = `${link}`;
    }
    const history = useNavigate()
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        document.getElementById('header')?.classList.remove('headerFix')
        // redirect to home if already logged in
        if (authUser) history('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // form validation rules
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('введите имя'),
        email: Yup.string().required('введите эл. почту'),
        password: Yup.string().required('введите пароль')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;
    useEffect(() => {
        dispatch(loadingProfile())
            .then((res) => {
                if (res === true) {
                    history('/');
                }

                if (res === 500) {
                }
            });
    }, [])
    async function onSubmit({username,email, password}) {
        const res = await dispatch(loginOrLogout(true, {username,email, password}));
        if (res !== undefined) {
            setLink(res)
            refLinkCon.current.classList.remove('conf-container-hidden');
            refRegCon.current.classList.add('conf-container-hidden');
        }
    }

    return (
        <div className='authPage'>
            <div className="authModal">
                <h4 className="card-header">Регистрация</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input placeholder='имя' className={styleSearch.search + ` ${errors.username ? 'is-invalid' : ''}`} name="username" type="username" {...register('username')}  />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <input placeholder='электронная почта' className={styleSearch.search + ` ${errors.email ? 'is-invalid' : ''}`} name="email" type="text" {...register('email')}  />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <input placeholder='пароль' className={styleSearch.search +  ` ${errors.password ? 'is-invalid' : ''}`} name="password" type="password" {...register('password')}  />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={isSubmitting} className={styles.tag + ' submitBtn'}>
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            зарегистрироваться
                        </button>
                        {authError &&
                            <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                        }
                    </form>
                </div>
                <span onClick={()=>{ history('/login')}}> у вас есть аккаунт? Войти</span>
                <div ref={refLinkCon} className='conf-container conf-container-hidden'>
                    <div className='log-h1' style={{textAlign: 'center'}}> Подтвердите почту </div>
                    <div className='conf-first'> Перейдите по этой <span onClick={regLink} className='conf-a'> сслыке!</span> для заверщения регистрации</div>
                </div>
            </div>
        </div>
    )
}
