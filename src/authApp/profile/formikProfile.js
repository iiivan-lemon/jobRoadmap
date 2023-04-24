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
import {editAvatar, editUserData, loadingProfile} from "../../models/user/userActions";
import {loginOrLogout} from "../../models/auth/authActions";
import styleSearch from "../../components/search/Search.module.css";
import {useAppSelector} from "../../app/hooks";
import {Formik} from "formik";
import Avatar from '@mui/material/Avatar';
import {IconButton} from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import stylesUser from './profileUser.module.css'
const useStyles = makeStyles((theme) => ({
    root: {
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: "none",
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export const ValidatedProfileForm = () =>  {
    const { csrf } = useAppSelector(state => state.user)
    const { photo } = useAppSelector(state => state.user)
    const classes = useStyles();
    const history = useNavigate()
    const dispatch = useDispatch();
    const authUser = useSelector(x => x?.auth?.user);
    const {isError}= useAppSelector(state => state.auth)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        document.getElementById('header')?.classList.remove('headerFix')
        // if (!authUser) history('/login');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {

    }, [])
    const [avatar, setAvatar] = React.useState('')
    const subImage = (e) => {
            setAvatar(e.target.files[0])
    }

    return (

        <Formik
            initialValues={{ password: "", passwordConfirm: "" }}
            onSubmit={async (values, {setSubmitting}) => {
                if( photo !== avatar) {

                    const formData = new FormData()
                    formData.append('file', avatar)
                    const res = await dispatch(editAvatar({file: formData.get('file')}));
                }
                if (values.password) {
                    const res = await dispatch(editUserData({password: values.password}));
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
                                <div className={classes.root}>
                                    <input accept="image/*" className={classes.input} onChange={subImage} id="icon-button-file" type="file" />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <Avatar alt="https://www.w3schools.com/howto/img_avatar.png" src={avatar && URL.createObjectURL(avatar)} className={classes.large} />
                                        </IconButton>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <span className={stylesUser.emailData}>ваша эл. почта:  <>email@ya.ru</></span>
                                    <input
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
                                <button className={styles.tag + ' submitBtn'} type="submit" disabled={isSubmitting}>
                                    Сохранить
                                </button>
                            </form>
                            <div style={{visibility: (isError) ? 'visible' : 'hidden'}} className="invalid-feedback back-feedback">{isError}</div>
                    </>
                        );
            }}
        </Formik>)
}
