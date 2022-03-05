import './App.css';
import React from 'react';


function App() {
  const [imgTitle, setImgTitle] = React.useState('');
  const [textTitle, setTextTitle] = React.useState('');

  const handleImageChange = (event) => {
    let img = event.target.files[0];
    
    setImgTitle(URL.createObjectURL(img));
    console.log("name:" + event.target.files[0].name);
    console.log("type:" + event.target.files[0].type);

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
      <img src={imgTitle} id="img-change" width='300'/>
    </div>
  );
}

export default App;
