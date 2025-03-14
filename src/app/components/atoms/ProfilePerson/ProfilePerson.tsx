import React from 'react';
import styles from "./ProfilePerson.module.css"; // Assuming you are using CSS Modules

export interface ProfilePersonProps {
  name?: string;
  photo?: string;
  points?: number;
}

const ProfilePerson: React.FC<ProfilePersonProps> = ({
  name,
  photo,
  points,
}) => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.photoContainer}>
        <img src={photo} alt={name} className={styles.photo} />
      </div>
      <div className={styles.infoContainer}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.points}>{points} points</p>
      </div>
    </div>
  );
};

export default ProfilePerson;