# 🔧 Setup Guide - Career Optimization Suite

Complete setup instructions for all tools in the Career Optimization Suite.

## Table of Contents

- [System Requirements](#system-requirements)
- [Quick Setup (Web Tools Only)](#quick-setup-web-tools-only)
- [Full Setup (Including Python Tools)](#full-setup-including-python-tools)
- [DeepSeek API Configuration](#deepseek-api-configuration)
- [Browser Setup](#browser-setup)
- [Verification](#verification)
- [Troubleshooting Setup Issues](#troubleshooting-setup-issues)

---

## System Requirements

### Minimum Requirements

**For Web Tools:**
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- 4GB RAM
- Internet connection for AI features
- JavaScript enabled

**For Python Tools (Optional):**
- Python 3.8 or higher
- pip (Python package manager)
- 8GB RAM (for NLP tools)
- 500MB free disk space

### Recommended Requirements

- Python 3.10+
- 16GB RAM
- Stable internet connection (for API calls)
- Code editor (VS Code, PyCharm, Sublime Text)

### Operating System Support

- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 20.04+, Fedora, Arch)

---

## Quick Setup (Web Tools Only)

If you only want to use the web-based tools (no Python required):

### Step 1: Download the Repository

**Option A: Using Git (Recommended)**
```bash
git clone https://github.com/YounGuru03/CV_Autofill.git
cd CV_Autofill
```

**Option B: Download ZIP**
1. Visit https://github.com/YounGuru03/CV_Autofill
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Navigate to the extracted folder

### Step 2: Open Tools in Browser

Simply open any HTML file in your browser:

**Windows:**
```bash
start ResumeAutofill\ResumeAutofill.html
start ResumeOptimizer\index.html
start CoverLetterGenerator\index.html
```

**macOS:**
```bash
open ResumeAutofill/ResumeAutofill.html
open ResumeOptimizer/index.html
open CoverLetterGenerator/index.html
```

**Linux:**
```bash
xdg-open ResumeAutofill/ResumeAutofill.html
xdg-open ResumeOptimizer/index.html
xdg-open CoverLetterGenerator/index.html
```

### Step 3: Configure API (For AI Features)

1. Visit [platform.deepseek.com](https://platform.deepseek.com)
2. Create a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the key
6. Paste it in the tool's API configuration section

✅ **You're done!** All web tools are ready to use.

---

## Full Setup (Including Python Tools)

For advanced features and Python-based tools:

### Step 1: Verify Python Installation

```bash
# Check Python version
python --version  # or python3 --version

# Expected output: Python 3.8.0 or higher
```

**Don't have Python?** Download from [python.org](https://www.python.org/downloads/)

### Step 2: Clone Repository

```bash
git clone https://github.com/YounGuru03/CV_Autofill.git
cd CV_Autofill
```

### Step 3: Create Virtual Environment (Recommended)

**Why?** Isolates project dependencies from system Python.

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### Step 4: Install Dependencies

**Option A: Install All Dependencies (Recommended)**
```bash
pip install -r requirements.txt
```

**Option B: Install Per-Tool Dependencies**

For Resume Optimizer:
```bash
cd ResumeOptimizer
pip install -r requirements.txt
cd ..
```

For Interview Prep:
```bash
cd InterviewPrep
pip install -r requirements.txt
cd ..
```

Repeat for other Python tools as needed.

### Step 5: Verify Installation

```bash
# Test Python import
python -c "import spacy; print('✅ spaCy installed')"
python -c "import requests; print('✅ Requests installed')"

# If using NLP features
python -m spacy download en_core_web_sm
```

---

## DeepSeek API Configuration

### Creating Your API Key

1. **Sign Up**: Visit [platform.deepseek.com](https://platform.deepseek.com)
2. **Email Verification**: Verify your email address
3. **Dashboard**: Navigate to API section
4. **Generate Key**: Click "Create new API key"
5. **Copy Key**: Save it securely (you won't see it again!)

### API Key Format

Valid DeepSeek API keys look like:
```
sk-1234567890abcdef1234567890abcdef
```

### Configuring Tools

**For Web Tools:**
- Open the tool in your browser
- Find the "API Configuration" or "Settings" section
- Paste your API key
- Click "Save" - it's stored in browser localStorage

**For Python Tools:**
- Create a `.env` file in the tool directory:
```bash
# Example: ResumeOptimizer/.env
DEEPSEEK_API_KEY=sk-your-api-key-here
```

**Security Note:** Never commit `.env` files to Git! They're already in `.gitignore`.

### API Rate Limits

Free tier:
- 100 requests per day
- 10 requests per minute

Paid tier:
- Check DeepSeek pricing page for current limits

### Testing API Connection

```python
# Test script: test_api.py
import os
import requests

api_key = os.getenv('DEEPSEEK_API_KEY')  # or your key directly
url = 'https://api.deepseek.com/v1/chat/completions'

headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

data = {
    'model': 'deepseek-chat',
    'messages': [{'role': 'user', 'content': 'Hello!'}]
}

response = requests.post(url, headers=headers, json=data)
print('✅ API Connected!' if response.status_code == 200 else f'❌ Error: {response.status_code}')
```

---

## Browser Setup

### Recommended Browsers

1. **Chrome/Edge** (Best compatibility)
2. **Firefox** (Excellent privacy)
3. **Safari** (macOS users)

### Required Browser Settings

**Enable JavaScript:**
- Chrome: Settings → Privacy and security → Site Settings → JavaScript → Allowed
- Firefox: about:config → javascript.enabled → true
- Safari: Preferences → Security → Enable JavaScript

**Enable LocalStorage:**
- Required for data persistence
- Usually enabled by default

**Disable Ad Blockers (for API calls):**
- Some ad blockers interfere with API requests
- Whitelist `platform.deepseek.com` if using blockers

### Browser Extensions (Optional)

**For Resume Autofill:**
- Install [Tampermonkey](https://www.tampermonkey.net/) (Chrome/Edge/Firefox)
- Or [Greasemonkey](https://www.greasespot.net/) (Firefox only)

**For Development:**
- React Developer Tools
- JSON Formatter
- Web Developer

---

## Verification

### Quick Verification Checklist

#### Web Tools
- [ ] Open ResumeAutofill/ResumeAutofill.html successfully
- [ ] Enter data in forms - no errors
- [ ] LocalStorage saving works (enter data, refresh page, data persists)
- [ ] API configuration section visible
- [ ] All buttons clickable and responsive

#### Python Tools (if installed)
- [ ] Python 3.8+ installed and verified
- [ ] Virtual environment activated
- [ ] All packages installed without errors
- [ ] Can import required libraries

#### API Integration
- [ ] DeepSeek account created
- [ ] API key generated
- [ ] API key saved in tool
- [ ] Test API call succeeds

### Test Each Tool

**Resume Autofill:**
```bash
# Open in browser
open ResumeAutofill/ResumeAutofill.html

# Test:
1. Enter name, email, phone
2. Add a skill
3. Click "Save Resume"
4. Refresh page
5. Data should persist ✅
```

**Resume Optimizer (if Python installed):**
```bash
cd ResumeOptimizer
python optimizer.py --test

# Should output: ✅ Resume Optimizer working correctly
```

**Cover Letter Generator:**
```bash
# Open in browser
open CoverLetterGenerator/index.html

# Test:
1. Enter resume summary
2. Enter job details
3. Select tone
4. Click "Generate" (requires API key)
```

---

## Troubleshooting Setup Issues

### Common Issues

#### Issue: "Python not found"

**Windows:**
```bash
# Add Python to PATH
# During Python installation, check "Add Python to PATH"
# Or manually: Settings → System → Environment Variables → PATH
```

**macOS/Linux:**
```bash
# Use python3 instead of python
python3 --version
alias python=python3  # Add to ~/.bashrc or ~/.zshrc
```

#### Issue: "pip not found"

```bash
# Windows
python -m pip --version

# macOS/Linux
python3 -m pip --version

# Reinstall pip
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
```

#### Issue: "Permission denied" (Linux/macOS)

```bash
# Use pip with --user flag
pip install --user -r requirements.txt

# Or use virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Issue: "Module not found" after installation

```bash
# Verify installation
pip list | grep <module-name>

# Reinstall specific module
pip install --upgrade <module-name>

# Clear pip cache
pip cache purge
pip install -r requirements.txt
```

#### Issue: "API key invalid"

- Check for extra spaces when copying
- Ensure key starts with `sk-`
- Verify key is active on DeepSeek dashboard
- Try generating a new key

#### Issue: "CORS error" in browser

- This is expected for some job URLs
- Tool uses CORS proxies automatically
- Try a different job URL
- Or paste job description directly

#### Issue: "LocalStorage not persisting"

- Check browser privacy settings
- Disable "Block third-party cookies"
- Try incognito/private mode to test
- Clear browser cache and try again

#### Issue: "Page not loading/blank screen"

- Check browser console (F12) for errors
- Disable browser extensions temporarily
- Try different browser
- Ensure JavaScript is enabled

### Getting More Help

1. **Check Documentation**: Review [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. **Search Issues**: Check [GitHub Issues](https://github.com/YounGuru03/CV_Autofill/issues)
3. **Ask for Help**: Open a new issue with:
   - Operating system
   - Python version
   - Browser version
   - Error messages
   - Steps to reproduce

---

## Next Steps

After successful setup:

1. **Read the Tools Guide**: [TOOLS_GUIDE.md](../TOOLS_GUIDE.md)
2. **Try Examples**: [EXAMPLES.md](EXAMPLES.md)
3. **Configure API**: [API_GUIDE.md](API_GUIDE.md)
4. **Start Using Tools**: Begin with Resume Autofill or Resume Optimizer

---

## Need Help?

- 📖 **Documentation**: Read other guides in `/docs`
- 🐛 **Bug Reports**: [Open an issue](https://github.com/YounGuru03/CV_Autofill/issues)
- 💡 **Questions**: [Start a discussion](https://github.com/YounGuru03/CV_Autofill/discussions)

**Happy job hunting! 🚀**
