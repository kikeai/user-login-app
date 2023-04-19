import { type InputProps } from '../../types/types'

const Input = ({ value, name, placeholder, type, onChange }: InputProps) => {
  return (
    <input
    value={value}
    name={name}
    onChange={onChange}
    className='border-2 outline-none border-black rounded-lg h-10 pl-2 text-lg font-semibold w-4/5'
    placeholder={placeholder}
    type={type}
    />
  )
}

export default Input
