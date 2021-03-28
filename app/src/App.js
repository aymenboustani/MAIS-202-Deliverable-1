import "./App.css";
import React, { useState } from "react";
import Results from "./components/Results";
import Output from "./components/Output";
import { Button, Input } from "semantic-ui-react";

function App() {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [output, setOutput] = useState([]);

  const inputHandler = (ev) => {
    //for handline what is typed in the search bar
    setInput(ev.target.value);
  };

  const onSearch = () => {
    //have to make a post request here
  };

  return (
    <div className="App">
      <Input type="text" placeholder="Search..." action>
        <input value={input} onChange={inputHandler} />
        <Button primary onClick={onSearch}>
          Search
        </Button>
      </Input>
      <Button secondary>Generate Results</Button>
      <Results results={searchResults} />
      <Output />
    </div>
  );
}

export default App;
