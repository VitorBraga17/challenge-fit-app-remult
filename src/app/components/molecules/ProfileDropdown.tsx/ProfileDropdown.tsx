import React, { useState } from 'react';
import ProfilePerson from "@/app/components/atoms/ProfilePerson/ProfilePerson"; // Import the ProfilePerson component
import styles from "./ProfileDropdown.module.css"; // Assuming you are using CSS Modules
import useSelectedUserStore from "@/app/store/selectedUser";
import { Users } from "@/app/shared/Users";

interface ProfileDropdownProps {
  profiles: Users[];
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ profiles }) => {
  const { selectedUser, setSelectedUser } = useSelectedUserStore();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const profile = profiles.find((p) => p.name === selectedId);
    setSelectedUser(profile || null);
  };

  return (
    <div className={styles.dropdownContainer}>
      <select className={styles.dropdown} onChange={handleSelectChange}>
        <option value="">Classificação</option>
        {profiles.map((profile) => (
          <option key={profile.name} value={profile.name}>
            {profile.name}
          </option>
        ))}
      </select>

      {selectedUser && (
        <div className={styles.selectedProfile}>
          <ProfilePerson {...selectedUser} />
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;