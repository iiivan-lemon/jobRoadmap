import styleSearch from "../../components/search/Search.module.css";
import styles from "../../pages/newUserPage/NewUserPage.module.css";
import React, {useEffect} from "react";
import {ValidatedProfileForm} from "./formikProfile";
import {IconButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useAppSelector} from "../../app/hooks";
import {editAvatar, editUserData} from "../../models/user/userActions";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

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

export const ProfileUser = () => {
    const {isAuth} = useAppSelector(x => x?.auth)
    const classes = useStyles();
    const history = useNavigate()
    const dispatch = useDispatch();
    const { user } = useAppSelector(state => state)
    const {isError}= useAppSelector(state => state.auth)
    useEffect(() => {

        document.body.style.overflow = 'hidden'
        document.getElementById('header')?.classList.remove('headerFix')


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (!isAuth) history('/')
    },[isAuth])
    const [avatar, setAvatar] = React.useState(user.avatar)
    const subImage = (e) => {
        setAvatar( e.target.files[0])
    }

    const submit =  async (values) => {
        if (values.password) {
            const res = await dispatch(editUserData({password: values.password}));
        }
        if (avatar !== user.avatar) {
            const formData = new FormData()
            formData.append('file', avatar)
            const res = await dispatch(editAvatar({file: formData.get('file')}));
        }
    }

    return (
        <div className='authPage'>
            <div style={{ width: '100vw', bottom: '0', position: 'absolute', left: '0' }}>
                <svg style={{ width: '100%', height: 'fit-content', display: 'block' }} id="visual" viewBox="0 0 900 450" width="900" height="450" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M0 155L18.8 152.8C37.7 150.7 75.3 146.3 112.8 141.8C150.3 137.3 187.7 132.7 225.2 144.2C262.7 155.7 300.3 183.3 337.8 192.2C375.3 201 412.7 191 450.2 185.7C487.7 180.3 525.3 179.7 562.8 180C600.3 180.3 637.7 181.7 675.2 184.3C712.7 187 750.3 191 787.8 187.3C825.3 183.7 862.7 172.3 881.3 166.7L900 161L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#2c264e"></path><path d="M0 173L18.8 182C37.7 191 75.3 209 112.8 222.8C150.3 236.7 187.7 246.3 225.2 248.2C262.7 250 300.3 244 337.8 232.3C375.3 220.7 412.7 203.3 450.2 205.3C487.7 207.3 525.3 228.7 562.8 235.2C600.3 241.7 637.7 233.3 675.2 231.5C712.7 229.7 750.3 234.3 787.8 238.3C825.3 242.3 862.7 245.7 881.3 247.3L900 249L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#292443"></path><path d="M0 289L18.8 285.5C37.7 282 75.3 275 112.8 275.5C150.3 276 187.7 284 225.2 277.7C262.7 271.3 300.3 250.7 337.8 248.3C375.3 246 412.7 262 450.2 262.7C487.7 263.3 525.3 248.7 562.8 251.2C600.3 253.7 637.7 273.3 675.2 280.2C712.7 287 750.3 281 787.8 269.8C825.3 258.7 862.7 242.3 881.3 234.2L900 226L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#272239"></path><path d="M0 334L18.8 332.8C37.7 331.7 75.3 329.3 112.8 323.5C150.3 317.7 187.7 308.3 225.2 299C262.7 289.7 300.3 280.3 337.8 276.7C375.3 273 412.7 275 450.2 285.8C487.7 296.7 525.3 316.3 562.8 316.8C600.3 317.3 637.7 298.7 675.2 289.7C712.7 280.7 750.3 281.3 787.8 289C825.3 296.7 862.7 311.3 881.3 318.7L900 326L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#23202f"></path><path d="M0 336L18.8 337.7C37.7 339.3 75.3 342.7 112.8 347.5C150.3 352.3 187.7 358.7 225.2 354.8C262.7 351 300.3 337 337.8 333.5C375.3 330 412.7 337 450.2 342.7C487.7 348.3 525.3 352.7 562.8 353.7C600.3 354.7 637.7 352.3 675.2 352.7C712.7 353 750.3 356 787.8 351.5C825.3 347 862.7 335 881.3 329L900 323L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#1f1d25"></path><path d="M0 387L18.8 388C37.7 389 75.3 391 112.8 394.8C150.3 398.7 187.7 404.3 225.2 401.2C262.7 398 300.3 386 337.8 381.8C375.3 377.7 412.7 381.3 450.2 385.8C487.7 390.3 525.3 395.7 562.8 399.2C600.3 402.7 637.7 404.3 675.2 403.8C712.7 403.3 750.3 400.7 787.8 396.7C825.3 392.7 862.7 387.3 881.3 384.7L900 382L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#1b1b1b"></path></svg>
            </div>
            <div className='authModal'>
                <h4 className="card-header">Профиль</h4>
                <div className="card-body">
                    <div className={classes.root}>
                        <input accept="image/*" className={classes.input} onChange={subImage} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <Avatar alt="https://www.w3schools.com/howto/img_avatar.png" src={(typeof avatar === 'string') ? avatar : URL.createObjectURL(avatar)} className={classes.large} />
                            </IconButton>
                        </label>
                    </div>
                    <ValidatedProfileForm submit={submit} />
                    <div style={{visibility: (isError) ? 'visible' : 'hidden'}} className="invalid-feedback back-feedback">{isError}</div>
                </div>
            </div>
        </div>
    )
}