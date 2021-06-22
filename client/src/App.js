import React,  { useState,useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

const [movieName, setMovieName]= useState("");
const [review, setReview]= useState("");
const [rate, setRate]= useState("");
const[movieList, setMovieList] = useState([]);


//post method 
const submitReview = () => {
  Axios.post("http://localhost:3001/api/insert", 
  {movieName: movieName,
   review: review,
  rate:rate}).then(()=>{
    alert("successful inesrt");
  });
};



//get method
useEffect(()=>{
  Axios.get("http://localhost:3001/api/get").then((response)=>{
    // console.log(response.data);
    setMovieList(response.data)
  });
});


  return (
    <div className="App">
      <h1>CRUD APP</h1>
      <div className="form">
      <label>Movie Name</label>
      <input type = "text"
       name = "movieName"
        onChange={(e)=>{
        setMovieName(e.target.value);
      }}/> 
      <label>Review</label>
      <input type = "text" name = "review"
      onChange={(e)=>{
        setReview(e.target.value);
      }}
      />
      <label>Your Rating</label>
      <input type = "int" name = "rate"
      onChange={(e)=>{
        setRate(e.target.value);
      }}
      />
      <button onClick={submitReview}>Submit</button>

      
      
      {movieList.map((val)=> {
        return(
          <div className ="card">
           <p> Movies: {val.movie} </p>
           <p>Review: {val.review} </p>
           <p>Rating: {val.rate} </p>
          </div>
        );
      })}

      </div>
    </div>
  );
}

export default App;