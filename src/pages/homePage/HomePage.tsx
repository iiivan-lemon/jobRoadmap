import React, {FC, useState} from "react";
import styles from "../../features/header/Header.module.css";
import Search from "../../features/search/Search";
import {ReactComponent} from "*.svg";
import Header from "../../features/header/Header";
import GraphRoadMap from "../../features/graph/Graph";
import axios from "axios";

const HomePage: FC = () => {

    const [data, changeData] = useState([{"name": "python", "distance": 1, "professionalism": 0},{"name": "sqlite", "distance": 1, "professionalism": 0.5},{"name": "django", "distance": 0.6, "professionalism": 0.4},{"name": "selenium", "distance": 0.8, "professionalism": 0.5},{"name": "docker", "distance": 0.2, "professionalism": 0.8},{"name": "c++", "distance": 0.1, "professionalism": 1}])

    function checkStatus(status: number): string {
        switch (Math.round(status / 100)) {
            case 1: {
                return "Information";
            }
            case 2: {
                return "Success";
            }
            case 3: {
                return "Redirect";
            }
            case 4: {
                return "Client Error";
            }
            case 5: {
                return "Server Error";
            }
            default: {
                return '';
            }
        }
    }

    function fetchUser(inputData: string) {
        axios.get('api/v1/technologies?search_text=' + inputData)
            .then((response) => {
                const statusInfo = checkStatus(response.status);
                if (
                    statusInfo === "Client Error" ||
                    statusInfo === "Server Error" ||
                    statusInfo === "Undefined"
                ) {
                    console.error(statusInfo);
                } else {
                    changeData(response?.data?.technologies);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function change(inputData: string) {
        if (inputData.includes('python')) {
            fetchUser(inputData)
            return;
        }

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
        const arr = [{"name": "python", "distance": 1, "professionalism": 0},{"name": "sqlite", "distance": 1, "professionalism": 0.5},{"name": "django", "distance": 0.6, "professionalism": 0.4},{"name": "selenium", "distance": 0.8, "professionalism": 0.5},{"name": "docker", "distance": 0.2, "professionalism": 0.8},{"name": "c++", "distance": 0.1, "professionalism": 1}]

        changeData(arr)
    }


    return (
        <React.Fragment><Header changeData={change}/><GraphRoadMap data={data}/></React.Fragment>
    )
}

export default HomePage