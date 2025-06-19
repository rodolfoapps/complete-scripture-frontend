import { useState, useEffect } from 'react'

// Production API URL for Render backend
const API_BASE_URL = 'https://scripture-search-backend.onrender.com/api'

function App( ) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [selectedCollections, setSelectedCollections] = useState([])
  const [selectedBooks, setSelectedBooks] = useState([])
  const [showCollections, setShowCollections] = useState(false)
  const [showBooks, setShowBooks] = useState(false)

  // Scripture collections and books
  const scriptureCollections = [
    'Old Testament',
    'New Testament', 
    'Book of Mormon',
    'Doctrine and Covenants',
    'Pearl of Great Price'
  ]

  const scriptureBooks = {
    'Old Testament': [
      'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
      '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah',
      'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
      'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah',
      'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
    ],
    'New Testament': [
      'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
      'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
      '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
      '1 John', '2 John', '3 John', 'Jude', 'Revelation'
    ],
    'Book of Mormon': [
      '1 Nephi', '2 Nephi', 'Jacob', 'Enos', 'Jarom', 'Omni', 'Words of Mormon', 'Mosiah',
      'Alma', 'Helaman', '3 Nephi', '4 Nephi', 'Mormon', 'Ether', 'Moroni'
    ],
    'Doctrine and Covenants': ['Doctrine and Covenants'],
    'Pearl of Great Price': [
      'Moses', 'Abraham', 'Joseph Smith—Matthew', 'Joseph Smith—History', 'Articles of Faith'
    ]
  }

  // Check API connection on component mount
  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      if (response.ok) {
        setIsConnected(true)
      }
    } catch (error) {
      console.error('Connection check failed:', error)
      setIsConnected(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          collections: selectedCollections,
          books: selectedBooks,
          limit: 1000
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.results || [])
      } else {
        console.error('Search failed:', response.statusText)
        setSearchResults([])
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const toggleCollection = (collection) => {
    setSelectedCollections(prev => 
      prev.includes(collection) 
        ? prev.filter(c => c !== collection)
        : [...prev, collection]
    )
  }

  const toggleBook = (book) => {
    setSelectedBooks(prev => 
      prev.includes(book) 
        ? prev.filter(b => b !== book)
        : [...prev, book]
    )
  }

  const clearFilters = () => {
    setSelectedCollections([])
    setSelectedBooks([])
  }

  const highlightText = (text, query) => {
    if (!query) return text
    
    const words = query.toLowerCase().split(' ').filter(word => word.length > 0)
    let highlightedText = text
    
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi')
      highlightedText = highlightedText.replace(regex, '<mark style="background-color: yellow; font-weight: bold;">$1</mark>')
    })
    
    return highlightedText
  }

  return (
    <div className="app">
      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo-section">
            <h1 className="logo">Search Diligently</h1>
            <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
              <span className="status-dot"></span>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCollections.length > 0 || selectedBooks.length > 0) && (
            <div className="filter-section">
              <div className="filter-header">
                <h3>Active Filters</h3>
                <button onClick={clearFilters} className="clear-filters">Clear All</button>
              </div>
              <div className="active-filters">
                {selectedCollections.map(collection => (
                  <span key={collection} className="filter-badge collection">
                    {collection}
                    <button onClick={() => toggleCollection(collection)}>×</button>
                  </span>
                ))}
                {selectedBooks.map(book => (
                  <span key={book} className="filter-badge book">
                    {book}
                    <button onClick={() => toggleBook(book)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Scripture Collections */}
          <div className="filter-section">
            <button 
              className="filter-toggle"
              onClick={() => setShowCollections(!showCollections)}
            >
              <span>Scripture Collections</span>
              <span className={`arrow ${showCollections ? 'expanded' : ''}`}>▼</span>
            </button>
            {showCollections && (
              <div className="filter-options">
                {scriptureCollections.map(collection => (
                  <label key={collection} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCollections.includes(collection)}
                      onChange={() => toggleCollection(collection)}
                    />
                    <span>{collection}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Individual Books */}
          <div className="filter-section">
            <button 
              className="filter-toggle"
              onClick={() => setShowBooks(!showBooks)}
            >
              <span>Individual Books</span>
              <span className={`arrow ${showBooks ? 'expanded' : ''}`}>▼</span>
            </button>
            {showBooks && (
              <div className="filter-options">
                {Object.entries(scriptureBooks).map(([collection, books]) => (
                  <div key={collection} className="book-collection">
                    <div className="collection-name">{collection}</div>
                    {books.map(book => (
                      <label key={book} className="filter-option book-option">
                        <input
                          type="checkbox"
                          checked={selectedBooks.includes(book)}
                          onChange={() => toggleBook(book)}
                        />
                        <span>{book}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search scriptures..."
                className="search-input"
              />
              <button 
                onClick={handleSearch} 
                disabled={isLoading || !searchQuery.trim()}
                className="search-button"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          <div className="results-section">
            {searchResults.length > 0 && (
              <div className="results-header">
                <h2>Search Results ({searchResults.length})</h2>
              </div>
            )}
            
            <div className="results-container">
              {searchResults.length === 0 && searchQuery && !isLoading && (
                <div className="no-results">
                  <p>No results found for "{searchQuery}". Try different keywords or adjust your filters.</p>
                </div>
              )}
              
              {searchResults.map((result, index) => (
                <div key={index} className="result-card">
                  <div className="result-reference">
                    <strong>{result.book} {result.chapter}:{result.verse}</strong>
                    <span className="collection-badge">{result.collection}</span>
                  </div>
                  <div 
                    className="result-text"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightText(result.text, searchQuery) 
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
