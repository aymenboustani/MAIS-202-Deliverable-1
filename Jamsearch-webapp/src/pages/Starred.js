import React, { useState, useEffect } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';

const Starred = ({ savedShows, updateSaved }) => {
  const [data, updateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [random, updateRandom] = useState(Math.random);

  useEffect(() => {
    if (savedShows && savedShows.length > 0) {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:5000/');
      var raw = JSON.stringify({ songs: savedShows });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      fetch('http://localhost:5000/search/', requestOptions)
        .then(data => data.json())
        .then(res => {
          updateData(res.songs);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [savedShows]);

  const rerender = () => {
    updateRandom(Math.random);
  };

  return (
    <MainPageLayout>
      {isLoading && <div>songs are still loading</div>}
      {!isLoading && !data && <div>No songs were added</div>}
      {!isLoading && data && (
        <ShowGrid
          data={data}
          savedShows={savedShows}
          updateSaved={updateSaved}
          reload={rerender}
        />
      )}
    </MainPageLayout>
  );
};

export default Starred;
