import { useNavigate } from 'react-router-dom'
import { Container, VStack, Heading, useToast } from '@chakra-ui/react'
import CrewmateForm from '../components/CrewmateForm'
import { supabase } from '../supabase'

function CreateCrewmate() {
    const navigate = useNavigate()
    const toast = useToast()

    const handleCreate = async (formData) => {
        try {
            // Log the data being sent
            console.log('Sending data:', formData)

            const { data, error } = await supabase
                .from('crewmates')
                .insert([
                    {
                        name: formData.name,
                        speed: formData.speed,
                        color: formData.color,
                        created_at: new Date().toISOString()
                    }
                ])
                .select()

            if (error) {
                console.error('Supabase error:', error)
                throw error
            }

            console.log('Created crewmate:', data)

            toast({
                title: 'Crewmate created!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            navigate('/gallery')
        } catch (error) {
            console.error('Error details:', error)
            toast({
                title: 'Error creating crewmate',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return (
        <Container maxW="container.xl" py={10}>
            <VStack spacing={8}>
                <Heading>Create a New Crewmate</Heading>
                <CrewmateForm onSubmit={handleCreate} />
            </VStack>
        </Container>
    )
}


export default CreateCrewmate