import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';


function Header() {

    return (
            <AppBar position="static">
                <Toolbar sx={{ height: '100px', backgroundColor: '#e0e0e0', color: 'gray', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1, color: 'black' }}>
                        Центр занятости населения
                    </Typography>
                    <IconButton edge="end" color="inherit" aria-label="account">
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
    );
}

export default Header;