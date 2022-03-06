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

function DisplayNFTs() {
  const [photos, setPhotos] = React.useState([]);
  // const photos = [];

  

  const onClick = () => {
    // setPhotos([{'id': 'id1', 'name': 'name1'}])

    fetch("http://127.0.0.1:8000/mint/uploads",
    {
      method: 'GET',

    }).then(response => response.json())
      .then(
        (data) => {
          console.log(data);
          console.log(data[1]);
          console.log("Reached 2");

          let ls = [];
          console.log(Object.keys(data));
          Object.keys(data).forEach(e => {
            let val = data[e];
            console.log(data[e]);
            console.log("img: " + val.image);
            //console.log(URL.createObjectURL(new Blob(val.image, {type: "image/png"})));
            //URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))

            if (val.image) {
              console.log("jj: " + val);
              // let imgURL = val.image;
              // console.log("imgURL: " + imgURL);
              ls.push({'id': val.id, 'metadata': val.metadata, 'image' : val.image});
            }
              //console.log("dd" + val);

            // let imgURL = URL.createObjectURL(val.image);

            // let imgURL = "";
            // if (val.image.url == null) {
              // imgURL = val.image;
            // }
            // ls.push({'id': val.id, 'metadata': val.metadata, 'image' : imgURL});//'image': URL.createObjectURL(val.image)});

          });
          
          // let ls = [];
          // data.array.forEach(e => {console.log("id: " + e));
            
            
            // ls.push({'id': e, 'metadata': 'yolo'});
          //});
          setPhotos(ls);
          // return result;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("Reached error")
          // return error;
        }
      );
    // console.log("")
    
    // setPhotos( photos => [...photos, `${photos.length}`]);


  };

  return (
    <div className="myDiv">
      <h1>NFTs Available</h1>
      <input type="button" onClick={ onClick } value="Update" />
      <div>
      {photos.length > 0 && (
        <ul>
          {photos.map(photo => (
            <li key={photo.id}>{photo.metadata}
            <img src={photo.image} />
            </li>
            
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

function Intake(props) {
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
            props.onIntake("succeeded");

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

function App(props) {

  const [showIntake, setShowIntake] = React.useState(true); //Setting this to False for now

  const handleIntake = (text) => {
    console.log("text: " + text);
    if (text === "succeeded") {
      setShowIntake(false)
    }
  };

  return (
    <div>
    {showIntake &&
      <Intake onIntake={handleIntake}/>
    }
    {!showIntake &&
      <DisplayNFTs />
    }
    </div>
  );
}

export default App;
