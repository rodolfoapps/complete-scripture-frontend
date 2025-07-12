import React, { useState, useEffect } from 'react'
import { Search, Book, Menu, X, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import AdvancedSearch from './components/AdvancedSearch.jsx'
import { API_BASE_URL } from './config.js'
import './App.css'

function App() {
  const [navigationData, setNavigationData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [advancedSearchQuery, setAdvancedSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [currentChapter, setCurrentChapter] = useState(null)
  const [highlightVerse, setHighlightVerse] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [currentView, setCurrentView] = useState('welcome') // 'welcome', 'chapter', 'search'
  const [lastSearchParams, setLastSearchParams] = useState(null)
  const [navigationHistory, setNavigationHistory] = useState(null)

  // Load navigation data on component mount
  useEffect(() => {
    fetchNavigationData()
  }, [])

  const fetchNavigationData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/navigation`)
      const data = await response.json()
      if (data.success) {
        setNavigationData(data.data)
      }
    } catch (error) {
      console.error('Error fetching navigation data:', error)
    }
  }

  const handleQuickSearch = async () => {
    if (!searchQuery.trim()) return

    // Transfer search terms to advanced search box
    setAdvancedSearchQuery(searchQuery)

    const searchParams = {
      query: searchQuery,
      verse_range: 1,
      books: []
    }

    await performSearch(searchParams)
  }

  const performSearch = async (searchParams) => {
    setLoading(true)
    setLastSearchParams(searchParams)
    
    try {
      const queryString = new URLSearchParams({
        query: searchParams.query,
        verse_range: searchParams.verse_range,
        books: searchParams.books.join(',')
      }).toString()

      const response = await fetch(`${API_BASE_URL}/search?${queryString}`)
      const data = await response.json()
      
      if (data.success) {
        setSearchResults(data.results)
        setCurrentView('search')
      } else {
        console.error('Search failed:', data.error)
      }
    } catch (error) {
      console.error('Error performing search:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadChapter = async (bookTitle, chapterNumber, verseNumber = null) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/chapter?book=${encodeURIComponent(bookTitle)}&chapter=${chapterNumber}`)
      const data = await response.json()
      
      if (data.success) {
        setCurrentChapter(data.chapter)
        setHighlightVerse(verseNumber)
        setCurrentView('chapter')
      } else {
        console.error('Failed to load chapter:', data.error)
      }
    } catch (error) {
      console.error('Error loading chapter:', error)
    } finally {
      setLoading(false)
    }
  }

  const navigateToVerse = (verse) => {
    // Store navigation history for back button
    if (currentView === 'search') {
      setNavigationHistory({
        view: 'search',
        searchResults: searchResults,
        searchParams: lastSearchParams,
        searchQuery: advancedSearchQuery
      })
    }
    
    loadChapter(verse.book_title, verse.chapter_number, verse.verse_number)
  }

  const goBackToSearch = () => {
    if (navigationHistory) {
      setSearchResults(navigationHistory.searchResults)
      setLastSearchParams(navigationHistory.searchParams)
      setAdvancedSearchQuery(navigationHistory.searchQuery)
      setCurrentView('search')
      setNavigationHistory(null)
    }
  }

  const renderWelcome = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <Book className="w-16 h-16 mx-auto mb-6 text-blue-600" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Diligently</h1>
        <p className="text-xl text-gray-600 mb-8">
          Advanced Scripture Search Tool - Explore the LDS Canon with powerful search capabilities
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Quick search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()}
              className="flex-1"
            />
            <Button onClick={handleQuickSearch} disabled={loading}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
          <AdvancedSearch 
            onSearch={performSearch}
            searchQuery={advancedSearchQuery}
            setSearchQuery={setAdvancedSearchQuery}
          />
        </div>
      </div>
    </div>
  )

  const renderSearchResults = () => (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Quick search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()}
              className="flex-1"
            />
            <Button onClick={handleQuickSearch} disabled={loading}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
          <AdvancedSearch 
            onSearch={performSearch}
            searchQuery={advancedSearchQuery}
            setSearchQuery={setAdvancedSearchQuery}
          />
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Search Results ({searchResults.length})
          </h2>
        </div>

        <div className="space-y-4">
          {searchResults.map((result, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4" onClick={() => navigateToVerse(result)}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-blue-600">
                    {result.book_title} {result.chapter_number}:{result.verse_number}
                  </h3>
                </div>
                <p 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: result.highlighted_text }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderChapter = () => (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        {navigationHistory && (
          <div className="mb-4">
            <Button 
              onClick={goBackToSearch}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Search Results
            </Button>
          </div>
        )}
        
        {currentChapter && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {currentChapter.book_title} Chapter {currentChapter.chapter_number}
            </h1>
            <div className="space-y-4">
              {currentChapter.verses.map((verse) => (
                <div 
                  key={verse.verse_number}
                  className={`p-3 rounded ${
                    highlightVerse === verse.verse_number 
                      ? 'bg-yellow-100 border-l-4 border-yellow-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="font-semibold text-blue-600 mr-2">
                    {verse.verse_number}
                  </span>
                  <span className="text-gray-800">{verse.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderSidebar = () => (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      sidebarOpen ? 'w-80' : 'w-0'
    } overflow-hidden`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Scriptures</h2>
        <div className="space-y-2">
          {navigationData.map((volume) => (
            <div key={volume.volume_title} className="mb-4">
              <h3 className="font-medium text-gray-800 mb-2">{volume.volume_title}</h3>
              <div className="space-y-1 ml-2">
                {volume.books.map((book) => (
                  <div key={book.book_title} className="mb-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">{book.book_title}</h4>
                    <div className="flex flex-wrap gap-1 ml-2">
                      {Array.from({ length: book.chapter_count }, (_, i) => i + 1).map((chapter) => (
                        <button
                          key={chapter}
                          onClick={() => loadChapter(book.book_title, chapter)}
                          className="px-2 py-1 text-xs bg-gray-100 hover:bg-blue-100 rounded transition-colors"
                        >
                          {chapter}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Isaiah Class Banner */}
      <div className="bg-black text-white text-center py-2">
        <a 
          href="https://searchdiligently.com/isaiah-class/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
        >
          Join Our Free Isaiah Class
        </a>
      </div>

      <div className="flex h-screen">
        {renderSidebar()}
        
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
                <h1 className="text-xl font-semibold text-gray-900">Search Diligently</h1>
              </div>
            </div>
          </header>

          {currentView === 'welcome' && renderWelcome()}
          {currentView === 'search' && renderSearchResults()}
          {currentView === 'chapter' && renderChapter()}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center">
        <p className="text-sm text-gray-600">
          © 2025{' '}
          <a 
            href="https://searchdiligently.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            SearchDiligently.com
          </a>
          {' '}version 1
        </p>
      </footer>
    </div>
  )
}

export default App

