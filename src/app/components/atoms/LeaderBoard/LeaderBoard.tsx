import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import useCurrentUserStore from "@/app/store/currentUserStore";

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number | undefined;
  avatarUrl?: string; // Optional avatar image URL
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
  setUser: (id: string) => void;
}

const StyledListItem = styled(ListItem)({
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    backgroundColor: "#f5f5f5", // Light gray background on hover
  },
});

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, setUser }) => {
  //const { currentUser, setCurrentUser } = useCurrentUserStore();
  // Sort entries by points in descending order
  const sortedEntries = [...entries].sort(
    (a, b) => (b.points || 0) - (a.points || 0)
  );

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto" }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ marginBottom: 2, fontWeight: "bold" }}
      >
        Classificação Geral
      </Typography>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <List>
          {sortedEntries.map((entry, index) => (
            <StyledListItem
              key={index}
              onClick={() => {
                setUser(entry.id);
              }}
            >
              <ListItemAvatar>
                <Avatar src={entry.avatarUrl} alt={entry.name}>
                  {!entry.avatarUrl && entry.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={entry.name}
                secondary={`${entry.points} points`}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                #{index + 1}
              </Typography>
            </StyledListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Leaderboard;
