import React from 'react';
import {FaYoutube,FaLinkedin,FaGithub} from 'react-icons/fa'
import {IconContext} from "react-icons";
import {Link} from 'react-router-dom';
function FooterComponent() {
    const youtubeUrl="https://fontawesome.com/how-to-use/on-the-web/using-with/react",
        linkedinUrl="www.google.com",
        githubUrl="www.google.com";

    return (
        <div className={'footer'}>
            <div className={"footer-social-media-icons"}>
                <IconContext.Provider  value={{ size:"2rem",className:"footer-icon"}}>
                    <a href={youtubeUrl} target="_blank">
                        <FaYoutube />
                    </a>
                </IconContext.Provider>
                <IconContext.Provider  value={{ size:"2rem",className:"footer-icon"}}>
                    <a href={linkedinUrl} target="_blank">
                        <FaLinkedin />
                    </a>
                </IconContext.Provider>
                <IconContext.Provider  value={{ size:"2rem",className:"footer-icon"}}>
                    <a href={githubUrl} target="_blank">
                        <FaGithub />
                    </a>
                </IconContext.Provider>
            </div>
            <div className={"footer-copyright-text"}>
                <span>&copy; Copywright 2020 - UploadExa</span>
            </div>
        </div>
    )
}

export default FooterComponent;