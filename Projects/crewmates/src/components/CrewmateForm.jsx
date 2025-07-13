import { useState } from 'react'
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Button,
    VStack,
    Container,
} from '@chakra-ui/react'

function CrewmateForm({ initialData, onSubmit, buttonText }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        speed: initialData?.speed || '',
        color: initialData?.color || ''
    })

    const colors = [
        'Red', 'Green', 'Blue', 'Purple',
        'Yellow', 'Orange', 'Pink', 'Rainbow'
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        // Ensure speed is a number
        const submissionData = {
            ...formData,
            speed: parseFloat(formData.speed) || 0
        }
        onSubmit(submissionData)
    }

    return (
        <Container maxW="container.md">
            <Box as="form" onSubmit={handleSubmit} p={6} borderWidth="1px" borderRadius="lg" bg="white">
                <VStack spacing={6} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>Name:</FormLabel>
                        <Input
                            placeholder="Enter crewmate's name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Speed (mph):</FormLabel>
                        <Input
                            type="number"
                            step="0.1"
                            placeholder="Enter speed in mph"
                            value={formData.speed}
                            onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Color:</FormLabel>
                        <RadioGroup
                            value={formData.color}
                            onChange={(value) => setFormData({ ...formData, color: value })}
                        >
                            <Stack direction="row" wrap="wrap" spacing={4}>
                                {colors.map(color => (
                                    <Radio key={color} value={color}>
                                        {color}
                                    </Radio>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    <Button type="submit" colorScheme="teal" size="lg">
                        {buttonText || 'Create Crewmate'}
                    </Button>
                </VStack>
            </Box>
        </Container>
    )
}

export default CrewmateForm