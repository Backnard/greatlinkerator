import React, { useState, useEffect } from "react";
import { List, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { render } from "react-dom";

const ASCENDING = {
  url: false,
  clicks: true,
  rating: true,
  ranking: false,
  comments: false,
  tags: false
}

const SortTable = ({
  results,
  setResults,
  setRefresh,
  refresh
}) => {

  useEffect(() => {
    axios.get("/api/links").then((resp) => {
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

    setResults(newArray);
  };

  function sortByRating(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      return a.rating - b.rating;
    });

    if (ASCENDING.rating === true) {
      newArray.reverse();
      ASCENDING.rating = false;
    } else {
      ASCENDING.rating = true;
    }

    console.log('results sorted by rating: ', newArray);
    setResults(newArray);
  };

  function sortByRanking(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      return a.ranking - b.ranking;
    });

    if (ASCENDING.ranking === true) {
      newArray.reverse();
      ASCENDING.ranking = false;
    } else {
      ASCENDING.ranking = true;
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

    setResults(newArray);
  };

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

    setResults(newArray);
  };

  return (
    <>
      <Button.Group>
      <Button onClick={sortByUrl}>Sort by url/></Button>
      <Button onClick={sortByClicks}>Sort by Clicks</Button>
      <Button onClick={sortByRating}>Sort by Rating</Button>
      <Button onClick={sortByRanking}>Sort by Ranking</Button>
      <Button onClick={sortByComments}>Sort by Comments</Button>
      <Button onClick={sortByTags}>Sort by Tags</Button>
      </Button.Group>
    </>
  );
};

export default SortTable;