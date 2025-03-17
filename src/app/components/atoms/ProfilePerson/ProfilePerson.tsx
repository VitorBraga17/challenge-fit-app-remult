import React from "react";
import { Avatar, Box, Typography, Paper } from "@mui/material";

export interface ProfilePersonProps {
  name: string;
  photo?: string;
  points: number | 0;
}

const ProfilePerson: React.FC<ProfilePersonProps> = ({
  name,
  photo,
  points,
}) => {
  const fallbackLetter = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        borderRadius: 2,
        gap: 2,
      }}
    >
      <Avatar
        src={photo}
        alt={name}
        sx={{
          width: 56,
          height: 56,
          fontSize: 24,
          bgcolor: photo ? "transparent" : "primary.main",
          color: photo ? "inherit" : "white", // Ensure text is visible
        }}
      >
        {!photo && fallbackLetter}
      </Avatar>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {points} points
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProfilePerson;
