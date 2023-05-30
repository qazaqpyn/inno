import { useState } from 'react';
import { IArticleSearch, IFilterOptions } from '../../../../types';
import { SearchBar } from '../../form/search-bar';
import { Button } from '../button';
import styles from '../../../../global.module.scss';

interface ArticleSearchBarProps {
  listFilter: IFilterOptions;
  searchHander: (props: IArticleSearch) => void;
  isLoadingFilter: boolean;
  errorFilter: string;
}

export const ArticleSearchBar: React.FC<ArticleSearchBarProps> = ({
  listFilter,
  isLoadingFilter,
  errorFilter,
  searchHander
}) => {
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  return (
    <>
      {isOpenSearch && (
        <SearchBar
          category={listFilter.categories}
          source={listFilter.sources}
          searchHander={searchHander}
        />
      )}

      <div className={styles.button__div}>
        <Button
          buttonHandler={() => setIsOpenSearch(!isOpenSearch)}
          text={!isOpenSearch ? 'Search' : 'Close'}
          disabled={isLoadingFilter || errorFilter != ''}
        />
      </div>
    </>
  );
};
