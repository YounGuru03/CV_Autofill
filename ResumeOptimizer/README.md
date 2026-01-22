# Resume Optimizer

An intelligent tool to analyze and optimize resumes for Applicant Tracking Systems (ATS). Get instant feedback on keyword usage, formatting, and content quality.

## Features

- **ATS Score Analysis**: Get a comprehensive score (0-100) for your resume's ATS compatibility
- **Keyword Matching**: Analyze keyword overlap with job descriptions
- **Content Analysis**: Check word count, sections, contact information, and formatting
- **Actionable Recommendations**: Receive specific suggestions to improve your resume
- **Missing Keywords Detection**: Identify important keywords from job descriptions that are missing in your resume
- **Real-time Analysis**: Instant feedback on your resume

## How to Use

### Web Interface

1. Open `index.html` in a modern web browser
2. Click "Choose File" and upload your resume (PDF, DOC, DOCX, or TXT)
3. (Optional) Paste the job description for targeted analysis
4. Click "Analyze Resume" to get your results
5. Review your ATS score, keyword matches, and recommendations

### Python Backend (Optional)

For advanced NLP analysis:

```bash
# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Run the optimizer
python optimizer.py
```

### Using the Python API

```python
from optimizer import ResumeOptimizer

optimizer = ResumeOptimizer()

# Analyze resume
results = optimizer.analyze_resume(
    resume_text="Your resume content here",
    job_description="Job description here (optional)"
)

print(f"ATS Score: {results['score']}/100")
print(f"Recommendations: {results['recommendations']}")
```

## Understanding Your Score

- **80-100**: Excellent - Your resume is highly optimized for ATS
- **60-79**: Good - Some improvements recommended
- **0-59**: Needs Improvement - Follow recommendations to boost your score

## Key Metrics

1. **Keywords Found**: Number of relevant keywords detected in your resume
2. **Word Count**: Total words in your resume (ideal: 400-600)
3. **Sections**: Number of standard resume sections (Experience, Education, Skills, etc.)
4. **Contact Info**: Presence of email and phone number
5. **Bullet Points**: Use of bullet points for better readability

## Tips for Better ATS Scores

1. **Use Standard Section Headers**: Experience, Education, Skills, etc.
2. **Include Contact Information**: Email and phone number are essential
3. **Add Relevant Keywords**: Match keywords from the job description
4. **Use Action Verbs**: Start bullet points with strong action verbs
5. **Keep It Concise**: Aim for 1-2 pages (400-700 words)
6. **Use Bullet Points**: Makes content easier to scan
7. **Avoid Graphics/Tables**: ATS systems may not parse them correctly
8. **Use Standard Fonts**: Stick to Arial, Calibri, or Times New Roman

## Technical Details

### Frontend
- **HTML5**: Modern semantic markup
- **CSS3**: Responsive design with CSS Grid and Flexbox
- **JavaScript ES6+**: Client-side analysis and interactivity

### Backend (Optional)
- **Python 3.7+**: Core analysis engine
- **spaCy**: Natural Language Processing
- **Regular Expressions**: Text pattern matching
- **Counter & Sets**: Efficient keyword analysis

## File Format Support

- **TXT**: Direct text analysis (best for demo)
- **PDF**: Requires backend PDF parser
- **DOC/DOCX**: Requires backend document parser

Note: For full PDF and DOC support, deploy the Python backend with appropriate libraries (PyPDF2, python-docx).

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Privacy

All analysis is performed client-side (or on your local backend). Your resume data is not sent to external servers.

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## License

See [LICENSE](../LICENSE) file.

## Support

For issues or questions, please check the main project documentation or create an issue in the repository.
