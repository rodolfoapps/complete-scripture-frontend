import { X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

export function SearchTermLabels({ searchQuery, onRemoveTerm, onClearAll }) {
  // Parse search query into terms
  const parseSearchTerms = (query) => {
    if (!query.trim()) return []
    
    // Split by comma and trim each term
    const terms = query.split(',').map(term => term.trim()).filter(term => term.length > 0)
    
    return terms.map((term, index) => ({
      id: index,
      text: term,
      isPhrase: term.includes(' ') && term.split(' ').length > 1
    }))
  }

  const terms = parseSearchTerms(searchQuery)

  if (terms.length === 0) return null

  const handleRemoveTerm = (termId) => {
    const newTerms = terms.filter(term => term.id !== termId)
    const newQuery = newTerms.map(term => term.text).join(', ')
    onRemoveTerm(newQuery)
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2 mb-4">
      <div className="text-sm text-muted-foreground mr-2 self-center">
        Search terms:
      </div>
      {terms.map((term) => (
        <div
          key={term.id}
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
            term.isPhrase 
              ? 'bg-blue-100 text-blue-800 border border-blue-200' 
              : 'bg-green-100 text-green-800 border border-green-200'
          }`}
        >
          <span className="text-xs opacity-75">
            {term.isPhrase ? 'phrase:' : 'word:'}
          </span>
          <span className="font-medium">"{term.text}"</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => handleRemoveTerm(term.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      {terms.length > 1 && (
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 text-xs"
          onClick={onClearAll}
        >
          Clear all
        </Button>
      )}
    </div>
  )
}

export default SearchTermLabels

