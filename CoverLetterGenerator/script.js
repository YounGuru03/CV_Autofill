const form = document.getElementById('coverLetterForm');
const loadingSection = document.getElementById('loading');
const resultSection = document.getElementById('result');
const errorSection = document.getElementById('error');
const coverLetterOutput = document.getElementById('coverLetterOutput');
const useTemplateBtn = document.getElementById('useTemplateBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const regenerateBtn = document.getElementById('regenerateBtn');

let currentFormData = {};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await generateCoverLetter(true);
});

useTemplateBtn.addEventListener('click', async () => {
    await generateCoverLetter(false);
});

regenerateBtn.addEventListener('click', async () => {
    await generateCoverLetter(true);
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(coverLetterOutput.textContent)
        .then(() => {
            copyBtn.textContent = '✓ Copied!';
            setTimeout(() => {
                copyBtn.textContent = '📋 Copy';
            }, 2000);
        })
        .catch(() => showError('Failed to copy to clipboard'));
});

downloadBtn.addEventListener('click', () => {
    const blob = new Blob([coverLetterOutput.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover_letter_${currentFormData.companyName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
});

async function generateCoverLetter(useAI) {
    currentFormData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        companyName: document.getElementById('companyName').value,
        positionTitle: document.getElementById('positionTitle').value,
        hiringManager: document.getElementById('hiringManager').value,
        jobDescription: document.getElementById('jobDescription').value,
        yourExperience: document.getElementById('yourExperience').value,
        whyCompany: document.getElementById('whyCompany').value,
        tone: document.getElementById('tone').value
    };

    hideError();
    resultSection.style.display = 'none';
    loadingSection.style.display = 'block';

    try {
        let coverLetter;
        
        if (useAI) {
            coverLetter = await generateWithAI(currentFormData);
        } else {
            coverLetter = generateFromTemplate(currentFormData);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        displayResult(coverLetter);
        loadingSection.style.display = 'none';
        resultSection.style.display = 'block';
        
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        loadingSection.style.display = 'none';
        showError('Error generating cover letter. Please try again.');
        console.error(error);
    }
}

async function generateWithAI(data) {
    const apiKey = localStorage.getItem('deepseek_api_key');
    
    if (!apiKey) {
        return generateFromTemplate(data);
    }

    const prompt = buildPrompt(data);
    
    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional cover letter writer. Write compelling, personalized cover letters that highlight the candidate\'s strengths and match them to the job requirements.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const result = await response.json();
        return result.choices[0].message.content;
    } catch (error) {
        console.warn('AI generation failed, using template:', error);
        return generateFromTemplate(data);
    }
}

function buildPrompt(data) {
    const toneDescriptions = {
        professional: 'professional and formal',
        friendly: 'friendly and enthusiastic',
        confident: 'confident and direct'
    };

    return `Write a ${toneDescriptions[data.tone]} cover letter for the following:

Position: ${data.positionTitle}
Company: ${data.companyName}
${data.hiringManager ? `Hiring Manager: ${data.hiringManager}` : ''}

Job Description:
${data.jobDescription}

Candidate's Experience and Skills:
${data.yourExperience}

${data.whyCompany ? `Why the candidate is interested in this company:\n${data.whyCompany}` : ''}

Include:
1. A strong opening paragraph expressing interest
2. 2-3 paragraphs highlighting relevant experience and skills that match the job requirements
3. A paragraph about why they're interested in the company (if provided)
4. A confident closing paragraph with a call to action

Format the letter properly with:
- Candidate's contact information at the top: ${data.fullName}, ${data.email}${data.phone ? `, ${data.phone}` : ''}${data.address ? `, ${data.address}` : ''}
- Date
- Company name and greeting
- Body paragraphs
- Professional closing

Make it compelling, specific, and tailored to the job description. Keep it concise (3-4 paragraphs for the body).`;
}

function generateFromTemplate(data) {
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const greeting = data.hiringManager 
        ? `Dear ${data.hiringManager},` 
        : 'Dear Hiring Manager,';

    const templates = {
        professional: generateProfessionalTemplate,
        friendly: generateFriendlyTemplate,
        confident: generateConfidentTemplate
    };

    const templateFunc = templates[data.tone] || templates.professional;
    return templateFunc(data, date, greeting);
}

function generateProfessionalTemplate(data, date, greeting) {
    return `${data.fullName}
${data.email}${data.phone ? ' | ' + data.phone : ''}${data.address ? ' | ' + data.address : ''}

${date}

${data.companyName}

${greeting}

I am writing to express my strong interest in the ${data.positionTitle} position at ${data.companyName}. With my background in ${extractKeySkills(data.yourExperience)}, I am confident in my ability to contribute effectively to your team.

${data.yourExperience}

${data.whyCompany ? `I am particularly drawn to ${data.companyName} because ${data.whyCompany}` : `I am excited about the opportunity to bring my expertise to ${data.companyName} and contribute to your continued success.`}

The requirements outlined in the job description align well with my experience and skills. I am particularly proficient in ${extractKeySkills(data.jobDescription)}, which I understand are critical for this role.

I would welcome the opportunity to discuss how my background and skills would be an asset to ${data.companyName}. Thank you for your consideration, and I look forward to speaking with you soon.

Sincerely,
${data.fullName}`;
}

function generateFriendlyTemplate(data, date, greeting) {
    return `${data.fullName}
${data.email}${data.phone ? ' | ' + data.phone : ''}${data.address ? ' | ' + data.address : ''}

${date}

${data.companyName}

${greeting}

I'm excited to apply for the ${data.positionTitle} position at ${data.companyName}! When I saw this opportunity, I knew I had to reach out because it seems like a perfect match for my skills and career goals.

${data.yourExperience}

${data.whyCompany ? `What really excites me about ${data.companyName} is ${data.whyCompany}. This aligns perfectly with my own values and professional aspirations.` : `I'm genuinely enthusiastic about the possibility of joining ${data.companyName} and contributing to your innovative work.`}

I've noticed that you're looking for someone with experience in ${extractKeySkills(data.jobDescription)}, and I'm thrilled to say that these are areas where I've developed strong expertise. I believe I could make an immediate positive impact on your team.

I'd love the chance to chat more about how I can contribute to ${data.companyName}'s success. Thank you so much for considering my application!

Best regards,
${data.fullName}`;
}

function generateConfidentTemplate(data, date, greeting) {
    return `${data.fullName}
${data.email}${data.phone ? ' | ' + data.phone : ''}${data.address ? ' | ' + data.address : ''}

${date}

${data.companyName}

${greeting}

I'm the ${data.positionTitle} you're looking for at ${data.companyName}. Here's why:

${data.yourExperience}

Your job description calls for expertise in ${extractKeySkills(data.jobDescription)}. These are my core strengths, and I've delivered measurable results in each area.

${data.whyCompany ? `${data.companyName} stands out to me because ${data.whyCompany}. I don't just want any job—I want this one.` : `I've researched ${data.companyName}, and I'm confident that my skills and experience align perfectly with your needs.`}

I'm ready to hit the ground running and make an immediate impact. Let's talk about how I can contribute to your team's success.

I look forward to discussing this opportunity with you.

Regards,
${data.fullName}`;
}

function extractKeySkills(text) {
    const commonSkills = [
        'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL',
        'leadership', 'management', 'communication', 'problem-solving',
        'teamwork', 'project management', 'agile', 'software development'
    ];

    const textLower = text.toLowerCase();
    const foundSkills = commonSkills.filter(skill => 
        textLower.includes(skill.toLowerCase())
    );

    return foundSkills.length > 0 
        ? foundSkills.slice(0, 3).join(', ') 
        : 'various relevant skills';
}

function displayResult(coverLetter) {
    coverLetterOutput.textContent = coverLetter;
}

function showError(message) {
    errorSection.textContent = message;
    errorSection.style.display = 'block';
}

function hideError() {
    errorSection.style.display = 'none';
}

if (!localStorage.getItem('deepseek_api_key')) {
    const banner = document.createElement('div');
    banner.className = 'error-message';
    banner.innerHTML = `
        💡 <strong>Tip:</strong> Add your DeepSeek API key in localStorage with key 'deepseek_api_key' 
        for AI-powered generation. Currently using templates.
    `;
    banner.style.background = '#dbeafe';
    banner.style.color = '#1e40af';
    banner.style.borderLeftColor = '#3b82f6';
    document.querySelector('main').insertBefore(banner, document.querySelector('.form-section'));
}
