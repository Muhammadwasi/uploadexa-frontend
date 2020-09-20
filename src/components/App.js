import React from 'react';
import "../css/App.scss"
import {BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import UploadPage from "./UploadPage";
import DownloadFileComponent from "./DownloadFileComponent";
import NavBarComponent from './NavBarComponent';
import AboutMeComponent from './AboutMeComponent';
import FooterComponent from "./FooterComponent";
const App =()=>{
    const location = useLocation();


      return (
            <div className="root-container" >
                {/*<div id="loader" className="lds-dual-ring hidden overlay"></div>*/}

                <div className="nav-bar-container">
                    <NavBarComponent/>
                </div>
                <div className="body-container">
                    <AnimatePresence exitBeforeEnter initial={false} >
                    <Switch location={location} key={location.pathname}>
                        <Route path="/" exact component={UploadPage}/>
                        <Route path="/download/:id" component={DownloadFileComponent}/>
                        <Route path="/about" component={AboutMeComponent}/>
                    </Switch>

                    </AnimatePresence>
                </div>
                <div className="footer-container">
                    <FooterComponent/>
                </div>
            </div>
    );

};

export default App;
