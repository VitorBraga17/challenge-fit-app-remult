import React, { useState } from "react";
import ProfilePerson from "@/app/components/atoms/ProfilePerson/ProfilePerson"; // Import the ProfilePerson component
import styles from "./ProfileDropdown.module.css"; // Assuming you are using CSS Modules
import useCurrentUserStore from "@/app/store/currentUserStore";
export interface ProfileDropdownProps {
  profileList: {
    id: string;
    name: string;
    photo: string | undefined;
    points: number;
    setProfile: (id: string) => void;
  }[];
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ profileList }) => {
  const { currentUser, setCurrentUser } = useCurrentUserStore();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProfileName = event.target.value;
    const selectedProfile = profileList.find(
      (profile) => profile.name === selectedProfileName
    );
    if (selectedProfile) {
      selectedProfile.setProfile(selectedProfileName);
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <select className={styles.dropdown} onChange={handleSelectChange}>
        <option value="">Classificação</option>
        {profileList.map((profile) => (
          <option key={profile.id} value={profile.name}>
            {profile.name}
          </option>
        ))}
      </select>

      {currentUser && (
        <div className={styles.selectedProfile}>
          <ProfilePerson
            {...profileList.find((profile) => profile.id === currentUser.id)!}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
