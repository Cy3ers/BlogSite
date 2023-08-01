import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const withDataFetching = (WrappedComponent) => {
  return (props) => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      axios
        .get(`http://localhost:5000/api/posts/${id}`)
        .then((response) => {
          const { title, content, tags } = response.data;
          setData({ title, content, tags: tags.join(', ') });
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, [id]);

    if (loading) {
      return <div>Loading...</div>;
    }

    // Pass the fetched data and other props to the wrapped component
    return <WrappedComponent data={data} {...props} />;
  };
};

export default withDataFetching;
