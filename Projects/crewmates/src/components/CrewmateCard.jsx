import { Box, Text, Button, VStack, HStack } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function CrewmateCard({ crewmate, onDelete }) {
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            const { error } = await supabase
                .from('crewmates')
                .delete()
                .eq('id', crewmate.id)

            if (error) throw error
            onDelete() // Refresh the list
        } catch (error) {
            console.error('Error deleting crewmate:', error)
        }
    }

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
            <VStack align="stretch" spacing={3}>
                <Text fontSize="xl" fontWeight="bold">{crewmate.name}</Text>
                <Text>Speed: {crewmate.speed}</Text>
                <Text>Color: {crewmate.color}</Text>
                <HStack spacing={4}>
                    <Button
                        as={Link}
                        to={`/crewmate/${crewmate.id}`}
                        colorScheme="teal"
                        variant="outline"
                    >
                        View Details
                    </Button>
                    <Button
                        as={Link}
                        to={`/update/${crewmate.id}`}
                        colorScheme="blue"
                        variant="outline"
                    >
                        Edit
                    </Button>
                    <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </HStack>
            </VStack>
        </Box>
    )
}

export default CrewmateCard