import { useState } from 'react'
import Visibility from '../../assets/svg/visibility'
import { type TypesInput, type InputProps } from '../../types/types'
import VisibilityOff from '../../assets/svg/VisibilityOff'

const Input = ({ value, name, placeholder, type, onChange, error }: InputProps) => {
  const [typeInput, setTypeInput] = useState<TypesInput>(type)
  const errorOrComplejity = error !== 'Insegura' && error !== 'Aceptable' && error !== 'Segura' && error !== 'Usuario disponible' && error !== ''
  return (
    <div className='w-4/5'>
      <div className='flex items-center w-full relative'>
        <input
        value={value}
        name={name}
        onChange={onChange}
        className={`border-2 outline-none ${type === 'password' ? 'pr-9' : ''} ${errorOrComplejity ? 'border-red-700' : 'border-black'} rounded-lg h-10 pl-2 text-lg font-semibold w-full`}
        placeholder={placeholder}
        type={typeInput}
        />
        {
        type === 'password'
          ? typeInput === 'password'
            ? <Visibility seter={setTypeInput} />
            : <VisibilityOff seter={setTypeInput} />
          : null
        }
      </div>
      <div className='mt-2'>
        <label className={`text-sm font-semibold p-1 mt-2 rounded-sm ${error === 'Insegura' ? 'text-red-700 bg-red-200' : error === 'Aceptable' ? 'text-orange-700 bg-orange-200' : error === 'Segura' || error === 'Usuario disponible' ? 'text-green-700 bg-green-200' : 'text-red-700 bg-red-200'} ${error === '' ? 'hidden' : ''}`}>{error}</label>
      </div>
    </div>
  )
}

export default Input
