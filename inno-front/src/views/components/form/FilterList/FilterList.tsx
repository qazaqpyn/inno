import React, { memo, useCallback } from 'react';
import styles from './FilterList.module.scss';

export interface ListProps {
  name: string;
  id: number;
}

export interface FilterListProps {
  list: ListProps[];
  selectedList: number[];
  setSelectedList: React.Dispatch<React.SetStateAction<number[]>>;
}

export const FilterList: React.FC<FilterListProps> = memo(
  ({ list, selectedList, setSelectedList }) => {
    const handleCheckboxChange = useCallback(
      (id: number) => {
        setSelectedList((prevSelectedList) => {
          const updatedList = new Set(prevSelectedList);

          if (updatedList.has(id)) {
            updatedList.delete(id);
          } else {
            updatedList.add(id);
          }

          return Array.from(updatedList);
        });
      },
      [setSelectedList]
    );

    return (
      <div className={styles.component__filter__list}>
        {list.map((item) => (
          <div key={item.id}>
            <input
              className={styles.check__inp}
              type='checkbox'
              checked={selectedList.includes(item.id)}
              onChange={() => {
                handleCheckboxChange(item.id);
              }}
            />
            <label>{item.name}</label>
          </div>
        ))}
      </div>
    );
  }
);
