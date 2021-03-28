import React from "react";
import { Button, Input } from "semantic-ui-react";

const Searchbar = () => {
  return (
    <div>
      <Input type="text" placeholder="Search..." action>
        <input />
        <Button primary>Search</Button>
      </Input>
      <Button secondary>Generate Results</Button>
    </div>
  );
};

export default Searchbar;
