import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img style={{ width: "300px" }} src={assets.logo} alt="" />
          <p style={{
            fontFamily: 'Arial, Helvetica, Roboto, sans-serif',
            fontWeight: 'bold',
            fontSize: '30px',
          }}>🐘Chạm vị Thái với Siam Spice Pot🐘</p>
          {/* <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div> */}
        </div>
        {/* <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div> */}
        <div className="footer-content-right">
          <h2 style={{
            color: 'black',
            fontFamily: 'Arial, Helvetica, Roboto, sans-serif',
            fontWeight: 'bold',
            fontSize: '30px',
          }}>Liên hệ</h2>
          <ul>
            <li>
              ♨️ Facebook: <a href='https://www.facebook.com/profile.php?id=61566002715118' className="styled-link">
                <span>https://www.facebook.com/siamspicepot</span>
              </a>

            </li>
            <li>♨️ Hotline: 0866.086.154 </li>
            <li>
              ♨️ Mail: siamspicepot@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Footer
