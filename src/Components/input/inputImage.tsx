interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputImage = ({ onChange }: Props) => {
  return (
    <input
    onChange={onChange}
    type="file" />
  )
}

export default InputImage
