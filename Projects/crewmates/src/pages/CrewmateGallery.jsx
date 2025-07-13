import { useState, useEffect } from 'react'
import { Container, SimpleGrid, Heading, Text } from '@chakra-ui/react'
import { supabase } from '../supabase'
import CrewmateCard from '../components/CrewmateCard'

function CrewmateGallery() {
    const [crewmates, setCrewmates] = useState([])

    useEffect(() => {
        fetchCrewmates()
    }, [])

    const fetchCrewmates = async () => {
        try {
            const { data, error } = await supabase
                .from('crewmates')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setCrewmates(data)
        } catch (error) {
            console.error('Error fetching crewmates:', error)
        }
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Heading mb={6}>Crewmate Gallery</Heading>
            {crewmates.length === 0 ? (
                <Text>No crewmates found</Text>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {crewmates.map(crewmate => (
                        <CrewmateCard
                            key={crewmate.id}
                            crewmate={crewmate}
                            onDelete={fetchCrewmates}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Container>
    )
}
export default CrewmateGallery