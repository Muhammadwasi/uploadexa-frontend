import React from 'react';
import UploadShareComponent from './UploadShareComponent'
import AddFileComponent from './AddFileComponent';
import {IconContext} from "react-icons";
import axios from 'axios';
import GeneratedLinkComponent from "./GeneratedLinkComponent";
import { Alert } from 'reactstrap';

class UploadPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isAFileAdded: false,
            addedFiles: [],
            redirect:false,
            contentId:null,
            contentDownloadUrl:null,
            alertVisible:false,
            alertColor:null,
            alertText: null
        };
        this.msgs={
            fileAlreadyAdded: "The file has already been added",
            fileSizeTooLarge:"The file size can't be greater than 100 MB"
        }
        this.onAddFile=this.onAddFile.bind(this);
        this.onRemoveFile=this.onRemoveFile.bind(this);
        this.getFileUploadPage=this.getFileUploadPage.bind(this);
    }
    showAlert=function(color, text){
        this.setState({
            alertVisible:true,
            alertColor:color,
            alertText:text
        },()=>{
            window.setTimeout(()=>{
                this.setState({alertVisible:false})
            },2000)
        });

    }
    onAddFile=function(event){
        console.log("a file(s) is uploaded!"+event.target.value)
        let addedFiles=[...this.state.addedFiles]
        let fileList=event.target.files;
        for(let i =0;i<fileList.length;i++){
            if ((fileList[i].size/1024/1024) <= 100){
                let newFile={
                    name: fileList[i].name,
                    id: fileList[i].name,
                    fileObj:fileList[i],
                    isUploaded:false,
                    downloadUrl:null,
                    awsObjectId:null
                };
                if(addedFiles.some(file=>file.id===newFile.id)){
                    console.log(this.msgs.fileAlreadyAdded)
                    this.showAlert("info",this.msgs.fileAlreadyAdded)
                }else{
                    addedFiles.push(newFile)
                }
            }else{
                console.log(this.msgs.fileSizeTooLarge)
                this.showAlert("danger",this.msgs.fileSizeTooLarge)
            }


        }
        this.setState(function (prevState) {
            return {
                addedFiles: addedFiles,
                isAFileAdded: addedFiles.length>0
            }
        })
    };

    onRemoveFile=function(fileId){
        console.log(fileId + " has been removed!")
        this.setState(function (prevState) {
            let newFiles=prevState.addedFiles.filter(file=>file.id!==fileId)
            return {
                addedFiles: newFiles,
                isAFileAdded: newFiles.length===0? false :true
            }
        })
    };

    getFileRequest=function(options, fileId){
        document.getElementById(`loader-${fileId}`).classList.toggle("hidden")
        document.getElementById(`remove-icon-${fileId}`).classList.toggle("hidden")

        return new Promise((resolve ,reject)=>{
            axios(options).then((response)=>{
                this.setState(function (prevState) {
                    let newFiles=prevState.addedFiles.map( (file)=> {
                        if(file.id===fileId){
                            file.isUploaded=true
                            file.downloadUrl=response.data.file.downloadUrl
                            file.awsObjectId=response.data.file.id
                        }
                        return file
                    });
                    return {
                        addedFiles: newFiles,
                        isAFileAdded: newFiles.length===0? false :true
                    }
                });
                resolve(response.data.file)
                console.log("response: ")
                console.log(response.data)
                document.getElementById(`loader-${fileId}`).classList.toggle("hidden")
                document.getElementById(`upload-done-${fileId}`).classList.toggle("hidden")
            }).catch((error)=>{
                reject(error)
                console.log(error)
                document.getElementById(`loader-${fileId}`).classList.toggle("hidden")
                document.getElementById(`remove-icon-${fileId}`).classList.toggle("hidden")
            })
        })
    };

    onGetLink=function(){
        //document.getElementById("loader").classList.toggle("hidden")
        let uploadFileRequests=[];
        let options,data;
        this.state.addedFiles.forEach((file)=>{
            data = new FormData();
            data.append('file',file.fileObj);
            options={
                method: 'post',
                url:"v1/storage/uploadFile",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data:data,
                onUploadProgress: (progressEvent) => {
                    const {loaded, total} = progressEvent;
                    let percent = Math.floor( (loaded * 100) / total )
                    console.log( `${loaded}kb of ${total}kb | ${percent}%` );

                    /*if( percent < 100 ){
                        this.setState({ uploadPercentage: percent })
                    }*/
                }

            };
            uploadFileRequests.push(this.getFileRequest(options,file.id))
        });

        Promise.all(uploadFileRequests).then((allFilesData)=>{
            console.log(allFilesData)
            this.postUserContent(allFilesData)
            // document.getElementById("loader").classList.toggle("hidden")

        }).catch((error)=>{
            console.log(error)
            // document.getElementById("loader").classList.toggle("hidden")

        });
    };

    postUserContent=function(filesData){
        let options;

        options={
            method: 'post',
            url:"v1/storage/saveUserContent",
            headers: {
                'Content-Type': 'application/json',
            },
            data:{
                files:filesData
            }
        };

        axios(options).then((response)=>{
            console.log(response.data)
            this.setState({
                redirect:true,
                contentId:response.data.userContentDTO.contentId,
                contentDownloadUrl: window.location.protocol + "//" + window.location.host
                    + "/download/"+response.data.userContentDTO.contentId
            })

        }).catch((error)=>{
            console.log(error)
        })

        /*
        status: 0
        userContentDTO:
        contentId: "5f41ac4ab3428531074c04f4"
        files: Array(2)
        0: {id: "1598139465046-file2.txt", name: "file2.txt", downloadUrl: "https://upxa.s3.ap-south-1.amazonaws.com/159813946…cd0999e6943b6143acf4439f0a355f1d821fb8fa0b8c8a232"}
        1: {id: "1598139465048-instructions.txt", name: "instructions.txt", downloadUrl: "https://upxa.s3.ap-south-1.amazonaws.com/159813946…2c37af832b4a7f3f695a5d8b40b9070a7ee08bd743ad2b585"}
        length: 2
        * */

    };

    getFileUploadPage=function(){

        return this.state.contentDownloadUrl ?
            <GeneratedLinkComponent
                addedFiles={this.state.addedFiles}
                contentDownloadUrl={this.state.contentDownloadUrl}
            />:
            (this.state.isAFileAdded ?
                <AddFileComponent
                    addedFiles={this.state.addedFiles}
                    onRemoveFile={(fileId)=>this.onRemoveFile(fileId)}
                    onAddFile={(event)=>this.onAddFile(event)}
                    onGetLink={(event)=>this.onGetLink(event)}
                /> :
                <UploadShareComponent
                    onAddFile={this.onAddFile}
                />)

    };

    render(){
        return (
            <IconContext.Provider value={{ color: "gray", size:"2rem"}}>

                <div className={"main-upload-container"}>

                    {this.getFileUploadPage()}
                </div>
                <Alert style={{position:"fixed", margin: "1rem auto"}} color={this.state.alertColor} isOpen={this.state.alertVisible} >
                    {this.state.alertText}
                </Alert>

            </IconContext.Provider>
        );
    }
}

export default UploadPage;
