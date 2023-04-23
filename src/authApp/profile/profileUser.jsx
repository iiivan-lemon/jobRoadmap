import styleSearch from "../../components/search/Search.module.css";
import styles from "../../pages/newUserPage/NewUserPage.module.css";
import React from "react";
import {ValidatedProfileForm} from "./formikProfile";



export const ProfileUser = () => {

    const changePhoto = () => {

    }

    return (
        <div className='authPage'>
            <div className='authModal'>
                <h4 className="card-header">Профиль</h4>
                <div className="card-body">
                    <ValidatedProfileForm/>
                </div>
            </div>
        </div>
    )
}