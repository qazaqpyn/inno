import { useEffect, useState } from "react";
import { IArticle } from "../types";
import api from '../services/api';

interface IUseFetchNewsTypeReturn {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    isAllNewsType: boolean;
    setIsAllNewsType: React.Dispatch<React.SetStateAction<boolean>>;
    articles: IArticle[];
    setArticles: React.Dispatch<React.SetStateAction<IArticle[]>>;
};


const useFetchNewsType = (): IUseFetchNewsTypeReturn => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [error, setError] = useState<string>('');
  const [isAllNewsType, setIsAllNewsType] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchArticles = async () => {
          try {
            if (isAllNewsType) {
              const response = await api.articles.getArticles();
              setArticles(response.articles);
            } else {
              const response = await api.articles.personalizedArticles();
              setArticles(response.articles);
            }
          } catch (error: any) {
            setError(error.message);
          } finally {
            setIsLoading(false);
          }
        };
        fetchArticles();
      }, [isAllNewsType]);

      return {isLoading, setIsLoading, error, setError , isAllNewsType, setIsAllNewsType, articles, setArticles};
}

export default useFetchNewsType;