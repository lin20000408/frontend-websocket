import { useContext } from 'react'
import _Login from '@/components/Login'
import _Menu from '@/components/Menu'
import { Content } from "@/App";

const Login = () => {
  const { activeScreen } = useContext(Content)
  return (
    <div>
      {activeScreen === 'loginScreen' &&
        <_Login />
      }
      {activeScreen === 'menuScreen' &&
        <_Menu />}

    </div>
  )
}
export default Login;