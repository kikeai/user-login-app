import { useAppDispatch, useAppSelector } from '../../store/store'

const useGetUser = () => {
  const dispatch = useAppDispatch()
  const { email } = useAppSelector(state => state.user)
}

export default useGetUser
