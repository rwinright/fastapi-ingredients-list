import React from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {
    console.log(props)
  return (
    <div className="Home">
        <div className="route-buttons">
            <div className="route-button">
                <Link to="/food">FOOD</Link>
            </div>
            <div className="route-button">
                <Link to="/todos">TODOS</Link>
            </div>
        </div>
    </div>
  )
}

export default Home