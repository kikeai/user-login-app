import { type ButtonProps } from '../../types/types'

const Button = ({ text, onClick, stretch, type }: ButtonProps) => {
  return (
    <button
    type={type}
    onClick={onClick}
    className={`bg-white ${!stretch ? '' : 'w-4/5'} border-2 border-black rounded-xl font-semibold py-2 px-6 transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-70 disabled:cursor-default disabled:hover:bg-white disabled:hover:text-black`}>
      {text}
    </button>
  )
}

export default Button
