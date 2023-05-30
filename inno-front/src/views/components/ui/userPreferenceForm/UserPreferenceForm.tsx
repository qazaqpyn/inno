import { useState } from 'react';
import { IUpdatePreferences } from '../../../../types';
import { Button } from '../button';
import { PreferenceUpdate } from '../preferenceUpdate';
import useFilterOptions from '../../../../hooks/useFilterOptions';
import styles from '../../../../global.module.scss';
import { useUser } from '../../../../context/Context';

interface UserPreferenceFormProps {
  prefCategories: number[];
  prefSources: number[];
  prefAuthors: number[];
}

export const UserPreferenceForm: React.FC<UserPreferenceFormProps> = ({
  prefCategories,
  prefSources,
  prefAuthors
}) => {
  const { updatePreferencesUser } = useUser();
  const submitPreferences = (data: IUpdatePreferences) => {
    setIsOpenPrefereceUpdate(false);
    updatePreferencesUser(data);
  };
  const [isOpenPrefereceUpdate, setIsOpenPrefereceUpdate] = useState<boolean>(false);
  const [isLoadingFilter, errorFilter, listFilter] = useFilterOptions();

  return (
    <>
      {isOpenPrefereceUpdate && (
        <PreferenceUpdate
          prefCategory={prefCategories}
          prefSource={prefSources}
          prefAuthor={prefAuthors}
          category={listFilter.categories}
          source={listFilter.sources}
          author={listFilter.authors}
          submitPreferences={submitPreferences}
        />
      )}
      <div className={styles.button__div}>
        <Button
          buttonHandler={() => setIsOpenPrefereceUpdate(!isOpenPrefereceUpdate)}
          text={!isOpenPrefereceUpdate ? 'Update Preferences' : 'Close'}
          disabled={isLoadingFilter || errorFilter != ''}
        />
      </div>
    </>
  );
};
