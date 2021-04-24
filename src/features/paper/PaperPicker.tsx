/**
 * PaperPicker
 */

import { Box, Button } from '@theme-ui/components'
import { ChangeEventHandler, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPaperIds, upload } from './paperSlice'

/**
 * WORK-IN-PROGRESS
 *
 * Renders a selection of papers for the user to choose from.
 *
 * @returns 			A list of papers, and an upload button for the user to upload a LaTeX file.
 */
const PaperPicker = () => {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState<File>()
  const hasSelectedFile = !!selectedFile
  const paperIds = useSelector(getAllPaperIds)

  const fileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.item(0)
    if (!file) {
      console.error(`File empty`)
      console.log(event)
      return
    }
    setSelectedFile(file)
  }

  const uploadFile = async () => {
    console.log('Uploading')
    console.log(selectedFile)
    const text = await selectedFile?.text()
    if (!text) {
      console.error(`File has no text`)
      return
    }
    console.log(text)
    const res = dispatch(
      upload({
        text: text.trim(),
        source: 'latex',
      }),
    )

    console.log(res)
  }

  return (
    <Box>
      {paperIds.map((id) => (
        <p key={id}>{id}</p>
      ))}
      <input type="file" name="file" onChange={fileChange} />
      {hasSelectedFile && <Button onClick={uploadFile}>Upload</Button>}
    </Box>
  )
}

export default PaperPicker
