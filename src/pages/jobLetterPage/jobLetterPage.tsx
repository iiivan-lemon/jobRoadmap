import React from 'react'
import { loadState } from '../../utils/utils'
import { getResResume } from '../../models/resume/resumeFixSlice'
import { useAppDispatch } from '../../app/hooks'
import './jobLetter.css'
export const JobLetterPage = () => {
  const dispatch = useAppDispatch()
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  const [selectedFile, setSelectedFile] = React.useState(null)

  const [selectedUrl, setSelectedUrl] = React.useState(null)

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }
  const handleUrlSelect = (event) => {
    setSelectedUrl(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // eslint-disable-next-line no-debugger
    const formData = new FormData()
    // @ts-expect-error qwer
    formData.append('file', selectedFile)
    try {
      setLoad(loadState.load)
      void dispatch(getResResume(formData.get('file')))
        .then(data => {
          if (!data.payload) {
            setLoad(loadState.error)
          } else {
            setLoad(loadState.res)
            // setData(data.payload)
          }
        }).catch(() => { setLoad(loadState.error) })
    } catch (error) {
      setLoad(loadState.error)
    }
  }

  return (
    <div className='letterPage'>
      <div className='resumeInput'>
        <span>добавьте резюме PDF</span>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileSelect}/>
          <input type="text" onChange={handleUrlSelect}/>
        </form>
      </div>

      <textarea>письмо</textarea>
    </div>
  )
}
