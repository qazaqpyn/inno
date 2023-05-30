import { useState, useEffect } from 'react';
import api from '../services/api';
import { IFilterOptions } from '../types';

const useFilterOptions = (): [boolean, string, IFilterOptions] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [listFilter, setListFilter] = useState<IFilterOptions>({
    categories: [],
    sources: [],
    authors: []
  });

  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true);

      try {
        const response = await api.articles.getFilterOptions();
        setListFilter(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return [isLoading, error, listFilter];
};

export default useFilterOptions;
