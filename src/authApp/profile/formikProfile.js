/* eslint-disable */
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {authActions, userActions} from '../_store';
import styles from '../../pages/newUserPage/NewUserPage.module.sass'
import  '../styles/auth.sass'
import {editAvatar, editUserData, loadingProfile} from "../../models/user/userActions";
import {loginOrLogout} from "../../models/auth/authActions";
import styleSearch from "../../components/search/Search.module.sass";
import {useAppSelector} from "../../app/hooks";
import {Formik} from "formik";
import Avatar from '@mui/material/Avatar';
import {IconButton} from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import stylesUser from './profileUser.module.css'
import stylesTag from "../../components/Tag/Tag.module.sass";

export const ValidatedProfileForm = ({submit}) =>  {
    const { user } = useAppSelector(state => state)






    useEffect(() => {

    }, [])


    return (

        <Formik
            initialValues={{ password: "", passwordConfirm: "" }}
            onSubmit={async (values, {setSubmitting}) => {


                setSubmitting(false);
                submit(values)
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
                password: Yup.string()
                    .min(8, "минимум 8 символов")
                    .matches(/(?=.*[0-9])/, "должна быть хотя бы одна цифра"),
                passwordConfirm: Yup.string().label('confirm password').oneOf([Yup.ref('password'), null], 'пароли не совпадают'),
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
                    <>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <span className={stylesUser.emailData}>ваша эл. почта:  <>{user.email}</></span>
                                    <input
                                        autoComplete="off"
                                        name="password"
                                        type="password"
                                        placeholder="введите новый пароль"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={stylesUser.inputProfile + ' ' + styleSearch.search || errors.password && touched.password && "error" }
                                    />
                                    {errors.password && touched.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        autoComplete="off"
                                        name="passwordConfirm"
                                        type="password"
                                        placeholder="повторите пароль"
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={stylesUser.inputProfile + ' ' +  styleSearch.search || errors.passwordConfirm && touched.passwordConfirm && "error" }
                                    />
                                    {errors.passwordConfirm && touched.passwordConfirm && (
                                        <div className="invalid-feedback">{errors.passwordConfirm}</div>
                                    )}
                                </div>
                                <button className={stylesTag.tag + ' submitBtn'} type="submit" disabled={isSubmitting}>
                                    Сохранить
                                </button>
                            </form>
                    </>
                        );
            }}
        </Formik>)
}
