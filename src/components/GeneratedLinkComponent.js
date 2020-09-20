import React from "react";
import {IconContext} from 'react-icons';

import {MdContentCopy,MdCheckCircle} from 'react-icons/md'

class GeneratedLinkComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = { copySuccess: '' }

    }


    copyToClipboard=(e)=> {
        let textarea=document.getElementById("link-area")
        textarea.select();
        document.execCommand('copy');
        //e.target.focus();
        this.setState({ copySuccess: 'Copied!' });

    };

    getCopyLinkButton=function(){
        return(
            <div className={"generated-link-component-link-button"}>
                <textarea id={"link-area"} value={this.props.contentDownloadUrl} readOnly/>
                <IconContext.Provider value={{ className:"upload-done-icon"}}>
                    <MdContentCopy size="2rem" onClick={this.copyToClipboard}/>
                </IconContext.Provider>
                    {/*{this.state.copySuccess}*/}
            </div>
        )
    };

    getFileListItems=function(){
        const fileListItems=this.props.addedFiles.map(
            (file)=> {
                return (
                    <div key={file.id} className={"generated-link-component-file-list-item"}>
                        <div className={"file-name"}>{file.name}</div>
                        <IconContext.Provider value={{ className:"upload-done-icon"}}>

                            <MdCheckCircle size="2rem" />
                        </IconContext.Provider>
                        {/*{file.downloadUrl?<a href={file.downloadUrl}>Download from here</a>:<div></div>}*/}
                    </div>
                )
            }
        );

        return (
            <div className={"generated-link-component-file-list"}>
                {fileListItems}
            </div>
        );
    };


    render(){

        return (
            <div className={"generated-link-component"}>
                {this.getFileListItems()}
                {this.getCopyLinkButton()}
            </div>

        );
    }
}

export default GeneratedLinkComponent;
