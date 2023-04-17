import React, { type FC } from 'react'
import styles from './NewUserPage.module.css'
import stylesTag from '../../components/Tag/Tag.module.css'
import './../../App.css'
import GradientGrade from '../../components/gradientGrade/GradientGrade'
import NodeFav from '../../components/nodeFav/nodeFav'
import { useNavigate } from 'react-router-dom'
// import styled from 'styled-components'
import { ReactComponent as NodeSvg } from '../../static/images/svg-hex.svg'
import pSBC from 'shade-blend-color'
const NewUserPage: FC = () => {
  React.useEffect(() => {
    document.body.style.overflow = 'auto'
    document.getElementById('header')?.classList.add('headerFix')
  }, [])
  const history = useNavigate()

  const openHeader = () => { (document.getElementById('search') as HTMLInputElement)?.focus(); (document.getElementById('searchJob') as HTMLInputElement)?.focus() }

  return (
      <React.Fragment>
          <div className={styles.startBlock}>
              <div className={styles.description}>
                  <span className={styles.title}>
                      Job Roadmap
                  </span>
                  <div className={styles.wrapper}>
                  <span
                      className={styles.titleDescr}
                  >
                      Cервис, который поможет вам узнать и изучить необходимые навыки для подготовки к собеседованиям по выбранной Вами профессии
                  </span>
                  <button type='button' className={styles.tag + ' ' + styles.newPageBtn} onClick={openHeader}>начать поиск!</button>
                  </div>
                  <svg className={styles.tasks} width="937" height="198" viewBox="0 0 937 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_b_149_3491)">
                          <rect width="936.39" height="184.419" rx="20" fill="#181818"/>
                          <rect x="0.5" y="0.5" width="935.39" height="183.419" rx="19.5" stroke="white"/>
                      </g>
                      <g clip-path="url(#clip0_149_3491)">
                          <path d="M413.53 120.04H420.8C421.702 120.038 422.567 119.68 423.204 119.042C423.842 118.405 424.2 117.54 424.201 116.639V109.368C424.2 108.466 423.842 107.602 423.204 106.964C422.567 106.327 421.702 105.968 420.8 105.967H413.53C412.628 105.968 411.764 106.327 411.126 106.964C410.488 107.602 410.13 108.466 410.129 109.368V116.639C410.13 117.54 410.488 118.405 411.126 119.042C411.764 119.68 412.628 120.038 413.53 120.04ZM413.647 109.485H420.683V116.521H413.647V109.485ZM465.735 107.854C470.399 107.851 474.919 106.231 478.523 103.269C482.126 100.308 484.592 96.1885 485.499 91.613C486.406 87.0375 485.699 82.289 483.498 78.1766C481.296 74.0641 477.737 70.8421 473.427 69.0595C469.116 67.2769 464.321 67.044 459.858 68.4004C455.395 69.7569 451.541 72.6188 448.951 76.4986C446.362 80.3784 445.197 85.036 445.657 89.6779C446.116 94.3197 448.171 98.6587 451.471 101.955C453.343 103.83 455.567 105.316 458.014 106.328C460.462 107.34 463.086 107.859 465.735 107.854ZM465.537 86.617H449.128C449.284 84.1471 449.99 81.7432 451.193 79.5807H465.537C466.004 79.5807 466.451 79.3953 466.781 79.0654C467.111 78.7355 467.296 78.2881 467.296 77.8216C467.296 77.355 467.111 76.9076 466.781 76.5777C466.451 76.2478 466.004 76.0625 465.537 76.0625H453.819C453.867 76.0139 453.911 75.9635 453.959 75.9154C457.086 72.8107 461.316 71.0719 465.723 71.0798C470.129 71.0878 474.353 72.8418 477.469 75.9577C480.585 79.0736 482.339 83.2974 482.347 87.7039C482.355 92.1105 480.616 96.3406 477.511 99.4677C475.331 101.65 472.586 103.184 469.585 103.898C466.583 104.611 463.442 104.477 460.513 103.509C457.583 102.541 454.98 100.777 452.995 98.4158C451.009 96.0543 449.719 93.1874 449.269 90.1351H465.537C466.004 90.1351 466.451 89.9498 466.781 89.6199C467.111 89.29 467.296 88.8426 467.296 88.3761C467.296 87.9095 467.111 87.4621 466.781 87.1322C466.451 86.8023 466.004 86.617 465.537 86.617ZM426.459 43.0919C426.111 43.0919 425.771 43.1951 425.482 43.3884C425.193 43.5817 424.967 43.8564 424.834 44.1778C424.701 44.4992 424.666 44.8529 424.734 45.1942C424.802 45.5354 424.969 45.8488 425.215 46.0948C425.461 46.3409 425.775 46.5084 426.116 46.5763C426.457 46.6441 426.811 46.6093 427.132 46.4762C427.454 46.343 427.729 46.1176 427.922 45.8283C428.115 45.539 428.218 45.1989 428.218 44.851C428.218 44.3844 428.033 43.937 427.703 43.6071C427.373 43.2772 426.926 43.0919 426.459 43.0919ZM431.737 91.8942C431.737 92.3608 431.922 92.8082 432.252 93.1381C432.582 93.468 433.029 93.6533 433.496 93.6533H439.253C440.216 97.9164 442.194 101.884 445.018 105.22C447.842 108.555 451.429 111.16 455.475 112.814C459.521 114.467 463.906 115.12 468.258 114.717C472.61 114.314 476.8 112.867 480.474 110.498L482.985 113.01C482.563 113.497 482.341 114.125 482.364 114.769C482.386 115.412 482.652 116.024 483.106 116.48L498.843 132.217C499.593 132.966 500.483 133.561 501.462 133.967C502.442 134.372 503.492 134.581 504.552 134.581C505.612 134.581 506.662 134.372 507.641 133.967C508.62 133.561 509.51 132.966 510.26 132.217C511.01 131.467 511.604 130.577 512.01 129.598C512.416 128.618 512.625 127.569 512.625 126.509C512.625 125.448 512.416 124.399 512.01 123.419C511.605 122.44 511.01 121.55 510.26 120.8L494.523 105.063C494.067 104.609 493.456 104.344 492.812 104.321C492.169 104.299 491.541 104.52 491.054 104.942L488.542 102.43C492.181 96.7989 493.608 90.0202 492.548 83.3996C491.488 76.7791 488.015 70.7848 482.8 66.5711C477.585 62.3574 470.995 60.2223 464.299 60.5768C457.604 60.9314 451.276 63.7505 446.535 68.4914C446.358 68.6678 446.185 68.8461 446.015 69.0264H433.496C433.029 69.0264 432.582 69.2117 432.252 69.5416C431.922 69.8715 431.737 70.3189 431.737 70.7855C431.737 71.252 431.922 71.6994 432.252 72.0293C432.582 72.3592 433.029 72.5446 433.496 72.5446H443.198C439.728 77.7196 438.141 83.9301 438.705 90.1354H433.496C433.029 90.1354 432.582 90.3207 432.252 90.6506C431.922 90.9805 431.737 91.4279 431.737 91.8945L431.737 91.8942ZM492.289 108.669L492.291 108.667L492.293 108.665L492.721 108.237L507.772 123.288C508.625 124.143 509.104 125.301 509.104 126.508C509.104 127.716 508.625 128.874 507.772 129.729C507.349 130.152 506.847 130.488 506.295 130.716C505.742 130.945 505.15 131.063 504.552 131.063C503.954 131.063 503.362 130.945 502.809 130.716C502.256 130.488 501.754 130.152 501.331 129.729L486.28 114.678L492.289 108.669ZM488.559 107.423L485.466 110.516L483.327 108.376C483.878 107.907 484.414 107.412 484.936 106.892C485.456 106.372 485.951 105.835 486.419 105.283L488.559 107.423ZM449.022 70.979C452.327 67.6735 456.539 65.4224 461.124 64.5104C465.709 63.5983 470.461 64.0664 474.78 65.8553C479.099 67.6441 482.79 70.6735 485.387 74.5603C487.984 78.4472 489.37 83.0168 489.37 87.6915C489.37 92.3662 487.984 96.9358 485.387 100.823C482.79 104.71 479.099 107.739 474.78 109.528C470.461 111.317 465.709 111.785 461.124 110.873C456.539 109.961 452.328 107.71 449.022 104.405C446.819 102.215 445.07 99.6108 443.877 96.7426C442.683 93.8743 442.069 90.7984 442.069 87.6918C442.069 84.5852 442.683 81.5093 443.877 78.641C445.07 75.7727 446.819 73.1688 449.022 70.979H449.022ZM510.865 32.0854H408.37C406.038 32.0881 403.802 33.0156 402.153 34.6644C400.504 36.3133 399.577 38.549 399.574 40.8809V143.377C399.577 145.709 400.504 147.944 402.153 149.593C403.802 151.242 406.038 152.169 408.37 152.172H510.865C513.197 152.169 515.433 151.242 517.082 149.593C518.731 147.944 519.658 145.709 519.661 143.377V40.8809C519.658 38.549 518.731 36.3133 517.082 34.6644C515.433 33.0156 513.197 32.0881 510.865 32.0854ZM516.143 143.377C516.141 144.776 515.585 146.117 514.595 147.106C513.606 148.096 512.265 148.652 510.865 148.654H408.37C406.971 148.652 405.629 148.096 404.64 147.106C403.651 146.117 403.094 144.776 403.092 143.377V56.7126H516.143V143.377ZM516.143 53.1944H403.092V40.8809C403.094 39.4817 403.651 38.1404 404.64 37.1511C405.629 36.1617 406.971 35.6052 408.37 35.6036H510.865C512.265 35.6052 513.606 36.1617 514.595 37.1511C515.585 38.1404 516.141 39.4817 516.143 40.8809V53.1944ZM419.423 43.0919C419.075 43.0919 418.735 43.1951 418.446 43.3884C418.156 43.5817 417.931 43.8564 417.798 44.1778C417.665 44.4992 417.63 44.8529 417.698 45.1942C417.766 45.5354 417.933 45.8488 418.179 46.0948C418.425 46.3409 418.739 46.5084 419.08 46.5763C419.421 46.6441 419.775 46.6093 420.096 46.4762C420.418 46.343 420.692 46.1176 420.886 45.8283C421.079 45.539 421.182 45.1989 421.182 44.851C421.182 44.3844 420.997 43.937 420.667 43.6071C420.337 43.2772 419.89 43.0919 419.423 43.0919ZM413.53 98.9305H420.8C421.702 98.9295 422.567 98.5708 423.204 97.9333C423.842 97.2957 424.2 96.4313 424.201 95.5297V88.2588C424.2 87.3571 423.842 86.4927 423.204 85.8552C422.567 85.2176 421.702 84.859 420.8 84.8579H413.53C412.628 84.859 411.764 85.2176 411.126 85.8552C410.488 86.4927 410.13 87.3571 410.129 88.2588V95.5297C410.13 96.4313 410.488 97.2957 411.126 97.9333C411.764 98.5708 412.628 98.9295 413.53 98.9305ZM413.647 88.3761H420.683V95.4124H413.647V88.3761ZM413.53 141.149H420.8C421.702 141.147 422.567 140.789 423.204 140.151C423.842 139.514 424.2 138.649 424.201 137.748V130.477C424.2 129.575 423.842 128.711 423.204 128.073C422.567 127.436 421.702 127.077 420.8 127.076H413.53C412.628 127.077 411.764 127.436 411.126 128.073C410.488 128.711 410.13 129.575 410.129 130.477V137.748C410.13 138.649 410.488 139.514 411.126 140.151C411.764 140.789 412.628 141.147 413.53 141.149ZM413.647 130.594H420.683V137.63H413.647V130.594ZM413.53 77.8216H420.8C421.702 77.8205 422.567 77.4619 423.204 76.8243C423.842 76.1867 424.2 75.3223 424.201 74.4207V67.1498C424.2 66.2482 423.842 65.3837 423.204 64.7462C422.567 64.1086 421.702 63.75 420.8 63.7489H413.53C412.628 63.75 411.764 64.1086 411.126 64.7462C410.488 65.3837 410.13 66.2482 410.129 67.1498V74.4207C410.13 75.3223 410.488 76.1867 411.126 76.8243C411.764 77.4619 412.628 77.8205 413.53 77.8216ZM413.647 67.2671H420.683V74.3034H413.647V67.2671ZM433.496 135.871H493.275C493.741 135.871 494.189 135.686 494.518 135.356C494.848 135.026 495.034 134.579 495.034 134.112C495.034 133.646 494.848 133.198 494.518 132.868C494.189 132.538 493.741 132.353 493.275 132.353H433.496C433.029 132.353 432.582 132.538 432.252 132.868C431.922 133.198 431.737 133.646 431.737 134.112C431.737 134.579 431.922 135.026 432.252 135.356C432.582 135.686 433.029 135.871 433.496 135.871ZM412.387 43.0919C412.039 43.0919 411.699 43.1951 411.409 43.3884C411.12 43.5817 410.895 43.8564 410.761 44.1778C410.628 44.4992 410.594 44.8529 410.661 45.1942C410.729 45.5354 410.897 45.8488 411.143 46.0948C411.389 46.3409 411.702 46.5084 412.043 46.5763C412.385 46.6441 412.738 46.6093 413.06 46.4762C413.381 46.343 413.656 46.1176 413.849 45.8283C414.043 45.539 414.146 45.1989 414.146 44.851C414.146 44.62 414.1 44.3912 414.012 44.1778C413.923 43.9644 413.794 43.7705 413.631 43.6071C413.467 43.4438 413.273 43.3142 413.06 43.2258C412.846 43.1374 412.618 43.0919 412.387 43.0919ZM433.496 114.762H444.428C444.895 114.762 445.342 114.577 445.672 114.247C446.002 113.917 446.187 113.47 446.187 113.003C446.187 112.537 446.002 112.089 445.672 111.759C445.342 111.429 444.895 111.244 444.428 111.244H433.496C433.029 111.244 432.582 111.429 432.252 111.759C431.922 112.089 431.737 112.537 431.737 113.003C431.737 113.47 431.922 113.917 432.252 114.247C432.582 114.577 433.029 114.762 433.496 114.762Z" fill="#B0B0B0"/>
                      </g>
                      <g clip-path="url(#clip1_149_3491)">
                          <path d="M770.386 93.9963C770.386 94.4768 770.577 94.9375 770.917 95.2772C771.256 95.6169 771.717 95.8078 772.197 95.8078H783.549C784.029 95.8078 784.49 95.6169 784.83 95.2772C785.17 94.9375 785.36 94.4768 785.36 93.9963C785.36 93.5159 785.17 93.0552 784.83 92.7155C784.49 92.3758 784.029 92.1849 783.549 92.1849H772.197C771.717 92.1849 771.256 92.3758 770.917 92.7155C770.577 93.0552 770.386 93.5159 770.386 93.9963ZM765.292 59.3158C767.5 59.317 769.639 58.5527 771.346 57.1532C773.053 55.7536 774.222 53.8055 774.654 51.6407C775.085 49.4759 774.753 47.2284 773.713 45.2813C772.673 43.3342 770.99 41.8079 768.951 40.9626C766.912 40.1173 764.642 40.0052 762.53 40.6456C760.418 41.2859 758.592 42.6389 757.366 44.4741C756.139 46.3093 755.587 48.513 755.803 50.7098C756.019 52.9066 756.99 54.9605 758.551 56.5214C759.434 57.4095 760.485 58.1137 761.642 58.5934C762.799 59.073 764.04 59.3186 765.292 59.3158ZM761.109 45.5924C762.077 44.6252 763.35 44.0235 764.712 43.8899C766.074 43.7563 767.44 44.099 768.578 44.8596C769.715 45.6203 770.554 46.7518 770.951 48.0613C771.347 49.3709 771.278 50.7776 770.754 52.0417C770.23 53.3058 769.284 54.3491 768.077 54.9938C766.87 55.6385 765.477 55.8449 764.135 55.5776C762.792 55.3103 761.585 54.586 760.717 53.5281C759.849 52.4701 759.375 51.144 759.375 49.7756C759.373 48.9983 759.525 48.2282 759.823 47.5101C760.12 46.7921 760.558 46.1402 761.109 45.5924ZM807.702 56.6808V68.0324C807.702 68.5129 807.892 68.9736 808.232 69.3133C808.572 69.653 809.033 69.8439 809.513 69.8439C809.993 69.8439 810.454 69.653 810.794 69.3133C811.134 68.9736 811.324 68.5129 811.324 68.0324V56.6808C811.324 56.2004 811.134 55.7396 810.794 55.3999C810.454 55.0602 809.993 54.8693 809.513 54.8693C809.033 54.8693 808.572 55.0602 808.232 55.3999C807.892 55.7396 807.702 56.2004 807.702 56.6808ZM835.117 70.2062C835.598 70.2058 836.059 70.0148 836.399 69.6748L844.425 61.6489C844.594 61.4807 844.727 61.2809 844.818 61.0611C844.909 60.8412 844.956 60.6056 844.956 60.3677C844.956 60.1297 844.909 59.8941 844.818 59.6742C844.727 59.4544 844.594 59.2546 844.425 59.0864C844.257 58.9181 844.057 58.7846 843.837 58.6936C843.618 58.6025 843.382 58.5556 843.144 58.5556C842.906 58.5556 842.67 58.6025 842.451 58.6936C842.231 58.7846 842.031 58.9181 841.863 59.0864L833.837 67.1122C833.584 67.3659 833.412 67.6886 833.343 68.0398C833.273 68.391 833.309 68.7549 833.446 69.0858C833.583 69.4166 833.815 69.6995 834.112 69.8989C834.409 70.0983 834.759 70.2052 835.117 70.2062ZM853.734 59.3182C855.941 59.3183 858.08 58.5531 859.786 57.1529C861.492 55.7527 862.66 53.8043 863.091 51.6395C863.522 49.4748 863.188 47.2276 862.148 45.281C861.108 43.3344 859.424 41.8088 857.385 40.9641C855.346 40.1194 853.077 40.0078 850.965 40.6485C848.853 41.2891 847.028 42.6423 845.802 44.4775C844.576 46.3127 844.023 48.5163 844.24 50.7128C844.456 52.9094 845.427 54.963 846.988 56.5238C847.872 57.412 848.923 58.1162 850.081 58.5954C851.239 59.0747 852.481 59.3195 853.734 59.3158V59.3182ZM849.548 45.5924C850.376 44.7649 851.43 44.2014 852.578 43.9731C853.726 43.7448 854.915 43.862 855.997 44.3099C857.078 44.7578 858.002 45.5163 858.652 46.4893C859.302 47.4624 859.649 48.6065 859.649 49.7768C859.649 50.9471 859.302 52.0911 858.652 53.0642C858.002 54.0373 857.078 54.7958 855.997 55.2437C854.915 55.6915 853.726 55.8088 852.578 55.5805C851.43 55.3522 850.376 54.7887 849.548 53.9612C848.994 53.4143 848.554 52.7628 848.254 52.0445C847.953 51.3262 847.799 50.5554 847.799 49.7768C847.799 48.9982 847.953 48.2274 848.254 47.5091C848.554 46.7907 848.994 46.1392 849.548 45.5924ZM835.477 92.1849C834.996 92.1849 834.536 92.3758 834.196 92.7155C833.856 93.0552 833.665 93.5159 833.665 93.9963C833.665 94.4768 833.856 94.9375 834.196 95.2772C834.536 95.6169 834.996 95.8078 835.477 95.8078H846.829C847.309 95.8078 847.77 95.6169 848.109 95.2772C848.449 94.9375 848.64 94.4768 848.64 93.9963C848.64 93.5159 848.449 93.0552 848.109 92.7155C847.77 92.3758 847.309 92.1849 846.829 92.1849H835.477ZM809.513 51.2465C811.4 51.2465 813.244 50.6869 814.813 49.6387C816.382 48.5904 817.605 47.1004 818.327 45.3571C819.049 43.6139 819.238 41.6957 818.87 39.845C818.502 37.9944 817.593 36.2945 816.259 34.9603C814.925 33.6261 813.225 32.7174 811.374 32.3493C809.524 31.9812 807.605 32.1701 805.862 32.8922C804.119 33.6143 802.629 34.8371 801.581 36.406C800.532 37.9749 799.973 39.8194 799.973 41.7062C799.976 44.2355 800.982 46.6602 802.771 48.4487C804.559 50.2371 806.984 51.2433 809.513 51.2465ZM809.513 35.7889C810.683 35.7889 811.827 36.1359 812.8 36.7861C813.774 37.4364 814.532 38.3605 814.98 39.4418C815.428 40.523 815.545 41.7128 815.317 42.8607C815.088 44.0085 814.525 45.0629 813.697 45.8904C812.87 46.718 811.815 47.2816 810.667 47.5099C809.52 47.7382 808.33 47.621 807.248 47.1732C806.167 46.7253 805.243 45.9669 804.593 44.9938C803.943 44.0206 803.596 42.8766 803.596 41.7062C803.598 40.1375 804.222 38.6335 805.331 37.5242C806.44 36.4149 807.944 35.7908 809.513 35.7889ZM766.763 93.9963C766.763 92.1095 766.204 90.265 765.155 88.6961C764.107 87.1272 762.617 85.9044 760.874 85.1823C759.13 84.4602 757.212 84.2713 755.362 84.6394C753.511 85.0075 751.811 85.9162 750.477 87.2504C749.143 88.5846 748.234 90.2845 747.866 92.1351C747.498 93.9858 747.687 95.904 748.409 97.6472C749.131 99.3905 750.354 100.88 751.923 101.929C753.491 102.977 755.336 103.537 757.223 103.537C759.752 103.533 762.177 102.527 763.965 100.739C765.754 98.9503 766.76 96.5256 766.763 93.9963ZM751.305 93.9963C751.305 92.826 751.653 91.6819 752.303 90.7088C752.953 89.7357 753.877 88.9773 754.958 88.5294C756.04 88.0815 757.229 87.9644 758.377 88.1927C759.525 88.421 760.579 88.9846 761.407 89.8121C762.235 90.6397 762.798 91.6941 763.027 92.8419C763.255 93.9898 763.138 95.1796 762.69 96.2608C762.242 97.3421 761.483 98.2662 760.51 98.9164C759.537 99.5667 758.393 99.9137 757.223 99.9137C755.654 99.9118 754.15 99.2877 753.041 98.1784C751.931 97.0691 751.307 95.5651 751.305 93.9963ZM811.324 131.312V119.96C811.324 119.48 811.134 119.019 810.794 118.679C810.454 118.34 809.993 118.149 809.513 118.149C809.033 118.149 808.572 118.34 808.232 118.679C807.892 119.019 807.702 119.48 807.702 119.96V131.312C807.702 131.792 807.892 132.253 808.232 132.593C808.572 132.933 809.033 133.123 809.513 133.123C809.993 133.123 810.454 132.933 810.794 132.593C811.134 132.253 811.324 131.792 811.324 131.312ZM844.425 126.346L836.399 118.32C836.06 117.98 835.599 117.79 835.118 117.79C834.638 117.79 834.177 117.98 833.837 118.32C833.497 118.66 833.306 119.121 833.306 119.602C833.306 120.082 833.497 120.543 833.837 120.883L841.863 128.909C842.203 129.249 842.663 129.439 843.144 129.439C843.625 129.439 844.086 129.249 844.425 128.909C844.765 128.569 844.956 128.108 844.956 127.627C844.956 127.147 844.765 126.686 844.425 126.346ZM861.803 84.4561C859.916 84.4561 858.072 85.0156 856.503 86.0639C854.934 87.1122 853.711 88.6022 852.989 90.3455C852.267 92.0887 852.078 94.0069 852.446 95.8575C852.814 97.7082 853.723 99.4081 855.057 100.742C856.391 102.077 858.091 102.985 859.942 103.353C861.792 103.721 863.711 103.532 865.454 102.81C867.197 102.088 868.687 100.865 869.735 99.2966C870.784 97.7277 871.343 95.8832 871.343 93.9963C871.34 91.4671 870.334 89.0424 868.545 87.2539C866.757 85.4655 864.332 84.4593 861.803 84.4561ZM861.803 99.9137C860.633 99.9137 859.489 99.5667 858.516 98.9164C857.542 98.2662 856.784 97.3421 856.336 96.2608C855.888 95.1796 855.771 93.9898 855.999 92.8419C856.228 91.6941 856.791 90.6397 857.619 89.8121C858.446 88.9846 859.501 88.421 860.649 88.1927C861.796 87.9644 862.986 88.0815 864.068 88.5294C865.149 88.9773 866.073 89.7357 866.723 90.7088C867.373 91.6819 867.72 92.826 867.72 93.9963C867.718 95.5651 867.094 97.0691 865.985 98.1784C864.876 99.2877 863.372 99.9118 861.803 99.9137ZM846.988 131.471C845.654 132.806 844.745 134.505 844.377 136.356C844.009 138.207 844.198 140.125 844.92 141.868C845.642 143.612 846.865 145.102 848.433 146.15C850.002 147.198 851.847 147.758 853.734 147.758C855.621 147.758 857.465 147.198 859.034 146.15C860.603 145.102 861.826 143.612 862.548 141.868C863.27 140.125 863.459 138.207 863.091 136.356C862.722 134.505 861.814 132.806 860.479 131.471C858.689 129.685 856.263 128.681 853.734 128.681C851.204 128.681 848.778 129.685 846.988 131.471ZM857.917 142.4C856.949 143.368 855.676 143.969 854.314 144.103C852.952 144.236 851.586 143.894 850.448 143.133C849.311 142.372 848.472 141.241 848.075 139.931C847.679 138.622 847.748 137.215 848.272 135.951C848.796 134.687 849.742 133.644 850.949 132.999C852.156 132.354 853.549 132.148 854.891 132.415C856.233 132.682 857.441 133.407 858.309 134.465C859.177 135.523 859.651 136.849 859.651 138.217C859.653 138.994 859.501 139.764 859.203 140.483C858.906 141.201 858.468 141.852 857.917 142.4ZM825.454 81.4636H821.036V79.5966C821.035 78.3012 820.52 77.0591 819.604 76.1431C818.688 75.2271 817.446 74.7119 816.15 74.7106H802.866C801.571 74.7119 800.329 75.2271 799.413 76.1431C798.497 77.0591 797.981 78.3012 797.98 79.5966V81.4636H793.572C792.355 81.4636 791.188 81.9471 790.327 82.8077C789.467 83.6683 788.983 84.8355 788.983 86.0526V108.683C788.983 109.901 789.467 111.068 790.327 111.928C791.188 112.789 792.355 113.272 793.572 113.272H825.454C826.671 113.272 827.838 112.789 828.698 111.928C829.559 111.068 830.043 109.901 830.043 108.683V86.0526C830.043 84.8355 829.559 83.6683 828.698 82.8077C827.838 81.9471 826.671 81.4636 825.454 81.4636ZM801.615 79.5966C801.615 79.2616 801.748 78.9403 801.985 78.7034C802.222 78.4666 802.543 78.3335 802.878 78.3335H816.162C816.328 78.3335 816.492 78.3661 816.646 78.4296C816.799 78.4931 816.938 78.5861 817.055 78.7034C817.173 78.8207 817.266 78.96 817.329 79.1132C817.393 79.2665 817.425 79.4308 817.425 79.5966V81.4636H801.613L801.615 79.5966ZM826.42 108.688C826.42 108.945 826.318 109.19 826.137 109.371C825.956 109.553 825.71 109.654 825.454 109.654H793.572C793.316 109.654 793.07 109.553 792.889 109.371C792.708 109.19 792.606 108.945 792.606 108.688V94.663L803.917 100.307V102.636C803.918 103.564 804.287 104.454 804.944 105.111C805.6 105.767 806.491 106.137 807.419 106.138H811.612C812.54 106.137 813.43 105.767 814.087 105.111C814.743 104.454 815.113 103.564 815.114 102.636V100.307L826.42 94.663V108.688ZM807.535 102.515V98.566H811.486V102.515H807.535ZM826.42 90.615L814.541 96.542C814.224 96.0519 813.79 95.6489 813.277 95.3697C812.765 95.0904 812.191 94.9438 811.607 94.9431H807.417C806.833 94.9438 806.259 95.0904 805.746 95.3697C805.234 95.6489 804.799 96.0519 804.482 96.542L792.606 90.615V86.0574C792.606 85.8012 792.708 85.5555 792.889 85.3743C793.07 85.1931 793.316 85.0913 793.572 85.0913H825.454C825.71 85.0913 825.956 85.1931 826.137 85.3743C826.318 85.5555 826.42 85.8012 826.42 86.0574V90.615ZM809.513 136.746C807.626 136.746 805.782 137.306 804.213 138.354C802.644 139.402 801.421 140.892 800.699 142.636C799.977 144.379 799.788 146.297 800.156 148.148C800.524 149.998 801.433 151.698 802.767 153.032C804.101 154.367 805.801 155.275 807.652 155.643C809.502 156.011 811.421 155.823 813.164 155.1C814.907 154.378 816.397 153.156 817.445 151.587C818.494 150.018 819.053 148.173 819.053 146.286C819.05 143.757 818.044 141.332 816.255 139.544C814.467 137.756 812.042 136.749 809.513 136.746ZM809.513 152.204C808.343 152.204 807.199 151.857 806.225 151.207C805.252 150.556 804.494 149.632 804.046 148.551C803.598 147.47 803.481 146.28 803.709 145.132C803.938 143.984 804.501 142.93 805.329 142.102C806.156 141.275 807.211 140.711 808.359 140.483C809.506 140.254 810.696 140.372 811.777 140.82C812.859 141.267 813.783 142.026 814.433 142.999C815.083 143.972 815.43 145.116 815.43 146.286C815.428 147.855 814.804 149.359 813.695 150.469C812.586 151.578 811.082 152.202 809.513 152.204ZM758.551 131.471C757.217 132.806 756.308 134.505 755.94 136.356C755.572 138.207 755.761 140.125 756.483 141.868C757.205 143.612 758.428 145.102 759.997 146.15C761.566 147.198 763.41 147.758 765.297 147.758C767.184 147.758 769.028 147.198 770.597 146.15C772.166 145.102 773.389 143.612 774.111 141.868C774.833 140.125 775.022 138.207 774.654 136.356C774.286 134.505 773.377 132.806 772.043 131.471C771.161 130.578 770.111 129.869 768.953 129.384C767.795 128.9 766.552 128.651 765.297 128.651C764.042 128.651 762.799 128.9 761.641 129.384C760.483 129.869 759.433 130.578 758.551 131.471ZM769.483 142.4C768.655 143.227 767.601 143.79 766.454 144.018C765.307 144.245 764.118 144.128 763.037 143.68C761.957 143.232 761.033 142.474 760.384 141.501C759.734 140.529 759.387 139.386 759.387 138.216C759.387 137.046 759.734 135.903 760.384 134.93C761.033 133.958 761.957 133.2 763.037 132.752C764.118 132.304 765.307 132.186 766.454 132.414C767.601 132.642 768.655 133.205 769.483 134.031C770.037 134.579 770.476 135.23 770.776 135.949C771.076 136.667 771.23 137.438 771.23 138.217C771.229 138.995 771.074 139.766 770.773 140.484C770.473 141.203 770.032 141.854 769.478 142.4H769.483ZM782.631 118.32L774.605 126.346C774.437 126.514 774.304 126.714 774.213 126.934C774.122 127.154 774.075 127.389 774.075 127.627C774.075 127.865 774.122 128.101 774.213 128.321C774.304 128.541 774.437 128.74 774.605 128.909C774.774 129.077 774.973 129.21 775.193 129.302C775.413 129.393 775.649 129.439 775.887 129.439C776.125 129.439 776.36 129.393 776.58 129.302C776.8 129.21 777 129.077 777.168 128.909L785.194 120.883C785.362 120.715 785.496 120.515 785.587 120.295C785.678 120.075 785.725 119.84 785.725 119.602C785.725 119.364 785.678 119.128 785.587 118.908C785.496 118.688 785.362 118.489 785.194 118.32C785.026 118.152 784.826 118.019 784.606 117.927C784.386 117.836 784.15 117.79 783.913 117.79C783.675 117.79 783.439 117.836 783.219 117.927C782.999 118.019 782.8 118.152 782.631 118.32ZM777.163 59.0839C776.995 58.9157 776.795 58.7822 776.575 58.6912C776.355 58.6001 776.12 58.5532 775.882 58.5532C775.644 58.5532 775.408 58.6001 775.188 58.6912C774.969 58.7822 774.769 58.9157 774.601 59.0839C774.432 59.2522 774.299 59.452 774.208 59.6718C774.117 59.8917 774.07 60.1273 774.07 60.3652C774.07 60.6032 774.117 60.8388 774.208 61.0587C774.299 61.2785 774.432 61.4783 774.601 61.6465L782.626 69.6724C782.795 69.8406 782.994 69.9741 783.214 70.0652C783.434 70.1562 783.67 70.2031 783.908 70.2031C784.146 70.2031 784.381 70.1562 784.601 70.0652C784.821 69.9741 785.021 69.8406 785.189 69.6724C785.357 69.5041 785.491 69.3044 785.582 69.0845C785.673 68.8647 785.72 68.6291 785.72 68.3911C785.72 68.1531 785.673 67.9175 785.582 67.6977C785.491 67.4778 785.357 67.2781 785.189 67.1098L777.163 59.0839Z" fill="#B0B0B0"/>
                      </g>
                      <path d="M142.558 66.8228C142.558 67.3619 142.539 67.8971 142.497 68.4324C142.479 68.6774 142.456 68.9187 142.43 69.1637C142.43 69.2843 142.403 69.4049 142.388 69.5406C142.422 69.273 142.422 69.3145 142.388 69.5406C142.209 70.602 141.957 71.6498 141.634 72.6768C141.491 73.1292 141.325 73.5702 141.155 74.0112C141.005 74.3882 141.318 73.6343 141.155 74.0112C141.106 74.1205 141.061 74.2261 141.012 74.3316C140.899 74.5804 140.779 74.8292 140.654 75.0855C140.198 75.9863 139.678 76.853 139.097 77.6789C138.943 77.9013 138.784 78.1199 138.619 78.3348C138.89 77.9804 138.558 78.4026 138.457 78.527C138.11 78.9417 137.749 79.3437 137.375 79.7333C137.051 80.065 136.719 80.3854 136.376 80.6982C136.177 80.8792 135.974 81.0563 135.765 81.2297C135.648 81.3315 135.105 81.7612 135.486 81.4672C134.685 82.0806 133.84 82.6337 132.957 83.122C132.516 83.367 132.064 83.597 131.604 83.8118C131.509 83.857 130.94 84.1058 131.17 84.0116C131.468 83.8872 131.008 84.0719 130.94 84.0983L130.499 84.2641C129.528 84.6145 128.533 84.8942 127.521 85.101L126.809 85.2329C126.734 85.2329 126.232 85.3234 126.564 85.2744C126.896 85.2254 126.466 85.2744 126.432 85.2744C125.904 85.3309 125.373 85.3761 124.841 85.3988C123.729 85.4404 122.615 85.3988 121.509 85.2744C120.985 85.2178 121.765 85.3271 121.249 85.2367L120.537 85.1085C119.99 84.9992 119.447 84.871 118.908 84.7316C118.369 84.5921 117.924 84.4338 117.442 84.2604L116.778 84.0078C116.496 83.8985 116.831 84.0304 116.869 84.0493L116.443 83.857C115.487 83.4252 114.566 82.9211 113.687 82.3493C113.265 82.0753 112.854 81.7851 112.455 81.4785C112.809 81.7499 112.387 81.4182 112.263 81.3164C112.055 81.143 111.852 80.9659 111.652 80.7887C110.876 80.0877 110.152 79.3319 109.484 78.527C109.383 78.4026 109.051 77.9804 109.322 78.3348C109.179 78.1501 109.043 77.9578 108.908 77.7769C108.594 77.3333 108.297 76.8782 108.018 76.4124C107.767 76.0128 107.541 75.6057 107.34 75.1911C107.211 74.946 107.095 74.701 106.963 74.4372C106.895 74.2939 106.627 73.6493 106.808 74.1017C106.408 73.1118 106.082 72.0938 105.832 71.056C105.719 70.5848 105.625 70.1136 105.542 69.6386L105.485 69.2805C105.485 69.3899 105.542 69.7932 105.485 69.2617C105.455 68.979 105.425 68.6963 105.402 68.4098C105.323 67.3382 105.323 66.2623 105.402 65.1907C105.425 64.908 105.455 64.6215 105.485 64.3388C105.542 63.8186 105.432 64.5951 105.523 64.0787C105.613 63.5623 105.726 62.978 105.858 62.4314C106.105 61.4338 106.422 60.455 106.808 59.5026C106.639 59.921 106.846 59.4196 106.914 59.2726C107.027 59.0238 107.147 58.7788 107.268 58.5187C107.498 58.0664 107.743 57.6254 108.003 57.1919C108.263 56.7584 108.538 56.3362 108.829 55.9253C108.961 55.7331 109.096 55.5484 109.236 55.3599L109.175 55.4391C109.296 55.2883 109.42 55.1375 109.552 54.9905C110.196 54.2205 110.895 53.4986 111.644 52.8306C111.814 52.6761 111.991 52.5215 112.168 52.3745C112.266 52.2916 112.858 51.8204 112.447 52.137C112.847 51.8304 113.258 51.5402 113.68 51.2663C114.56 50.6958 115.481 50.1918 116.435 49.7585C116.582 49.6907 117.08 49.4833 116.662 49.653L117.321 49.3966C117.841 49.2082 118.369 49.0197 118.901 48.8878C119.432 48.7558 119.903 48.6239 120.408 48.5108C120.646 48.4618 120.88 48.4166 121.121 48.3789L121.479 48.3186C121.211 48.3638 121.253 48.345 121.498 48.3186C122.604 48.196 123.718 48.1544 124.83 48.1942C125.32 48.2168 125.81 48.2507 126.3 48.3073L126.677 48.3487C126.176 48.2846 126.598 48.3487 126.696 48.3487C126.971 48.4015 127.25 48.4467 127.525 48.5033C128.537 48.7065 129.533 48.9863 130.503 49.3401C130.763 49.4306 131.019 49.5323 131.257 49.6341C130.838 49.4645 131.34 49.6718 131.487 49.7397C131.984 49.9696 132.471 50.2146 132.946 50.4935C133.828 50.9832 134.673 51.5362 135.475 52.1483C135.121 51.8769 135.543 52.2087 135.663 52.3104C135.874 52.4838 136.078 52.661 136.278 52.8419C136.655 53.1774 137.013 53.5242 137.363 53.8861C137.714 54.2479 138.049 54.6173 138.37 55.0169C138.438 55.0998 138.822 55.571 138.671 55.3938C138.521 55.2167 138.728 55.4692 138.747 55.4956C138.86 55.6539 138.977 55.8085 139.086 55.9668C139.667 56.7927 140.187 57.6594 140.643 58.5602C140.748 58.7675 140.85 58.9786 140.952 59.1935C141.016 59.3329 141.295 59.9964 141.106 59.5289C141.299 60.0039 141.483 60.4826 141.63 60.9689C141.955 61.9954 142.207 63.0433 142.384 64.1051C142.471 64.6215 142.365 63.845 142.422 64.3652C142.448 64.6064 142.475 64.8514 142.494 65.0964C142.539 65.6732 142.558 66.2499 142.561 66.8266C142.561 68.2138 143.775 69.5406 145.2 69.4652C145.895 69.4508 146.558 69.1682 147.05 68.6764C147.542 68.1847 147.824 67.5219 147.839 66.8266C147.794 61.9065 146.252 57.1166 143.418 53.0946C140.583 49.0725 136.591 46.009 131.973 44.3116C122.772 40.9191 111.84 43.8895 105.617 51.4736C99.2089 59.25 98.1686 70.4076 103.397 79.1075C105.975 83.3393 109.791 86.6775 114.328 88.6709C118.865 90.6643 123.904 91.2168 128.765 90.2538C138.261 88.3691 146.056 80.31 147.507 70.728C147.712 69.4411 147.822 68.1409 147.839 66.8379C147.839 65.4508 146.614 64.1239 145.2 64.1993C144.507 64.2145 143.847 64.4952 143.355 64.9834C142.863 65.4717 142.578 66.1302 142.558 66.8228ZM132.98 93.586C121.995 91.5694 110.54 93.2543 100.781 98.7615C92.1916 103.6 85.4563 111.159 81.6357 120.247C79.5063 125.373 78.4492 130.88 78.5297 136.43C78.5432 137.125 78.8255 137.789 79.3174 138.281C79.8094 138.772 80.4727 139.055 81.1683 139.068H118.324C119.711 139.068 121.038 137.851 120.962 136.43C120.948 135.734 120.665 135.072 120.174 134.58C119.682 134.088 119.019 133.806 118.324 133.791H81.1796L83.8182 136.43C83.8006 135.269 83.8371 134.11 83.9275 132.954C83.969 132.4 84.0255 131.846 84.0896 131.296L84.1348 130.941C84.067 131.465 84.1348 131.047 84.1348 130.941C84.1839 130.629 84.2291 130.319 84.2856 130.007C84.6708 127.785 85.2497 125.602 86.0158 123.482C86.2005 122.973 86.3928 122.471 86.5963 121.974C86.5963 121.94 86.7622 121.597 86.6415 121.865C86.5209 122.132 86.7056 121.721 86.7358 121.653C86.8602 121.374 86.9883 121.092 87.1127 120.817C87.5839 119.81 88.1003 118.823 88.6544 117.858C89.2085 116.893 89.7853 115.973 90.4336 115.046C90.7389 114.605 91.0518 114.171 91.3722 113.741L91.5833 113.466C91.2742 113.843 91.5192 113.549 91.5833 113.466C91.7755 113.229 91.9602 112.987 92.1638 112.75C93.5889 111.032 95.1494 109.431 96.8304 107.963C97.2375 107.608 97.6521 107.258 98.0743 106.919L98.6171 106.485C98.21 106.806 98.9941 106.202 99.1034 106.127C100.011 105.456 100.947 104.828 101.912 104.242C102.843 103.666 103.796 103.111 104.776 102.618C105.266 102.361 105.76 102.116 106.262 101.864C106.51 101.743 106.763 101.63 107.015 101.517C107.136 101.46 108.06 101.072 107.585 101.264C109.706 100.397 111.89 99.6898 114.117 99.1497C115.433 98.8369 116.756 98.5881 118.101 98.3959H118.241C117.905 98.4411 118.565 98.3582 118.618 98.3506C118.946 98.3092 119.278 98.2752 119.609 98.2451C120.28 98.181 120.947 98.132 121.618 98.0981C124.945 97.9174 128.282 98.1223 131.562 98.7087C132.923 98.9575 134.487 98.3318 134.823 96.8579C135.121 95.5574 134.446 93.865 132.972 93.5973L132.98 93.586ZM161.247 113.338C164.036 113.338 164.04 109.003 161.247 109.003C158.454 109.003 158.454 113.338 161.247 113.338Z" fill="#B0B0B0"/>
                      <path d="M162.329 122.03C162.327 125.942 160.81 129.701 158.095 132.518C155.381 135.334 151.68 136.989 147.771 137.135C147.188 137.153 146.604 137.142 146.022 137.101L145.268 137.033C145.494 137.063 145.023 136.995 144.982 136.988L144.409 136.882C143.799 136.761 143.196 136.608 142.603 136.422C142.075 136.258 141.558 136.063 141.054 135.838C138.805 134.823 136.835 133.278 135.314 131.335C133.792 129.393 132.764 127.111 132.316 124.684C132.216 124.221 132.156 123.751 132.135 123.278C132.082 122.579 132.075 121.878 132.113 121.178C132.159 120.052 132.349 118.936 132.678 117.858C133.321 115.599 134.483 113.522 136.071 111.792C140.349 107.198 147.353 105.565 153.214 108.151C154.285 108.622 155.544 108.464 156.181 107.375C156.72 106.455 156.478 104.883 155.4 104.408C152.076 102.9 148.399 102.343 144.777 102.798C141.155 103.254 137.73 104.705 134.883 106.99C132.527 108.924 130.657 111.384 129.426 114.173C128.194 116.961 127.635 120 127.793 123.044C128.057 128.107 130.288 132.867 134.01 136.309C137.732 139.752 142.652 141.604 147.72 141.472C152.788 141.339 157.605 139.233 161.142 135.602C164.68 131.97 166.66 127.1 166.66 122.03C166.682 119.241 162.347 119.237 162.325 122.03H162.329ZM159.667 134.684L180.46 157.437L159.667 134.684Z" fill="#B0B0B0"/>
                      <path d="M157.794 136.558L164.794 144.217L176.02 156.502L178.587 159.31C179.552 160.366 181.353 160.29 182.333 159.31C182.82 158.807 183.091 158.135 183.091 157.435C183.091 156.735 182.82 156.063 182.333 155.56L175.334 147.9L164.104 135.615L161.541 132.811C160.576 131.752 158.774 131.831 157.794 132.811C157.307 133.313 157.035 133.985 157.035 134.684C157.035 135.384 157.307 136.056 157.794 136.558Z" fill="#B0B0B0"/>
                      <defs>
                          <filter id="filter0_b_149_3491" x="-10" y="-10" width="956.39" height="204.419" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                              <feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
                              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_149_3491"/>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_149_3491" result="shape"/>
                          </filter>
                          <clipPath id="clip0_149_3491">
                              <rect width="120.087" height="120.087" fill="white" transform="translate(399.574 32.166)"/>
                          </clipPath>
                          <clipPath id="clip1_149_3491">
                              <rect width="123.661" height="123.661" fill="white" transform="translate(747.683 32.166)"/>
                          </clipPath>
                      </defs>
                  </svg>
                  <span className={styles.titleDescr}>
                      Мы анализируем актуальные открытые вакансии по Вашей специальности и отображаем навыки в виде графа-роадмапы
                  </span>
              </div>
              <div className={styles.description}>
                  <NodeSvg className={styles.firstNode}/>
                  <NodeSvg className={styles.secondNode}/>
                  <NodeSvg className={styles.thirdNode}/>
              </div>
          </div>
          <div className={styles.gradeBlock}>
              <div className={styles.gradeDescr}>
                  <div><GradientGrade width={'24rem'}/></div>
                  <span className={styles.titleDescr}>Цвет навыка подскажет Вам в вакансии с каким опытом работы она упоминается</span>
              </div>
              <div className={styles.gradeDescr}>
                  <span className={styles.titleDescr}>Чем больше нода навыка тем больше она упоминается в вакансиях по Вашей специальности</span>

              </div>
          </div>
          <div className={styles.endBlock}>
              <div className={styles.titleFavEnd}>
              <span className={styles.titleEnd} >
добавляйте подходящие роадмапы в избранное
              </span>
              <svg
                  fill="none"
                  height="29"
                  viewBox="0 0 24 29"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                      d="M22.4494 0.630481L22.4562 0.6335L22.4632 0.636309C22.7865 0.766496 23.0348 0.966265 23.2212 1.23987C23.4082 1.51436 23.5 1.81232 23.5 2.14673V26.8533C23.5 27.1877 23.4082 27.4856 23.2212 27.7601C23.0348 28.0337 22.7865 28.2335 22.4632 28.3637L22.4632 28.3636L22.4523 28.3682C22.2889 28.4386 22.0834 28.4808 21.825 28.4808C21.3535 28.4808 20.9582 28.3257 20.6145 28.0062L12.3505 19.884L12 19.5395L11.6495 19.884L3.38523 28.0065C3.02392 28.3434 2.627 28.5 2.175 28.5C1.95634 28.5 1.74967 28.4567 1.55064 28.3695L1.54375 28.3665L1.53678 28.3637C1.2135 28.2335 0.965246 28.0337 0.778844 27.7601C0.591849 27.4856 0.5 27.1877 0.5 26.8533V2.14673C0.5 1.81232 0.591849 1.51436 0.778844 1.23987C0.965246 0.966265 1.2135 0.766496 1.53678 0.636309L1.54375 0.6335L1.55064 0.630481C1.74967 0.543284 1.95634 0.5 2.175 0.5H21.825C22.0437 0.5 22.2503 0.543284 22.4494 0.630481Z"
                      fill="white"
                      stroke="white"
                  />
              </svg>
              </div>

                  {/* <span className={styles.titleEnd} onClick={() => { */}
                  {/*  history('/signup') */}
                  {/* }} > */}
                  {/*    ---зарегистрироваться--- */}
                  {/* </span> */}

          </div>
      </React.Fragment>
  )
}

export default NewUserPage
