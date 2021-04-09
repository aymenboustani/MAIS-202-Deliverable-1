import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { useLastQuery } from '../misc/custom-hooks';
import { SearchButtonWrapper, SearchInput } from './Home.styled';

const Home = ({ savedShows, updateSaved }) => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);

  const rerender = () => {
    var copy = input;
    copy += ' ';
    setInput(copy);
  };

  const onInputChange = useCallback(
    ev => {
      setInput(ev.target.value);
    },
    [setInput]
  );

  const renderResults = results => {
    if (results) results = results.songs;
    if (results && results.length === 0) {
      return <div>No results</div>;
    }

    if (results && results.length > 0) {
      return (
        <ShowGrid
          data={results}
          savedShows={savedShows}
          updateSaved={updateSaved}
          reload={rerender}
        />
      );
    }

    return null;
  };

  const onSearch = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:5000/');
    var raw = JSON.stringify({ title: input });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch('http://localhost:5000/getSearchResults/', requestOptions)
      .then(data => data.json())
      .then(res => {
        setResults(res);
      });
  };

  const onKeyDown = ev => {
    ev.keyCode === 13 && onSearch();
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
        <Link to="/predictions">
          <button type="button">Predict</button>
        </Link>
      </SearchButtonWrapper>
      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
