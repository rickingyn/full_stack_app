import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(response => console.log(response.data.courses))
      .catch(error => console.log(error));
   
  })

  return (
    <div className="App">
    
    </div>
  );
}

export default App;
