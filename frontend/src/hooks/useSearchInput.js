import { useState } from 'react';
import { searchBlog } from '../api/api';

const useSearchInput = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    searchBlog(query).then((response) => {
      setResults(response.data);
      setLoading(false);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      handleSearch();
    }
  };

  return {
    query,
    setQuery,
    results,
    loading,
    handleSearch,
    handleKeyPress,
  };
};

export default useSearchInput;
