# Contributing to Search Diligently

Thank you for your interest in contributing to Search Diligently! This document provides guidelines and information for contributors.

## 🎯 Project Overview

Search Diligently is a modern scripture search application featuring the complete LDS canon with advanced search capabilities. The project aims to provide a powerful, user-friendly tool for scripture study.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or pnpm
- Git

### Local Development Setup
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/yourusername/search-diligently.git
cd search-diligently

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 📝 How to Contribute

### 1. Issues
- Check existing issues before creating new ones
- Use clear, descriptive titles
- Provide detailed descriptions with steps to reproduce bugs
- Label issues appropriately (bug, enhancement, question, etc.)

### 2. Pull Requests
- Fork the repository and create a feature branch
- Make your changes with clear, descriptive commit messages
- Test your changes thoroughly
- Update documentation if needed
- Submit a pull request with a clear description

### 3. Branch Naming
- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring

## 🛠️ Development Guidelines

### Code Style
- Use consistent formatting (Prettier configuration included)
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Frontend (React)
- Use functional components with hooks
- Implement responsive design
- Ensure accessibility (ARIA labels, keyboard navigation)
- Optimize for performance
- Test on multiple browsers and devices

### Backend (Python API)
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle errors gracefully
- Optimize for performance
- Maintain backward compatibility

### Testing
- Test all new features thoroughly
- Verify search functionality works correctly
- Check navigation and back button behavior
- Test on mobile devices
- Verify API endpoints return expected data

## 📊 Areas for Contribution

### 🔍 Search Enhancements
- Advanced search operators (AND, OR, NOT)
- Search result sorting options
- Search history and saved searches
- Fuzzy search capabilities
- Search performance optimizations

### 📖 Scripture Features
- Cross-references and footnotes
- Study notes and bookmarks
- Reading plans and progress tracking
- Scripture comparison tools
- Audio scripture playback

### 🎨 User Interface
- Dark mode support
- Accessibility improvements
- Mobile app development
- Keyboard shortcuts
- Print-friendly layouts

### 🚀 Performance
- Search index optimizations
- Caching strategies
- Bundle size reduction
- Loading performance
- Offline capabilities

### 📱 Mobile Experience
- Touch gestures
- Mobile-specific navigation
- Responsive design improvements
- Progressive Web App features
- Native mobile app development

## 🧪 Testing

### Manual Testing Checklist
- [ ] Search functionality works with various queries
- [ ] Navigation between volumes, books, and chapters
- [ ] Back button preserves search state
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] API endpoints return correct data
- [ ] Error handling works properly

### Automated Testing
- Unit tests for utility functions
- Integration tests for API endpoints
- End-to-end tests for user workflows
- Performance testing for search operations

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document API endpoints
- Include usage examples
- Update README for new features

### User Documentation
- Update help sections
- Create tutorial content
- Document keyboard shortcuts
- Provide troubleshooting guides

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser and device information
- Screenshots or screen recordings if helpful
- Console error messages

## 💡 Feature Requests

For feature requests, please provide:
- Clear description of the proposed feature
- Use case and benefits
- Potential implementation approach
- Mockups or examples if applicable

## 📋 Code Review Process

1. All contributions require code review
2. Maintainers will review pull requests
3. Address feedback and requested changes
4. Ensure CI/CD checks pass
5. Merge after approval

## 🏷️ Release Process

- Features are merged to `main` branch
- Releases are tagged with semantic versioning
- Deployment happens automatically via Vercel
- Release notes document changes

## 📞 Communication

- GitHub Issues for bug reports and feature requests
- GitHub Discussions for general questions
- Pull Request comments for code-specific discussions

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📄 License

By contributing to Search Diligently, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

If you have questions about contributing, please:
- Check existing documentation
- Search closed issues
- Create a new issue with the "question" label
- Visit [SearchDiligently.com](https://searchdiligently.com) for general information

Thank you for helping make Search Diligently better! 🙏📖✨

