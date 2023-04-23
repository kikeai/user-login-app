import { type TypesInput } from '../../types/types'

interface Props {
  seter: React.Dispatch<React.SetStateAction<TypesInput>>
}

const VisibilityOff = ({ seter }: Props) => {
  return (
    <svg onClick={() => seter('password')} className="hover:cursor-pointer w-6 absolute right-2" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
      <path d="m629 637-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650 556q0 22-5.5 43.5T629 637Zm129 129-40-40q49-36 85.5-80.5T857 556q-50-111-150-175.5T490 316q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485 256q143 0 261.5 81.5T920 556q-26 64-67 117t-95 93Zm58 226L648 827q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40 556q20-52 55.5-101.5T182 360L56 234l42-43 757 757-39 44ZM223 402q-37 27-71.5 71T102 556q51 111 153.5 175.5T488 796q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z" stroke="#000000" strokeWidth='16'/>
    </svg>
  )
}

export default VisibilityOff
