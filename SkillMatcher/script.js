let skillsDatabase = {};

const yourSkillsInput = document.getElementById('yourSkills');
const jobRequirementsInput = document.getElementById('jobRequirements');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('results');
const exportBtn = document.getElementById('exportBtn');
const saveBtn = document.getElementById('saveBtn');
const importResumeBtn = document.getElementById('importResumeBtn');

document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => loadRoleTemplate(btn.dataset.role));
});

analyzeBtn.addEventListener('click', analyzeSkills);
exportBtn.addEventListener('click', exportAnalysis);
saveBtn.addEventListener('click', saveAnalysis);
importResumeBtn.addEventListener('click', () => alert('Resume import feature - integrate with ResumeAutofill tool'));

async function loadSkillsDatabase() {
    try {
        const response = await fetch('skills_database.json');
        skillsDatabase = await response.json();
    } catch (error) {
        console.error('Error loading skills database:', error);
        skillsDatabase = getDefaultSkillsDatabase();
    }
}

function loadRoleTemplate(role) {
    const templates = {
        'software-engineer': 'JavaScript, Python, React, Node.js, SQL, Git, REST APIs, Docker, AWS, Agile, Problem Solving, Team Collaboration',
        'data-scientist': 'Python, R, SQL, Machine Learning, Statistics, Pandas, Scikit-learn, TensorFlow, Data Visualization, Tableau, Communication, Critical Thinking',
        'product-manager': 'Product Strategy, Roadmapping, User Research, A/B Testing, SQL, Analytics, Agile, Stakeholder Management, Communication, Leadership',
        'designer': 'Figma, Sketch, UI Design, UX Research, Prototyping, Wireframing, User Testing, Design Systems, HTML/CSS, Collaboration, Creativity'
    };
    
    jobRequirementsInput.value = templates[role] || '';
}

function analyzeSkills() {
    const yourSkills = parseSkills(yourSkillsInput.value);
    const requiredSkills = parseSkills(jobRequirementsInput.value);
    
    if (yourSkills.length === 0 || requiredSkills.length === 0) {
        alert('Please enter both your skills and job requirements');
        return;
    }
    
    const matched = [];
    const missing = [];
    const bonus = [];
    
    requiredSkills.forEach(req => {
        if (yourSkills.some(skill => normalizeSkill(skill) === normalizeSkill(req))) {
            matched.push(req);
        } else {
            missing.push(req);
        }
    });
    
    yourSkills.forEach(skill => {
        if (!requiredSkills.some(req => normalizeSkill(req) === normalizeSkill(skill))) {
            bonus.push(skill);
        }
    });
    
    const matchScore = requiredSkills.length > 0 
        ? Math.round((matched.length / requiredSkills.length) * 100) 
        : 0;
    
    displayResults(matchScore, matched, missing, bonus);
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function parseSkills(text) {
    const skills = text.split(/[,\n]+/).map(s => s.trim()).filter(s => s.length > 0);
    return [...new Set(skills)];
}

function normalizeSkill(skill) {
    return skill.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function displayResults(score, matched, missing, bonus) {
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreValue = document.getElementById('scoreValue');
    const scoreDescription = document.getElementById('scoreDescription');
    
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (score / 100) * circumference;
    
    scoreCircle.style.strokeDashoffset = offset;
    scoreValue.textContent = score;
    
    if (score >= 80) {
        scoreCircle.style.stroke = '#10b981';
        scoreDescription.textContent = 'Excellent match! You have most of the required skills.';
    } else if (score >= 60) {
        scoreCircle.style.stroke = '#f59e0b';
        scoreDescription.textContent = 'Good match! Focus on learning the missing skills.';
    } else {
        scoreCircle.style.stroke = '#ef4444';
        scoreDescription.textContent = 'Skill gap detected. Follow the learning path below.';
    }
    
    document.getElementById('matchedSkills').innerHTML = matched.length > 0
        ? matched.map(s => `<span class="skill-tag matched">${s}</span>`).join('')
        : '<p class="hint">No matching skills found</p>';
    
    document.getElementById('missingSkills').innerHTML = missing.length > 0
        ? missing.map(s => `<span class="skill-tag missing">${s}</span>`).join('')
        : '<p class="hint">No skill gaps - you have everything!</p>';
    
    document.getElementById('bonusSkills').innerHTML = bonus.length > 0
        ? bonus.map(s => `<span class="skill-tag bonus">${s}</span>`).join('')
        : '<p class="hint">No additional skills beyond requirements</p>';
    
    displayLearningPath(missing);
    displayResources(missing);
}

function displayLearningPath(missingSkills) {
    const learningPath = document.getElementById('learningPath');
    
    if (missingSkills.length === 0) {
        learningPath.innerHTML = '<p class="hint">Great! You have all required skills. Consider advanced courses to deepen expertise.</p>';
        return;
    }
    
    const prioritized = prioritizeSkills(missingSkills);
    
    learningPath.innerHTML = prioritized.map((skill, index) => `
        <div class="learning-item">
            <span class="difficulty-badge difficulty-${getDifficulty(skill)}">${getDifficulty(skill)}</span>
            <h4>${index + 1}. ${skill}</h4>
            <p>${getSkillDescription(skill)}</p>
            <p><strong>Estimated time:</strong> ${getEstimatedTime(skill)}</p>
        </div>
    `).join('');
}

function prioritizeSkills(skills) {
    const priority = {
        'high': ['JavaScript', 'Python', 'SQL', 'Git', 'Communication', 'Problem Solving'],
        'medium': ['React', 'Node.js', 'Docker', 'AWS', 'Leadership', 'Agile'],
        'low': []
    };
    
    return skills.sort((a, b) => {
        const aPriority = priority.high.some(p => normalizeSkill(a).includes(normalizeSkill(p))) ? 0 :
                        priority.medium.some(p => normalizeSkill(a).includes(normalizeSkill(p))) ? 1 : 2;
        const bPriority = priority.high.some(p => normalizeSkill(b).includes(normalizeSkill(p))) ? 0 :
                        priority.medium.some(p => normalizeSkill(b).includes(normalizeSkill(p))) ? 1 : 2;
        return aPriority - bPriority;
    });
}

function getDifficulty(skill) {
    const easy = ['Git', 'HTML', 'CSS', 'Agile', 'Communication'];
    const hard = ['Machine Learning', 'Kubernetes', 'System Design', 'AWS'];
    
    if (easy.some(e => normalizeSkill(skill).includes(normalizeSkill(e)))) return 'beginner';
    if (hard.some(h => normalizeSkill(skill).includes(normalizeSkill(h)))) return 'advanced';
    return 'intermediate';
}

function getSkillDescription(skill) {
    const descriptions = {
        'javascript': 'Essential programming language for web development',
        'python': 'Versatile language for backend, data science, and automation',
        'react': 'Popular JavaScript library for building user interfaces',
        'sql': 'Database query language for data manipulation',
        'git': 'Version control system for tracking code changes',
        'docker': 'Containerization platform for application deployment',
        'aws': 'Cloud computing platform with extensive services'
    };
    
    const normalized = normalizeSkill(skill);
    for (const [key, desc] of Object.entries(descriptions)) {
        if (normalized.includes(key)) return desc;
    }
    return 'Important skill for this role';
}

function getEstimatedTime(skill) {
    const difficulty = getDifficulty(skill);
    if (difficulty === 'beginner') return '1-2 weeks';
    if (difficulty === 'intermediate') return '1-2 months';
    return '3-6 months';
}

function displayResources(missingSkills) {
    const resources = document.getElementById('resources');
    
    const allResources = [
        { title: 'freeCodeCamp', description: 'Free coding bootcamp with certifications', url: 'freecodecamp.org' },
        { title: 'Coursera', description: 'University courses and professional certificates', url: 'coursera.org' },
        { title: 'LinkedIn Learning', description: 'Professional development courses', url: 'linkedin.com/learning' },
        { title: 'Udemy', description: 'Affordable courses on various topics', url: 'udemy.com' },
        { title: 'YouTube', description: 'Free tutorials and crash courses', url: 'youtube.com' },
        { title: 'GitHub', description: 'Practice with open source projects', url: 'github.com' }
    ];
    
    resources.innerHTML = allResources.map(r => `
        <div class="resource-item">
            <h4>${r.title}</h4>
            <p>${r.description}</p>
            <p style="color: var(--primary-color); font-size: 0.85rem;">${r.url}</p>
        </div>
    `).join('');
}

function exportAnalysis() {
    const yourSkills = parseSkills(yourSkillsInput.value);
    const requiredSkills = parseSkills(jobRequirementsInput.value);
    const matched = yourSkills.filter(s => requiredSkills.some(r => normalizeSkill(r) === normalizeSkill(s)));
    const missing = requiredSkills.filter(r => !yourSkills.some(s => normalizeSkill(s) === normalizeSkill(r)));
    const matchScore = Math.round((matched.length / requiredSkills.length) * 100);
    
    let content = 'SKILL GAP ANALYSIS\n';
    content += '='.repeat(60) + '\n\n';
    content += `Match Score: ${matchScore}%\n\n`;
    content += `Skills You Have (${matched.length}):\n`;
    matched.forEach(s => content += `  ✓ ${s}\n`);
    content += `\nSkills to Learn (${missing.length}):\n`;
    missing.forEach(s => content += `  • ${s}\n`);
    content += `\nLearning Path:\n`;
    missing.forEach((s, i) => content += `  ${i + 1}. ${s} (${getEstimatedTime(s)})\n`);
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skill_analysis_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function saveAnalysis() {
    const data = {
        yourSkills: yourSkillsInput.value,
        jobRequirements: jobRequirementsInput.value,
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('skillMatcherData', JSON.stringify(data));
    
    saveBtn.textContent = '✓ Saved!';
    setTimeout(() => {
        saveBtn.textContent = '💾 Save Analysis';
    }, 2000);
}

function getDefaultSkillsDatabase() {
    return {};
}

const saved = localStorage.getItem('skillMatcherData');
if (saved) {
    const data = JSON.parse(saved);
    yourSkillsInput.value = data.yourSkills || '';
    jobRequirementsInput.value = data.jobRequirements || '';
}

loadSkillsDatabase();
