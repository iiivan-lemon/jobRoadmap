import React, { type FC } from 'react'
import styles from './ProfilePage.module.css'
import './../../App.css'
// import stylesTags from '../../features/headerOptions/HeaderOptions.module.css'
// import { Tag } from 'antd'
const ProfilePage: FC = () => {
  const tags = ['python developer', 'python developer123123', 'frontend developer', 'middle ML developer']
  function renderGraphBlock (tags: string[]): any[] {
    return tags.map((el, index) => <div className={styles.saveGraph} >{el}<svg width="59" height="78" viewBox="0 0 59 78" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.1264 5.98563L36.3898 1.69052L44.6532 5.98564L52.7463 10.3495L52.8204 18.9L52.7463 27.4505L44.6533 31.8143L36.3898 36.1095L28.1263 31.8143L20.0333 27.4505L19.9591 18.9L20.0333 10.3495L28.1264 5.98563Z" fill="#464646" stroke="white" stroke-width="3" stroke-linejoin="round"/>
        <g filter="url(#filter0_d_107_1915)">
            <path d="M10.9729 35.7329L15.87 33.1902L20.7672 35.7329L25.5235 38.295L25.5668 43.29L25.5235 48.285L20.7671 50.8471L15.87 53.3898L10.9729 50.8471L6.2165 48.285L6.17316 43.29L6.2165 38.295L10.9729 35.7329Z" fill="#464646" stroke="white" stroke-width="3" stroke-linejoin="round"/>
        </g>
        <g filter="url(#filter1_d_107_1915)">
            <path d="M26.962 55.3405L30.4498 53.5299L33.9377 55.3405L37.2974 57.1499L37.3279 60.6598L37.2974 64.1698L33.9377 65.9791L30.4498 67.7898L26.962 65.9791L23.6022 64.1698L23.5718 60.6598L23.6022 57.1499L26.962 55.3405Z" fill="#464646" stroke="white" stroke-width="3" stroke-linejoin="round"/>
        </g>
        <defs>
            <filter id="filter0_d_107_1915" x="-1" y="31.5" width="33.7402" height="31.5801" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_107_1915"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_107_1915" result="shape"/>
            </filter>
            <filter id="filter1_d_107_1915" x="16.8198" y="51.8398" width="27.2598" height="25.6401" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_107_1915"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_107_1915" result="shape"/>
            </filter>
        </defs>
    </svg>
    </div>)
  }

  return (
        <React.Fragment>
            <div className={styles.profile}>
                {renderGraphBlock(tags)}
            </div>
        </React.Fragment>
  )
}

export default ProfilePage
