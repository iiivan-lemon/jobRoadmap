import React from 'react'
import { loadState } from '../../utils/utils'
import { getResResume } from '../../models/resume/resumeFixSlice'
import { useAppDispatch } from '../../app/hooks'
import './jobLetter.css'
import { getJobLetter } from '../../models/jobLetter/jobLetterSlice'
import { PushSpinner } from 'react-spinners-kit'
export const JobLetterPage = () => {
  const dispatch = useAppDispatch()
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  const [selectedFile, setSelectedFile] = React.useState(null)

  const [selectedUrl, setSelectedUrl] = React.useState(null)
  const [data, setData] = React.useState(null)
  const handleFileSelect = (event) => {
    setLoad(loadState.base)
    setSelectedFile(event.target.files[0])
  }
  const handleUrlSelect = (event) => {
    setLoad(loadState.base)
    setSelectedUrl(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // eslint-disable-next-line no-debugger
    if (!(selectedFile && selectedUrl)) {
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)
    try {
      setLoad(loadState.load)
      void dispatch(getJobLetter({ resume: formData.get('file'), url: selectedUrl }))
        .then(data => {
          if (!data.payload) {
            setLoad(loadState.error)
          } else {
            setLoad(loadState.res)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setData(data.payload)
          }
        }).catch(() => { setLoad(loadState.error) })
    } catch (error) {
      setLoad(loadState.error)
    }
  }

  const renderLetter = (text) => {
    return text
  }

  return (
    <div className='letterPage'>
      <div className='resumeInput'>
        <span>добавьте резюме PDF</span>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileSelect}/>
          <input type="text" onChange={handleUrlSelect}/>
          <input type="submit" value="получить сопроводительное письмо" />
        </form>
      </div>
      <div className='preloader'>
        <PushSpinner
          color="#686769"
          id="preloader"
          loading={loading === loadState.load}
          size={30}
        />
      </div>
      {(loading === loadState.res) &&
          <>
              <textarea>{renderLetter(data)}</textarea></>
      }

    </div>
  )
}
