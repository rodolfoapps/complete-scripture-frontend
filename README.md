# Search Diligently - Scripture Search Application

A powerful, modern scripture search application featuring the complete LDS canon with advanced search capabilities.

## 🌟 Features

### 📖 Complete Scripture Library
- **Bible (KJV)** - Old and New Testament
- **Book of Mormon** - All books and chapters
- **Doctrine and Covenants** - All sections
- **Pearl of Great Price** - Complete collection
- **42,464 total verses** across all volumes

### 🔍 Advanced Search Engine
- **Smart search logic** with comma-based parsing
- **Phrase search**: "faith hope" (searches for exact phrase)
- **Individual word search**: "faith, hope" (searches for both words anywhere in verse)
- **Verse range filtering**: Search within 1-5 consecutive verses or entire chapters
- **Scripture filtering**: Limit search to specific books or volumes
- **Perfect highlighting**: All search terms highlighted in results
- **Visual search labels**: See how your search is parsed with colored labels

### 🎯 User Experience
- **Hierarchical navigation**: Volume → Book → Chapter → Verses
- **Back button integration**: Seamless navigation between search and reading
- **Persistent search terms**: Terms stay visible after search for easy modification
- **Quick search transfer**: Enter terms in quick search, automatically transfers to advanced
- **Mobile responsive**: Works perfectly on all devices

### 🚀 Professional Features
- **SEO optimized** with proper meta tags
- **Social media ready** with Open Graph tags
- **Google Analytics** integration
- **Custom favicon** and branding
- **Isaiah class banner** with call-to-action
- **Professional footer** with copyright

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Fork this repository** to your GitHub account

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your forked repository
   - Click "Deploy"

3. **Custom Domain** (Optional):
   - In Vercel dashboard, go to your project
   - Click "Domains" → "Add Domain"
   - Enter your domain (e.g., searchdiligently.com)
   - Follow DNS configuration instructions

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Clone and deploy
git clone https://github.com/yourusername/search-diligently.git
cd search-diligently
vercel

# Follow the prompts and you're live!
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/search-diligently.git
cd search-diligently

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### API Development
The API functions are located in `/api/` and use Python with no external dependencies:
- `search.py` - Advanced search with highlighting
- `navigation.py` - Scripture navigation structure  
- `chapter.py` - Chapter loading
- `health.py` - Health check endpoint

## 📁 Project Structure

```
search-diligently/
├── api/                    # Vercel serverless functions
│   ├── search.py          # Search API endpoint
│   ├── navigation.py      # Navigation API endpoint
│   ├── chapter.py         # Chapter API endpoint
│   └── health.py          # Health check endpoint
├── src/                   # React frontend source
│   ├── components/        # React components
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── scripture_data/        # Complete scripture database (39MB)
│   ├── navigation.json    # Navigation structure
│   ├── book_metadata.json # Book metadata
│   └── [volume_files]     # Individual scripture volumes
├── public/               # Static assets
├── dist/                 # Built frontend (auto-generated)
├── vercel.json          # Vercel configuration
├── package.json         # Node.js dependencies
└── README.md           # This file
```

## 🔧 Configuration

### Environment Variables
No environment variables required - the application works out of the box.

### Vercel Configuration
The `vercel.json` file is pre-configured for:
- React frontend with Vite build
- Python serverless functions
- Proper routing for SPA and API
- Optimized for performance

### Custom Domain Setup
1. In Vercel dashboard, go to your project
2. Click "Domains" → "Add Domain"  
3. Enter your domain
4. Update your DNS records as instructed
5. SSL certificate is automatically provisioned

## 📊 Performance

### Optimizations
- **Global CDN**: Content delivered from edge locations worldwide
- **Automatic compression**: Gzip compression for all assets
- **Smart caching**: Static assets cached aggressively
- **Serverless functions**: API endpoints scale automatically
- **Minimal dependencies**: Fast cold starts

### Metrics
- **Database size**: 39MB (compressed to ~6MB in deployment)
- **Search index**: 25MB (compressed to ~3MB)
- **Frontend bundle**: ~400KB gzipped
- **Cold start time**: <500ms
- **Search response time**: <100ms

## 🔍 API Endpoints

### Search
```
GET /api/scripture/search?query=love&verse_range=1&books=
```

### Navigation
```
GET /api/scripture/navigation
```

### Chapter
```
GET /api/scripture/chapter?book=Genesis&chapter=1
```

### Health Check
```
GET /api/scripture/health
```

## 🎨 Customization

### Branding
- Update `public/favicon.png` for custom favicon
- Modify `public/SocialOpenGraphImage.png` for social media sharing
- Edit footer links in `src/App.jsx`

### Analytics
- Google Analytics is pre-configured with ID: `G-C6MPY3E35J`
- Update the tracking ID in `index.html` for your own analytics

### Styling
- Built with Tailwind CSS for easy customization
- Component styles in `src/App.css`
- Responsive design works on all devices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📞 Support

For support or questions:
- Visit [SearchDiligently.com](https://searchdiligently.com)
- Join our [Free Isaiah Class](https://searchdiligently.com/isaiah-class/)

## 🙏 Acknowledgments

- Scripture text from the LDS Church
- Built with React, Vite, and Vercel
- Icons from Lucide React

---

**Search Diligently** - Advanced Scripture Study Made Simple 📖✨

