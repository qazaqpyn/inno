import { User } from '../../../../types';

interface ProfileInfoProps {
  user: User;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  return (
    <>
      <div>
        <b>Name: </b> {user.name}
      </div>
      <div>
        <b>Email: </b>
        {user.email}
      </div>
      <div>
        <b>Prefered Categories: </b>
        {user.categories.map((category) => category.name).join(', ')}
      </div>
      <div>
        <b>Prefered Sources: </b>
        {user.sources.map((source) => source.name).join(', ')}
      </div>
      <div>
        <b>Prefered Authors: </b> {user.authors.map((author) => author.name).join(', ')}
      </div>
    </>
  );
};
