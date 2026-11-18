
const saveJob = document.getElementById("saveJob");
const statusMessage = document.getElementById("job-action-status");

const applicationSection = document.getElementById("applicationSection");
const applicationForm = document.getElementById("applicationForm");

const params = new URLSearchParams(window.location.search);
const selectedId = Number(params.get("id")) || 1;

// Job details
const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "TechNova Solutions",
        location: "Chennai, India",
        type: "Full Time",
        mode: "Hybrid",
        experience: "2-3 years",
        salary: "₹5-8 LPA",
        employees: "201-500 employees",
        deadline: "Dec 15, 2026",
        description: "We are looking for a passionate Frontend Developer to build user-friendly, responsive web applications.",
        responsibilities: [
            "Develop responsive and accessible web applications.",
            "Write clean code using HTML, CSS, and JavaScript.",
            "Collaborate with designers and backend developers."
        ],
        requirements: [
            "2+ years of frontend development experience.",
            "Strong knowledge of HTML, CSS, and JavaScript.",
            "React knowledge is an advantage."
        ],
        about: "TechNova Solutions builds digital products for global clients.",
        website: "https://www.technova.com"
    },
    {
        id: 2,
        title: "Full Stack Developer",
        company: "SunDrive Technologies",
        location: "Bengaluru, India",
        type: "Full Time",
        mode: "On-site",
        experience: "2-3 years",
        salary: "₹6-9 LPA",
        employees: "Information not provided",
        deadline: "Not specified",
        description: "Build and maintain web applications across frontend and backend.",
        responsibilities: [
            "Develop frontend pages and backend services.",
            "Integrate APIs and databases.",
            "Test and maintain web applications."
        ],
        requirements: [
            "Knowledge of HTML, CSS, and JavaScript.",
            "Understanding of backend development.",
            "Good problem-solving skills."
        ],
        about: "SunDrive Technologies develops software solutions.",
        website: ""
    },
    {
        id: 3,
        title: "UI/UX Designer",
        company: "CreativeHive",
        location: "Hyderabad, India",
        type: "Full Time",
        mode: "On-site",
        experience: "2-4 years",
        salary: "₹5-10 LPA",
        employees: "Information not provided",
        deadline: "Not specified",
        description: "Design intuitive and engaging digital experiences.",
        responsibilities: [
            "Create wireframes and prototypes.",
            "Design user-friendly interfaces.",
            "Collaborate with developers and product teams."
        ],
        requirements: [
            "Knowledge of UI/UX design principles.",
            "Experience with design tools.",
            "A portfolio of design work."
        ],
        about: "CreativeHive focuses on creative digital experiences.",
        website: ""
    },
    {
        id: 4,
        title: "QA Engineer",
        company: "DeltaWorks",
        location: "Bengaluru, India",
        type: "Full Time",
        mode: "On-site",
        experience: "1-3 years",
        salary: "₹4-7 LPA",
        employees: "Information not provided",
        deadline: "Not specified",
        description: "Help ensure the quality and reliability of software applications.",
        responsibilities: [
            "Create and execute test cases.",
            "Identify and report bugs.",
            "Work with developers to resolve defects."
        ],
        requirements: [
            "Understanding of software testing.",
            "Attention to detail.",
            "Knowledge of manual testing."
        ],
        about: "DeltaWorks works on software and quality-focused solutions.",
        website: ""
    },
    {
        id: 5,
        title: "Python Developer",
        company: "CodeBridge Labs",
        location: "Chennai, India",
        type: "Full Time",
        mode: "Remote",
        experience: "Fresher",
        salary: "₹3-5 LPA",
        employees: "Information not provided",
        deadline: "Not specified",
        description: "Help build and maintain applications using Python.",
        responsibilities: [
            "Write and maintain Python code.",
            "Debug and test applications.",
            "Collaborate with the development team."
        ],
        requirements: [
            "Basic Python programming knowledge.",
            "Understanding of programming fundamentals.",
            "Willingness to learn."
        ],
        about: "CodeBridge Labs builds software solutions.",
        website: ""
    },
    {
        id: 6,
        title: "Product Design Intern",
        company: "PixelCraft Studio",
        location: "Remote",
        type: "Internship",
        mode: "Remote",
        experience: "Fresher",
        salary: "₹2-3 LPA",
        employees: "Information not provided",
        deadline: "Not specified",
        description: "Assist in designing useful and engaging digital products.",
        responsibilities: [
            "Assist with wireframes and prototypes.",
            "Support UI design tasks.",
            "Participate in design reviews."
        ],
        requirements: [
            "Interest in UI/UX design.",
            "Basic knowledge of design tools.",
            "Creative thinking and willingness to learn."
        ],
        about: "PixelCraft Studio focuses on digital product design.",
        website: ""
    }
];

const job = jobs.find(item => item.id === selectedId);

// Helper function
function getStoredArray(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// Display job details
function displayJobDetails() {
    if (!job) {
        document.querySelector(".job-layout").innerHTML =
            "<p>Job not found. <a href='jobs.html'>Browse jobs</a></p>";
        return;
    }

    document.getElementById("job-title").textContent = job.title;
    document.getElementById("companyName").textContent = job.company;
    document.getElementById("companyLogo").textContent =
        job.company.charAt(0);
    document.getElementById("breadcrumbTitle").textContent = job.title;

    document.getElementById("jobLocation").textContent = job.location;
    document.getElementById("jobType").textContent = job.type;
    document.getElementById("jobMode").textContent = job.mode;
    document.getElementById("jobExperience").textContent = job.experience;
    document.getElementById("jobSalary").textContent = job.salary;

    document.getElementById("jobDescription").textContent = job.description;

    document.getElementById("companySubtitle").textContent =
        `Information Technology · ${job.employees}`;
    document.getElementById("companyDescription").textContent = job.about;
    document.getElementById("companyEmployees").textContent = job.employees;
    document.getElementById("companyLocation").textContent = job.location;

    const website = document.getElementById("companyWebsite");

    if (job.website) {
        website.href = job.website;
        website.textContent = job.website.replace(/^https?:\/\//, "");
        website.hidden = false;
    } else {
        website.hidden = true;
    }

    document.getElementById("infoExperience").textContent = job.experience;
    document.getElementById("infoEmployment").textContent = job.type;
    document.getElementById("infoWorkMode").textContent = job.mode;
    document.getElementById("infoLocation").textContent = job.location;
    document.getElementById("infoSalary").textContent = job.salary;
    document.getElementById("infoDeadline").textContent = job.deadline;

    const responsibilities = document.getElementById("jobResponsibilities");
    responsibilities.replaceChildren();

    job.responsibilities.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        responsibilities.appendChild(li);
    });

    const requirements = document.getElementById("jobRequirements");
    requirements.replaceChildren();

    job.requirements.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        requirements.appendChild(li);
    });

    document.title = `${job.title} | Noventra`;
    updateSaveButton();
}

// Save / unsave job
function updateSaveButton() {
    if (!job || !saveJob) return;

    const savedJobs = getStoredArray("noventraSavedJobs");
    const alreadySaved = savedJobs.some(item => item.id === job.id);

    saveJob.textContent = alreadySaved ? "Saved ✓" : "Save job";
}

if (saveJob) {
    saveJob.addEventListener("click", function() {
        if (!job) return;

        let savedJobs = getStoredArray("noventraSavedJobs");
        const alreadySaved = savedJobs.some(item => item.id === job.id);

        if (alreadySaved) {
            savedJobs = savedJobs.filter(item => item.id !== job.id);
            statusMessage.textContent = "Job removed from saved jobs.";
        } else {
            savedJobs.push({
                id: job.id,
                title: job.title,
                company: job.company,
                location: job.location,
                salary: job.salary
            });

            statusMessage.textContent = "Job saved successfully!";
        }

        localStorage.setItem("noventraSavedJobs", JSON.stringify(savedJobs));
        updateSaveButton();
    });
}

// Share job, if the Share button exists
const shareJob = document.getElementById("shareJob");

if (shareJob) {
    shareJob.addEventListener("click", async function() {
        if (!job) return;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: job.title,
                    text: `${job.title} at ${job.company}`,
                    url: window.location.href
                });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(window.location.href);
                statusMessage.textContent = "Job link copied!";
            } else {
                statusMessage.textContent =
                    "Copy the job URL from your browser address bar.";
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                statusMessage.textContent = "Unable to share this job.";
            }
        }
    });
}

// Check login and show application form
function showApplicationForm() {
    if (!job || !applicationSection) return;

    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
        const returnTo =
            `job-details.html?id=${job.id}&apply=1`;

        window.location.href =
            `login.html?returnTo=${encodeURIComponent(returnTo)}`;
        return;
    }

    applicationSection.hidden = false;

    document.getElementById("applicantName").value =
        loggedInUser.name || "";

    document.getElementById("applicantEmail").value =
        loggedInUser.email || "";

    applicationSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function getLoggedInUser() {
    try {
        return JSON.parse(localStorage.getItem("noventraLoggedInUser"));
    } catch {
        return null;
    }
}

// Apply Now button
const applyNow = document.getElementById("applyNow");

if (applyNow) {
    applyNow.addEventListener("click", function(event) {
        event.preventDefault();
        showApplicationForm();
    });
}

// Handle return from login page
if (params.get("apply") === "1") {
    showApplicationForm();
}

// Submit application
if (applicationForm) {
    applicationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!job) return;

        const loggedInUser = getLoggedInUser();

        if (!loggedInUser) {
            showApplicationForm();
            return;
        }

        const application = {
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            applicantName: document.getElementById("applicantName").value.trim(),
            applicantEmail: document.getElementById("applicantEmail").value.trim(),
            coverLetter: document.getElementById("coverLetter").value.trim(),
            status: "Applied",
            appliedAt: new Date().toISOString()
        };

        if (!application.applicantName || !application.applicantEmail) {
            statusMessage.textContent = "Please enter your name and email.";
            return;
        }

        const appliedJobs = getStoredArray("noventraAppliedJobs");

        const alreadyApplied = appliedJobs.some(
            item =>
                item.id === application.id &&
                item.applicantEmail.toLowerCase() ===
                    application.applicantEmail.toLowerCase()
        );

        if (alreadyApplied) {
            statusMessage.textContent =
                "You have already applied for this job.";
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
}

// Initialize page
displayJobDetails();
