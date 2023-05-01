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
                    <div style={{ width: '100vw', bottom: '0', position: 'absolute', left: '0' }}>
                        <svg style={{ width: '100%', height: 'fit-content', display: 'block' }} id="visual" viewBox="0 0 900 450" width="900" height="450" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M0 155L18.8 152.8C37.7 150.7 75.3 146.3 112.8 141.8C150.3 137.3 187.7 132.7 225.2 144.2C262.7 155.7 300.3 183.3 337.8 192.2C375.3 201 412.7 191 450.2 185.7C487.7 180.3 525.3 179.7 562.8 180C600.3 180.3 637.7 181.7 675.2 184.3C712.7 187 750.3 191 787.8 187.3C825.3 183.7 862.7 172.3 881.3 166.7L900 161L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#2c264e"></path><path d="M0 173L18.8 182C37.7 191 75.3 209 112.8 222.8C150.3 236.7 187.7 246.3 225.2 248.2C262.7 250 300.3 244 337.8 232.3C375.3 220.7 412.7 203.3 450.2 205.3C487.7 207.3 525.3 228.7 562.8 235.2C600.3 241.7 637.7 233.3 675.2 231.5C712.7 229.7 750.3 234.3 787.8 238.3C825.3 242.3 862.7 245.7 881.3 247.3L900 249L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#292443"></path><path d="M0 289L18.8 285.5C37.7 282 75.3 275 112.8 275.5C150.3 276 187.7 284 225.2 277.7C262.7 271.3 300.3 250.7 337.8 248.3C375.3 246 412.7 262 450.2 262.7C487.7 263.3 525.3 248.7 562.8 251.2C600.3 253.7 637.7 273.3 675.2 280.2C712.7 287 750.3 281 787.8 269.8C825.3 258.7 862.7 242.3 881.3 234.2L900 226L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#272239"></path><path d="M0 334L18.8 332.8C37.7 331.7 75.3 329.3 112.8 323.5C150.3 317.7 187.7 308.3 225.2 299C262.7 289.7 300.3 280.3 337.8 276.7C375.3 273 412.7 275 450.2 285.8C487.7 296.7 525.3 316.3 562.8 316.8C600.3 317.3 637.7 298.7 675.2 289.7C712.7 280.7 750.3 281.3 787.8 289C825.3 296.7 862.7 311.3 881.3 318.7L900 326L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#23202f"></path><path d="M0 336L18.8 337.7C37.7 339.3 75.3 342.7 112.8 347.5C150.3 352.3 187.7 358.7 225.2 354.8C262.7 351 300.3 337 337.8 333.5C375.3 330 412.7 337 450.2 342.7C487.7 348.3 525.3 352.7 562.8 353.7C600.3 354.7 637.7 352.3 675.2 352.7C712.7 353 750.3 356 787.8 351.5C825.3 347 862.7 335 881.3 329L900 323L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#1f1d25"></path><path d="M0 387L18.8 388C37.7 389 75.3 391 112.8 394.8C150.3 398.7 187.7 404.3 225.2 401.2C262.7 398 300.3 386 337.8 381.8C375.3 377.7 412.7 381.3 450.2 385.8C487.7 390.3 525.3 395.7 562.8 399.2C600.3 402.7 637.7 404.3 675.2 403.8C712.7 403.3 750.3 400.7 787.8 396.7C825.3 392.7 862.7 387.3 881.3 384.7L900 382L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#1b1b1b"></path></svg>
                    </div>
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
