import { Outlet } from "react-router-dom"
import "./dashboardLayout.css"
import ChatList from "../../components/chatList/ChatList"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react';

const DashboardLayout = () => {

  const {userId, isLoaded} = useAuth();

  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoaded && !userId){
      navigate("/sign-in");
    }
  },[isLoaded, userId, navigate])

  if(!isLoaded) return "Loading...";

  return (
    <div className='dashboardLayout'>
        <div className="menu"><ChatList/></div>
        <div className="content">
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout