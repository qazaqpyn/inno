import { Article } from '../../components/ui/article';
import useFilterOptions from '../../../hooks/useFilterOptions';
import { ArticleSearchBar } from '../../components/ui/articleSearchBar';
import { NewsTypeButtons } from '../../components/ui/newsTypeButtons';
import useFetchNewsType from '../../../hooks/useFetchNewsType';
import useSearch from '../../../hooks/useSearch';
import styles from '../../../global.module.scss';

export const Articles: React.FC = () => {
  const [isLoadingFilter, errorFilter, listFilter] = useFilterOptions();
  const {
    articles,
    setArticles,
    isLoading,
    setIsLoading,
    error,
    setError,
    isAllNewsType,
    setIsAllNewsType
  } = useFetchNewsType();
  const searchHander = useSearch({ setIsLoading, setError, setArticles });

  return (
    <div className={styles.main__div}>
      <h1>{isAllNewsType ? 'All' : 'My'} Articles</h1>

      <ArticleSearchBar {...{ listFilter, searchHander, isLoadingFilter, errorFilter }} />

      <NewsTypeButtons {...{ setIsAllNewsType, isAllNewsType }} />

      {error && <div>{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {articles.map((article) => (
            <Article key={article.id} {...article} />
          ))}
        </div>
      )}
    </div>
  );
};
