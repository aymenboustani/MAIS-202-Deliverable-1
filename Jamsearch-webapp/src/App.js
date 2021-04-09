import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Predictions from './pages/Predictions';
import { ThemeProvider } from 'styled-components';

const theme = {
  mainColors: {
    blue: '#41b3ab',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

const App = () => {
  const [savedShows, setSaved] = useState([]);

  let updateSaved = (action, id) => {
    var newSaved = [];
    switch (action) {
      case 'add':
        newSaved = savedShows;
        newSaved.push(id);
        setSaved(newSaved);

        console.log(savedShows);
        break;

      case 'remove':
        newSaved = savedShows.filter(val => val !== id);
        setSaved(newSaved);

        break;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Switch>
          <Route exact path="/">
            <Home savedShows={savedShows} updateSaved={updateSaved} />
          </Route>
          <Route exact path="/starred">
            <Starred savedShows={savedShows} updateSaved={updateSaved} />
          </Route>
          <Route exact path="/predictions">
            <Predictions savedShows={savedShows} updateSaved={updateSaved} />
          </Route>
          <Route>this is 404 page</Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
