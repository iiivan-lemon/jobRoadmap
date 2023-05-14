import React, {useEffect, useRef, useState} from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadingProfile} from "../../models/user/userActions";
import {deleteError, loginOrLogout} from "../../models/auth/authActions";
import './reg.css'
import styleSearch from "../../components/search/Search.module.css";
import styles from './../../pages/newUserPage/NewUserPage.module.css'
import {useAppSelector} from "../../app/hooks";
const ValidatedRegForm = () => {
    const refLinkCon = useRef();
    const refRegCon = useRef();
    const dispatch = useDispatch();
    const {isAuth} = useAppSelector(x => x?.auth)
    const {isError}= useAppSelector(state => state.auth)
    const [link, setLink] = useState('');
    const regLink = () => {
        window.location.href = `${link}`;
    }
    const history = useNavigate()
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        document.getElementById('header')?.classList.remove('headerFix')
        if (isAuth) history('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={async (values, {setSubmitting}) => {
                const res = await dispatch(loginOrLogout(true, values));
                if (res !== undefined) {
                    setLink(res)
                    refLinkCon.current.classList.remove('conf-container-hidden');
                    refRegCon.current.classList.add('conf-container-hidden');
                }
                setSubmitting(false);
                // setTimeout(() => {
                //     console.log("Logging in", values);
                //  setSubmitting(false);
                // }, 500);
            }}
            //********Handling validation messages yourself*******/
            // validate={values => {
            //   let errors = {};
            //   if (!values.email) {
            //     errors.email = "Required";
            //   } else if (!EmailValidator.validate(values.email)) {
            //     errors.email = "Invalid email address";
            //   }

            //   const passwordRegex = /(?=.*[0-9])/;
            //   if (!values.password) {
            //     errors.password = "Required";
            //   } else if (values.password.length < 8) {
            //     errors.password = "Password must be 8 characters long.";
            //   } else if (!passwordRegex.test(values.password)) {
            //     errors.password = "Invalida password. Must contain one number";
            //   }

            //   return errors;
            // }}
            //********Using Yum for validation********/

            validationSchema={Yup.object().shape({
                username: Yup.string().required('обязательное поле').max(15, "максимум 15 символов"),
                email: Yup.string()
                    .email('введите корректный адрес почты')
                    .required("обязательное поле"),
                password: Yup.string()
                    .required("обязательное поле")
                    .min(8, "минимум 8 символов")
                    .matches(/(?=.*[0-9])/, "должна быть хотя бы одна цифра")
            })}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <div className='authPage'>
                        <div className={'authModal ' + styles.widjet}>
                            <h4 className="card-header">регистрация</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        autoComplete="off"
                                        name="username"
                                        type="text"
                                        placeholder="введите ваше имя"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={styleSearch.search ||  errors.username && touched.username && "error" }
                                    />
                                    {errors.username && touched.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        autoComplete="off"
                                        name="email"
                                        type="text"
                                        placeholder="введите эл. почту"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={styleSearch.search ||  errors.email && touched.email && "error" }
                                    />
                                    {errors.email && touched.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        autoComplete="off"
                                        name="password"
                                        type="password"
                                        placeholder="введите пароль"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={styleSearch.search || errors.password && touched.password && "error" }
                                    />
                                    {errors.password && touched.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <button className={styles.tag + ' submitBtn'} type="submit" disabled={isSubmitting}>
                                    зарегистрироваться
                                </button>
                            </form>
                            <span onClick={()=>{ history('/login'); dispatch(deleteError())}}> у вас есть аккаунт? войти</span>
                            <div style={{visibility: (isError) ? 'visible' : 'hidden'}} className="invalid-feedback back-feedback">{isError}</div>
                            { !isError && <div ref={refLinkCon} className='conf-container conf-container-hidden'>
                                <div className='log-h1' style={{textAlign: 'center'}}> Подтвердите почту </div>
                                <div className='conf-first'> Перейдите по этой <span onClick={regLink} className='conf-a'> сслыке!</span> для заверщения регистрации</div>
                            </div> }
                        </div></div>
                );
            }}
        </Formik>
    )};

export default ValidatedRegForm;
