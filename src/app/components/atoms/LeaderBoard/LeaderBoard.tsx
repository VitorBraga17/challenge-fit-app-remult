import React from 'react';
import { Box, Typography, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

interface LeaderboardEntry {
  name: string;
  points: number;
  avatarUrl?: string; // Optional avatar image URL
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const StyledListItem = styled(ListItem)({
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
      backgroundColor: '#f5f5f5', // Light gray background on hover
    },
  });

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  // Sort entries by points in descending order
  const sortedEntries = [...entries].sort((a, b) => b.points - a.points);

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        Leaderboard
      </Typography>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <List>
          {sortedEntries.map((entry, index) => (
            <StyledListItem key={index}>
              <ListItemAvatar>
                <Avatar src={entry.avatarUrl} alt={entry.name}>
                  {!entry.avatarUrl && entry.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={entry.name}
                secondary={`${entry.points} points`}
              />
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
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