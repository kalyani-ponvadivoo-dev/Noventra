
// Get saved and applied jobs from localStorage
const savedJobs = JSON.parse(localStorage.getItem("noventraSavedJobs")) || [];
const appliedJobs = JSON.parse(localStorage.getItem("noventraAppliedJobs")) || [];

// Get dashboard elements
const appliedCount = document.getElementById("appliedCount");
const savedCount = document.getElementById("savedCount");
const applicationsList = document.getElementById("applicationsList");
const savedJobsList = document.getElementById("savedJobsList");

// Display counts
appliedCount.textContent = appliedJobs.length;
savedCount.textContent = savedJobs.length;

// Display applied jobs
function displayApplications() {
    applicationsList.innerHTML = "";

    if (appliedJobs.length === 0) {
        applicationsList.innerHTML = `
            <tr>
                <td colspan="3">No applications yet.</td>
            </tr>
        `;
        return;
    }

    appliedJobs.forEach(function(job) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.company}</td>
            <td><span class="status review">Applied</span></td>
        `;

        applicationsList.appendChild(row);
    });
}

// Display saved jobs
function displaySavedJobs() {
    savedJobsList.innerHTML = "";

    if (savedJobs.length === 0) {
        savedJobsList.innerHTML = "<p>No saved jobs yet.</p>";
        return;
    }

    savedJobs.forEach(function(job) {
        const jobCard = document.createElement("div");
        jobCard.className = "job-card";

        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company}</p>
            <p>${job.location}</p>
        `;

        savedJobsList.appendChild(jobCard);
    });
}

// Run dashboard functions
displayApplications();
displaySavedJobs();
