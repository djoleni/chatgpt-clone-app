import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'
import './homepage.css'

const Homepage = () => {

  const [typingStatus, setTypingStatus] = useState("human1")

  return (
    <div className='homepage'>
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Pyros AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, perferendis quisquam. Minus beatae officiis veniam ratione quod.</h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="bot" className="bot" />
          <div className="chat">
            <img src={typingStatus === "human1" ? "/human1.jpeg" : typingStatus === "human2" ? "/human2.jpeg" : "bot.png"} alt="" />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Jack: Where is Pisa?', 
                2000, ()=>{
                  setTypingStatus("bot")
                }, // wait 1s before replacing "Mice" with "Hamsters"
                'Bot: Pisa is in Italy.',
                2000, ()=>{
                  setTypingStatus("human2")
                },
                'Emma: Love you AI',
                2000, ()=>{
                  setTypingStatus("bot")
                },
                'Bot: Haha.',
                2000, ()=>{
                  setTypingStatus("human1")
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
       <img src="/logo.png" alt="" />
       <div className="links">
        <Link to="/">Terms of Service</Link>
        <span>|</span>
        <Link to="/">Privacy Policy</Link>
       </div>
      </div>
    </div>
  )
}

export default Homepage