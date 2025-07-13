import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    Container,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider
} from '@chakra-ui/react'
import { supabase } from '../supabase'

function CrewmateDetails() {
    const { id } = useParams()
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

    if (!crewmate) return <Text>Loading...</Text>

    return (
        <Container
            centerContent
            maxW="container.xl"
            py={10}
        >
            <Card
                maxW="md"
                w="100%"
                boxShadow="xl"
                borderRadius="lg"
                bg="white"
            >
                <CardHeader pb={0}>
                    <Heading size="lg" color="teal.600">
                        {crewmate.name}'s Details
                    </Heading>
                </CardHeader>

                <CardBody>
                    <VStack spacing={3} align="stretch">
                        <Box>
                            <Text fontWeight="bold" color="gray.600">Speed:</Text>
                            <Text fontSize="lg">{crewmate.speed} mph</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" color="gray.600">Color:</Text>
                            <Text fontSize="lg">{crewmate.color}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" color="gray.600">Created:</Text>
                            <Text fontSize="lg">
                                {new Date(crewmate.created_at).toLocaleDateString()}
                            </Text>
                        </Box>
                    </VStack>
                </CardBody>

                <Divider color="gray.200" />

                <CardFooter justify="center">
                    <Button
                        as={Link}
                        to={`/update/${crewmate.id}`}
                        colorScheme="teal"
                        width="200px"
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'md',
                        }}
                    >
                        Edit Crewmate
                    </Button>
                </CardFooter>
            </Card>
        </Container>
    )
}

export default CrewmateDetails