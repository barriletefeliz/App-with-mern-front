import React from 'react'
import Nodelogo from '../../../Assets/Icons-svg/nodejs.svg'
import Express from '../../../Assets/Icons-svg/expressicon.svg'
import Reactlogo from '../../../Assets/Icons-svg/logo.svg'
import Mongologo from '../../../Assets/Icons-svg/mongodb.svg'
import Sasslogo from '../../../Assets/Icons-svg/sass.svg'
import './Style.scss'


const Icons = () => {
    /*
    <img src={Expresslogo} className="icon-footer" alt="logo" />            
    */
    return(
        <section className="footer-icon">
        <img src={Mongologo} className="icon-footer" alt="logo-mongo" /> 
        <img src={Express} className="icon-footer" alt="logo-express" /> 
        <img src={Reactlogo} className="icon-footer react-logo " alt="logo-react" />    
        <img src={Nodelogo} className="icon-footer node" alt="logo-node" />    
        <img src={Sasslogo} className="icon-footer sass-logo" alt="logo-sass" />         
    </section>

    );
}

export default Icons