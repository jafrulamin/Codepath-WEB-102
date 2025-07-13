import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    Card,
    CardContent,
    Snackbar,
    Alert,
} from '@mui/material';
import { supabase } from '../config/supabase';

function CreatePost() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image_url: '',
    });
    const [error, setError] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const userId = 'anonymous'; // In a real app, this would come from authentication

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('posts')
                .insert([
                    {
                        title: formData.title,
                        content: formData.content,
                        image_url: formData.image_url,
                        upvotes: 0,
                        created_at: new Date().toISOString(),
                        author_id: userId, // Add the author_id
                    }
                ]);

            if (error) throw error;

            showSnackbar('Post created successfully!', 'success');
            navigate('/');
        } catch (err) {
            console.error('Error creating post:', err);
            setError('Failed to create post. Please try again.');
            showSnackbar('Failed to create post', 'error');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Create New Post
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            required
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            error={!!error}
                            helperText={error}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Image URL"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                        />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ flexGrow: 1 }}
                            >
                                Create Post
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => navigate('/')}
                                sx={{ flexGrow: 1 }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default CreatePost; 