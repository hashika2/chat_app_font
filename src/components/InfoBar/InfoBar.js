import React from 'react';
import {Link} from 'react-router-dom';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room ,getData}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <Link to='/join' style={{color:"black"}}>⬅️</Link> 
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
     <Link to='/' style={{color:"black"}}>logout</Link> 
      <input type="submit" value="setting" onClick={e => getData(e)}/>
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;