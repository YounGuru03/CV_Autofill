# CV_Autofill

An automated resume filling tool based on DeepSeek AI, because its API is inexpensive.

## 🚀 Features

- **AI-Powered Resume Optimization**: Analyze job descriptions and optimize your resume using DeepSeek AI
- **Smart Form Management**: Editable resume with personal info, skills, experience, and education
- **Job Analysis**: Paste job URLs and get AI-powered resume suggestions with ATS keywords
- **Userscript Generation**: Create Tampermonkey/Greasemonkey scripts for auto-filling job applications
- **Preview & Export**: Preview your resume and export as JSON
- **Auto-Save**: Automatic localStorage persistence of your resume data
- **Responsive Design**: Beautiful, mobile-friendly interface

## 📋 How to Use

### Getting Started

1. **Open the HTML File**
   - Simply open `ResumeAutofill.html` in your web browser
   - No installation or build process required!

2. **Set Up DeepSeek API**
   - Visit [platform.deepseek.com](https://platform.deepseek.com)
   - Create an account and get your API key
   - Paste the API key in the "DeepSeek API Configuration" section
   - Your key will be saved locally in your browser

3. **Fill Your Resume**
   - Enter your personal information (name, email, phone)
   - Add your skills (comma-separated)
   - Add work experience entries (click "+ Add Experience" for more)
   - Add education entries (click "+ Add Education" for more)
   - Click "💾 Save Resume" to persist your data

### AI-Powered Job Analysis

1. **Paste a Job URL**
   - Find a job posting you want to apply for
   - Copy the URL and paste it in the "Job Posting URL" field
   - Click "🔍 Analyze & Fill"

2. **AI Optimization**
   - The tool will fetch the job description (via CORS proxy)
   - DeepSeek AI analyzes the job requirements
   - Your resume is automatically optimized with:
     - Relevant skills and ATS keywords
     - Improved experience descriptions
     - Matching score and recommendations

### Generate Userscript for Auto-Fill

1. Click "📝 Generate Userscript"
2. Install [Tampermonkey](https://www.tampermonkey.net/) (Chrome/Edge/Firefox) or [Greasemonkey](https://www.greasespot.net/) (Firefox)
3. Copy the generated script
4. Create a new userscript in Tampermonkey/Greasemonkey
5. Paste the script and save
6. Visit any job application page and click the "🚀 Autofill Resume" button

### Other Features

- **👁️ Preview**: See a formatted preview of your resume
- **📥 Export JSON**: Download your resume as a JSON file
- **📤 Import JSON**: Upload a previously saved resume JSON
- **🗑️ Clear All**: Reset the form (with confirmation)

## 🛠️ Technical Details

- **Single HTML File**: Everything (CSS, JavaScript) is embedded
- **No Dependencies**: Pure vanilla JavaScript, no frameworks required
- **DeepSeek API**: Uses `deepseek-chat` model via REST API
- **CORS Proxy**: Multiple fallback proxies for fetching job descriptions
- **LocalStorage**: Automatic data persistence in browser
- **Responsive**: Works on desktop, tablet, and mobile devices

## 🔒 Privacy & Security

- All data is stored locally in your browser
- API key is saved in localStorage (never sent to external servers except DeepSeek)
- Resume data is only sent to DeepSeek API when you click "Analyze & Fill"
- No server-side storage or tracking

## 📝 License

See LICENSE file for details.
