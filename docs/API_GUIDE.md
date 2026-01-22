# 🔑 API Guide - DeepSeek API Integration

Complete guide for setting up and using the DeepSeek API with Career Optimization Suite tools.

## Table of Contents

- [What is DeepSeek API?](#what-is-deepseek-api)
- [Getting Your API Key](#getting-your-api-key)
- [API Key Configuration](#api-key-configuration)
- [Usage and Rate Limits](#usage-and-rate-limits)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Cost Management](#cost-management)
- [Troubleshooting](#troubleshooting)

---

## What is DeepSeek API?

DeepSeek is an AI language model service that powers the intelligent features in our toolkit:
- Resume optimization and keyword extraction
- Cover letter generation
- Interview question customization
- Career advice and recommendations

**Why DeepSeek?**
- ✅ Cost-effective pricing (cheaper than OpenAI)
- ✅ Good performance for job-search tasks
- ✅ Easy integration
- ✅ Free tier available

**What does the API do in our tools?**
- Analyzes job descriptions for keywords
- Generates personalized cover letters
- Optimizes resume content for ATS
- Creates interview questions
- Provides career path recommendations

---

## Getting Your API Key

### Step 1: Create Account

1. Visit [platform.deepseek.com](https://platform.deepseek.com)
2. Click "Sign Up" or "Get Started"
3. Register with:
   - Email address
   - Password
   - Verification code (sent to email)

### Step 2: Verify Email

1. Check your email inbox
2. Click verification link
3. Complete account setup

### Step 3: Generate API Key

1. Log in to DeepSeek platform
2. Navigate to "API Keys" section (usually in sidebar or settings)
3. Click "Create new secret key" or "Generate API Key"
4. **Important**: Copy the key immediately - you won't see it again!
5. Save it securely (password manager, secure note, etc.)

### API Key Format

Valid DeepSeek API keys follow this format:
```
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- Starts with `sk-`
- Followed by 32-40 alphanumeric characters
- Case-sensitive

**Example (not real):**
```
sk-1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

---

## API Key Configuration

### For Web Tools (Browser-based)

Most tools store API keys in browser localStorage:

1. **Open the tool** (e.g., ResumeAutofill.html)
2. **Find "API Configuration"** section (usually at top)
3. **Paste your API key** in the input field
4. **Click "Save"** or it auto-saves
5. **Verify**: Refresh page - key should persist

**Security Note:** API key is stored locally in your browser, not sent anywhere except DeepSeek's API.

### For Python Tools (Command-line/Server)

Use environment variables or `.env` files:

#### Option A: Environment Variable (Temporary)

**Windows:**
```bash
set DEEPSEEK_API_KEY=sk-your-api-key-here
python optimizer.py
```

**macOS/Linux:**
```bash
export DEEPSEEK_API_KEY=sk-your-api-key-here
python optimizer.py
```

#### Option B: .env File (Recommended)

1. Create `.env` file in tool directory:
```bash
cd ResumeOptimizer
nano .env  # or use any text editor
```

2. Add your API key:
```bash
DEEPSEEK_API_KEY=sk-your-api-key-here
```

3. Save file

4. Load in Python code:
```python
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv('DEEPSEEK_API_KEY')
```

**Security Note:** `.env` files are in `.gitignore` - never commit them to Git!

---

## Usage and Rate Limits

### Free Tier

- **Requests**: 100 requests per day
- **Rate**: 10 requests per minute
- **Models**: Access to deepseek-chat
- **Cost**: $0 (free)

### Paid Tier

Check [DeepSeek Pricing](https://platform.deepseek.com/pricing) for current rates.

Typical pricing (subject to change):
- **Input tokens**: ~$0.14 per 1M tokens
- **Output tokens**: ~$0.28 per 1M tokens

**Example costs:**
- Resume optimization: ~$0.001 per analysis
- Cover letter generation: ~$0.002 per letter
- 100 resume optimizations: ~$0.10

### Monitoring Usage

1. Log in to DeepSeek dashboard
2. Navigate to "Usage" or "Billing"
3. View:
   - Requests made today
   - Tokens consumed
   - Current spending
   - Rate limit status

### Rate Limit Handling

Our tools automatically handle rate limits:
- Wait and retry if limit hit
- Show user-friendly error messages
- Queue requests if necessary

---

## API Endpoints

### Chat Completions Endpoint

**Primary endpoint used by our tools:**

```
POST https://api.deepseek.com/v1/chat/completions
```

**Headers:**
```json
{
    "Authorization": "Bearer sk-your-api-key",
    "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
    "model": "deepseek-chat",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful career advisor."
        },
        {
            "role": "user",
            "content": "Analyze this resume for ATS compatibility..."
        }
    ],
    "temperature": 0.7,
    "max_tokens": 2000
}
```

**Response:**
```json
{
    "id": "chatcmpl-xxxxx",
    "object": "chat.completion",
    "created": 1234567890,
    "model": "deepseek-chat",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "Based on the resume analysis..."
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 150,
        "completion_tokens": 300,
        "total_tokens": 450
    }
}
```

### Example API Call (JavaScript)

```javascript
async function callDeepSeekAPI(prompt) {
    const apiKey = localStorage.getItem('deepseek_api_key');
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}
```

### Example API Call (Python)

```python
import os
import requests

def call_deepseek_api(prompt: str) -> str:
    api_key = os.getenv('DEEPSEEK_API_KEY')
    url = 'https://api.deepseek.com/v1/chat/completions'
    
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    data = {
        'model': 'deepseek-chat',
        'messages': [
            {'role': 'user', 'content': prompt}
        ],
        'temperature': 0.7,
        'max_tokens': 1500
    }
    
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    
    return response.json()['choices'][0]['message']['content']
```

---

## Error Handling

### Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 401 | Unauthorized | Check API key is correct and active |
| 429 | Rate limit exceeded | Wait before retrying, upgrade plan |
| 500 | Server error | Retry after a few seconds |
| 503 | Service unavailable | DeepSeek maintenance, try later |

### Error Response Format

```json
{
    "error": {
        "message": "Incorrect API key provided",
        "type": "invalid_request_error",
        "code": "invalid_api_key"
    }
}
```

### Handling Errors in Code

**JavaScript:**
```javascript
try {
    const result = await callDeepSeekAPI(prompt);
    return result;
} catch (error) {
    if (error.status === 401) {
        alert('Invalid API key. Please check your configuration.');
    } else if (error.status === 429) {
        alert('Rate limit exceeded. Please wait a moment and try again.');
    } else {
        alert('An error occurred. Please try again later.');
    }
    console.error('API Error:', error);
}
```

**Python:**
```python
try:
    result = call_deepseek_api(prompt)
    return result
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 401:
        print("Invalid API key. Please check your .env file.")
    elif e.response.status_code == 429:
        print("Rate limit exceeded. Please wait and try again.")
    else:
        print(f"API error: {e}")
    raise
```

---

## Best Practices

### Security

1. **Never commit API keys to Git**
   - Use `.env` files (already in `.gitignore`)
   - Use environment variables
   - Use secrets managers for production

2. **Rotate keys regularly**
   - Generate new key every 3-6 months
   - Revoke old keys immediately

3. **Use separate keys for development and production**
   - Test with dev key
   - Deploy with prod key

### Performance

1. **Cache results** when possible
   ```javascript
   // Cache resume analysis for 24 hours
   const cacheKey = `analysis_${resumeHash}`;
   const cached = localStorage.getItem(cacheKey);
   if (cached) return JSON.parse(cached);
   ```

2. **Batch requests** when applicable
   - Combine multiple prompts
   - Reduce API calls

3. **Optimize prompts**
   - Be concise but specific
   - Reduce token usage
   - Get better results faster

### Cost Optimization

1. **Use appropriate max_tokens**
   ```javascript
   // For short outputs (keywords)
   max_tokens: 200
   
   // For cover letters
   max_tokens: 800
   
   // For detailed analysis
   max_tokens: 2000
   ```

2. **Set reasonable temperature**
   ```javascript
   // For factual tasks (keyword extraction)
   temperature: 0.3
   
   // For creative tasks (cover letters)
   temperature: 0.7
   ```

3. **Monitor usage**
   - Check dashboard weekly
   - Set billing alerts
   - Track per-tool usage

---

## Cost Management

### Estimating Costs

**Tokens per task (approximate):**
- Resume analysis: 500-1000 tokens
- Cover letter: 800-1200 tokens
- Interview questions: 600-900 tokens

**Monthly cost examples:**
- 50 resume optimizations: ~$0.05
- 30 cover letters: ~$0.06
- 100 interview preps: ~$0.09
- **Total**: ~$0.20/month for moderate use

### Setting Limits

1. **DeepSeek Dashboard**:
   - Set spending limits
   - Enable billing alerts
   - Track daily usage

2. **In Your Code**:
```javascript
let dailyCallCount = parseInt(localStorage.getItem('api_calls_today') || '0');
const maxDailyCalls = 50;

if (dailyCallCount >= maxDailyCalls) {
    alert('Daily API limit reached. Try again tomorrow.');
    return;
}

// Make API call
await callDeepSeekAPI(prompt);
localStorage.setItem('api_calls_today', (++dailyCallCount).toString());
```

---

## Troubleshooting

### Issue: "Invalid API key"

**Causes:**
- Typo in key
- Extra spaces when pasting
- Key was revoked
- Using wrong environment

**Solutions:**
```bash
# Verify key format
echo $DEEPSEEK_API_KEY  # Should start with sk-

# Test key directly
curl https://api.deepseek.com/v1/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"test"}]}'
```

### Issue: "Rate limit exceeded"

**Solutions:**
1. Wait 60 seconds before retrying
2. Implement exponential backoff
3. Upgrade to paid plan
4. Reduce request frequency

### Issue: "Timeout errors"

**Solutions:**
1. Increase timeout in code:
```javascript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000); // 30s

fetch(url, { 
    signal: controller.signal,
    // ... other options
});
```

2. Reduce max_tokens
3. Simplify prompts

### Issue: "Unexpected responses"

**Solutions:**
1. Check prompt clarity
2. Add more specific instructions
3. Set appropriate temperature
4. Validate response format

---

## Additional Resources

- **DeepSeek Documentation**: [docs.deepseek.com](https://docs.deepseek.com)
- **API Status**: [status.deepseek.com](https://status.deepseek.com)
- **Community Forum**: DeepSeek Discord/Forum
- **Pricing**: [platform.deepseek.com/pricing](https://platform.deepseek.com/pricing)

---

## Need Help?

- 📧 **DeepSeek Support**: support@deepseek.com
- 🐛 **Tool Issues**: [GitHub Issues](https://github.com/YounGuru03/CV_Autofill/issues)
- 📖 **More Docs**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Happy coding! 🚀**
