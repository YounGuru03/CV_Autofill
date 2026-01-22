const calculateBtn = document.getElementById('calculateBtn');
const resultsSection = document.getElementById('results');
const negotiationSection = document.getElementById('negotiation');
const copyEmailBtn = document.getElementById('copyEmailBtn');

calculateBtn.addEventListener('click', calculateSalary);
copyEmailBtn.addEventListener('click', copyEmail);

function calculateSalary() {
    const jobTitle = document.getElementById('jobTitle').value;
    const experience = parseInt(document.getElementById('experience').value);
    const location = document.getElementById('location').value;
    const education = document.getElementById('education').value;
    const companySize = document.getElementById('companySize').value;
    
    if (!jobTitle) {
        alert('Please enter a job title');
        return;
    }
    
    const baseSalary = calculateBaseSalary(jobTitle, experience);
    const adjustedSalary = applyAdjustments(baseSalary, location, education, companySize);
    
    const p25 = Math.round(adjustedSalary * 0.85);
    const p50 = Math.round(adjustedSalary);
    const p75 = Math.round(adjustedSalary * 1.15);
    const min = Math.round(adjustedSalary * 0.75);
    const max = Math.round(adjustedSalary * 1.25);
    
    const bonus = Math.round(p50 * 0.15);
    const equity = calculateEquity(p50, companySize);
    const totalComp = p50 + bonus + equity;
    
    document.getElementById('minSalary').textContent = min.toLocaleString();
    document.getElementById('medianSalary').textContent = p50.toLocaleString();
    document.getElementById('maxSalary').textContent = max.toLocaleString();
    document.getElementById('p25').textContent = p25.toLocaleString();
    document.getElementById('p50').textContent = p50.toLocaleString();
    document.getElementById('p75').textContent = p75.toLocaleString();
    document.getElementById('baseSalary').textContent = '$' + p50.toLocaleString();
    document.getElementById('bonus').textContent = '$' + bonus.toLocaleString();
    document.getElementById('equity').textContent = '$' + equity.toLocaleString();
    document.getElementById('totalComp').textContent = '$' + totalComp.toLocaleString();
    
    generateEmailTemplate(jobTitle, p50, p75, totalComp);
    
    resultsSection.style.display = 'block';
    negotiationSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function calculateBaseSalary(jobTitle, experience) {
    const jobLower = jobTitle.toLowerCase();
    
    let base = 70000;
    
    if (jobLower.includes('software') || jobLower.includes('engineer')) {
        base = 80000;
    } else if (jobLower.includes('data') || jobLower.includes('scientist')) {
        base = 85000;
    } else if (jobLower.includes('product') || jobLower.includes('manager')) {
        base = 90000;
    } else if (jobLower.includes('designer')) {
        base = 70000;
    } else if (jobLower.includes('senior')) {
        base = 110000;
    } else if (jobLower.includes('lead') || jobLower.includes('principal')) {
        base = 140000;
    } else if (jobLower.includes('director')) {
        base = 180000;
    }
    
    const experienceBonus = Math.min(experience * 5000, 50000);
    
    return base + experienceBonus;
}

function applyAdjustments(salary, location, education, companySize) {
    let adjusted = salary;
    
    if (location === 'high') {
        adjusted *= 1.3;
    } else if (location === 'medium') {
        adjusted *= 1.0;
    } else {
        adjusted *= 0.85;
    }
    
    if (education === 'phd') {
        adjusted *= 1.15;
    } else if (education === 'masters') {
        adjusted *= 1.08;
    } else if (education === 'bootcamp') {
        adjusted *= 0.95;
    }
    
    if (companySize === 'large') {
        adjusted *= 1.1;
    } else if (companySize === 'startup') {
        adjusted *= 0.9;
    }
    
    return Math.round(adjusted);
}

function calculateEquity(baseSalary, companySize) {
    if (companySize === 'startup') {
        return Math.round(baseSalary * 0.3);
    } else if (companySize === 'small') {
        return Math.round(baseSalary * 0.15);
    } else if (companySize === 'medium') {
        return Math.round(baseSalary * 0.1);
    } else {
        return Math.round(baseSalary * 0.2);
    }
}

function generateEmailTemplate(jobTitle, median, p75, totalComp) {
    const template = `Subject: Re: ${jobTitle} Offer Discussion

Dear [Hiring Manager Name],

Thank you for extending the offer for the ${jobTitle} position. I'm very excited about the opportunity to join [Company Name] and contribute to [specific team/project].

After careful consideration and market research, I'd like to discuss the compensation package. Based on my experience, skills, and the market rate for this role in [location], I was hoping we could explore a base salary in the range of $${median.toLocaleString()} - $${p75.toLocaleString()}.

I'm confident that my [specific skill/experience] would bring immediate value to the team, particularly in [specific area mentioned in interviews].

I'm very interested in this position and would be happy to discuss this further. I'm flexible and open to finding a package that works for both of us.

Looking forward to your response.

Best regards,
[Your Name]`;

    document.getElementById('emailTemplate').value = template;
}

function copyEmail() {
    const template = document.getElementById('emailTemplate');
    template.select();
    navigator.clipboard.writeText(template.value)
        .then(() => {
            copyEmailBtn.textContent = '✓ Copied!';
            setTimeout(() => {
                copyEmailBtn.textContent = 'Copy Template';
            }, 2000);
        });
}
