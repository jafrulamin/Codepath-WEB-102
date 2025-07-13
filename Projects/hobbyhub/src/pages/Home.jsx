import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Card,
    CardContent,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    Box,
    Grid,
} from '@mui/material';
import { supabase } from '../config/supabase';
import { formatDistanceToNow } from 'date-fns';
import { useSearch } from '../context/SearchContext';

function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const { searchQuery } = useSearch();

    useEffect(() => {
        fetchPosts();
    }, [sortBy]);

    const fetchPosts = async () => {
        let query = supabase
            .from('posts')
            .select('*');

        if (sortBy === 'newest') {
            query = query.order('created_at', { ascending: false });
        } else {
            query = query.order('upvotes', { ascending: false });
        }

        const { data, error } = await query;
        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            setPosts(data || []);
        }
    };

    const handleSortChange = (event, newSort) => {
        if (newSort !== null) {
            setSortBy(newSort);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: 'grey.400',
            position: 'relative'
        }}>
            <Container
                maxWidth="md"
                sx={{
                    py: 4,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Sort Controls */}
                <Box sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    backgroundColor: 'grey.200',
                    py: 3
                }}>
                    <ToggleButtonGroup
                        value={sortBy}
                        exclusive
                        onChange={handleSortChange}
                        aria-label="sort posts"
                    >
                        <ToggleButton value="newest" aria-label="sort by newest">
                            Newest
                        </ToggleButton>
                        <ToggleButton value="popular" aria-label="sort by popular">
                            Most Popular
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                {/* Posts Grid */}
                <Box sx={{ flex: 1 }}>
                    <Grid container direction="column" spacing={2}>
                        {filteredPosts.length === 0 ? (
                            <Grid item>
                                <Card sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography variant="h6" color="text.secondary">
                                        {posts.length === 0 ? 'No posts yet' : 'No posts match your search'}
                                    </Typography>
                                </Card>
                            </Grid>
                        ) : (
                            filteredPosts.map((post) => (
                                <Grid item key={post.id}>
                                    <Card
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                boxShadow: 3,
                                                transform: 'translateY(-2px)',
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                            minHeight: '100px'
                                        }}
                                        onClick={() => navigate(`/post/${post.id}`)}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {post.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                                            </Typography>
                                            <Typography variant="body2" color="primary">
                                                {post.upvotes} upvotes
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default Home; 