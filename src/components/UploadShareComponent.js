import React from "react";
import {IconContext} from 'react-icons';
import {MdCloudUpload} from 'react-icons/md'
class UploadShareComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"upload-share-component"}>
                    <label htmlFor="upload-share" >
                        <IconContext.Provider value={{ className:"upload-share-component-icon"}}>
                            <MdCloudUpload size={"12rem"}/>
                        </IconContext.Provider>
                        <div className={"upload-share-component-button"}>
                            <span >Upload and Share</span>
                        </div>
                    </label>
                    <input
                        id="upload-share"
                        style={{display:"none"}}
                        type="file"
                        name="file"
                        onChange={(event)=>this.props.onAddFile(event)}
                        onClick={(event) =>{event.target.value=null}}
                        multiple
                    />

            </div>
        )
    }
}

export default UploadShareComponent;