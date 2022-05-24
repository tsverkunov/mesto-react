import React, {useState} from 'react'

function ButtonBurger() {
  const [isActive, setIsActive] = useState(false)
  const handleClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div className={`burger ${isActive ? 'burger_active' : ''}`} onClick={handleClick}>
      <span/>
    </div>
  )
}

export default ButtonBurger