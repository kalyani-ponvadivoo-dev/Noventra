// Get currently logged-in user
const loggedInUser = JSON.parse(
    localStorage.getItem("noventraLoggedInUser")
);

// Display welcome message
document.getElementById("welcomeMessage").textContent =
    `Hello ${loggedInUser.name}! 👋`;

// Display profile details
document.getElementById("profileName").textContent =
    loggedInUser.name;

document.getElementById("profileEmail").textContent =
    loggedInUser.email;
// Get saved and applied jobs for the logged-in user
const savedJobsKey = `noventraSavedJobs_${loggedInUser.id}`;
const appliedJobsKey = `noventraAppliedJobs_${loggedInUser.id}`;

const savedJobs =
    JSON.parse(localStorage.getItem(savedJobsKey)) || [];

const appliedJobs =
    JSON.parse(localStorage.getItem(appliedJobsKey)) || [];

// Get dashboard elements
const appliedCount = document.getElementById("appliedCount");
const savedCount = document.getElementById("savedCount");
const applicationsList = document.getElementById("applicationsList");
const savedJobsList = document.getElementById("savedJobsList");

// Display counts
appliedCount.textContent = appliedJobs.length;
savedCount.textContent = savedJobs.length;
document.getElementById("availableJobsCount").textContent =
    jobs.length;

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

    appliedJobs.forEach(function (job) {
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

    savedJobs.forEach(function (job) {
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

// Display recommended jobs
function displayRecommendedJobs() {
    recommendedJobsList.innerHTML = "";

    // Exclude jobs the user has already applied for
    const recommendedJobs = jobs.filter(function (job) {
        return !appliedJobs.some(function (appliedJob) {
            return appliedJob.id === job.id;
        });
    });

    if (recommendedJobs.length === 0) {
        recommendedJobsList.innerHTML =
            "<p>No recommended jobs available.</p>";
        return;
    }

    recommendedJobs.forEach(function (job) {
        const jobCard = document.createElement("div");
        jobCard.className = "job-card";

        jobCard.innerHTML = `
            <div class="job-info">
                <h3>${job.title}</h3>
                <p>${job.company}</p>
                <p>📍 ${job.location}</p>
            </div>

            <a href="job-details.html?id=${job.id}">
                <button type="button">View Details</button>
            </a>
        `;

        recommendedJobsList.appendChild(jobCard);
    });
}


// Run dashboard functions
displayApplications();
displaySavedJobs();
displayRecommendedJobs();



// Sidebar active menu highlighting
const sidebarLinks = document.querySelectorAll(".sidebar-link");

sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function () {

        sidebarLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});

// Highlight when clicking a sidebar link
sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        updateActiveLink();
    });
});

// Highlight when URL hash changes
window.addEventListener("hashchange", updateActiveLink);

// Set initial active link
updateActiveLink();