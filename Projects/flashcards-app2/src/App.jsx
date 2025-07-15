import { useState } from 'react'
import './App.css'


const originalCityFlashcards = [
  { question: 'Which city is famous for the Eiffel Tower and its romantic ambiance?', answer: 'Paris, France' },
  { question: 'Which city is renowned for its ancient ruins like the Colosseum and rich history?', answer: 'Rome, Italy' },
  { question: 'Which city is known for its towering skyscrapers and bustling financial district?', answer: 'New York City, USA' },
  { question: 'Which city is celebrated for its picturesque canals and gondola rides?', answer: 'Venice, Italy' },
  { question: 'Which city is famous for its iconic Opera House and Harbour Bridge?', answer: 'Sydney, Australia' },
  { question: 'Which city is known for its vibrant art scene, architecture, and tapas culture?', answer: 'Barcelona, Spain' },
  { question: 'Which city is famous for its bustling street markets and ornate temples?', answer: 'Bangkok, Thailand' },
  { question: 'Which city is recognized for its charming canals, bicycles, and creative spirit?', answer: 'Amsterdam, Netherlands' },
  { question: 'Which city is celebrated for its blend of tradition and cutting-edge technology?', answer: 'Tokyo, Japan' },
  { question: 'Which city is famous for its royal heritage, iconic clock tower, and cultural significance?', answer: 'London, United Kingdom' }
]

function App() {

  const [cards, setCards] = useState(originalCityFlashcards)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')

  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  
  const currentCard = cards[currentIndex]

  const handleSubmitAnswer = (e) => {
    e.preventDefault()
    const userGuess = guess.trim().toLowerCase()
    const correctAnswer = currentCard.answer.trim().toLowerCase()

    if (userGuess === correctAnswer) {
      setFeedback('Correct!')
      const newStreak = currentStreak + 1
      setCurrentStreak(newStreak)
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak)
      }
    } else {
      setFeedback('Incorrect, try again.')
      setCurrentStreak(0)
    }
  }

  const shuffleCards = () => {
    const shuffled = [...cards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setCards(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
    setGuess('')
    setFeedback('')
    setCurrentStreak(0) 
  }

 
  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
    setIsFlipped(false)
    setGuess('')
    setFeedback('')
  }

  const handlePrevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
    setIsFlipped(false)
    setGuess('')
    setFeedback('')
  }

  return (
    <div className="App">
      <header>
        <h1>Famous Cities Flashcards: Discover Global Landmarks</h1>
        <p>A simple app to help you study and learn about famous cities and their remarkable landmarks</p>
      </header>

      <div className="stats">
        <p>Number of cards: {cards.length}</p>
        <p>Current Streak: {currentStreak}, Longest Streak: {longestStreak}</p>
      </div>

      <div className="card-container">
        {/* Flip the card on click */}
        <div
          className={`card ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="card-face card-front">
            {currentCard.question}
          </div>
          <div className="card-face card-back">
            {currentCard.answer}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitAnswer}>
        <label>
          Guess the answer here:
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Type your guess..."
          />
        </label>
        <button type="submit">Submit Guess</button>
      </form>

      {feedback && <p className="feedback">{feedback}</p>}

      <div className="controls">
        <button onClick={handlePrevCard}>&larr;</button>
        <button onClick={handleNextCard}>&rarr;</button>
        <button onClick={shuffleCards}>Shuffle Cards</button>
      </div>
    </div>
  )
}

export default App
