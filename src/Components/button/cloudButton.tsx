import CameraIcon from '../camera'

interface Props {
  seter: any
}

const CloudButton = ({ seter }: Props) => {
  const cloudName = 'kikeai'
  const uploadPreset = 'ml_default'
  const handleWidget: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        cropping: true, // add a cropping step
        clientAllowedFormats: ['jpg', 'jpeg', 'png'],
        maxImageWidth: 600
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          seter(result.info.url)
        }
      }
    )
    widget.open()
  }
  return (
    <button
    onClick={handleWidget}
    id="upload_widget"
    className=" bg-gray-900 px-2 py-2 rounded-full border border-white absolute bottom-0 right-0">
      <CameraIcon />
    </button>
  )
}

export default CloudButton
