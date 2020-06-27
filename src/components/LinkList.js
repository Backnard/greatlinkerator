import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { render } from "react-dom";

const ASCENDING = {
  url: false,
  clicks: true,
  rating: false,
  ranking: false,
  comments: false,
  tags: false
}

const linkList = ({
  results,
  setResults,
  setRefresh,
  refresh
}) => {

  useEffect(() => {
    axios.get("/api/links").then((resp) => {
      console.log(
        "Entered Components LinkList. Returning links:",
        resp.data.links
      );
      console.log('refresh is set to:', refresh);
      setRefresh(false);
      return setResults(resp.data.links);
    });
  }, [refresh=== true]);

  function sortByUrl(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      const x = a.url.toLowerCase();
      const y = b.url.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    if (ASCENDING.url === true) {
      newArray.reverse();
      ASCENDING.url = false;
    } else {
      ASCENDING.url = true;
    }

    console.log('results sorted by url: ', newArray);
    setResults(newArray);
  };

    function sortByClicks(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      return a.clicks - b.clicks;
    });

    if (ASCENDING.clicks === true) {
      newArray.reverse();
      ASCENDING.clicks = false;
    } else {
      ASCENDING.clicks = true;
    }

    console.log('results sorted by clicks: ', newArray);
    setResults(newArray);
  };

  //change from .id to .rating when done
  function sortByRating(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      return a.id - b.id;
    });

    if (ASCENDING.id === true) {
      newArray.reverse();
      ASCENDING.id = false;
    } else {
      ASCENDING.id = true;
    }

    console.log('results sorted by rating: ', newArray);
    setResults(newArray);
  };

  //change from .id to .ranking when done
  function sortByRanking(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      return a.id - b.id;
    });

    if (ASCENDING.id === true) {
      newArray.reverse();
      ASCENDING.id = false;
    } else {
      ASCENDING.id = true;
    }

    console.log('results sorted by ranking: ', newArray);
    setResults(newArray);
  };

  function sortByComments(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      const x = a.comments.toLowerCase();
      const y = b.comments.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    if (ASCENDING.comments === true) {
      newArray.reverse();
      ASCENDING.comments = false;
    } else {
      ASCENDING.comments = true;
    }

    console.log('results sorted by comments: ', newArray);
    setResults(newArray);
  };

  //I think this works? need to create different tags to test
  function sortByTags(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      const x = a.tags.map(tag=>tag.name.toLowerCase()).join(',');
      const y = b.tags.map(tag=>tag.name.toLowerCase()).join(',');
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    if (ASCENDING.tags === true) {
      newArray.reverse();
      ASCENDING.tags = false;
    } else {
      ASCENDING.tags = true;
    }

    console.log('results sorted by tags: ', newArray);
    setResults(newArray);
  };

  return (
    <div>
      <button onClick={sortByUrl}>Sort by url</button>
      <button onClick={sortByClicks}>Sort by Clicks</button>
      <button onClick={sortByRating}>Sort by Rating</button>
      <button onClick={sortByRanking}>Sort by Ranking</button>
      <button onClick={sortByComments}>Sort by Comments</button>
      <button onClick={sortByTags}>Sort by Tags</button>
    </div>
  );
};

export default linkList;
