let resumeText = '';
let jobDescriptionText = '';

const fileInput = document.getElementById('resumeFile');
const fileName = document.getElementById('fileName');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('results');
const loadingSection = document.getElementById('loading');
const errorSection = document.getElementById('error');
const jobDescriptionInput = document.getElementById('jobDescription');

fileInput.addEventListener('change', handleFileUpload);
analyzeBtn.addEventListener('click', analyzeResume);
jobDescriptionInput.addEventListener('input', (e) => {
    jobDescriptionText = e.target.value;
});

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    fileName.textContent = `Selected: ${file.name}`;
    
    try {
        if (file.type === 'text/plain') {
            resumeText = await file.text();
        } else if (file.type === 'application/pdf') {
            resumeText = await extractTextFromPDF(file);
        } else {
            resumeText = await extractTextFromDoc(file);
        }
        
        analyzeBtn.disabled = false;
        hideError();
    } catch (error) {
        showError('Error reading file. Please try again.');
        console.error(error);
    }
}

async function extractTextFromPDF(file) {
    const message = 'PDF parsing requires PDF.js library or backend server. For demo: Use TXT format or manually copy resume text into "Job Description" field for analysis.';
    showError(message);
    return '';
}

async function extractTextFromDoc(file) {
    const message = 'DOC/DOCX parsing requires server-side library. For demo: Save as TXT or manually copy resume text into "Job Description" field for analysis.';
    showError(message);
    return '';
}

async function analyzeResume() {
    if (!resumeText) {
        showError('Please upload a resume first.');
        return;
    }

    hideError();
    resultsSection.style.display = 'none';
    loadingSection.style.display = 'block';

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const analysis = performAnalysis(resumeText, jobDescriptionText);
        displayResults(analysis);
        
        loadingSection.style.display = 'none';
        resultsSection.style.display = 'block';
    } catch (error) {
        loadingSection.style.display = 'none';
        showError('Error analyzing resume. Please try again.');
        console.error(error);
    }
}

function performAnalysis(resume, jobDesc) {
    const resumeLower = resume.toLowerCase();
    const jobDescLower = jobDesc.toLowerCase();
    
    const commonATSKeywords = [
        'experience', 'skills', 'education', 'bachelor', 'master',
        'responsibilities', 'achievements', 'project', 'team',
        'leadership', 'communication', 'problem-solving', 'analytical'
    ];
    
    const technicalKeywords = [
        'javascript', 'python', 'java', 'react', 'node.js', 'sql',
        'aws', 'docker', 'git', 'agile', 'api', 'database',
        'html', 'css', 'mongodb', 'postgresql', 'kubernetes'
    ];
    
    let jobKeywords = [];
    if (jobDesc) {
        const words = jobDescLower.split(/\s+/);
        jobKeywords = words.filter(word => 
            word.length > 4 && 
            !['about', 'their', 'would', 'should', 'could'].includes(word)
        );
        jobKeywords = [...new Set(jobKeywords)].slice(0, 20);
    }
    
    const allKeywords = [...new Set([...commonATSKeywords, ...technicalKeywords])];
    
    const foundKeywords = allKeywords.filter(keyword => 
        resumeLower.includes(keyword)
    );
    
    const missingKeywords = jobKeywords.filter(keyword => 
        !resumeLower.includes(keyword)
    ).slice(0, 10);
    
    const wordCount = resume.split(/\s+/).length;
    const hasContactInfo = /\b[\w\.-]+@[\w\.-]+\.\w+\b/.test(resume);
    const hasPhoneNumber = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(resume);
    const hasBulletPoints = /[•\-\*]/.test(resume);
    const sections = resume.match(/\b(experience|education|skills|projects|summary)\b/gi) || [];
    
    let score = 0;
    
    score += Math.min(foundKeywords.length * 3, 40);
    score += hasContactInfo ? 10 : 0;
    score += hasPhoneNumber ? 5 : 0;
    score += hasBulletPoints ? 10 : 0;
    score += Math.min(sections.length * 5, 15);
    score += wordCount > 300 && wordCount < 800 ? 10 : 5;
    score += jobDesc && missingKeywords.length < 5 ? 10 : 0;
    
    score = Math.min(score, 100);
    
    const recommendations = [];
    const issues = [];
    
    if (!hasContactInfo) {
        issues.push('Missing email address');
        recommendations.push('Add a professional email address');
    }
    if (!hasPhoneNumber) {
        issues.push('Missing phone number');
        recommendations.push('Include a contact phone number');
    }
    if (wordCount < 300) {
        issues.push('Resume is too short');
        recommendations.push('Expand your experience and skills sections');
    }
    if (wordCount > 800) {
        issues.push('Resume might be too long');
        recommendations.push('Consider condensing to 1-2 pages');
    }
    if (!hasBulletPoints) {
        issues.push('No bullet points detected');
        recommendations.push('Use bullet points for better readability');
    }
    if (foundKeywords.length < 10) {
        recommendations.push('Add more relevant keywords from the job description');
    }
    if (!resumeLower.includes('experience') && !resumeLower.includes('education')) {
        issues.push('Missing standard sections');
        recommendations.push('Include Experience and Education sections');
    }
    
    if (recommendations.length === 0) {
        recommendations.push('Great job! Your resume is well-optimized');
    }
    if (issues.length === 0) {
        issues.push('No major issues detected');
    }
    
    return {
        score,
        foundKeywords,
        missingKeywords,
        wordCount,
        hasContactInfo,
        hasPhoneNumber,
        hasBulletPoints,
        sections: sections.length,
        recommendations,
        issues
    };
}

function displayResults(analysis) {
    const scoreValue = document.getElementById('scoreValue');
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreDescription = document.getElementById('scoreDescription');
    
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (analysis.score / 100) * circumference;
    
    scoreCircle.style.strokeDashoffset = offset;
    scoreValue.textContent = analysis.score;
    
    if (analysis.score >= 80) {
        scoreCircle.style.stroke = '#10b981';
        scoreDescription.textContent = 'Excellent! Your resume is highly optimized for ATS.';
    } else if (analysis.score >= 60) {
        scoreCircle.style.stroke = '#f59e0b';
        scoreDescription.textContent = 'Good! Some improvements recommended.';
    } else {
        scoreCircle.style.stroke = '#ef4444';
        scoreDescription.textContent = 'Needs improvement. Follow the recommendations below.';
    }
    
    const keywordStats = document.getElementById('keywordStats');
    keywordStats.innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Keywords Found:</span>
            <span class="stat-value">${analysis.foundKeywords.length}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Match Rate:</span>
            <span class="stat-value">${Math.round((analysis.foundKeywords.length / 25) * 100)}%</span>
        </div>
    `;
    
    const keywordList = document.getElementById('keywordList');
    keywordList.innerHTML = `
        <div class="keyword-chips">
            ${analysis.foundKeywords.slice(0, 15).map(kw => 
                `<span class="keyword-chip found">${kw}</span>`
            ).join('')}
        </div>
    `;
    
    const contentStats = document.getElementById('contentStats');
    contentStats.innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Word Count:</span>
            <span class="stat-value">${analysis.wordCount}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Sections:</span>
            <span class="stat-value">${analysis.sections}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Contact Info:</span>
            <span class="stat-value">${analysis.hasContactInfo ? '✓' : '✗'}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Bullet Points:</span>
            <span class="stat-value">${analysis.hasBulletPoints ? '✓' : '✗'}</span>
        </div>
    `;
    
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = analysis.recommendations
        .map(rec => `<li>${rec}</li>`)
        .join('');
    
    const issues = document.getElementById('issues');
    issues.innerHTML = analysis.issues
        .map(issue => `<li>${issue}</li>`)
        .join('');
    
    const missingKeywords = document.getElementById('missingKeywords');
    if (analysis.missingKeywords.length > 0) {
        missingKeywords.innerHTML = analysis.missingKeywords
            .map(kw => `<span class="keyword-chip missing">${kw}</span>`)
            .join('');
    } else {
        missingKeywords.innerHTML = '<p style="color: var(--text-light);">No job description provided or all keywords are present.</p>';
    }
}

function showError(message) {
    errorSection.textContent = message;
    errorSection.style.display = 'block';
}

function hideError() {
    errorSection.style.display = 'none';
}
