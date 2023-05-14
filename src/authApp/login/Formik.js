import React, {useEffect} from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadingProfile} from "../../models/user/userActions";
import {deleteError, loginOrLogout} from "../../models/auth/authActions";
import  './../styles/auth.css'
import styleSearch from "../../components/search/Search.module.css";
import styles from './../../pages/newUserPage/NewUserPage.module.css'
import {useAppSelector} from "../../app/hooks";
const ValidatedLoginForm = () => {
    const history = useNavigate()
    const dispatch = useDispatch();
    const {isAuth} = useAppSelector(x => x?.auth)
    const {isError}= useAppSelector(state => state?.auth)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        document.getElementById('header')?.classList.remove('headerFix')
        // redirect to home if already logged in
        if (isAuth) history('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        // dispatch(loadingProfile())
        //     .then((res) => {
        //         if (res === true) {
        //             history('/favorites');
        //         }
        //         if (res === 500) {
        //         }
        //     });
    }, [])
    return (

    <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, {setSubmitting}) => {
            const res = await dispatch(loginOrLogout(true, values));
            if (res === true) {
                history('/favorites');
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
            email: Yup.string()
                .email('требуется корректный адрес')
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
                        <h4 className="card-header">вход</h4>
                <form onSubmit={handleSubmit}>
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
                        войти
                    </button>
                </form>
                        <span onClick={()=>{ history('/signup'); dispatch(deleteError()) }}>зарегистрироваться</span>
                            <div style={{visibility: (isError) ? 'visible' : 'hidden'}} className="invalid-feedback back-feedback">{isError}</div>

                    </div>
                </div>
            );
        }}
    </Formik>
)};

export default ValidatedLoginForm;
