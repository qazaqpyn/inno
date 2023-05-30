import { IArticle, IArticleSearch } from "../types";
import api from '../services/api';


interface ISearchParams {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setArticles: React.Dispatch<React.SetStateAction<IArticle[]>>;
}

const useSearch = ({ setIsLoading, setError, setArticles }: ISearchParams) => {
    const searchHander = async (props: IArticleSearch) => {
        try {
          setIsLoading(true);
          console.log(props);
          const response = await api.articles.searchArticles(props);
          console.log(response);
          setArticles(response.articles);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
        return searchHander;
}

export default useSearch;