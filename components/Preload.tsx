import { PreloadIamge } from 'components/PreloadImage'
import * as React from 'react'

const Preload = () => {
  return (
    <>
      <PreloadIamge url="/public/images/icons/error.png" />
      <PreloadIamge url="/public/images/icons/success.png" />
      <PreloadIamge url="/public/images/green.svg" />
      <PreloadIamge url="/public/images/bg.png" />

    </>
  )
}

export default Preload
