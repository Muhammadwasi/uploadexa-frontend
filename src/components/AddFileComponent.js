import React from "react";
import {MdRemoveCircle,MdLink,MdCheckCircle} from 'react-icons/md'
import {RiLoader5Line} from 'react-icons/ri'
import {MdAdd} from 'react-icons/md'
import {IconContext} from "react-icons";

class AddFileComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    getAddFileButton=function(){

        return (
            <div>
                <label htmlFor="add-button"  className={"add-file-component-add-button"} >
                    <IconContext.Provider value={{ className:"add-file-component-add-button-icon"}}>
                        <MdAdd size={"2rem"}/>
                    </IconContext.Provider>
                    <span>Add Files</span>
                </label>

                <input
                    id="add-button"
                    style={{display:"none"}}
                    type="file"
                    name="file"
                    onChange={(event)=>this.props.onAddFile(event)}
                    onClick={(event) =>{event.target.value=null}}
                    multiple
                />
            </div>
        )
    };

    getFileListItems=function(){
        const fileListItems=this.props.addedFiles.map(
            (file)=> {
                return (
                    <div key={file.id} className={"add-file-component-file-list-item"}>
                        <div className={"file-name"}>{file.name}</div>
                        <IconContext.Provider value={{ className:"upload-done-icon hidden"}}>

                            <MdCheckCircle id={`upload-done-${file.id}`} size="2rem" />
                        </IconContext.Provider>
                        <IconContext.Provider  value={{ className:"loader-icon lds-dual-ring hidden overlay"}}>
                            <RiLoader5Line id={`loader-${file.id}`} size={"2rem"}/>
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className:"remove-file-icon"}}>

                            <MdRemoveCircle id={`remove-icon-${file.id}`} size="2rem" value={file.id} onClick={() => this.props.onRemoveFile(file.id)}/>
                        </IconContext.Provider>
                        {/*{file.isUploaded?<span>File Uploaded</span>:<div>Not Uploaded</div>}*/}
                        {/*{file.downloadUrl?<a href={file.downloadUrl}>Download from here</a>:<div></div>}*/}
                    </div>
                )
            }
        );
        return (
            <div className={"add-file-component-file-list"}>
                {fileListItems}
            </div>
        );
    };

    getGetLinkButton=function(){
        return (
            <div onClick={()=>this.props.onGetLink()} className={"add-file-component-get-link-button"}>
                <IconContext.Provider value={{ className:"get-link-icon"}}>
                    <MdLink size="2rem" />
                </IconContext.Provider>
                <span>Get Link</span>
            </div>
        );
    };

    render() {


        return (
            <div className={"add-file-component"}>
                {this.getFileListItems()}
                {this.getAddFileButton()}
                {this.getGetLinkButton()}
            </div>

        )
    }
}

export default AddFileComponent