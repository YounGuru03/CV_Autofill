# Interview Prep

A comprehensive interview preparation tool with curated questions across multiple categories, difficulty levels, and roles. Practice with STAR method guidance and track your answers.

## Features

- **Role-Specific Questions**: Questions tailored for Software Engineers, Data Scientists, Product Managers, Designers, and more
- **Multiple Question Types**: 
  - Technical questions
  - Behavioral questions (STAR method)
  - Situational questions
- **Difficulty Levels**: Junior, Mid-level, Senior, and Mixed
- **Interactive Practice**: Write and save your answers
- **Progress Tracking**: Visual progress bar and question counter
- **Tips & Guidance**: Helpful tips for each question
- **Export Functionality**: Download your Q&A for review
- **Persistent Storage**: Saves your answers locally

## How to Use

### Basic Usage

1. Open `index.html` in your web browser
2. Configure your practice session:
   - Select your job role
   - Choose question types (Technical, Behavioral, Situational)
   - Select difficulty level
   - Set number of questions (1-20)
3. Click "Generate Questions"
4. Answer each question in the text area
5. Click "Show Tips" for guidance on each question
6. Navigate between questions using Previous/Next buttons
7. Save your answers as you go
8. Export your Q&A when finished

### The STAR Method

For behavioral questions, use the STAR framework:

- **S**ituation: Set the context for your story
- **T**ask: Describe what your responsibility was
- **A**ction: Explain what steps you took
- **R**esult: Share what outcomes were achieved

### Tips for Effective Practice

1. **Be Specific**: Use concrete examples with numbers and details
2. **Practice Out Loud**: After writing, practice speaking your answers
3. **Time Yourself**: Keep answers to 2-3 minutes for behavioral questions
4. **Record Yourself**: Video practice helps identify areas for improvement
5. **Get Feedback**: Share your answers with friends or mentors
6. **Prepare Stories**: Have 5-7 versatile stories ready to adapt
7. **Research the Company**: Tailor examples to the company's values

## Question Categories

### Technical Questions
- Programming concepts and languages
- Data structures and algorithms
- System design
- Database and SQL
- API design
- Best practices

### Behavioral Questions
- Teamwork and collaboration
- Leadership and influence
- Problem-solving
- Adaptability
- Conflict resolution
- Learning and growth

### Situational Questions
- Hypothetical scenarios
- Decision-making
- Prioritization
- Stakeholder management
- Crisis handling
- Professional judgment

## Difficulty Levels

- **Junior**: Entry-level questions focusing on fundamentals
- **Mid**: Questions requiring practical experience and depth
- **Senior**: Complex questions about leadership, architecture, strategy
- **Mixed**: Combination of all levels

## Keyboard Shortcuts

- `Alt + N`: Next question
- `Alt + P`: Previous question
- `Alt + S`: Save answer
- `Alt + T`: Toggle tips

## File Structure

```
InterviewPrep/
├── index.html                      # Main interface
├── style.css                       # Responsive styling
├── script.js                       # Question generation and management
├── data/
│   ├── technical_questions.json   # Technical Q&A
│   ├── behavioral_questions.json  # Behavioral Q&A
│   └── industry_questions.json    # Situational Q&A
└── README.md                       # Documentation
```

## Technical Details

### Frontend
- **HTML5**: Semantic structure with accessible forms
- **CSS3**: Modern, responsive design with smooth animations
- **JavaScript ES6+**: Async data loading, localStorage for persistence

### Data Format
Questions are stored in JSON with the following structure:
```json
{
  "question": "Question text",
  "type": "technical|behavioral|situational",
  "role": "software-engineer|data-scientist|product-manager|general",
  "difficulty": "junior|mid|senior",
  "tips": "String or object with guidance"
}
```

### Local Storage
- Answers are automatically saved to localStorage
- Persists across sessions
- Key: `interviewAnswers`

## Customization

### Adding Your Own Questions

Edit the JSON files in the `data/` directory:

```json
{
  "question": "Your custom question?",
  "type": "technical",
  "role": "software-engineer",
  "difficulty": "mid",
  "tips": {
    "approach": "How to think about it",
    "keyPoints": ["Point 1", "Point 2"],
    "example": "Sample answer"
  }
}
```

### Adding New Roles

1. Add option to `<select id="role">` in `index.html`
2. Add questions with the new role value in JSON files
3. Questions marked as `"role": "general"` appear for all roles

## Best Practices

### Before the Interview
- Practice 10-15 questions per day
- Focus on your weak areas
- Prepare 5-7 key stories
- Research the company and role
- Review technical fundamentals

### During Practice
- Answer without looking at tips first
- Time your responses (2-3 minutes)
- Practice speaking, not just writing
- Focus on clarity and structure
- Include metrics and outcomes

### After Practice
- Review and refine your answers
- Identify patterns in your responses
- Get feedback from others
- Practice the same questions multiple times
- Build confidence through repetition

## Common Mistakes to Avoid

- ❌ Being too vague or generic
- ❌ Rambling without structure
- ❌ Focusing on "we" instead of "I"
- ❌ Negative talk about previous employers
- ❌ Not preparing questions to ask
- ❌ Failing to quantify achievements
- ❌ Not practicing out loud

## Interview Day Tips

1. **Arrive Early**: 10-15 minutes before
2. **Bring Copies**: Of your resume
3. **Take Notes**: Write down questions and key points
4. **Ask Questions**: Show engagement and interest
5. **Follow Up**: Send thank-you email within 24 hours

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Privacy

- All data stored locally in your browser
- No external servers or tracking
- Your answers remain private

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## License

See [LICENSE](../LICENSE) file.

## Support

For issues or questions, check the main project documentation or create an issue in the repository.
