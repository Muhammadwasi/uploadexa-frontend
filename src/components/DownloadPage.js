import React from "react";
import axios from 'axios';

class App extends React.Component{
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



    render(){
        const fileListItems=this.state.uploadedFiles.map(
            (file)=> {
                return (
                    <div key={file.id} style={{display:"flex"}}>
                        <div>{file.name}</div>
                        {file.downloadUrl?<a href={file.downloadUrl}>Download from here</a>:<div></div>}
                    </div>
                )
            }
        );
        return (
            this.state.isValidUrl?fileListItems:<div>Invalid Url</div>
        );
    }
}

export default App;
