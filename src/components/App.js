import React from 'react';
import "../css/App.scss"
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import UploadPage from "./UploadPage";
import DownloadFileComponent from "./DownloadFileComponent";
import NavBarComponent from './NavBarComponent';
import AboutMeComponent from './AboutMeComponent';
import FooterComponent from "./FooterComponent";
class App extends React.Component{
    constructor(props) {
        super(props);

    }

    render(){
      return (
        <Router>
            <div className="root-container">
                {/*<div id="loader" className="lds-dual-ring hidden overlay"></div>*/}

                <div className="nav-bar-container">
                    <NavBarComponent/>
                </div>
                <div className="body-container">
                    <Switch>
                        <Route path="/" exact component={UploadPage}/>
                        <Route path="/download/:id" component={DownloadFileComponent}/>
                        <Route path="/about" component={AboutMeComponent}/>
                    </Switch>
                </div>
                <div className="footer-container">
                    <FooterComponent/>
                </div>
            </div>
        </Router>
    );
    }
}

export default App;
