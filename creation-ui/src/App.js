import './App.css';
import React from 'react';
import axios from 'axios';


function Response(props) {
  const responseMsg = props.responseMsg;
  return (
    <div>
      {responseMsg &&
        <h2>
          Response {responseMsg}.
        </h2>
      }
    </div>
  );
}

function App() {
  const [imgTitle, setImgTitle] = React.useState('');
  const [textTitle, setTextTitle] = React.useState('');
  const [imgState, setImgState] = React.useState('');
  const [msgs, setMsgs] = React.useState('');



  const handleImageChange = (event) => {
    let img = event.target.files[0];
    
    setImgTitle(img);
    setImgState(URL.createObjectURL(img));
    //console.log("name:" + event.target.files[0].name);
    //console.log("type:" + event.target.files[0].type);

  };

  const handleTextChange = (event) => {
    const value = event.target.value;
    setTextTitle(value);
    console.log("value: " + value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("handleSubmit");
    console.log("text: " + textTitle);
    console.log("imgTitle: " + imgTitle);
    console.log("imgTitle: " + "imgTitle.name");


    let form_data = new FormData();
    //form_data.append('image', this.state.image, this.state.image.name);
    // form_data.append('metadata', {
    //   "Serial Number" : "textTitle",
    // });
    let metadata = "{"
      + "\"Serial Number\": \"serial\""
    +"}";

    form_data.append('metadata', metadata);
    form_data.append('Serial Number', textTitle);
    form_data.append('image', imgTitle, imgTitle.name);
    //form_data.append('content', this.state.content);
    let url = 'http://127.0.0.1:8000/mint/uploads/'; //TODO 
    axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
          .then(res => {
            console.log(res.data);
            setMsgs('succeeded');
            // send to next webpage, call by url

          })
          .catch(err => {
            console.log(err);
            setMsgs('failed');
          })
    };

  return (
    <div className="myDiv">
      <h1>Manufacture an NFT</h1>
      <form className = "form-c" action="/action_page.php" onSubmit={handleSubmit}>
        <p> Upload a picture of your item here: </p>
        <input onChange={handleImageChange} type="file" id="img" name="img" accept="image/*"/>
        <p> Serial Number: <input type="text" onChange={handleTextChange}/> </p>
        <input type="submit" value="Submit"/>
        
      </form>
      <Response responseMsg={msgs} />
      <img src={imgState} id="img-change" width='300'/>

    </div>
  );
}

export default App;
