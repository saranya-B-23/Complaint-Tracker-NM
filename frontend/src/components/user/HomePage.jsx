import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC'
import Complaint from '../user/Complaint';
import Status from '../user/Status';

const HomePage = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('Complaint');
   const [userName, setUserName] = useState('');

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUserName(name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      getData();
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const Logout = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
               <h1 className="navbar-brand text-light" style={{ fontSize: '24px', color: '#fff' }}>Hi, {userName}</h1>
               <div className="mt-2 navbar-collapse text-light" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-lg-0">
                     <li className="nav-item mb-2">
                        <NavLink
                           className={`nav-link text-light ${activeComponent === 'Complaint' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Complaint')}
                           style={{ fontSize: '18px', color: '#f1f1f1' }}
                        >
                           Complaint Register
                        </NavLink>
                     </li>
                     <li className="nav-item mb-2">
                        <NavLink
                           className={`nav-link text-light ${activeComponent === 'Status' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Status')}
                           style={{ fontSize: '18px', color: '#f1f1f1' }}
                        >
                           Status
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <button className="btn btn-danger" onClick={Logout} style={{ fontSize: '16px', backgroundColor: '#ff4d4d' }}>
                  LogOut
               </button>
            </div>
         </nav>
         <div className="body" style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>

            <div className="container" style={{ marginTop: '20px' }}>
               {activeComponent === 'Complaint' ? <Complaint /> : null}
               {activeComponent === 'Status' ? <Status /> : null}
            </div>
         </div>
         <Footer />
      </>
   );
};

export default HomePage;

