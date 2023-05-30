import { useState } from 'react';
import { IUpdatePreferences } from '../../../../types';
import { Modal } from '../modal/Modal';
import { FilterList } from '../../form/FilterList';
import { Button } from '../button';
import styles from './Preference.module.scss';

interface PreferenceUpdateProps {
  prefCategory: number[];
  prefSource: number[];
  prefAuthor: number[];
  category: CategoryProps[];
  source: SourceProps[];
  author: AuthorProps[];
  submitPreferences: (props: IUpdatePreferences) => void;
}

interface CategoryProps {
  id: number;
  name: string;
}

interface SourceProps {
  id: number;
  name: string;
}

interface AuthorProps {
  id: number;
  name: string;
}

export const PreferenceUpdate: React.FC<PreferenceUpdateProps> = ({
  prefCategory,
  prefSource,
  prefAuthor,
  category,
  source,
  author,
  submitPreferences
}) => {
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);
  const [isOpenSource, setIsOpenSource] = useState<boolean>(false);
  const [isOpenAuthor, setIsOpenAuthor] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number[]>(prefCategory);
  const [selectedSource, setSelectedSource] = useState<number[]>(prefSource);
  const [selectedAuthor, setSelectedAuthor] = useState<number[]>(prefAuthor);

  return (
    <div className={styles.preference__main}>
      <h4> Update Preferences</h4>
      <div className={styles.preference__form}>
        <div>
          <p>Category </p>
          <Button buttonHandler={() => setIsOpenCategory(true)} text='Change' />
        </div>
        <div>
          <p>Source </p>
          <Button buttonHandler={() => setIsOpenSource(true)} text='Change' />
        </div>
        <div>
          <p>Author </p>
          <Button buttonHandler={() => setIsOpenAuthor(true)} text='Change' />
        </div>
      </div>
      <Button
        buttonHandler={() =>
          submitPreferences({
            categories: selectedCategory,
            sources: selectedSource,
            authors: selectedAuthor
          })
        }
        text='Submit'
      />
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
      {isOpenAuthor && (
        <Modal title={'Author'} setIsOpen={setIsOpenAuthor}>
          <FilterList
            list={author}
            selectedList={selectedAuthor}
            setSelectedList={setSelectedAuthor}
          />
        </Modal>
      )}
    </div>
  );
};
