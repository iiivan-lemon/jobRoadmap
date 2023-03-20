import React, {FC, useState} from "react";
import styles from "../../features/header/Header.module.css";
import Search from "../../features/search/Search";
import {ReactComponent} from "*.svg";
import Header from "../../features/header/Header";
import GraphRoadMap from "../../features/graph/Graph";

const HomePage: FC = () => {

    const [data, changeData] = useState([{ skill: '10', value: 10 }, { skill: '7', value: 7 }, {
        skill: '7',
        value: 7
    }, { skill: '7', value: 7 }, { skill: '4', value: 4 }])

    // function checkStatus(status: number):string {
    //     switch (Math.round(status / 100)) {
    //         case 1: {
    //             return "Information";
    //         }
    //         case 2: {
    //             return "Success";
    //         }
    //         case 3: {
    //             return "Redirect";
    //         }
    //         case 4: {
    //             return "Client Error";
    //         }
    //         case 5: {
    //             return "Server Error";
    //         }
    //         default: {
    //             return;
    //         }
    //     }
    // }

    function fetchUser () {
        // axios.get('https://api.hh.ru/vacancies?text=python&per_page=100&page=1&experience=noExperience')
        //     .then((response) => {
        //         const statusInfo = checkStatus(response.status);
        //         if (
        //             statusInfo === "Client Error" ||
        //             statusInfo === "Server Error" ||
        //             statusInfo === "Undefined"
        //         ) {
        //             console.err(statusInfo);
        //         }
        //         console.log("fetchUser", this.state.fetchUser);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    function change () {
        fetchUser()
        // changeData([
        //     {skill: 'python', value: 10},
        //     {skill: 'sql', value: 7},
        //     {skill: 'linux', value: 7},
        //     {skill: 'postgresql', value: 7},
        //     {skill: 'it', value: 4},
        //     {skill: 'git', value: 4},
        //     {skill: 'cicd', value: 4},
        //     {skill: 'data', value: 2},
        //     {skill: 'ml', value: 2},
        //     {skill: 'docker', value: 1}
        // ])
        const arr = [{ skill: 'golang', value: 6, grade: 2 },
            { skill: 'python', value: 1, grade: 0 },
            { skill: 'sql', value: 2, grade: 1 },
            { skill: 'docker', value: 2, grade: 1 },
            { skill: 'k8s', value: 4, grade: 2 },
            { skill: 'k8s88', value: 6, grade: 2 },
            { skill: 'sqlite', value: 1, grade: 0 }]

        changeData(arr)
    }

    return (
        <React.Fragment><Header changeData={change}/><GraphRoadMap data={data}/></React.Fragment>
    )
}

export default HomePage