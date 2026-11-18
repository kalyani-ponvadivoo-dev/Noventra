
// =====================================
// 1. GET LOGGED-IN USER
// =====================================

const loggedInUser = JSON.parse(
    localStorage.getItem("noventraLoggedInUser")
);


// =====================================
// 2. GET SELECTED JOB FROM URL
// =====================================

const params = new URLSearchParams(window.location.search);
const jobId = Number(params.get("id"));

const selectedJob = jobs.find(job => job.id === jobId);


// =====================================
// 3. GET HTML ELEMENTS
// =====================================

const saveJob = document.getElementById("saveJob");

const statusMessage =
    document.getElementById("job-action-status");

const applicationSection =
    document.getElementById("applicationSection");

const applicationForm =
    document.getElementById("applicationForm");

const applyButton =
    document.getElementById("applyJob");


// =====================================
// 4. CHECK WHETHER JOB EXISTS
// =====================================

if (!selectedJob) {

    document.querySelector(".job-main-card").textContent =
        "Job not found. Please return to the job listings.";

} else {

    // =====================================
    // 5. DISPLAY BASIC JOB DETAILS
    // =====================================

    const displayLocation =
        selectedJob.location === "Remote"
            ? "Remote"
            : selectedJob.location + ", India";

    document.getElementById("jobTitle").textContent =
        selectedJob.title;

    document.getElementById("companyName").textContent =
        selectedJob.company;

    document.getElementById("companyInitial").textContent =
        selectedJob.initial;

    document.getElementById("companyInitial").style.setProperty(
        "--logo-color",
        selectedJob.color
    );

    document.getElementById("jobLocation").textContent =
        displayLocation;

    document.getElementById("jobType").textContent =
        selectedJob.type;

    document.getElementById("jobExperience").textContent =
        selectedJob.experience;

    document.getElementById("jobSalary").textContent =
        selectedJob.salaryLabel;


    // =====================================
    // 6. DISPLAY JOB DESCRIPTION
    // =====================================

    document.getElementById("jobDescription").textContent =
        selectedJob.description;


    // =====================================
    // 7. DISPLAY RESPONSIBILITIES
    // =====================================

    const responsibilitiesList =
        document.getElementById("jobResponsibilities");

    responsibilitiesList.replaceChildren();

    selectedJob.responsibilities.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        responsibilitiesList.appendChild(li);

    });


    // =====================================
    // 8. DISPLAY REQUIREMENTS
    // =====================================

    const requirementsList =
        document.getElementById("jobRequirements");

    requirementsList.replaceChildren();

    selectedJob.requirements.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        requirementsList.appendChild(li);

    });


    // =====================================
    // 9. DISPLAY COMPANY INFORMATION
    // =====================================

    document.getElementById("companyDescription").textContent =
        selectedJob.companyDescription;

    document.getElementById("companySize").textContent =
        selectedJob.companySize;

    document.getElementById("companyLocation").textContent =
        selectedJob.companyLocation;


    // =====================================
    // 10. DISPLAY SIDEBAR INFORMATION
    // =====================================

    document.getElementById("sidebarExperience").textContent =
        selectedJob.experience;

    document.getElementById("sidebarEmployment").textContent =
        selectedJob.type;

    document.getElementById("sidebarWorkMode").textContent =
        selectedJob.workMode;

    document.getElementById("sidebarLocation").textContent =
    displayLocation;

    document.getElementById("sidebarSalary").textContent =
        selectedJob.salaryLabel;

    document.getElementById("sidebarDeadline").textContent =
        selectedJob.applyBefore;


    // =====================================
    // 11. SAVE JOB FUNCTIONALITY
    // =====================================

    saveJob.addEventListener("click", function () {

        if (!loggedInUser) {

            alert("Please login to save jobs.");

            window.location.href = "login.html";

            return;
        }

        const savedJobsKey =
            `noventraSavedJobs_${loggedInUser.id}`;

        const savedJobs = JSON.parse(
            localStorage.getItem(savedJobsKey)
        ) || [];

        const alreadySaved = savedJobs.some(
            item => item.id === selectedJob.id
        );

        if (alreadySaved) {

            statusMessage.textContent =
                "This job is already saved.";

        } else {

            savedJobs.push(selectedJob);

            localStorage.setItem(
                savedJobsKey,
                JSON.stringify(savedJobs)
            );

            statusMessage.textContent =
                "Job saved successfully!";
        }

    });


    // =====================================
    // 12. APPLY BUTTON FUNCTIONALITY
    // =====================================

    applyButton.addEventListener("click", function (event) {

        event.preventDefault();

        const returnUrl =
            `job-details.html?id=${selectedJob.id}&apply=1`;

        if (!loggedInUser) {

            window.location.href =
                `login.html?returnTo=${encodeURIComponent(returnUrl)}`;

            return;
        }

        window.location.href = returnUrl;

    });


    // =====================================
    // 13. DISPLAY APPLICATION FORM
    // =====================================

    if (params.get("apply") === "1") {

        if (!loggedInUser) {

            window.location.href =
                `login.html?returnTo=${encodeURIComponent(window.location.href)}`;

        } else {

            applicationSection.hidden = false;

            document.getElementById("applicantName").value =
                loggedInUser.name;

            document.getElementById("applicantEmail").value =
                loggedInUser.email;
        }

    }


    // =====================================
    // 14. SUBMIT APPLICATION
    // =====================================

    applicationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!loggedInUser) {

            alert("Please login to apply for jobs.");

            window.location.href = "login.html";

            return;
        }

        const application = {

            id: selectedJob.id,

            title: selectedJob.title,

            company: selectedJob.company,

            location: displayLocation,

            applicantName:
                document.getElementById("applicantName").value,

            applicantEmail:
                document.getElementById("applicantEmail").value,

            coverLetter:
                document.getElementById("coverLetter").value,

            status: "Applied"
        };


        const appliedJobsKey =
            `noventraAppliedJobs_${loggedInUser.id}`;

        const appliedJobs = JSON.parse(
            localStorage.getItem(appliedJobsKey)
        ) || [];


        const alreadyApplied = appliedJobs.some(
            job => job.id === application.id
        );


        if (alreadyApplied) {

            statusMessage.textContent =
                "You have already applied for this job.";

            return;
        }


        appliedJobs.push(application);

        localStorage.setItem(
            appliedJobsKey,
            JSON.stringify(appliedJobs)
        );


        statusMessage.textContent =
            "Application submitted successfully!";

        applicationForm.reset();

        applicationSection.hidden = true;

    });

}
