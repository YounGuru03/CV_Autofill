# 🎯 Career Optimization Suite - Complete Job Search Toolkit

A comprehensive collection of powerful tools designed to help job seekers optimize their application process, from resume refinement to interview preparation. Built with modern web technologies and AI integration (DeepSeek API).

![Python](https://img.shields.io/badge/Python-3.8+-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 📌 Project Description

The Career Optimization Suite is an all-in-one toolkit that automates and enhances every stage of your job search journey. Whether you're optimizing your resume for ATS systems, generating tailored cover letters, preparing for interviews, or planning your career path, this suite provides the tools you need to succeed.

## ✨ Features Overview

### 🎯 **Resume Autofill** - Automated Resume Form Filling
AI-powered resume optimization and automatic form filling for job applications. Uses DeepSeek AI to analyze job descriptions and generate optimized resumes with ATS keywords and Tampermonkey scripts for auto-filling.

### 📊 **Resume Optimizer** - ATS Keyword Optimization  
Analyze your resume against job descriptions to ensure maximum ATS compatibility. Get keyword suggestions, formatting checks, and a detailed compatibility score to improve your chances of getting past automated screening.

### ✍️ **Cover Letter Generator** - AI-Powered Cover Letters
Generate personalized, professional cover letters in multiple tones (formal, friendly, enthusiastic) using AI. Simply input your resume data and job description to create compelling cover letters in seconds.

### 🎤 **Interview Prep** - Interview Question Generator
Get tailored interview questions based on job title, company, and role description. Includes technical, behavioral, and industry-specific questions with answer frameworks to help you prepare effectively.

### 🗺️ **Career Path Planner** - Career Development Roadmap
Visualize your career progression from current role to target role. Get skill requirements, timeline suggestions, and an interactive roadmap to guide your professional development.

### 🔍 **Skill Matcher** - Skill Gap Analyzer
Compare your skills against job requirements to identify gaps. Receive a matching percentage, detailed gap analysis, and curated learning resources to help you acquire missing skills.

### 💰 **Salary Negotiator** - Salary Calculator & Negotiation Tips
Get data-driven salary ranges based on role, location, and experience. Includes market data analysis and professional negotiation strategies to help you maximize your compensation.

### 📈 **Job Search Tracker** - Application Progress Dashboard
Track all your job applications in one place. Monitor application status, interview dates, and follow-ups with a beautiful dashboard that persists your data locally.

---

## 📊 Tools Overview Table

| Tool | Description | Tech Stack | Status |
|------|-------------|-----------|--------|
| **Resume Autofill** | Automated resume form filling with AI optimization | HTML5, JavaScript, DeepSeek API | ✅ Active |
| **Resume Optimizer** | ATS keyword optimization and compatibility scoring | Python, spaCy, HTML/CSS/JS | ✅ Active |
| **Cover Letter Generator** | AI-powered personalized cover letter creation | JavaScript, DeepSeek API | ✅ Active |
| **Interview Prep** | Tailored interview question generator with frameworks | Python, JSON, HTML/CSS/JS | ✅ Active |
| **Career Path Planner** | Visual career roadmap with skill progression | Python, Chart.js, HTML/CSS/JS | ✅ Active |
| **Skill Matcher** | Skill gap analysis with learning resources | Python, JSON, HTML/CSS/JS | ✅ Active |
| **Salary Negotiator** | Salary calculator with market data and tips | Python, HTML/CSS/JS | ✅ Active |
| **Job Search Tracker** | Application progress dashboard with localStorage | HTML, CSS, JavaScript | ✅ Active |

---

## 🚀 Quick Start

### For Web Tools (No Installation Required)

Most tools have a web interface that can be used directly in your browser:

```bash
# Clone the repository
git clone https://github.com/YounGuru03/CV_Autofill.git
cd CV_Autofill

# Open any tool's HTML file in your browser
# For example:
# - ResumeAutofill/ResumeAutofill.html
# - ResumeOptimizer/index.html
# - CoverLetterGenerator/index.html
# - InterviewPrep/index.html
# - CareerPathPlanner/index.html
# - SkillMatcher/index.html
# - SalaryNegotiator/index.html
# - JobSearchTracker/tracker.html
```

### For Python Tools

Some tools have Python backends for advanced features:

```bash
# Install Python 3.8 or higher
# Install dependencies for specific tools
cd ResumeOptimizer
pip install -r requirements.txt
python optimizer.py

# Or install all dependencies at once
pip install -r requirements.txt  # (root level, if created)
```

### System Requirements

- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Python**: 3.8+ (for Python-based tools)
- **Internet Connection**: Required for AI features (DeepSeek API)
- **DeepSeek API Key**: Free account at [platform.deepseek.com](https://platform.deepseek.com)

---

## 💡 Usage Examples

### Example 1: Resume Autofill with AI Optimization

1. Open `ResumeAutofill/ResumeAutofill.html` in your browser
2. Enter your DeepSeek API key in the configuration section
3. Fill in your personal information, skills, and experience
4. Paste a job posting URL
5. Click "🔍 Analyze & Fill" to get AI-optimized resume suggestions
6. Generate a Tampermonkey userscript for automatic form filling

### Example 2: Resume Optimization for ATS

1. Open `ResumeOptimizer/index.html` in your browser
2. Upload your resume (PDF or paste text)
3. Paste the target job description
4. Click "Analyze" to get:
   - ATS compatibility score
   - Missing keywords
   - Formatting suggestions
   - Optimized version

### Example 3: Cover Letter Generation

1. Open `CoverLetterGenerator/index.html`
2. Enter your resume summary and job details
3. Select tone (formal/friendly/enthusiastic)
4. Click "Generate" to get multiple AI-powered cover letter versions
5. Copy and customize as needed

---

## 📦 Installation

### Quick Start (Web Tools Only)

```bash
git clone https://github.com/YounGuru03/CV_Autofill.git
cd CV_Autofill
# Open any HTML file in your browser - no build required!
```

### Full Installation (Including Python Tools)

```bash
# Clone the repository
git clone https://github.com/YounGuru03/CV_Autofill.git
cd CV_Autofill

# Install Python dependencies (optional, for Python tools)
pip install -r requirements.txt

# Or install dependencies for individual tools
cd ResumeOptimizer
pip install -r requirements.txt
```

---

## 📖 Documentation

- **[TOOLS_GUIDE.md](TOOLS_GUIDE.md)** - Comprehensive guide for each tool
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute to this project
- **[docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)** - Detailed setup instructions
- **[docs/API_GUIDE.md](docs/API_GUIDE.md)** - DeepSeek API configuration
- **[docs/EXAMPLES.md](docs/EXAMPLES.md)** - Real-world usage examples
- **[docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Common issues and solutions

---

## 🤝 Contributing

We welcome contributions! Whether it's bug fixes, new features, documentation improvements, or tool suggestions, your help makes this project better.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Code style and standards
- How to submit issues
- Pull request process
- Testing requirements

---

## 🔒 Privacy & Security

- **Local Data Storage**: All personal data is stored in your browser's localStorage
- **No External Tracking**: We don't collect or store any user data on external servers
- **API Key Security**: Your DeepSeek API key is stored locally and only sent to DeepSeek's API
- **Open Source**: Full transparency - review all code yourself

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**YounGuru03** - [GitHub Profile](https://github.com/YounGuru03)

---

## ⭐ Support This Project

If you find this toolkit helpful, please:
- ⭐ **Star this repository** to show your support
- 🐛 **Report bugs** to help us improve
- 💡 **Suggest features** in the Issues section
- 🤝 **Contribute** code or documentation
- 📢 **Share** with others who might benefit

---

## 🎯 Showcase Value

This repository demonstrates:
- **Full-Stack Development**: Python backends + JavaScript frontends
- **AI Integration**: Practical use of DeepSeek API for real-world applications
- **User-Centric Design**: Tools that solve actual job-search pain points
- **Code Quality**: Clean, well-documented, maintainable code
- **Project Management**: Comprehensive documentation and organized structure

---

## 📧 Contact

For questions, suggestions, or collaborations, please open an issue or reach out via GitHub.

**Happy Job Hunting! 🚀**
