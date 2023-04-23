import { type InputProps } from '../../types/types'

const Input = ({ value, name, placeholder, type, onChange, error }: InputProps) => {
  const errorOrComplejity = error !== 'Insegura' && error !== 'Aceptable' && error !== 'Segura' && error !== ''
  return (
    <div className='w-4/5'>
      <input
      value={value}
      name={name}
      onChange={onChange}
      className={`border-2 outline-none mb-2 ${errorOrComplejity ? 'border-red-700' : 'border-black'} rounded-lg h-10 pl-2 text-lg font-semibold w-full`}
      placeholder={placeholder}
      type={type}
      />
      <label className={`text-sm font-semibold p-1 rounded-sm ${error === 'Insegura' ? 'text-red-700 bg-red-200' : error === 'Aceptable' ? 'text-orange-700 bg-orange-200' : error === 'Segura' ? 'text-green-700 bg-green-200' : 'text-red-700 bg-red-200'} ${error === '' ? 'hidden' : ''}`}>{error}</label>
    </div>
  )
}

export default Input
