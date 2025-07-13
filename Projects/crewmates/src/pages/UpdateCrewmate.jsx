import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, VStack, Heading, Button, useToast } from '@chakra-ui/react'
import { supabase } from '../supabase'
import CrewmateForm from '../components/CrewmateForm'

function UpdateCrewmate() {
    const { id } = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    const [crewmate, setCrewmate] = useState(null)

    useEffect(() => {
        fetchCrewmate()
    }, [id])

    const fetchCrewmate = async () => {
        try {
            const { data, error } = await supabase
                .from('crewmates')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            setCrewmate(data)
        } catch (error) {
            console.error('Error fetching crewmate:', error)
        }
    }

    const handleUpdate = async (formData) => {
        try {
            const { error } = await supabase
                .from('crewmates')
                .update(formData)
                .eq('id', id)

            if (error) throw error

            toast({
                title: 'Crewmate updated!',
                status: 'success',
                duration: 3000,
            })

            navigate(`/crewmate/${id}`)
        } catch (error) {
            console.error('Error updating crewmate:', error)
        }
    }

    const handleDelete = async () => {
        try {
            const { error } = await supabase
                .from('crewmates')
                .delete()
                .eq('id', id)

            if (error) throw error

            toast({
                title: 'Crewmate deleted!',
                status: 'success',
                duration: 3000,
            })

            navigate('/gallery')
        } catch (error) {
            console.error('Error deleting crewmate:', error)
        }
    }

    if (!crewmate) return <Box>Loading...</Box>

    return (
        <Box p={8}>
            <VStack spacing={6}>
                <Heading>Update {crewmate.name}</Heading>
                <CrewmateForm
                    initialData={crewmate}
                    onSubmit={handleUpdate}
                    buttonText="Update Crewmate"
                />
                <Button
                    colorScheme="red"
                    onClick={handleDelete}
                >
                    Delete Crewmate
                </Button>
            </VStack>
        </Box>
    )
}

export default UpdateCrewmate