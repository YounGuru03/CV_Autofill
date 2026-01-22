let jobs = JSON.parse(localStorage.getItem('jobApplications') || '[]');

const addJobBtn = document.getElementById('addJobBtn');
const addJobModal = document.getElementById('addJobModal');
const addJobForm = document.getElementById('addJobForm');
const closeModal = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');
const statusFilter = document.getElementById('statusFilter');
const searchInput = document.getElementById('searchInput');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');

addJobBtn.addEventListener('click', () => addJobModal.style.display = 'flex');
closeModal.addEventListener('click', () => addJobModal.style.display = 'none');
cancelBtn.addEventListener('click', () => addJobModal.style.display = 'none');
addJobForm.addEventListener('submit', addJob);
statusFilter.addEventListener('change', renderJobs);
searchInput.addEventListener('input', renderJobs);
exportBtn.addEventListener('click', exportData);
clearBtn.addEventListener('click', clearAll);

window.addEventListener('click', (e) => {
    if (e.target === addJobModal) {
        addJobModal.style.display = 'none';
    }
});

function addJob(e) {
    e.preventDefault();
    
    const job = {
        id: Date.now(),
        company: document.getElementById('company').value,
        position: document.getElementById('position').value,
        location: document.getElementById('location').value || 'N/A',
        salary: document.getElementById('salary').value || 'N/A',
        status: document.getElementById('status').value,
        appliedDate: document.getElementById('appliedDate').value || new Date().toISOString().split('T')[0],
        jobUrl: document.getElementById('jobUrl').value || '',
        notes: document.getElementById('notes').value || ''
    };
    
    jobs.unshift(job);
    saveJobs();
    renderJobs();
    updateStats();
    addJobForm.reset();
    addJobModal.style.display = 'none';
}

function deleteJob(id) {
    if (confirm('Are you sure you want to delete this application?')) {
        jobs = jobs.filter(job => job.id !== id);
        saveJobs();
        renderJobs();
        updateStats();
    }
}

function editJob(id) {
    const job = jobs.find(j => j.id === id);
    if (!job) return;
    
    document.getElementById('company').value = job.company;
    document.getElementById('position').value = job.position;
    document.getElementById('location').value = job.location;
    document.getElementById('salary').value = job.salary;
    document.getElementById('status').value = job.status;
    document.getElementById('appliedDate').value = job.appliedDate;
    document.getElementById('jobUrl').value = job.jobUrl;
    document.getElementById('notes').value = job.notes;
    
    deleteJob(id);
    addJobModal.style.display = 'flex';
}

function saveJobs() {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
}

function renderJobs() {
    const container = document.getElementById('jobsTable');
    const statusFilterValue = statusFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    const filtered = jobs.filter(job => {
        const matchesStatus = statusFilterValue === 'all' || job.status === statusFilterValue;
        const matchesSearch = job.company.toLowerCase().includes(searchTerm) ||
                            job.position.toLowerCase().includes(searchTerm);
        return matchesStatus && matchesSearch;
    });
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state">No applications found. Click "+ Add Application" to get started!</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="job-row header">
            <div>Company</div>
            <div>Position</div>
            <div>Location</div>
            <div>Salary</div>
            <div>Status</div>
            <div>Applied</div>
            <div>Actions</div>
        </div>
        ${filtered.map(job => `
            <div class="job-row">
                <div><strong>${job.company}</strong></div>
                <div>${job.position}</div>
                <div>${job.location}</div>
                <div>${job.salary}</div>
                <div><span class="status-badge status-${job.status}">${job.status}</span></div>
                <div>${new Date(job.appliedDate).toLocaleDateString()}</div>
                <div class="actions-cell">
                    ${job.jobUrl ? `<a href="${job.jobUrl}" target="_blank" class="icon-btn" title="View Job">🔗</a>` : ''}
                    <button class="icon-btn" onclick="editJob(${job.id})" title="Edit">✏️</button>
                    <button class="icon-btn" onclick="deleteJob(${job.id})" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('')}
    `;
}

function updateStats() {
    const total = jobs.length;
    const interviews = jobs.filter(j => j.status === 'interview').length;
    const offers = jobs.filter(j => j.status === 'offer').length;
    const responses = jobs.filter(j => j.status !== 'applied').length;
    const responseRate = total > 0 ? Math.round((responses / total) * 100) : 0;
    
    document.getElementById('totalApps').textContent = total;
    document.getElementById('interviews').textContent = interviews;
    document.getElementById('offers').textContent = offers;
    document.getElementById('responseRate').textContent = responseRate + '%';
}

function exportData() {
    let csv = 'Company,Position,Location,Salary,Status,Applied Date,URL,Notes\n';
    jobs.forEach(job => {
        csv += `"${job.company}","${job.position}","${job.location}","${job.salary}","${job.status}","${job.appliedDate}","${job.jobUrl}","${job.notes}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job_applications_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function clearAll() {
    if (confirm('Are you sure you want to delete ALL applications? This cannot be undone.')) {
        jobs = [];
        saveJobs();
        renderJobs();
        updateStats();
    }
}

renderJobs();
updateStats();
