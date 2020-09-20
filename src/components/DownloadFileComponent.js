import React  from "react";
import axios from 'axios';
import {IconContext} from 'react-icons';
import {MdFileDownload} from 'react-icons/md'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import saveAs from 'file-saver'
class DownloadFileComponent extends React.Component{
    constructor(props) {
        super(props);
        console.log(props)
        this.state={
            contentId: props.match.params.id,
            uploadedFiles:[],
            isValidUrl:null
        };

        this.getUserContent=this.getUserContent.bind(this)
        this.getUserContent()
    }
    getUserContent=()=>{
        let options;


        options={
            method: 'get',
            url:"v1/storage/getUserContent/"+this.state.contentId,
            headers: {
                'Content-Type': 'application/json',
            },
            data:''

        };

        axios(options).then( (response) =>{
            console.log(response.data)
            if(response.data.userContentDTO){
                this.setState({
                    uploadedFiles:response.data.userContentDTO.files,
                    isValidUrl:true
                })
            }else{
                this.setState({
                    isValidUrl:false
                })
            }

        }).catch(function (error) {
            console.log(error)
        })

    };

    downloadAllFiles=  function(){
         let zip = new JSZip();
         let count=0,zipFileName=`uploadexa-${new Date().getTime()}`;
         console.log("downloading files implementation.")
        this.state.uploadedFiles.forEach((file)=>{
            console.log("Downloading file...");
            JSZipUtils.getBinaryContent(file.downloadUrl, (err,data)=> {
                if(err) {
                    console.log("Error occured")
                    throw err; // or handle the error
                }
                zip.file(file.name, data, {binary:true});
                count++;
                if (count === this.state.uploadedFiles.length) {
                    zip.generateAsync({type:"blob"})
                        .then(function(content) {
                            // see FileSaver.js
                            saveAs(content, zipFileName);
                        });
                }
            });
        });


    };

    download=async function(url) {
        var element = document.createElement('a');
        element.setAttribute('href',url );

        element.style.display = 'none';
        document.body.appendChild(element);

        await element.click();

        document.body.removeChild(element);
    };
    getDownloadFileButton=function(){
        return(
            <div onClick={()=>this.downloadAllFiles()}  className={"download-file-component-download-all-button"}>
                <IconContext.Provider value={{ className:"download-icon"}}>
                        <MdFileDownload size="2rem"/>
                </IconContext.Provider>
                <span>Download All</span>
            </div>
        )
    };

    getFileListItems=function(){
        const fileListItems=this.state.uploadedFiles.map(
            (file)=> {
                return (
                    <div key={file.id} className={"download-file-component-file-list-item"}>
                        <div className={"file-name"}>{file.name}</div>
                        <IconContext.Provider value={{ className:"download-icon"}}>
                                <MdFileDownload size="2rem" onClick={()=>this.download(file.downloadUrl)} />
                        </IconContext.Provider>
                    </div>
                )
            }
        );

        return (
            <div className={"download-file-component-file-list"}>
                {fileListItems}
            </div>
        );
    };
    render(){

        return (
            <div className={"main-upload-container"}>
            <div className={"download-file-component"}>
                {this.getFileListItems()}
                {this.getDownloadFileButton()}
            </div>
            </div>

        );
    }
}

export default DownloadFileComponent;
