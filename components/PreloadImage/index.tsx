import React from 'react'

type Props = {
  url: string
}

const PreloadIamge = (props: Props) => {
  React.useEffect(() => {
    const img = document.createElement('img')
    img.src = props.url
  }, [props.url])
  return null
}

export { PreloadIamge }
