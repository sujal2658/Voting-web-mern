import authService from '../Backend/auth'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();
    const handelSubmit = async ()=>{
        authService.logout()
        navigate("/")
    }
  return (
    <button onClick={handelSubmit}>Logout</button>
  )
}

export default Logout