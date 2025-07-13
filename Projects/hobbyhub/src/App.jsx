import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import { SearchProvider } from './context/SearchContext';

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#06C4AB',
        },
        background: {
            default: '#F2F2F2',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SearchProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<CreatePost />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                </Routes>
            </SearchProvider>
        </ThemeProvider>
    );
}

export default App; 