import React, { memo } from 'react';
import { IArticle } from '../../../../types';
import styles from './Article.module.scss';

export const Article: React.FC<IArticle> = memo(
  ({ title, description, url, image_url, published_at, categories, source, author }) => {
    const maxChars = 200;

    const truncatedDescription = description.slice(0, maxChars);
    const isTruncated = description.length > maxChars;

    const combinedCategories = categories.map((category) => category.name).join(', ');

    const articleHandler = () => {
      window.open(url, '_blank');
    };
    return (
      <div className={styles.article__div}>
        <div className={styles.article__content__flex}>
          {image_url && <img src={image_url} alt={title} />}
          <div className={styles.article__content__div} onClick={articleHandler}>
            <h4>{title}</h4>
            <p>{author.name}</p>
          </div>
        </div>
        <p>{isTruncated ? `${truncatedDescription}...` : description}</p>
        <div className={styles.article__inner__div}>
          <p>{combinedCategories}</p>
          <p>{source.name}</p>
          <p>{published_at}</p>
        </div>
      </div>
    );
  }
);
