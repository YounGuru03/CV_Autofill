# Cover Letter Generator

An AI-powered tool to create personalized, professional cover letters tailored to specific job applications. Choose from multiple tones and let AI or templates craft your perfect cover letter.

## Features

- **AI-Powered Generation**: Uses DeepSeek API for intelligent, personalized cover letters
- **Template-Based Option**: Generate cover letters without AI using professional templates
- **Multiple Tones**: Choose from Professional, Friendly, or Confident styles
- **Customizable**: Fill in your details and job information for targeted letters
- **Copy & Download**: Easy export options for your generated cover letter
- **Regenerate**: Create multiple variations with one click
- **Responsive Design**: Works perfectly on desktop and mobile devices

## How to Use

### Basic Usage

1. Open `index.html` in your web browser
2. Fill in your personal information (name, email, phone, address)
3. Enter the company name and position title
4. Paste the job description
5. Describe your relevant experience and skills
6. (Optional) Add why you're interested in the company
7. Select your preferred tone
8. Click "Generate Cover Letter"

### AI-Powered Generation

To use AI-powered generation with DeepSeek:

```javascript
// In browser console or before opening the page:
localStorage.setItem('deepseek_api_key', 'your-api-key-here');
```

Get your API key from [DeepSeek Platform](https://platform.deepseek.com/)

### Template-Based Generation

Don't have an API key? No problem! Click "Use Template (No AI)" to generate a cover letter using professional templates that are customized with your information.

## Available Tones

### Professional & Formal
- Traditional business letter format
- Conservative and respectful language
- Best for: Corporate positions, traditional industries, senior roles

### Friendly & Enthusiastic
- Warm and approachable tone
- Shows personality while remaining professional
- Best for: Startups, creative roles, company culture-focused organizations

### Confident & Direct
- Strong and assertive language
- Results-oriented and impactful
- Best for: Sales, leadership roles, competitive positions

## Tips for Best Results

### Be Specific
- Mention concrete achievements with numbers
- Reference specific projects or technologies from the job description
- Use industry-specific terminology

### Provide Context
- Paste the complete job description
- Detail your most relevant experiences
- Explain why this specific company interests you

### Customize After Generation
- Review and personalize the generated letter
- Add specific examples that weren't in your initial input
- Ensure all facts and figures are accurate

### Common Mistakes to Avoid
- ❌ Generic letters that could apply to any company
- ❌ Spelling the company or hiring manager's name wrong
- ❌ Making it all about you instead of what you can offer
- ❌ Exceeding one page in length
- ❌ Forgetting to proofread

## File Structure

```
CoverLetterGenerator/
├── index.html          # Main web interface
├── style.css           # Responsive styling
├── script.js           # Generation logic and API integration
├── templates/          # Template files
│   ├── formal.txt      # Professional template
│   ├── friendly.txt    # Enthusiastic template
│   └── enthusiastic.txt# Confident template
└── README.md          # Documentation
```

## Technical Details

### Frontend
- **HTML5**: Semantic form structure
- **CSS3**: Modern, responsive design with CSS Grid
- **JavaScript ES6+**: Async/await for API calls, localStorage for settings

### API Integration
- **DeepSeek API**: GPT-style chat completions
- **Fallback**: Template-based generation when API unavailable
- **Error Handling**: Graceful degradation to templates

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Privacy & Security

- Your personal information stays in your browser
- API calls are made directly to DeepSeek (if configured)
- No data is stored on external servers
- API key is stored in browser localStorage (keep it secure!)

## Examples

### Good Input
```
Your Experience:
"5+ years as Full Stack Developer. Built scalable microservices 
using Node.js and React, serving 1M+ users. Led team of 4 developers. 
Reduced API response time by 60%. Expert in AWS, Docker, CI/CD."

Why This Company:
"Impressed by your AI-driven healthcare platform. My experience 
in healthcare tech and passion for improving patient outcomes 
aligns perfectly with your mission."
```

### Generated Output Quality
The tool generates:
- Properly formatted business letters
- Targeted content matching job requirements
- Specific examples from your experience
- Company-specific enthusiasm
- Professional closing with call to action

## Advanced Features

### Regeneration
Click "🔄 Regenerate" to create a new version with slightly different phrasing while maintaining the core content.

### Export Options
- **Copy**: One-click copy to clipboard
- **Download**: Save as .txt file with company name

### Form Persistence
Your form data persists during your session, making it easy to generate multiple variations or apply to similar positions.

## Troubleshooting

**Problem**: AI generation not working
- **Solution**: Check if API key is set correctly in localStorage
- **Fallback**: Use template-based generation

**Problem**: Generated letter seems generic
- **Solution**: Provide more specific details in the experience field
- **Solution**: Include concrete achievements and metrics

**Problem**: Letter is too long
- **Solution**: Be more concise in your experience description
- **Solution**: Focus on the most relevant 2-3 achievements

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## License

See [LICENSE](../LICENSE) file.

## Support

For issues or questions, check the main project documentation or create an issue in the repository.
