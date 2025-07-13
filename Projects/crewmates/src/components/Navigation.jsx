import { Link } from 'react-router-dom'
import { Box, Flex, Button } from '@chakra-ui/react'

function Navigation() {
    return (
        <Box bg="#2D3748" p={8} width="100%">
            <Flex
                justify="space-between"
                maxW="1200px"
                mx="auto"
                px={4}
            >
                <Button
                    as={Link}
                    to="/"
                    variant="ghost"
                    color="teal.200"
                    _hover={{
                        bg: "teal.500",
                        color: "white"
                    }}
                    size="md"
                >
                    Home
                </Button>

                <Button
                    as={Link}
                    to="/create"
                    variant="ghost"
                    color="teal.200"
                    _hover={{
                        bg: "teal.500",
                        color: "white"
                    }}
                    size="md"
                >
                    Create a Crewmate!
                </Button>

                <Button
                    as={Link}
                    to="/gallery"
                    variant="ghost"
                    color="teal.200"
                    _hover={{
                        bg: "teal.500",
                        color: "white"
                    }}
                    size="md"
                >
                    Crewmate Gallery
                </Button>
            </Flex>
        </Box>
    )
}

export default Navigation