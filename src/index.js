import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import LinksList from './components/links';


const App =()=>{

   return (
       <Router>
            <div>
                <h1>Hello Patrick!</h1>
                <LinksList/>
            </div>
       </Router>     
   );
}



ReactDOM.render(
    <App />,
    document.getElementById('app')
  );