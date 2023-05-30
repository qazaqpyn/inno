import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../input';
import { Modal } from '../../ui/modal/Modal';
import { FilterList } from '../FilterList';
import { IArticleSearch } from '../../../../types';
import styles from './SearchBar.module.scss';
import useSearchBar from '../../../../hooks/useSearchBar';

export interface SearchBarProps {
  category: CategoryProps[];
  source: SourceProps[];
  searchHander: (props: IArticleSearch) => void;
}

export interface CategoryProps {
  id: number;
  name: string;
}

export interface SourceProps {
  id: number;
  name: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchHander, category, source }) => {
  const [isOpenCategory, setIsOpenCategory] = React.useState<boolean>(false);
  const [isOpenSource, setIsOpenSource] = React.useState<boolean>(false);
  const {
    query,
    setQuery,
    from,
    setFrom,
    to,
    setTo,
    selectedCategory,
    setSelectedCategory,
    selectedSource,
    setSelectedSource,
    resetHandler,
    resetDisabled,
    formHandler
  } = useSearchBar({ searchHander });

  return (
    <>
      <form onSubmit={formHandler}>
        <div className={styles.search__div}>
          <Input inputHandler={setQuery} placeholder={'Search'} value={query} />
          <Button text='Submit' type='submit' />
        </div>

        <div className={styles.filter__div}>
          <p>Search Filters: </p>
          <div className={styles.__date}>
            <p>From </p>
            <Input type='date' inputHandler={setFrom} value={from} />
          </div>
          <div className={styles.__date}>
            <p>To </p>
            <Input type='date' inputHandler={setTo} value={to} min={from} />
          </div>
          <Button buttonHandler={() => setIsOpenCategory(true)} text={'Category'} />
          <Button buttonHandler={() => setIsOpenSource(true)} text={'Source'} />
          <Button buttonHandler={resetHandler} text={'Reset'} disabled={resetDisabled()} />
        </div>
      </form>
      {isOpenCategory && (
        <Modal title={'Category'} setIsOpen={setIsOpenCategory}>
          <FilterList
            list={category}
            selectedList={selectedCategory}
            setSelectedList={setSelectedCategory}
          />
        </Modal>
      )}
      {isOpenSource && (
        <Modal title={'Source'} setIsOpen={setIsOpenSource}>
          <FilterList
            list={source}
            selectedList={selectedSource}
            setSelectedList={setSelectedSource}
          />
        </Modal>
      )}
    </>
  );
};
