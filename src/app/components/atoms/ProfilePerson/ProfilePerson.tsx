import React from 'react';
import styles from './ProfilePerson.module.css'; // Assuming you are using CSS Modules
import { ProfilePerson as ProfilePersonData} from '@/app/types/ProfilePerson'; // Import the ProfilePerson type

export interface ProfilePersonProps extends ProfilePersonData {
  onClick: () => void;
}

const ProfilePerson: React.FC<ProfilePersonProps> = ({ name, photoUrl, points, onClick }) => {
  return (
    <div className={styles.profileContainer} onClick={onClick}>
      <div className={styles.photoContainer}>
        <img src={photoUrl} alt={name} className={styles.photo} />
      </div>
      <div className={styles.infoContainer}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.points}>{points} points</p>
      </div>
    </div>
  );
};

export default ProfilePerson;