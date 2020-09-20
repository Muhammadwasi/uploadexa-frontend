import React from 'react';
import {FaYoutube,FaLinkedin,FaGithub} from 'react-icons/fa'
import {IconContext} from "react-icons";
function FooterComponent() {
    const youtubeUrl="https://www.youtube.com/channel/UCjESH79SMy8t7ZKpDKWsv_A",
        linkedinUrl="https://www.linkedin.com/in/muhammad-wasi-naseer/",
        githubUrl="https://github.com/Muhammadwasi";

    return (
        <div className={'footer'}>
            <div className={"footer-social-media-icons"}>
                {/*<IconContext.Provider  value={{ size:"2rem",className:"footer-icon"}}>
                    <a href={youtubeUrl} target="_blank">
                        <FaYoutube />
                    </a>
                </IconContext.Provider>*/}
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