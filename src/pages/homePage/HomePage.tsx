import React, {FC, useState} from "react";
import styles from "../../features/header/Header.module.css";
import Search from "../../features/search/Search";
import {ReactComponent} from "*.svg";
import Header from "../../features/header/Header";
import GraphRoadMap from "../../features/graph/Graph";
import axios from "axios";

const HomePage: FC = () => {

    const [data, changeData] = useState([{"name": "python", "distance": 0.8908776, "professionalism": 0.48552603}])

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
        axios.get('http://localhost:1323/api/v1/technologies?search_text=' + inputData)
            .then((response) => {
                const statusInfo = checkStatus(response.status);
                if (
                    statusInfo === "Client Error" ||
                    statusInfo === "Server Error" ||
                    statusInfo === "Undefined"
                ) {
                    console.error(statusInfo);
                } else {
                    console.log(response);
                    changeData(response.data)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function change(inputData: string) {
        fetchUser(inputData)
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
        const arr = [{"name": "python", "distance": 0.8908776, "professionalism": 0.48552603}, {
            "name": "and",
            "distance": 0.7515528,
            "professionalism": 0.6931818
        }, {"name": "of", "distance": 0.53171575, "professionalism": 0.57703626}, {
            "name": "the",
            "distance": 0.49719563,
            "professionalism": 0.604927
        }, {"name": "in", "distance": 0.4503464, "professionalism": 1}, {
            "name": "to",
            "distance": 0.38443333,
            "professionalism": 0.5927161
        }, {"name": "c", "distance": 0.36645964, "professionalism": 0.083333336}, {
            "name": "a",
            "distance": 0.35496965,
            "professionalism": 0.6230687
        }, {"name": "experience", "distance": 0.3187067, "professionalism": 1}, {
            "name": "with",
            "distance": 0.31408775,
            "professionalism": 1
        }, {"name": "it", "distance": 0.29660428, "professionalism": 0.37134722}, {
            "name": "for",
            "distance": 0.26789838,
            "professionalism": 1
        }, {"name": "sql", "distance": 0.2356032, "professionalism": 0.41917592}, {
            "name": "django",
            "distance": 0.21882994,
            "professionalism": 0.6357537
        }, {"name": "postgresql", "distance": 0.21688575, "professionalism": 0.65277684}, {
            "name": "docker",
            "distance": 0.21613818,
            "professionalism": 0.64386237
        }, {"name": "team", "distance": 0.21247113, "professionalism": 1}, {
            "name": "git",
            "distance": 0.20754175,
            "professionalism": 0.5155325
        }, {"name": "linux", "distance": 0.19055486, "professionalism": 0.46815398}, {
            "name": "we",
            "distance": 0.16859123,
            "professionalism": 1
        }, {"name": "development", "distance": 0.16628176, "professionalism": 1}, {
            "name": "api",
            "distance": 0.1657344,
            "professionalism": 0.64185727
        }, {"name": "or", "distance": 0.16397229, "professionalism": 1}, {
            "name": "is",
            "distance": 0.15704387,
            "professionalism": 1
        }, {"name": "are", "distance": 0.15011548, "professionalism": 1}, {
            "name": "ml",
            "distance": 0.15011548,
            "professionalism": 1
        }, {"name": "you", "distance": 0.147806, "professionalism": 1}, {
            "name": "fastapi",
            "distance": 0.14223798,
            "professionalism": 0.85553825
        }, {"name": "work", "distance": 0.12240185, "professionalism": 1}, {
            "name": "our",
            "distance": 0.11547344,
            "professionalism": 1
        }, {"name": "data", "distance": 0.11085451, "professionalism": 1}, {
            "name": "an",
            "distance": 0.11085451,
            "professionalism": 1
        }, {"name": "cloud", "distance": 0.10161663, "professionalism": 1}]

        changeData(arr)
    }


    return (
        <React.Fragment><Header changeData={change}/><GraphRoadMap data={data}/></React.Fragment>
    )
}

export default HomePage