# 🔧 Troubleshooting Guide

Common issues and their solutions for the Career Optimization Suite.

## Table of Contents

- [General Issues](#general-issues)
- [Resume Autofill Issues](#resume-autofill-issues)
- [Resume Optimizer Issues](#resume-optimizer-issues)
- [Cover Letter Generator Issues](#cover-letter-generator-issues)
- [Interview Prep Issues](#interview-prep-issues)
- [API and Connection Issues](#api-and-connection-issues)
- [Browser and LocalStorage Issues](#browser-and-localstorage-issues)
- [Python Tool Issues](#python-tool-issues)
- [Performance Issues](#performance-issues)

---

## General Issues

### Issue: Tools not loading / Blank page

**Symptoms:**
- White/blank screen when opening HTML files
- Page loads but no content visible
- Browser shows "Loading..." indefinitely

**Solutions:**

1. **Check JavaScript is enabled**
   ```
   Chrome: Settings → Privacy → Site Settings → JavaScript → Allowed
   Firefox: about:config → javascript.enabled → true
   Safari: Preferences → Security → Enable JavaScript
   ```

2. **Disable browser extensions temporarily**
   - Ad blockers can interfere
   - Privacy extensions may block scripts
   - Try incognito/private mode

3. **Clear browser cache**
   ```
   Chrome: Ctrl+Shift+Delete → Clear browsing data
   Firefox: Ctrl+Shift+Delete → Clear History
   Safari: Develop → Empty Caches
   ```

4. **Check browser console for errors**
   - Press F12 to open Developer Tools
   - Look for red error messages
   - Common errors and fixes:
     - `Failed to fetch`: Network/CORS issue
     - `Uncaught SyntaxError`: File corrupted, re-download
     - `localStorage is not defined`: Privacy mode blocking storage

5. **Try different browser**
   - Chrome (recommended)
   - Firefox
   - Edge
   - Avoid Internet Explorer (not supported)

---

### Issue: "localStorage is null" or data not saving

**Symptoms:**
- Data disappears after refresh
- Error: "Cannot read property 'setItem' of null"
- Settings not persisting

**Solutions:**

1. **Check browser privacy settings**
   - Ensure cookies/storage is enabled
   - Check if in private/incognito mode (localStorage disabled)
   
2. **Storage quota exceeded**
   ```javascript
   // Open browser console (F12) and run:
   navigator.storageQuota.queryInfo('temporary').then(info => {
       console.log('Used:', info.usage);
       console.log('Quota:', info.quota);
   });
   ```
   
3. **Clear old data**
   - Open browser console (F12)
   - Type: `localStorage.clear()`
   - Refresh page
   - Re-enter data

4. **File:// protocol issues**
   - Some browsers restrict localStorage for local files
   - Solution: Use a local server
   ```bash
   # Python 3
   cd /path/to/CV_Autofill
   python -m http.server 8000
   # Then open: http://localhost:8000/ResumeAutofill/ResumeAutofill.html
   
   # Or use VS Code Live Server extension
   ```

---

## Resume Autofill Issues

### Issue: Job URL analysis fails

**Symptoms:**
- "Failed to fetch job description"
- "CORS error"
- Stuck on "Analyzing..."

**Solutions:**

1. **Try alternative CORS proxy**
   - Tool automatically tries multiple proxies
   - Wait 30 seconds for fallback attempts
   
2. **Copy job description manually**
   - Copy job posting text
   - Paste directly into tool (if paste field available)
   - Bypass URL fetching

3. **Check URL validity**
   - Ensure complete URL (https://)
   - Remove tracking parameters
   - Example: 
     - ✅ `https://company.com/jobs/123`
     - ❌ `company.com/jobs`

4. **Some sites block automated access**
   - LinkedIn jobs (requires login)
   - Indeed (sometimes blocks)
   - Company sites with anti-bot protection
   - Solution: Copy text manually

---

### Issue: AI suggestions not appearing

**Symptoms:**
- Analysis completes but no suggestions
- "Error analyzing resume"
- Suggestions are generic

**Solutions:**

1. **Verify API key**
   - Check key is saved correctly
   - No extra spaces
   - Starts with `sk-`
   - Test with simple prompt first

2. **Check API quota**
   - Log in to DeepSeek dashboard
   - Verify you haven't hit daily limit (100 free tier)
   - Check billing status if on paid tier

3. **Provide more context**
   - Add more details to your resume
   - Include job description or URL
   - More data = better AI suggestions

4. **Try again with different job**
   - Some job descriptions are too vague
   - More detailed postings = better analysis

---

### Issue: Userscript generation fails

**Symptoms:**
- "No data to generate script"
- Generated script doesn't work
- Autofill button doesn't appear

**Solutions:**

1. **Ensure resume is saved**
   - Click "💾 Save Resume" first
   - Verify data persists after refresh

2. **Install Tampermonkey/Greasemonkey**
   - Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox: [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

3. **Script not matching page fields**
   - Userscripts work on standard forms
   - Custom forms may not auto-fill
   - Solution: Manually customize script selectors

4. **Check script is active**
   - Open Tampermonkey dashboard
   - Verify script is enabled
   - Check URL patterns match target site

---

## Resume Optimizer Issues

### Issue: PDF upload not working

**Symptoms:**
- "Failed to parse PDF"
- Uploaded PDF shows no text
- Only seeing "..."

**Solutions:**

1. **Check PDF is text-based**
   - PDFs from Word/Google Docs: ✅ Work
   - Scanned PDFs: ❌ Need OCR first
   - Test: Can you select text in PDF? If yes, should work

2. **File size too large**
   - Max recommended: 5MB
   - Compress PDF if larger
   - Use online tools: SmallPDF, iLovePDF

3. **PDF is password protected**
   - Remove password first
   - Re-save as unprotected PDF

4. **Use text paste instead**
   - Copy resume text from PDF
   - Paste directly into tool
   - Skip PDF upload entirely

---

### Issue: Low ATS score on good resume

**Symptoms:**
- Resume looks good but scores 30-40%
- Missing obvious keywords
- Inconsistent results

**Solutions:**

1. **Format issues**
   - Use standard section headers:
     - "Experience" not "Where I've Worked"
     - "Skills" not "What I Know"
     - "Education" not "School"
   
2. **Missing keywords**
   - Compare job description to resume
   - Add exact phrases from job posting
   - Example: Job says "JavaScript" → Use "JavaScript" not "JS"

3. **Graphics and images**
   - ATS can't read images/logos
   - Remove pictures from resume
   - Use text-only format

4. **Complex formatting**
   - Tables confuse ATS
   - Use simple bullet points
   - Avoid text boxes, columns

5. **Spelling variations**
   - Use both: "e-commerce" and "ecommerce"
   - Include: "JavaScript" and "Javascript"
   - Match job posting exactly

---

### Issue: Analysis takes too long

**Symptoms:**
- Stuck on "Analyzing..."
- No response after 2+ minutes
- Browser freezes

**Solutions:**

1. **Large document**
   - Shorten resume (max 2 pages)
   - Remove unnecessary sections
   - Optimize for relevant content only

2. **API timeout**
   - Refresh and try again
   - Check API status: [status.deepseek.com](https://status.deepseek.com)
   - Try during off-peak hours

3. **Browser memory**
   - Close other tabs
   - Restart browser
   - Clear cache

---

## Cover Letter Generator Issues

### Issue: Generated letter is too generic

**Symptoms:**
- Cover letter could apply to any company
- No specific details
- Doesn't match job description

**Solutions:**

1. **Provide more context**
   - Add specific job description details
   - Mention company values, recent news
   - Include your relevant achievements

2. **Use better prompts**
   - Instead of: "Software developer position"
   - Use: "Senior Full Stack Developer role focusing on React and Node.js at FinTech startup building payment solutions"

3. **Customize AI output**
   - Always edit generated letter
   - Add company-specific details
   - Include why you're interested in THIS company

4. **Try different tones**
   - Formal for corporate
   - Friendly for startups
   - Enthusiastic for mission-driven orgs

---

### Issue: Cover letter tone doesn't match selection

**Symptoms:**
- Selected "Formal" but got casual tone
- Inconsistent voice throughout
- Doesn't sound professional

**Solutions:**

1. **Regenerate**
   - AI can vary - try again
   - Usually 2nd or 3rd attempt is better

2. **Edit the prompt**
   - Add explicit tone instructions:
     - "Write in a highly professional, formal business tone"
     - "Use conversational but professional language"

3. **Post-process**
   - Edit generated letter
   - Adjust language manually
   - Remove overly casual/formal phrases

---

## Interview Prep Issues

### Issue: Questions don't match role level

**Symptoms:**
- Too easy questions for senior role
- Too hard for entry-level
- Irrelevant questions

**Solutions:**

1. **Specify experience level**
   - Clearly state: "Entry-level", "Mid-level", "Senior"
   - Include years of experience
   - Mention if career changer

2. **Add more context**
   - Include tech stack
   - Mention team size
   - Specify industry (FinTech, Healthcare, etc.)

3. **Filter questions**
   - Focus on relevant categories
   - Skip overly advanced/basic ones
   - Supplement with your own research

---

### Issue: Answer frameworks too vague

**Symptoms:**
- Frameworks don't help
- Not specific enough
- Still don't know how to answer

**Solutions:**

1. **Practice with real examples**
   - Fill in frameworks with YOUR stories
   - Use STAR method properly:
     - Situation: Specific context
     - Task: Your responsibility
     - Action: What YOU did (not team)
     - Result: Quantifiable outcome

2. **Research company-specific examples**
   - Look at company blog
   - Check Glassdoor interview reviews
   - Talk to current employees

3. **Record yourself**
   - Practice answers out loud
   - Record and review
   - Time yourself (2-3 minutes max)

---

## API and Connection Issues

### Issue: "Invalid API key" error

**Symptoms:**
- API calls fail immediately
- "401 Unauthorized"
- "Authentication failed"

**Solutions:**

1. **Verify API key format**
   - Should start with `sk-`
   - 32-40 characters long
   - No spaces before/after
   
2. **Copy key again**
   - Log in to [platform.deepseek.com](https://platform.deepseek.com)
   - Generate new key if needed
   - Copy carefully (no extra spaces)
   
3. **Check key is active**
   - DeepSeek dashboard → API Keys
   - Verify key not revoked
   - Check expiration date (if any)

4. **Test key directly**
   ```bash
   curl https://api.deepseek.com/v1/chat/completions \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"test"}]}'
   ```

---

### Issue: "Rate limit exceeded" (429 error)

**Symptoms:**
- "Too many requests"
- "Try again later"
- Works initially, then fails

**Solutions:**

1. **Wait before retrying**
   - Free tier: 10 requests/minute
   - Wait 60 seconds
   - Then try again

2. **Check daily quota**
   - Free tier: 100 requests/day
   - Resets at midnight UTC
   - Upgrade if needed

3. **Optimize usage**
   - Batch similar requests
   - Cache results locally
   - Don't spam the API

4. **Upgrade plan**
   - Visit DeepSeek pricing page
   - Paid plans have higher limits

---

### Issue: API timeout / slow responses

**Symptoms:**
- Request takes 30+ seconds
- Times out before completion
- Partial responses

**Solutions:**

1. **Shorten prompts**
   - Reduce input text
   - Be more concise
   - Remove unnecessary context

2. **Reduce max_tokens**
   ```javascript
   // In code, reduce from 2000 to 1000
   max_tokens: 1000
   ```

3. **Check internet connection**
   - Test speed: [fast.com](https://fast.com)
   - Try different network
   - Restart router

4. **Check API status**
   - Visit [status.deepseek.com](https://status.deepseek.com)
   - Check for outages
   - Try again later if down

---

## Browser and LocalStorage Issues

### Issue: Data disappears after closing browser

**Symptoms:**
- Data saves during session
- Lost after closing browser
- Need to re-enter everything

**Solutions:**

1. **Check privacy mode**
   - Don't use Incognito/Private mode
   - LocalStorage clears when closing
   - Use normal browser mode

2. **Check browser settings**
   - Chrome: Settings → Privacy → Cookies → Allow
   - Firefox: Options → Privacy → History → Custom → Cookies
   - Ensure "Clear on exit" is disabled

3. **Export data**
   - Use export to JSON feature
   - Save file as backup
   - Import when needed

---

### Issue: "Storage quota exceeded"

**Symptoms:**
- Can't save new data
- Error in browser console
- Page slows down

**Solutions:**

1. **Clear old data**
   ```javascript
   // In browser console (F12)
   localStorage.clear()
   ```

2. **Export and reimport**
   - Export current data
   - Clear localStorage
   - Import only needed data

3. **Use multiple profiles**
   - Create separate browser profiles
   - One per project/job search
   - Keeps storage separate

---

## Python Tool Issues

### Issue: "ModuleNotFoundError" when running Python tools

**Symptoms:**
- `ModuleNotFoundError: No module named 'X'`
- Script fails immediately
- Import errors

**Solutions:**

1. **Install requirements**
   ```bash
   cd ResumeOptimizer
   pip install -r requirements.txt
   ```

2. **Use virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Check Python version**
   ```bash
   python --version  # Should be 3.8+
   ```

4. **Install specific module**
   ```bash
   pip install spacy
   pip install requests
   pip install python-dotenv
   ```

---

### Issue: spaCy model not found

**Symptoms:**
- `Can't find model 'en_core_web_sm'`
- NLP features don't work
- Download errors

**Solutions:**

1. **Download spaCy model**
   ```bash
   python -m spacy download en_core_web_sm
   ```

2. **If download fails (firewall/proxy)**
   ```bash
   # Download manually
   pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.7.0/en_core_web_sm-3.7.0-py3-none-any.whl
   ```

3. **Use different model**
   ```python
   # In code, change from:
   nlp = spacy.load("en_core_web_sm")
   # To:
   nlp = spacy.load("en_core_web_md")  # Larger but more accurate
   ```

---

### Issue: Python script permission denied

**Symptoms:**
- `Permission denied` error
- Can't execute script
- File not accessible

**Solutions:**

1. **Run with python command**
   ```bash
   # Instead of ./optimizer.py
   python optimizer.py
   ```

2. **Make executable (Linux/Mac)**
   ```bash
   chmod +x optimizer.py
   ./optimizer.py
   ```

3. **Check file location**
   ```bash
   # Ensure you're in correct directory
   cd ResumeOptimizer
   ls  # Should see optimizer.py
   python optimizer.py
   ```

---

## Performance Issues

### Issue: Page loads slowly

**Symptoms:**
- Takes 10+ seconds to load
- Browser freezes
- Laggy interface

**Solutions:**

1. **Close unnecessary tabs**
   - Limit to 5-10 tabs
   - Free up memory

2. **Disable browser extensions**
   - Some extensions slow page load
   - Try incognito mode to test

3. **Clear browser cache**
   - Too much cached data
   - Clear and restart

4. **Use lighter browser**
   - Switch from Chrome to Firefox
   - Or vice versa
   - Try Edge

---

### Issue: Tool freezes during operation

**Symptoms:**
- Freezes when clicking "Analyze"
- Browser becomes unresponsive
- Must force-close tab

**Solutions:**

1. **Reduce data size**
   - Shorten resume text
   - Simplify job description
   - Remove unnecessary details

2. **Wait longer**
   - AI processing takes time
   - Wait 30-60 seconds
   - Don't click multiple times

3. **Refresh and retry**
   - Close and reopen page
   - Wait a moment
   - Try again

4. **Check system resources**
   ```bash
   # Close other applications
   # Check RAM usage
   # Restart computer if needed
   ```

---

## Still Having Issues?

### Getting Help

1. **Search existing issues**
   - [GitHub Issues](https://github.com/YounGuru03/CV_Autofill/issues)
   - Someone may have same problem

2. **Open new issue**
   - Provide details:
     - What you tried
     - Error messages
     - Browser/OS
     - Screenshots
   - Use issue template

3. **Ask in discussions**
   - [GitHub Discussions](https://github.com/YounGuru03/CV_Autofill/discussions)
   - Community might help

### What to Include in Bug Reports

```markdown
**Environment:**
- Browser: Chrome 120.0.6099.129
- OS: Windows 11
- Tool: Resume Optimizer
- Python version (if applicable): 3.10.5

**Issue:**
PDF upload fails with error "Failed to parse PDF"

**Steps to Reproduce:**
1. Open ResumeOptimizer/index.html
2. Click "Upload PDF"
3. Select my-resume.pdf (2.3MB)
4. Click "Analyze"

**Expected:**
PDF should be parsed and analyzed

**Actual:**
Error message appears, PDF doesn't load

**Error Log:**
```
TypeError: Cannot read property 'text' of undefined
at parsePDF (index.html:234)
```

**Screenshots:**
[Attach screenshot]

**Additional Context:**
- PDF was created in Google Docs
- Works when I paste text manually
- Same issue in Firefox and Chrome
```

---

## Preventive Measures

### Best Practices to Avoid Issues

1. **Keep browser updated**
   - Latest Chrome/Firefox/Edge
   - Security patches

2. **Regular exports**
   - Export data weekly
   - Backup to cloud
   - Don't rely solely on localStorage

3. **Test before important use**
   - Test tools before job deadline
   - Don't wait until last minute
   - Have backup plan

4. **Monitor API usage**
   - Check DeepSeek dashboard weekly
   - Set billing alerts
   - Know your limits

5. **Use version control for customizations**
   - If you modify code
   - Keep backups
   - Document changes

---

**Still stuck? Don't hesitate to ask for help! 🙏**

**Open an issue:** [GitHub Issues](https://github.com/YounGuru03/CV_Autofill/issues)

**Happy job hunting! 🚀**
