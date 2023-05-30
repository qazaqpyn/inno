import { UserPreferenceForm } from '../../components/ui/userPreferenceForm';
import { ProfileInfo } from '../../components/ui/profileInfo';
import useFetchUser from '../../../hooks/useFetchUser';
import styles from '../../../global.module.scss';

export const Profile: React.FC = () => {
  const { loading, error, user } = useFetchUser();

  return (
    <div className={styles.main__div}>
      <h1>Profile</h1>
      {error && <div>{error.message}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        user && (
          <div>
            <ProfileInfo user={user} />
            <UserPreferenceForm
              prefCategories={user.categories.map((category) => category.id)}
              prefSources={user.sources.map((source) => source.id)}
              prefAuthors={user.authors.map((author) => author.id)}
            />
          </div>
        )
      )}
    </div>
  );
};
