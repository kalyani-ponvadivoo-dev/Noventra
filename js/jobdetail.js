
const saveJob = document.getElementById("saveJob");
const statusMessage = document.getElementById("job-action-status");

// Save Job functionality
saveJob.addEventListener("click", function() {
    const job = {
        id: 1,
        title: "Frontend Developer",
        company: "TechNova Solutions",
        location: "Chennai, India"
    };

    const savedJobs = JSON.parse(
        localStorage.getItem("noventraSavedJobs")
    ) || [];

    const alreadySaved = savedJobs.some(item => item.id === job.id);

    if (!alreadySaved) {
        savedJobs.push(job);
        localStorage.setItem(
            "noventraSavedJobs",
            JSON.stringify(savedJobs)
        );
    }

    statusMessage.textContent = alreadySaved
        ? "This job is already saved."
        : "Job saved successfully!";
});

// Application form elements
const applicationSection = document.getElementById("applicationSection");
const applicationForm = document.getElementById("applicationForm");

// Check login and show application form
const params = new URLSearchParams(window.location.search);
const loggedInUser = JSON.parse(
    localStorage.getItem("noventraLoggedInUser")
);

if (params.get("apply") === "1") {
    if (!loggedInUser) {
        window.location.href = "login.html?returnTo=job-details.html";
    } else {
        applicationSection.hidden = false;

        document.getElementById("applicantName").value = loggedInUser.name;
        document.getElementById("applicantEmail").value = loggedInUser.email;
    }
}

// Submit application
applicationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const application = {
        id: 1,
        title: "Frontend Developer",
        company: "TechNova Solutions",
        location: "Chennai, India",
        applicantName: document.getElementById("applicantName").value,
        applicantEmail: document.getElementById("applicantEmail").value,
        coverLetter: document.getElementById("coverLetter").value,
        status: "Applied"
    };

    const appliedJobs = JSON.parse(
        localStorage.getItem("noventraAppliedJobs")
    ) || [];

    const alreadyApplied = appliedJobs.some(
        job => job.id === application.id
    );

    if (alreadyApplied) {
        statusMessage.textContent = "You have already applied for this job.";
        return;
    }

    appliedJobs.push(application);

    localStorage.setItem(
        "noventraAppliedJobs",
        JSON.stringify(appliedJobs)
    );

    statusMessage.textContent = "Application submitted successfully!";
    applicationForm.reset();
    applicationSection.hidden = true;
});
