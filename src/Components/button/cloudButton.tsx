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
        sources: [
          'local',
          'url',
          'camera',
          'google_drive',
          'dropbox'
        ],
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        defaultSource: 'local',
        clientAllowedFormats: ['jpg', 'jpeg', 'png'],
        maxImageWidth: 600,
        styles: {
          palette: {
            window: '#ffffff',
            sourceBg: '#f4f4f5',
            windowBorder: '#90a0b3',
            tabIcon: '#000000',
            inactiveTabIcon: '#555a5f',
            menuIcons: '#555a5f',
            link: '#0433ff',
            action: '#339933',
            inProgress: '#0433ff',
            complete: '#339933',
            error: '#cc0000',
            textDark: '#000000',
            textLight: '#fcfffd'
          },
          fonts: {
            default: null,
            'sans-serif': {
              url: null,
              active: true
            }
          }
        }
        // cloudName,
        // uploadPreset,
        // cropping: true, // add a cropping step
        // clientAllowedFormats: ['jpg', 'jpeg', 'png'],
        // maxImageWidth: 600
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
    id='upload_widget'
    className=' bg-gray-900 px-2 py-2 rounded-full border border-white absolute bottom-0 right-0'>
      <CameraIcon />
    </button>
  )
}

export default CloudButton
