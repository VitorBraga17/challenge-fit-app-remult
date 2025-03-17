/* import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const DrawerBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setIsOpen(open);
    };

    return (
        <>
            <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
                <List>
                    <Link href="/placar" passHref>
                        <ListItem button onClick={toggleDrawer(false)}>
                            <ListItemText primary="About" />
                        </ListItem>
                    </Link>
                    <Link href="/regras" passHref>
                        <ListItem button onClick={toggleDrawer(false)}>
                            <ListItemText primary="Contact" />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </>
    );
};

export default DrawerBar; */