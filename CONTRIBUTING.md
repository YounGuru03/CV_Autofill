# 🤝 Contributing to Career Optimization Suite

Thank you for your interest in contributing! This document provides guidelines for contributing to the Career Optimization Suite project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Documentation Guidelines](#documentation-guidelines)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or personal attacks
- Publishing others' private information
- Other unprofessional conduct

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs. actual behavior
- **Screenshots** if applicable
- **Environment details** (browser, OS, Python version)
- **Error messages** or console logs

**Example bug report:**
```markdown
## Bug: Resume Optimizer crashes on large PDFs

**Description:** When uploading PDFs larger than 5MB, the tool crashes.

**Steps to Reproduce:**
1. Open ResumeOptimizer/index.html
2. Upload a PDF > 5MB
3. Click "Analyze"

**Expected:** Analysis should complete or show file size error
**Actual:** Page freezes and crashes

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- File size: 7.2 MB

**Error Log:**
```
Uncaught RangeError: Maximum call stack size exceeded
```
```

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

- **Clear use case** - What problem does this solve?
- **Detailed description** - How should it work?
- **Benefits** - Why would this be valuable?
- **Implementation ideas** - Any technical suggestions?

### Contributing Code

1. **Find an issue** to work on, or create one
2. **Comment on the issue** to claim it
3. **Fork the repository**
4. **Create a branch** from `main`
5. **Make your changes** following our guidelines
6. **Test thoroughly**
7. **Submit a pull request**

### Contributing Documentation

Documentation improvements are highly valued:

- Fix typos or unclear explanations
- Add examples and use cases
- Improve setup instructions
- Translate documentation (future)
- Create video tutorials or demos

---

## Development Setup

### Prerequisites

- **Git** for version control
- **Python 3.8+** for Python tools
- **Modern browser** (Chrome, Firefox, Edge, Safari)
- **Code editor** (VS Code recommended)
- **DeepSeek API key** (for AI features)

### Setup Steps

```bash
# Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/CV_Autofill.git
cd CV_Autofill

# Create a branch for your work
git checkout -b feature/your-feature-name

# For Python tools, create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies (if working on Python tools)
pip install -r requirements.txt

# Install development dependencies
pip install -r requirements-dev.txt  # If exists
```

### Running Tools Locally

**Web tools:**
```bash
# Simply open HTML files in your browser
open ResumeOptimizer/index.html  # macOS
start ResumeOptimizer/index.html  # Windows
xdg-open ResumeOptimizer/index.html  # Linux
```

**Python tools:**
```bash
cd ResumeOptimizer
python optimizer.py
```

---

## Code Style Guidelines

### Python Code Style (PEP 8)

Follow [PEP 8](https://peps.python.org/pep-0008/) guidelines:

```python
# Good ✅
def calculate_ats_score(resume_text: str, job_description: str) -> float:
    """
    Calculate ATS compatibility score.
    
    Args:
        resume_text: The resume content as string
        job_description: The job posting content as string
        
    Returns:
        float: Score between 0 and 100
    """
    keywords = extract_keywords(job_description)
    matched_count = count_matches(resume_text, keywords)
    return (matched_count / len(keywords)) * 100


# Bad ❌
def calcScore(r,j):
    k=getKeys(j)
    m=countM(r,k)
    return (m/len(k))*100
```

**Key Points:**
- Use 4 spaces for indentation (no tabs)
- Max line length: 88 characters (Black formatter standard)
- Use type hints for function parameters and returns
- Write docstrings for all functions and classes
- Use descriptive variable names
- Add comments for complex logic

### JavaScript Code Style (ES6+)

Follow modern JavaScript best practices:

```javascript
// Good ✅
/**
 * Analyzes resume for ATS compatibility
 * @param {string} resumeText - The resume content
 * @param {string} jobDescription - The job posting
 * @returns {Object} Analysis results with score and keywords
 */
function analyzeResume(resumeText, jobDescription) {
    const keywords = extractKeywords(jobDescription);
    const matchedKeywords = findMatches(resumeText, keywords);
    
    return {
        score: calculateScore(matchedKeywords, keywords),
        matched: matchedKeywords,
        missing: keywords.filter(k => !matchedKeywords.includes(k))
    };
}

// Bad ❌
function analyze(r,j) {
    var k=getK(j);
    var m=findM(r,k);
    return {s:calc(m,k),m:m,mi:k.filter(x=>!m.includes(x))};
}
```

**Key Points:**
- Use `const` and `let`, avoid `var`
- Use arrow functions where appropriate
- Use template literals for strings
- Use descriptive variable names
- Add JSDoc comments for functions
- Use modern ES6+ features

### HTML/CSS Guidelines

```html
<!-- Good ✅ -->
<div class="resume-section" id="experience-section">
    <h2 class="section-title">Work Experience</h2>
    <div class="experience-list">
        <!-- Content -->
    </div>
</div>

<style>
/* Use BEM-like naming */
.resume-section {
    margin: 20px 0;
    padding: 15px;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
}
</style>

<!-- Bad ❌ -->
<div class="rs" id="exp">
    <h2 class="st">Work Experience</h2>
    <div class="el">
        <!-- Content -->
    </div>
</div>
```

**Key Points:**
- Use semantic HTML5 elements
- Use descriptive class names
- Ensure accessibility (ARIA labels, alt text)
- Responsive design (mobile-first)
- Consistent indentation (2 spaces)

---

## Commit Message Format

Use conventional commit messages:

```
<type>(<scope>): <short summary>

<optional detailed description>

<optional footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```
feat(ResumeOptimizer): add PDF upload support

Added ability to upload PDF resumes instead of just text.
Uses pdf.js library for parsing.

Closes #42

---

fix(CoverLetterGenerator): fix API key validation

API key validation was failing for keys with special characters.
Now properly handles all valid DeepSeek API key formats.

Fixes #56

---

docs(TOOLS_GUIDE): improve Interview Prep examples

Added more detailed examples and pro tips section
for Interview Prep tool usage.
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Added tests for new features
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tested in multiple browsers (if web tool)
- [ ] Commit messages follow convention

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing Done
- [ ] Tested manually
- [ ] Added unit tests
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested on mobile

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Closes #XX
```

### Review Process

1. **Automated checks** must pass (if configured)
2. **Code review** by at least one maintainer
3. **Testing** by reviewer
4. **Approval** and merge

### After Merge

- Delete your branch
- Update your fork
- Close related issues

---

## Testing Requirements

### For Python Code

```python
# Use pytest for testing
# File: tests/test_resume_optimizer.py

import pytest
from ResumeOptimizer.optimizer import calculate_ats_score

def test_ats_score_calculation():
    """Test ATS score with known inputs"""
    resume = "Python JavaScript React experience"
    job_desc = "Looking for Python and React developer"
    
    score = calculate_ats_score(resume, job_desc)
    
    assert score > 50, "Score should be above 50%"
    assert score <= 100, "Score should not exceed 100%"

def test_missing_keywords():
    """Test handling of missing keywords"""
    resume = "Python experience"
    job_desc = "Looking for Java developer"
    
    score = calculate_ats_score(resume, job_desc)
    
    assert score < 30, "Score should be low with no matching keywords"
```

**Run tests:**
```bash
pytest tests/
pytest --cov=. tests/  # With coverage
```

### For JavaScript Code

```javascript
// Use Jest or QUnit for testing
// File: tests/test_resume.js

describe('Resume Analyzer', () => {
    test('should extract keywords correctly', () => {
        const jobDesc = 'Looking for Python and React developer';
        const keywords = extractKeywords(jobDesc);
        
        expect(keywords).toContain('Python');
        expect(keywords).toContain('React');
        expect(keywords.length).toBeGreaterThan(0);
    });
    
    test('should handle empty input', () => {
        const result = analyzeResume('', '');
        
        expect(result.score).toBe(0);
        expect(result.matched).toHaveLength(0);
    });
});
```

### Manual Testing Checklist

For web tools:
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test on mobile device
- [ ] Test with screen reader
- [ ] Test all interactive elements
- [ ] Test error scenarios
- [ ] Test with slow internet (if applicable)

---

## Documentation Guidelines

### Code Comments

```python
# Good ✅
def process_resume(text: str) -> dict:
    """
    Process resume text and extract structured data.
    
    This function parses resume text to extract personal information,
    skills, experience, and education using NLP techniques.
    
    Args:
        text: Raw resume text from PDF or input field
        
    Returns:
        dict: Structured resume data with keys:
            - personal_info: name, email, phone
            - skills: list of skills
            - experience: list of work experiences
            - education: list of education entries
            
    Raises:
        ValueError: If text is empty or invalid format
        
    Example:
        >>> resume_text = "John Doe\\nEmail: john@email.com\\nSkills: Python"
        >>> data = process_resume(resume_text)
        >>> print(data['personal_info']['name'])
        'John Doe'
    """
    if not text or not text.strip():
        raise ValueError("Resume text cannot be empty")
    
    # Use NLP to extract entities
    doc = nlp(text)
    
    # Extract personal information
    personal = extract_personal_info(doc)
    
    return {
        'personal_info': personal,
        'skills': extract_skills(doc),
        'experience': extract_experience(doc),
        'education': extract_education(doc)
    }
```

### README Files

Each tool should have a README with:
- Description (2-3 sentences)
- Features list
- Installation instructions
- Usage examples
- Configuration options
- Troubleshooting section

### API Documentation

If adding API integrations:
- Document all endpoints
- Provide example requests/responses
- Note rate limits
- Explain error codes
- Include authentication steps

---

## Questions?

- **General questions**: Open a [Discussion](https://github.com/YounGuru03/CV_Autofill/discussions)
- **Bug reports**: Open an [Issue](https://github.com/YounGuru03/CV_Autofill/issues)
- **Feature requests**: Open an [Issue](https://github.com/YounGuru03/CV_Autofill/issues) with "enhancement" label

---

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project credits

Thank you for contributing! 🙏

---

**Happy Contributing! 🚀**
