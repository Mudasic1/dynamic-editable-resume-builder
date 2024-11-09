const resumeForm = document.getElementById('resumeForm');
const updateResumeBtn = document.getElementById('updateResumeBtn');

const displayName = document.getElementById('displayName');
const displayTitle = document.getElementById('displayTitle');
const displayAbout = document.getElementById('displayAbout');
const displayExperience = document.getElementById('displayExperience');
const displaySkills = document.getElementById('displaySkills');

const toggleResumeBtn = document.getElementById('toggleResumeBtn');
const resume = document.getElementById('resume');
const downloadResumePdfBtn = document.getElementById('downloadResumePdfBtn');

// Update the resume when the user clicks the "Update Resume" button
updateResumeBtn.addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const about = document.getElementById('about').value;
    const experience = document.getElementById('experience').value.split(',');
    const skills = document.getElementById('skills').value.split(',');

    // Update the display fields
    displayName.textContent = name;
    displayTitle.textContent = title;
    displayAbout.textContent = about;

    // Update experience list
    displayExperience.innerHTML = '';
    experience.forEach(exp => {
        const li = document.createElement('li');
        li.textContent = exp.trim();
        displayExperience.appendChild(li);
    });

    // Update skills list
    displaySkills.innerHTML = '';
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill.trim();
        displaySkills.appendChild(li);
    });
});

// Toggle the resume visibility
toggleResumeBtn.addEventListener('click', function() {
    if (resume.style.display === 'none') {
        resume.style.display = 'block';
        toggleResumeBtn.textContent = 'Hide Resume';
    } else {
        resume.style.display = 'none';
        toggleResumeBtn.textContent = 'Show Resume';
    }
});

// Generate downloadable PDF
downloadResumePdfBtn.addEventListener('click', function() {
    const name = displayName.textContent;
    const title = displayTitle.textContent;
    const about = displayAbout.textContent;
    const experiences = Array.from(displayExperience.getElementsByTagName('li'))
        .map(li => li.textContent)
        .join('\n');
    const skills = Array.from(displaySkills.getElementsByTagName('li'))
        .map(li => li.textContent)
        .join('\n');

    // Load jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add content to PDF
    pdf.setFontSize(16);
    pdf.text(name, 10, 10);
    pdf.setFontSize(12);
    pdf.text(`Title: ${title}`, 10, 20);
    pdf.text("About:", 10, 30);
    pdf.setFontSize(10);
    pdf.text(about, 10, 40);

    pdf.setFontSize(12);
    pdf.text("Experience:", 10, 60);
    pdf.setFontSize(10);
    pdf.text(experiences, 10, 70);

    pdf.setFontSize(12);
    pdf.text("Skills:", 10, 90);
    pdf.setFontSize(10);
    pdf.text(skills, 10, 100);

    // Download the PDF
    pdf.save('resume.pdf');
});
