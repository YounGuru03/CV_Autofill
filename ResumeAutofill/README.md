# Resume Autofill

## 📖 Description

AI-powered resume optimization and automatic form filling tool for job applications. Uses DeepSeek AI to analyze job descriptions, extract ATS keywords, and generate optimized resumes. Also creates Tampermonkey userscripts for automatic form filling on job application websites.

## 🎯 Use Cases

- Quickly fill repetitive job application forms
- Optimize resume content for specific job postings
- Ensure ATS keyword compatibility
- Generate multiple resume versions for different roles
- Auto-populate common fields across multiple applications

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI Integration**: DeepSeek API for resume optimization
- **Storage**: Browser LocalStorage for data persistence
- **Auto-fill**: Tampermonkey/Greasemonkey userscript generation
- **CORS Handling**: Multiple fallback proxies for job URL fetching

## 📦 Installation

No installation required! This is a standalone HTML file.

```bash
# Option 1: Open directly in browser
open ResumeAutofill.html  # macOS
start ResumeAutofill.html  # Windows
xdg-open ResumeAutofill.html  # Linux

# Option 2: Clone repository
git clone https://github.com/YounGuru03/CV_Autofill.git
cd CV_Autofill/ResumeAutofill
# Then open ResumeAutofill.html in your browser
```

## 🚀 Quick Start

### Basic Usage

1. **Open the tool** in your web browser
2. **Configure DeepSeek API**:
   - Get free API key from [platform.deepseek.com](https://platform.deepseek.com)
   - Paste it in the "DeepSeek API Configuration" section
   - Click "Save API Key"

3. **Fill your resume**:
   ```
   Personal Info:
   - Name: Your Full Name
   - Email: your.email@example.com
   - Phone: (555) 123-4567

   Skills:
   - JavaScript, Python, React, Node.js (comma-separated)

   Experience:
   - Click "+ Add Experience"
   - Fill in job title, company, dates, description

   Education:
   - Click "+ Add Education"
   - Fill in degree, institution, dates
   ```

4. **Save**: Click "💾 Save Resume" to persist data

### AI-Powered Optimization

1. **Find a job posting** you want to apply for
2. **Copy the URL** (e.g., `https://company.com/jobs/developer`)
3. **Paste URL** in the "Job Posting URL" field
4. **Click "🔍 Analyze & Fill"**
5. **Review suggestions**: AI will:
   - Extract ATS keywords from job description
   - Suggest skills to add
   - Optimize experience descriptions
   - Provide matching score

### Generate Auto-fill Userscript

1. **Click "📝 Generate Userscript"**
2. **Install browser extension**:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome/Edge/Firefox)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox only)
3. **Create new script** in Tampermonkey
4. **Paste generated code**
5. **Save and enable**
6. **Visit any job application page** → Auto-fill button appears!

## 📊 Example

### Input

```
Name: Jane Smith
Email: jane.smith@email.com
Phone: (555) 987-6543
Skills: JavaScript, React, TypeScript, Node.js
Experience:
  - Senior Frontend Developer at TechCorp (2020-2024)
    Built responsive web applications
  - Frontend Developer at StartupXYZ (2018-2020)
    Developed user interfaces
```

### Job URL

```
https://example.com/jobs/senior-react-developer
```

### Output (AI Analysis)

```
✅ Match Score: 82%

📝 Suggested Additions:
- Skills: "Next.js", "Redux", "Webpack"
- Keywords: "Component architecture", "Performance optimization"

🎯 ATS Keywords from Job:
- React.js ✅ (you have it)
- TypeScript ✅ (you have it)
- Next.js ❌ (add this)
- State management ❌ (mention Redux)
- Unit testing ❌ (add if you have experience)

💡 Recommendations:
1. Add "Next.js" to skills section
2. Mention "Redux for state management" in experience
3. Include "unit testing with Jest" if applicable
4. Highlight "built 20+ responsive components"
```

## ⚙️ Configuration

### API Settings

- **DeepSeek API Key**: Required for AI features
- **Auto-save**: Enabled by default (saves to localStorage every change)
- **CORS Proxy**: Automatically uses fallback proxies if primary fails

### Data Storage

All data is stored locally in your browser:
- **Resume data**: PersonalInfo, skills, experience, education
- **API key**: Encrypted and stored securely in localStorage
- **Settings**: Preferences and configurations

### Export/Import

**Export to JSON:**
```javascript
// Click "📥 Export JSON" button
// Downloads: resume-data-2024-01-22.json
```

**Import from JSON:**
```javascript
// Click "📤 Import JSON" button
// Select previously exported file
// Data is restored
```

## 🐛 Troubleshooting

### Issue: Job URL fetching fails

**Solution:**
- Some websites block automated access
- Copy job description text manually
- Paste directly into tool (if paste option available)

### Issue: API key invalid

**Solution:**
- Verify key starts with `sk-`
- Check for extra spaces
- Generate new key if needed
- Ensure DeepSeek account is active

### Issue: Data not saving

**Solution:**
- Check browser allows localStorage
- Not in private/incognito mode
- Clear cache and try again
- Export JSON as backup

### Issue: Userscript not working

**Solution:**
- Ensure Tampermonkey/Greasemonkey is installed
- Check script is enabled
- Verify URL pattern matches target site
- Some sites have custom forms (may need manual editing)

### Issue: Slow AI analysis

**Solution:**
- Large job descriptions take longer
- Wait 30-60 seconds
- Check internet connection
- Verify DeepSeek API status

See [TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md) for more solutions.

## 📝 Version

**v2.0.0** (January 2026)

### Features in this version:
- ✅ AI-powered resume optimization
- ✅ DeepSeek API integration
- ✅ Automatic ATS keyword extraction
- ✅ Tampermonkey userscript generation
- ✅ Multi-field resume management
- ✅ Export/Import JSON functionality
- ✅ Auto-save to localStorage
- ✅ Responsive design
- ✅ CORS proxy fallback system

### Changelog:
- **v2.0.0**: Complete rewrite with AI integration
- **v1.5.0**: Added userscript generation
- **v1.0.0**: Initial release

## 🔒 Privacy & Security

- **Local storage only**: All data stays in your browser
- **No external tracking**: We don't collect any user data
- **API key security**: Stored locally, only sent to DeepSeek API
- **No server-side processing**: Everything runs client-side

## 💡 Pro Tips

1. **Keep multiple versions**: Export different resumes for different job types
2. **Review AI suggestions**: Always customize before using
3. **Update regularly**: Refresh your base resume monthly
4. **Use specific keywords**: Match exact phrases from job descriptions
5. **Test userscripts**: Try on sample forms first

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

## 🔗 Related Tools

Part of the [Career Optimization Suite](../README.md):
- [Resume Optimizer](../ResumeOptimizer/README.md) - ATS compatibility checker
- [Cover Letter Generator](../CoverLetterGenerator/README.md) - AI cover letters
- [Interview Prep](../InterviewPrep/README.md) - Interview questions
- [Career Path Planner](../CareerPathPlanner/README.md) - Career roadmaps

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/YounGuru03/CV_Autofill/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YounGuru03/CV_Autofill/discussions)
- **Documentation**: [TOOLS_GUIDE.md](../TOOLS_GUIDE.md)

---

**Happy job hunting! 🚀**
