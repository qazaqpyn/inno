import { Button } from '../button';
import { useUser } from '../../../../context/Context';
import { existsSessionToken } from '../../../../utils/localStorage';
import styles from '../../../../global.module.scss';

interface NewsTypeButtonsProps {
  setIsAllNewsType: React.Dispatch<React.SetStateAction<boolean>>;
  isAllNewsType: boolean;
}

export const NewsTypeButtons: React.FC<NewsTypeButtonsProps> = ({
  setIsAllNewsType,
  isAllNewsType
}) => {
  const {} = useUser();

  return (
    <div className={styles.button__div}>
      <Button buttonHandler={() => setIsAllNewsType(true)} text={'All'} disabled={isAllNewsType} />
      <Button
        buttonHandler={() => setIsAllNewsType(false)}
        text={'My'}
        disabled={!existsSessionToken() || !isAllNewsType}
      />
    </div>
  );
};
