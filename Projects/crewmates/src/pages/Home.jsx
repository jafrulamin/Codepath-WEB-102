import { Box, Heading, Text, Button, VStack, Image, Container } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <Container maxW="container.xl">
            <VStack spacing={8} py={10} textAlign="center">
                <Heading as="h1" size="2xl">
                    Welcome to the Crewmate Creator!
                </Heading>
                <Text fontSize="xx-large">
                    Join the mission by creating your own crew of space explorers - just make sure there's no impostor among them! 🚀

                </Text>
                <Box>
                    {/* You can add your crewmate image here */}
                    <Image
                        src="/crewmates/src/public/image.png"
                        alt="Crewmates"
                        maxW="400px"
                        mx="auto"
                    />
                </Box>
                <Button
                    as={Link}
                    to="/create"
                    colorScheme="teal"
                    size="lg"
                >
                    Create a Crewmate!
                </Button>
            </VStack>
        </Container>
    )
}

export default Home
