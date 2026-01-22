let questions = [];
let currentIndex = 0;
let userAnswers = {};

const generateBtn = document.getElementById('generateBtn');
const questionsSection = document.getElementById('questionsSection');
const questionCard = document.getElementById('questionCard');
const showTipsBtn = document.getElementById('showTipsBtn');
const tipsContent = document.getElementById('tipsContent');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const saveAnswerBtn = document.getElementById('saveAnswerBtn');
const clearAnswerBtn = document.getElementById('clearAnswerBtn');
const restartBtn = document.getElementById('restartBtn');
const exportBtn = document.getElementById('exportBtn');
const userAnswer = document.getElementById('userAnswer');

generateBtn.addEventListener('click', generateQuestions);
showTipsBtn.addEventListener('click', toggleTips);
prevBtn.addEventListener('click', () => navigate(-1));
nextBtn.addEventListener('click', () => navigate(1));
saveAnswerBtn.addEventListener('click', saveAnswer);
clearAnswerBtn.addEventListener('click', clearAnswer);
restartBtn.addEventListener('click', restart);
exportBtn.addEventListener('click', exportQA);
userAnswer.addEventListener('input', () => {
    userAnswers[currentIndex] = userAnswer.value;
});

async function generateQuestions() {
    const role = document.getElementById('role').value;
    const difficulty = document.getElementById('difficulty').value;
    const count = parseInt(document.getElementById('count').value);
    
    const types = [];
    if (document.getElementById('technical').checked) types.push('technical');
    if (document.getElementById('behavioral').checked) types.push('behavioral');
    if (document.getElementById('situational').checked) types.push('situational');
    
    if (types.length === 0) {
        alert('Please select at least one question type');
        return;
    }
    
    const allQuestions = await loadQuestions();
    
    questions = [];
    const questionsPerType = Math.ceil(count / types.length);
    
    types.forEach(type => {
        const filtered = allQuestions.filter(q => 
            q.type === type &&
            (q.role === role || q.role === 'general') &&
            (difficulty === 'mixed' || q.difficulty === difficulty)
        );
        
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        questions.push(...shuffled.slice(0, questionsPerType));
    });
    
    questions = questions.slice(0, count);
    
    if (questions.length === 0) {
        alert('No questions found for the selected criteria');
        return;
    }
    
    currentIndex = 0;
    userAnswers = {};
    
    questionsSection.style.display = 'block';
    updateQuestionDisplay();
    questionsSection.scrollIntoView({ behavior: 'smooth' });
}

async function loadQuestions() {
    try {
        const technical = await fetch('data/technical_questions.json').then(r => r.json()).catch(() => []);
        const behavioral = await fetch('data/behavioral_questions.json').then(r => r.json()).catch(() => []);
        const industry = await fetch('data/industry_questions.json').then(r => r.json()).catch(() => []);
        
        const allQuestions = [...technical, ...behavioral, ...industry];
        
        if (allQuestions.length === 0) {
            console.error('No questions loaded. Check that data files exist.');
            alert('Error loading question bank. Please check that data files are present.');
        }
        
        return allQuestions;
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Failed to load interview questions. Please refresh the page.');
        return [];
    }
}

function updateQuestionDisplay() {
    const question = questions[currentIndex];
    
    document.getElementById('questionCategory').textContent = question.type.toUpperCase();
    document.getElementById('questionDifficulty').textContent = question.difficulty.toUpperCase();
    document.getElementById('questionDifficulty').className = `difficulty-badge ${question.difficulty}`;
    document.getElementById('questionText').textContent = question.question;
    
    tipsContent.innerHTML = formatTips(question.tips);
    tipsContent.style.display = 'none';
    showTipsBtn.textContent = '💡 Show Tips';
    
    userAnswer.value = userAnswers[currentIndex] || '';
    
    document.getElementById('currentQuestion').textContent = currentIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    
    const progress = ((currentIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.textContent = currentIndex === questions.length - 1 ? 'Finish' : 'Next →';
}

function formatTips(tips) {
    if (typeof tips === 'string') {
        return `<p>${tips}</p>`;
    } else if (Array.isArray(tips)) {
        return `<ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
    } else if (tips.approach) {
        let html = `<h4>Approach:</h4><p>${tips.approach}</p>`;
        if (tips.keyPoints) {
            html += `<h4>Key Points:</h4><ul>${tips.keyPoints.map(p => `<li>${p}</li>`).join('')}</ul>`;
        }
        if (tips.example) {
            html += `<h4>Example:</h4><p>${tips.example}</p>`;
        }
        return html;
    }
    return '<p>No tips available for this question.</p>';
}

function toggleTips() {
    if (tipsContent.style.display === 'none') {
        tipsContent.style.display = 'block';
        showTipsBtn.textContent = '🙈 Hide Tips';
    } else {
        tipsContent.style.display = 'none';
        showTipsBtn.textContent = '💡 Show Tips';
    }
}

function navigate(direction) {
    userAnswers[currentIndex] = userAnswer.value;
    
    currentIndex += direction;
    
    if (currentIndex >= questions.length) {
        if (confirm('You\'ve reached the end! Would you like to review your answers?')) {
            currentIndex = 0;
        } else {
            currentIndex = questions.length - 1;
        }
    }
    
    updateQuestionDisplay();
}

function saveAnswer() {
    userAnswers[currentIndex] = userAnswer.value;
    
    const saved = JSON.parse(localStorage.getItem('interviewAnswers') || '{}');
    const question = questions[currentIndex];
    saved[question.question] = userAnswer.value;
    localStorage.setItem('interviewAnswers', JSON.stringify(saved));
    
    saveAnswerBtn.textContent = '✓ Saved!';
    setTimeout(() => {
        saveAnswerBtn.textContent = '💾 Save';
    }, 2000);
}

function clearAnswer() {
    if (confirm('Are you sure you want to clear this answer?')) {
        userAnswer.value = '';
        userAnswers[currentIndex] = '';
    }
}

function restart() {
    questionsSection.style.display = 'none';
    questions = [];
    currentIndex = 0;
    userAnswers = {};
    document.querySelector('.config-section').scrollIntoView({ behavior: 'smooth' });
}

function exportQA() {
    let content = 'INTERVIEW PRACTICE Q&A\n';
    content += '=' + '='.repeat(50) + '\n\n';
    
    questions.forEach((q, i) => {
        content += `Question ${i + 1}: [${q.type.toUpperCase()}] [${q.difficulty.toUpperCase()}]\n`;
        content += `${q.question}\n\n`;
        
        if (userAnswers[i]) {
            content += `Your Answer:\n${userAnswers[i]}\n\n`;
        } else {
            content += `Your Answer: (Not answered)\n\n`;
        }
        
        content += '-'.repeat(60) + '\n\n';
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview_practice_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}
