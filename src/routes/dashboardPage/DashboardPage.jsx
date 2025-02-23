import { useAuth } from '@clerk/clerk-react'
import './dashboardPage.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DashboardPage = () => {
  const {userId, isLoaded} = useAuth();

  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoaded && !userId){
      navigate("/sign-in");
    }
  },[isLoaded, userId, navigate])

  if(!isLoaded) return "Loading...";

  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage