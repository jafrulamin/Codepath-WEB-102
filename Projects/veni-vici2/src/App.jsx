import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentCat, setCurrentCat] = useState(null)
  const [banList, setBanList] = useState([])
  const [seenCats, setSeenCats] = useState([])

  const fetchCat = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds')
      const data = await response.json()

      const availableCats = data.filter(cat => {
        return !banList.includes(cat.name) &&
          !banList.includes(`${cat.weight?.metric || '0-0'} lbs`) &&
          !banList.includes(cat.origin) &&
          !banList.includes(`${cat.life_span} years`);
      })

      if (availableCats.length === 0) {
        alert('No more cats available with current ban list!')
        return
      }

      const randomCat = availableCats[Math.floor(Math.random() * availableCats.length)]

      const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${randomCat.id}`)
      const imageData = await imageResponse.json()

      const newCat = {
        ...randomCat,
        imageUrl: imageData[0]?.url
      }

      setCurrentCat(newCat)
      setSeenCats(prev => [...prev, newCat])
    } catch (error) {
      console.error('Error fetching cat:', error)
    }
  }

  const handleBanClick = (attribute) => {
    if (banList.includes(attribute)) {
      setBanList(banList.filter(item => item !== attribute))
    } else {
      setBanList([...banList, attribute])
    }
  }

  useEffect(() => {
    fetchCat()
  }, [])

  return (
    <div className="app-container">
      <div className="history-sidebar">
        <h2>Who have we seen so far?</h2>
        <div className="seen-cats">
          {seenCats.map((cat, index) => (
            <div key={index} className="seen-cat">
              <img src={cat.imageUrl} alt={cat.name} />
              <p>A {cat.name} cat from {cat.origin}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        <h1>Trippin' on Cats</h1>
        <p>Discover cats from your wildest dreams!</p>
        <div className="emoji-row">
          😺😸😹😻😼😽😾😿🙀
        </div>

        {currentCat && (
          <div className="cat-info">
            <h2>{currentCat.name}</h2>
            <div className="attributes">
              <button
                className={`attribute-btn ${banList.includes(currentCat.name) ? 'banned' : ''}`}
                onClick={() => handleBanClick(currentCat.name)}
              >
                {currentCat.name}
              </button>
              <button
                className={`attribute-btn ${banList.includes(`${currentCat.weight?.metric || '0-0'} lbs`) ? 'banned' : ''}`}
                onClick={() => handleBanClick(`${currentCat.weight?.metric || '0-0'} lbs`)}
              >
                {`${currentCat.weight?.metric || '0-0'} lbs`}
              </button>
              <button
                className={`attribute-btn ${banList.includes(currentCat.origin) ? 'banned' : ''}`}
                onClick={() => handleBanClick(currentCat.origin)}
              >
                {currentCat.origin}
              </button>
              <button
                className={`attribute-btn ${banList.includes(`${currentCat.life_span} years`) ? 'banned' : ''}`}
                onClick={() => handleBanClick(`${currentCat.life_span} years`)}
              >
                {`${currentCat.life_span} years`}
              </button>
            </div>
            {currentCat.imageUrl && (
              <img src={currentCat.imageUrl} alt={currentCat.name} className="cat-image" />
            )}
          </div>
        )}

        <button className="discover-btn" onClick={fetchCat}>
          🔀 Discover!
        </button>
      </div>

      <div className="ban-sidebar">
        <h2>Ban List</h2>
        <p>Select an attribute in your listing to ban it</p>
        <div className="banned-items">
          {banList.map(item => (
            <button
              key={item}
              className="banned-item"
              onClick={() => handleBanClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App