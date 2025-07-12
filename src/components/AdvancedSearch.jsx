import { useState, useEffect } from 'react'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible.jsx'
import SearchTermLabels from './SearchTermLabels.jsx'

const API_BASE_URL = '/api/scripture'

export function AdvancedSearch({ onSearch, loading, searchQuery: externalSearchQuery, onSearchQueryChange }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [verseRange, setVerseRange] = useState('1')
  const [selectedVolumes, setSelectedVolumes] = useState([])
  const [selectedBooks, setSelectedBooks] = useState([])
  const [bookMetadata, setBookMetadata] = useState({})
  const [showFilters, setShowFilters] = useState(false)
  const [expandedVolumes, setExpandedVolumes] = useState({})

  // Update internal search query when external query changes
  useEffect(() => {
    if (externalSearchQuery !== undefined) {
      setSearchQuery(externalSearchQuery)
    }
  }, [externalSearchQuery])

  // Update external search query when internal query changes
  const handleSearchQueryChange = (value) => {
    setSearchQuery(value)
    if (onSearchQueryChange) {
      onSearchQueryChange(value)
    }
  }

  useEffect(() => {
    fetchBookMetadata()
  }, [])

  const fetchBookMetadata = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/book-metadata`)
      const data = await response.json()
      if (data.success) {
        setBookMetadata(data.data)
      }
    } catch (error) {
      console.error('Error fetching book metadata:', error)
    }
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    const searchParams = {
      query: searchQuery,
      verse_range: parseInt(verseRange),
      selected_volumes: selectedVolumes,
      selected_books: selectedBooks
    }

    onSearch(searchParams)
  }

  // Handler for removing individual search terms
  const handleRemoveSearchTerm = (newQuery) => {
    handleSearchQueryChange(newQuery)
  }

  // Handler for clearing all search terms
  const handleClearAllTerms = () => {
    handleSearchQueryChange('')
  }

  const handleVolumeToggle = (volumeName) => {
    setSelectedVolumes(prev => {
      const newSelected = prev.includes(volumeName)
        ? prev.filter(v => v !== volumeName)
        : [...prev, volumeName]
      
      // If deselecting a volume, also deselect all its books
      if (prev.includes(volumeName)) {
        const volumeBooks = bookMetadata[volumeName] || []
        setSelectedBooks(prevBooks => 
          prevBooks.filter(book => !volumeBooks.includes(book))
        )
      }
      
      return newSelected
    })
  }

  const handleBookToggle = (bookName, volumeName) => {
    setSelectedBooks(prev => {
      const newSelected = prev.includes(bookName)
        ? prev.filter(b => b !== bookName)
        : [...prev, bookName]
      
      // If selecting a book, also select its volume
      if (!prev.includes(bookName) && !selectedVolumes.includes(volumeName)) {
        setSelectedVolumes(prevVolumes => [...prevVolumes, volumeName])
      }
      
      return newSelected
    })
  }

  const toggleVolumeExpansion = (volumeName) => {
    setExpandedVolumes(prev => ({
      ...prev,
      [volumeName]: !prev[volumeName]
    }))
  }

  const clearFilters = () => {
    setSelectedVolumes([])
    setSelectedBooks([])
    setVerseRange('1')
  }

  const getSelectedFiltersCount = () => {
    return selectedVolumes.length + selectedBooks.length + (verseRange !== '1' ? 1 : 0)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Advanced Scripture Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for words or phrases..."
              value={searchQuery}
              onChange={(e) => handleSearchQueryChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {getSelectedFiltersCount() > 0 && (
              <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                {getSelectedFiltersCount()}
              </span>
            )}
          </Button>
          <Button onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {/* Search Term Labels */}
        <SearchTermLabels 
          searchQuery={searchQuery}
          onRemoveTerm={handleRemoveSearchTerm}
          onClearAll={handleClearAllTerms}
        />

        {/* Advanced Filters */}
        {showFilters && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Search Filters</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Verse Range Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Search Range</Label>
                <Select value={verseRange} onValueChange={setVerseRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select search range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Single verse</SelectItem>
                    <SelectItem value="2">Within 2 verses</SelectItem>
                    <SelectItem value="3">Within 3 verses</SelectItem>
                    <SelectItem value="4">Within 4 verses</SelectItem>
                    <SelectItem value="5">Within 5 verses</SelectItem>
                    <SelectItem value="chapter">Entire chapter</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {verseRange === '1' 
                    ? 'Search for all words within a single verse'
                    : verseRange === 'chapter'
                    ? 'Search for all words within the same chapter'
                    : `Search for all words within ${verseRange} consecutive verses`
                  }
                </p>
              </div>

              {/* Volume and Book Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Scripture Selection</Label>
                <div className="space-y-2 max-h-64 overflow-y-auto border rounded-md p-2">
                  {Object.entries(bookMetadata).map(([volumeName, books]) => (
                    <div key={volumeName} className="space-y-1">
                      <Collapsible 
                        open={expandedVolumes[volumeName]} 
                        onOpenChange={() => toggleVolumeExpansion(volumeName)}
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`volume-${volumeName}`}
                            checked={selectedVolumes.includes(volumeName)}
                            onCheckedChange={() => handleVolumeToggle(volumeName)}
                          />
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                              <ChevronDown className={`h-4 w-4 transition-transform ${
                                expandedVolumes[volumeName] ? 'rotate-180' : ''
                              }`} />
                              <Label 
                                htmlFor={`volume-${volumeName}`}
                                className="cursor-pointer ml-1"
                              >
                                {volumeName}
                              </Label>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <CollapsibleContent className="ml-6 space-y-1">
                          {books.map((bookName) => (
                            <div key={bookName} className="flex items-center space-x-2">
                              <Checkbox
                                id={`book-${bookName}`}
                                checked={selectedBooks.includes(bookName)}
                                onCheckedChange={() => handleBookToggle(bookName, volumeName)}
                              />
                              <Label 
                                htmlFor={`book-${bookName}`}
                                className="text-sm cursor-pointer"
                              >
                                {bookName}
                              </Label>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Leave empty to search all scriptures, or select specific volumes/books to limit your search.
                </p>
              </div>

              {/* Selected Filters Summary */}
              {(selectedVolumes.length > 0 || selectedBooks.length > 0) && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Active Filters</Label>
                  <div className="flex flex-wrap gap-1">
                    {selectedVolumes.map((volume) => (
                      <span 
                        key={volume}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs flex items-center gap-1"
                      >
                        {volume}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 w-4 h-4"
                          onClick={() => handleVolumeToggle(volume)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </span>
                    ))}
                    {selectedBooks.map((book) => (
                      <span 
                        key={book}
                        className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1"
                      >
                        {book}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 w-4 h-4"
                          onClick={() => setSelectedBooks(prev => prev.filter(b => b !== book))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

export default AdvancedSearch

