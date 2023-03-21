import React, {FC, useState} from "react";
import Search from "../../features/search/Search";
import {ReactComponent} from "*.svg";
import Header from "../../features/header/Header";
import GraphRoadMap from "../../features/graph/Graph";
import styles from './NewUserPage.module.css'
const HomePage: FC = () => {

    return (
        <React.Fragment><Header/><div className={styles.startBlock}><div className={styles.description}><span className={styles.title}>Job Roadmap</span><span className={styles.titleDescr}>Сервис который поможет вам изучить навыки, необходимые для подготовки по выбранной специальности</span></div></div></React.Fragment>
    )
}

export default HomePage