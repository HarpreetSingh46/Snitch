import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'   

const Protected = ({children , role="buyer"}) => {
 
    const user =  useSelector((state) => state.auth.user)
    const loading =  useSelector((state) => state.auth.loading)
    if (loading) {
        return (
            <div className="min-h-screen bg-[#000000] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#6366f1]/20 border-t-[#6366f1] rounded-full animate-spin" />
            </div>
        )
    }
    if(!user){
        return <Navigate to="/login" />
    }
        if(user.role !== role){ 
            return <Navigate to="/" />
        }

  return (
    <div>
      {children}
    </div>
  )
}

export default Protected
