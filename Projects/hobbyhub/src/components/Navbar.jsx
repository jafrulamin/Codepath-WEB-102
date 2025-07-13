import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    InputAdornment,
    Button,
    Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearch } from '../context/SearchContext';

// This is for testing purposes
function Navbar() {
    const navigate = useNavigate();
    const { searchQuery, setSearchQuery } = useSearch();

    const handleSearch = (e) => {
        e.preventDefault();
        // Navigate to home page if we're not already there
        if (window.location.pathname !== '/') {
            navigate('/');
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#06C4AB' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Logo */}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        color: 'white',
                        cursor: 'pointer',
                        minWidth: 'fit-content'
                    }}
                    onClick={() => navigate('/')}
                >
                    HobbyHub
                </Typography>

                {/* Search Bar */}
                <Box
                    component="form"
                    onSubmit={handleSearch}
                    sx={{
                        flex: '1 1 auto',
                        display: 'flex',
                        justifyContent: 'center',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}
                >
                    <TextField
                        size="large"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                            },
                            '& .MuiInputBase-root': {
                                height: '40px',
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Navigation Links */}
                <Box sx={{ minWidth: 'fit-content' }}>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/create')}
                        sx={{
                            color: 'white',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Create Post
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar; 