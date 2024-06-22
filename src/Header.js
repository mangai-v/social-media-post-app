import React from 'react'
import {FaMobileAlt,FaTabletAlt,FaLaptop} from 'react-icons/fa'

const Header = ({title,width}) => {
  return (
    <header className='Header'>
        <h1>{title}</h1>
        {width<728 ? <FaMobileAlt></FaMobileAlt>:width<992 ? <FaTabletAlt></FaTabletAlt>:<FaLaptop/>}
    </header>
  )
}

export default Header