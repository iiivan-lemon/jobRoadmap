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
                </div>
            </div>
        </div>
    )
}