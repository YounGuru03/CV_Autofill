let careerPaths = {};
let currentPath = null;
let chart = null;

const industrySelect = document.getElementById('industry');
const careerPathSelect = document.getElementById('careerPath');
const currentLevelSelect = document.getElementById('currentLevel');
const targetLevelSelect = document.getElementById('targetLevel');
const generatePathBtn = document.getElementById('generatePathBtn');
const pathSection = document.getElementById('pathSection');
const exportPathBtn = document.getElementById('exportPathBtn');
const savePathBtn = document.getElementById('savePathBtn');

industrySelect.addEventListener('change', updateCareerPaths);
generatePathBtn.addEventListener('click', generatePath);
exportPathBtn.addEventListener('click', exportPath);
savePathBtn.addEventListener('click', savePath);

async function loadCareerData() {
    try {
        const response = await fetch('data/career_paths.json');
        careerPaths = await response.json();
        updateCareerPaths();
    } catch (error) {
        console.error('Error loading career paths:', error);
        careerPaths = getDefaultCareerPaths();
        updateCareerPaths();
    }
}

function updateCareerPaths() {
    const industry = industrySelect.value;
    const paths = careerPaths[industry] || [];
    
    careerPathSelect.innerHTML = '<option value="">Select a career path</option>';
    paths.forEach(path => {
        const option = document.createElement('option');
        option.value = path.id;
        option.textContent = path.name;
        careerPathSelect.appendChild(option);
    });
}

function generatePath() {
    const industry = industrySelect.value;
    const pathId = careerPathSelect.value;
    const currentLevel = parseInt(currentLevelSelect.value);
    const targetLevel = parseInt(targetLevelSelect.value);
    
    if (!pathId) {
        alert('Please select a career path');
        return;
    }
    
    if (currentLevel >= targetLevel) {
        alert('Target level must be higher than current level');
        return;
    }
    
    const paths = careerPaths[industry] || [];
    currentPath = paths.find(p => p.id === pathId);
    
    if (!currentPath) {
        alert('Career path not found');
        return;
    }
    
    displayRoadmap(currentLevel, targetLevel);
    displayMilestones(currentLevel, targetLevel);
    displaySkills(currentLevel, targetLevel);
    displayTimeline(currentLevel, targetLevel);
    displayResources(currentLevel, targetLevel);
    
    pathSection.style.display = 'block';
    pathSection.scrollIntoView({ behavior: 'smooth' });
}

function displayRoadmap(currentLevel, targetLevel) {
    const ctx = document.getElementById('roadmapChart').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }
    
    const levels = currentPath.levels.filter((_, i) => i >= currentLevel && i <= targetLevel);
    const labels = levels.map(l => l.title);
    const salaryData = levels.map(l => l.salary.avg);
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Salary ($)',
                data: salaryData,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000) + 'k';
                        }
                    }
                }
            }
        }
    });
}

function displayMilestones(currentLevel, targetLevel) {
    const milestonesContainer = document.getElementById('milestones');
    milestonesContainer.innerHTML = '';
    
    currentPath.levels.forEach((level, index) => {
        if (index < currentLevel || index > targetLevel) return;
        
        const card = document.createElement('div');
        card.className = 'milestone-card';
        
        if (index === currentLevel) {
            card.classList.add('current');
        } else if (index < currentLevel) {
            card.classList.add('completed');
        }
        
        card.innerHTML = `
            <div class="milestone-level">Level ${index + 1}</div>
            <div class="milestone-title">${level.title}</div>
            <div class="milestone-description">${level.description}</div>
            <div class="milestone-requirements">
                <h4>Key Requirements:</h4>
                <ul>
                    ${level.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
        `;
        
        milestonesContainer.appendChild(card);
    });
}

function displaySkills(currentLevel, targetLevel) {
    const skillsContainer = document.getElementById('skillsPath');
    skillsContainer.innerHTML = '';
    
    const allSkills = {
        technical: new Set(),
        soft: new Set(),
        leadership: new Set()
    };
    
    currentPath.levels.forEach((level, index) => {
        if (index < currentLevel || index > targetLevel) return;
        
        level.skills.technical?.forEach(skill => allSkills.technical.add(skill));
        level.skills.soft?.forEach(skill => allSkills.soft.add(skill));
        level.skills.leadership?.forEach(skill => allSkills.leadership.add(skill));
    });
    
    Object.entries(allSkills).forEach(([category, skills]) => {
        if (skills.size === 0) return;
        
        const categoryCard = document.createElement('div');
        categoryCard.className = 'skill-category';
        
        categoryCard.innerHTML = `
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Skills</h3>
            <div>
                ${Array.from(skills).map(skill => 
                    `<span class="skill-tag essential">${skill}</span>`
                ).join('')}
            </div>
        `;
        
        skillsContainer.appendChild(categoryCard);
    });
}

function displayTimeline(currentLevel, targetLevel) {
    const timelineContainer = document.getElementById('timeline');
    timelineContainer.innerHTML = '';
    
    let cumulativeYears = 0;
    
    currentPath.levels.forEach((level, index) => {
        if (index < currentLevel || index > targetLevel) return;
        
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        if (index === currentLevel) {
            item.classList.add('current');
        }
        
        const yearsAtLevel = level.duration || 2;
        const startYear = new Date().getFullYear() + cumulativeYears;
        const endYear = startYear + yearsAtLevel;
        
        item.innerHTML = `
            <div class="timeline-date">${startYear} - ${endYear} (${yearsAtLevel} years)</div>
            <div class="timeline-title">${level.title}</div>
            <div class="timeline-description">${level.description}</div>
        `;
        
        timelineContainer.appendChild(item);
        cumulativeYears += yearsAtLevel;
    });
}

function displayResources(currentLevel, targetLevel) {
    const resourcesContainer = document.getElementById('resources');
    resourcesContainer.innerHTML = '';
    
    const resources = [
        {
            type: 'Course',
            title: 'LinkedIn Learning',
            description: 'Professional development courses for all career levels'
        },
        {
            type: 'Book',
            title: 'The Effective Engineer',
            description: 'How to leverage your efforts in software engineering'
        },
        {
            type: 'Community',
            title: 'Professional Networks',
            description: 'Join industry-specific communities and forums'
        },
        {
            type: 'Certification',
            title: 'Industry Certifications',
            description: 'Get certified in relevant technologies and methodologies'
        },
        {
            type: 'Mentorship',
            title: 'Find a Mentor',
            description: 'Connect with experienced professionals in your field'
        },
        {
            type: 'Practice',
            title: 'Side Projects',
            description: 'Build portfolio projects to demonstrate skills'
        }
    ];
    
    resources.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        card.innerHTML = `
            <span class="resource-type">${resource.type}</span>
            <div class="resource-title">${resource.title}</div>
            <div class="resource-description">${resource.description}</div>
        `;
        
        resourcesContainer.appendChild(card);
    });
}

function exportPath() {
    if (!currentPath) return;
    
    const currentLevel = parseInt(currentLevelSelect.value);
    const targetLevel = parseInt(targetLevelSelect.value);
    
    let content = `CAREER PATH PLAN\n`;
    content += `${'='.repeat(60)}\n\n`;
    content += `Path: ${currentPath.name}\n`;
    content += `Current Level: ${currentPath.levels[currentLevel].title}\n`;
    content += `Target Level: ${currentPath.levels[targetLevel].title}\n\n`;
    
    content += `MILESTONES\n`;
    content += `${'-'.repeat(60)}\n\n`;
    
    currentPath.levels.forEach((level, index) => {
        if (index < currentLevel || index > targetLevel) return;
        
        content += `${level.title}\n`;
        content += `${level.description}\n`;
        content += `Salary Range: $${level.salary.min.toLocaleString()} - $${level.salary.max.toLocaleString()}\n`;
        content += `Requirements:\n`;
        level.requirements.forEach(req => content += `  - ${req}\n`);
        content += `\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career_path_${currentPath.id}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function savePath() {
    if (!currentPath) return;
    
    const pathData = {
        path: currentPath.id,
        industry: industrySelect.value,
        currentLevel: currentLevelSelect.value,
        targetLevel: targetLevelSelect.value,
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('savedCareerPath', JSON.stringify(pathData));
    
    savePathBtn.textContent = '✓ Saved!';
    setTimeout(() => {
        savePathBtn.textContent = '💾 Save to Profile';
    }, 2000);
}

function getDefaultCareerPaths() {
    return {
        technology: [
            {
                id: 'software-engineer',
                name: 'Software Engineer',
                levels: [
                    {
                        title: 'Junior Software Engineer',
                        description: 'Entry-level position focusing on learning and contributing to codebases',
                        salary: { min: 60000, max: 85000, avg: 72500 },
                        duration: 2,
                        requirements: [
                            'Bachelor\'s degree in CS or related field',
                            'Basic programming skills',
                            'Understanding of data structures',
                            'Version control (Git)'
                        ],
                        skills: {
                            technical: ['JavaScript', 'Python', 'Git', 'SQL'],
                            soft: ['Communication', 'Teamwork', 'Problem-solving']
                        }
                    },
                    {
                        title: 'Software Engineer',
                        description: 'Independently develop features and contribute to system design',
                        salary: { min: 80000, max: 120000, avg: 100000 },
                        duration: 3,
                        requirements: [
                            '2+ years of experience',
                            'Proficiency in multiple languages',
                            'System design knowledge',
                            'Testing and debugging skills'
                        ],
                        skills: {
                            technical: ['React', 'Node.js', 'AWS', 'Docker', 'APIs'],
                            soft: ['Time management', 'Mentoring', 'Technical writing']
                        }
                    },
                    {
                        title: 'Senior Software Engineer',
                        description: 'Lead projects, mentor juniors, and drive technical excellence',
                        salary: { min: 120000, max: 180000, avg: 150000 },
                        duration: 3,
                        requirements: [
                            '5+ years of experience',
                            'Expert in domain',
                            'Architecture and design patterns',
                            'Code review and mentoring'
                        ],
                        skills: {
                            technical: ['Microservices', 'System Design', 'Performance Optimization'],
                            soft: ['Leadership', 'Strategic thinking', 'Conflict resolution'],
                            leadership: ['Mentoring', 'Technical leadership']
                        }
                    },
                    {
                        title: 'Staff/Principal Engineer',
                        description: 'Define technical strategy and influence org-wide decisions',
                        salary: { min: 180000, max: 250000, avg: 215000 },
                        duration: 4,
                        requirements: [
                            '8+ years of experience',
                            'Cross-team influence',
                            'Technical vision and strategy',
                            'Industry expertise'
                        ],
                        skills: {
                            technical: ['Architecture', 'Scalability', 'Security'],
                            leadership: ['Technical strategy', 'Cross-functional leadership', 'Innovation']
                        }
                    }
                ]
            }
        ]
    };
}

loadCareerData();
