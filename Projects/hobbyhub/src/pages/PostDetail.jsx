import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Box,
    Divider,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { supabase } from '../config/supabase';
import { formatDistanceToNow } from 'date-fns';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import EditIcon from '@mui/icons-material/Edit';

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [isAuthor, setIsAuthor] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: '',
        content: '',
        image_url: '',
    });
    const userId = 'anonymous'; // In a real app, this would come from authentication

    const fetchPostAndComments = useCallback(async () => {
        try {
            // Fetch post
            const { data: postData, error: postError } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (postError) throw postError;

            // Check if current user is the author
            setIsAuthor(postData.author_id === userId);

            // Set edit form data
            setEditFormData({
                title: postData.title,
                content: postData.content || '',
                image_url: postData.image_url || '',
            });

            // Fetch comments
            const { data: commentsData, error: commentsError } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: true });

            if (commentsError) throw commentsError;

            setPost(postData);
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching data:', error);
            showSnackbar('Error loading post', 'error');
        } finally {
            setLoading(false);
        }
    }, [id, userId]);

    useEffect(() => {
        fetchPostAndComments();
    }, [fetchPostAndComments]);

    const handleUpvote = async () => {
        try {
            // Update post upvotes count
            const { error: updateError } = await supabase
                .from('posts')
                .update({ upvotes: post.upvotes + 1 })
                .eq('id', id);

            if (updateError) throw updateError;

            setPost(prev => ({ ...prev, upvotes: prev.upvotes + 1 }));
            showSnackbar('Post upvoted successfully!', 'success');
        } catch (error) {
            console.error('Error upvoting:', error);
            showSnackbar('Error upvoting post', 'error');
        }
    };

    const handleEditSubmit = async () => {
        if (!editFormData.title.trim()) {
            showSnackbar('Title is required', 'error');
            return;
        }

        try {
            const { error } = await supabase
                .from('posts')
                .update({
                    title: editFormData.title,
                    content: editFormData.content,
                    image_url: editFormData.image_url,
                })
                .eq('id', id)
                .eq('author_id', userId);

            if (error) throw error;

            setEditDialogOpen(false);
            fetchPostAndComments();
            showSnackbar('Post updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating post:', error);
            showSnackbar('Error updating post', 'error');
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const { error } = await supabase
                .from('comments')
                .insert([
                    {
                        post_id: id,
                        content: newComment,
                        author: userId,
                        created_at: new Date().toISOString(),
                    }
                ]);

            if (error) throw error;

            setNewComment('');
            fetchPostAndComments();
            showSnackbar('Comment added successfully!', 'success');
        } catch (error) {
            console.error('Error adding comment:', error);
            showSnackbar('Error adding comment', 'error');
        }
    };

    const handleDelete = async () => {
        if (!isAuthor) {
            showSnackbar('You can only delete your own posts', 'error');
            return;
        }

        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const { error } = await supabase
                    .from('posts')
                    .delete()
                    .eq('id', id)
                    .eq('author_id', userId); // Add author check in the query

                if (error) throw error;

                showSnackbar('Post deleted successfully', 'success');
                navigate('/');
            } catch (error) {
                console.error('Error deleting post:', error);
                showSnackbar('Error deleting post', 'error');
            }
        }
    };

    if (loading) {
        return <Container>Loading...</Container>;
    }

    if (!post) {
        return <Container>Post not found</Container>;
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {post.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </Typography>

                    {post.image_url && (
                        <Box sx={{ my: 2 }}>
                            <img
                                src={post.image_url}
                                alt={post.title}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </Box>
                    )}

                    <Typography variant="body1" paragraph>
                        {post.content}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Button
                            variant="contained"
                            onClick={handleUpvote}
                            startIcon={<ThumbUpOutlinedIcon />}
                        >
                            Upvote ({post.upvotes})
                        </Button>

                        {isAuthor && (
                            <>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => setEditDialogOpen(true)}
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom>
                        Comments
                    </Typography>

                    <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={!newComment.trim()}
                        >
                            Add Comment
                        </Button>
                    </Box>

                    {comments.map((comment) => (
                        <Box key={comment.id} sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                {comment.author} • {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                            </Typography>
                            <Typography variant="body1">
                                {comment.content}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                        </Box>
                    ))}
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            required
                            label="Title"
                            name="title"
                            value={editFormData.title}
                            onChange={handleEditChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Content"
                            name="content"
                            value={editFormData.content}
                            onChange={handleEditChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Image URL"
                            name="image_url"
                            value={editFormData.image_url}
                            onChange={handleEditChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit} variant="contained">Save Changes</Button>
                </DialogActions>
            </Dialog>

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

export default PostDetail; 