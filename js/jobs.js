// Noventra Job Listings: sample data and client-side filtering.
const jobs = [
  {
    id: 1, title: "Frontend Developer", company: "TechNova Solutions",
    initial: "T", color: "#6542d2", location: "Chennai", type: "Full Time",
    experience: "2-3 Years", salary: 8, salaryLabel: "₹5 – 8 LPA",
    posted: "2 days ago", relevance: 1
  },
  {
    id: 2, title: "Full Stack Developer", company: "SunDrive Technologies",
    initial: "S", color: "#2875bd", location: "Bengaluru", type: "Full Time",
    experience: "2-3 Years", salary: 9, salaryLabel: "₹6 – 9 LPA",
    posted: "1 day ago", relevance: 2
  },
  {
    id: 3, title: "UI/UX Designer", company: "CreativeHive",
    initial: "C", color: "#a45bd4", location: "Hyderabad", type: "Full Time",
    experience: "2-4 Years", salary: 10, salaryLabel: "₹5 – 10 LPA",
    posted: "3 days ago", relevance: 3
  },
  {
    id: 4, title: "QA Engineer", company: "DeltaWorks",
    initial: "D", color: "#7255c7", location: "Bengaluru", type: "Full Time",
    experience: "1-3 Years", salary: 7, salaryLabel: "₹4 – 7 LPA",
    posted: "4 days ago", relevance: 4
  },
  {
    id: 5, title: "Python Developer", company: "CodeBridge Labs",
    initial: "P", color: "#319b89", location: "Chennai", type: "Remote",
    experience: "Fresher", salary: 5, salaryLabel: "₹3 – 5 LPA",
    posted: "5 days ago", relevance: 5
  },
  {
    id: 6, title: "Product Design Intern", company: "PixelCraft Studio",
    initial: "P", color: "#d18a42", location: "Remote", type: "Internship",
    experience: "Fresher", salary: 3, salaryLabel: "₹2 – 3 LPA",
    posted: "1 week ago", relevance: 6
  }
];

const jobList = document.getElementById("jobList");
const jobCount = document.getElementById("jobCount");
const emptyState = document.getElementById("emptyState");
const pagination = document.getElementById("pagination");
const sortJobs = document.getElementById("sortJobs");
const locationFilter = document.getElementById("locationFilter");
const filtersPanel = document.getElementById("filtersPanel");
const savedJobs = new Map(
  (JSON.parse(localStorage.getItem("noventraSavedJobs")) || [])
    .map(job => [job.id, job])
);
const jobsPerPage = 5;
let currentPage = 1;

function checkedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)]
    .map((input) => input.value);
}

function getFilteredJobs() {
  const selectedTypes = checkedValues("type");
  const selectedExperience = checkedValues("experience");
  const selectedLocations = checkedValues("location");
  const searchLocation = locationFilter.value.trim().toLowerCase();

  let filtered = jobs.filter((job) => {
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(job.type);
    const experienceMatch = selectedExperience.length === 0 ||
      selectedExperience.some((value) => {
        if (value === "1-2 Years") return job.experience.includes("1-") || job.experience.includes("2-");
        if (value === "3-5 Years") return job.experience.includes("3-") || job.experience.includes("4-") || job.experience.includes("5+");
        if (value === "5+ Years") return job.experience === "5+ Years";
        return job.experience === value;
      });
    const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(job.location);
    const searchMatch = !searchLocation || job.location.toLowerCase().includes(searchLocation);
    return typeMatch && experienceMatch && locationMatch && searchMatch;
  });

  switch (sortJobs.value) {
    case "salary-high": filtered.sort((a, b) => b.salary - a.salary); break;
    case "salary-low": filtered.sort((a, b) => a.salary - b.salary); break;
    case "company": filtered.sort((a, b) => a.company.localeCompare(b.company)); break;
    default: filtered.sort((a, b) => a.relevance - b.relevance);
  }
  return filtered;
}

function createJobCard(job) {
  const article = document.createElement("article");
  article.className = "job-card";
  article.innerHTML = `
    <div class="job-top">
      <div class="company-logo" style="--logo-color: ${job.color}" aria-hidden="true">${job.initial}</div>
      <div class="job-main">
        <h3>${job.title}</h3>
        <div class="company-name">${job.company}</div>
      </div>
      <button class="save-button ${savedJobs.has(job.id) ? "saved" : ""}"
        type="button" aria-label="${savedJobs.has(job.id) ? "Remove saved job" : "Save job"}"
        aria-pressed="${savedJobs.has(job.id)}" data-save-id="${job.id}">${savedJobs.has(job.id) ? "♥" : "♡"}</button>
    </div>
    <div class="job-meta">
      <span class="location">${job.location}, India</span>
      <span class="type">${job.type}</span>
      <span class="experience">${job.experience}</span>
    </div>
    <div class="job-bottom">
      <span class="salary">${job.salaryLabel}</span>
      <span class="posted">Posted ${job.posted}</span>
      
<a class="view-link" href="job-details.html?id=${job.id}" aria-label="View ${job.title} details">View Details →</a>

    </div>`;
  return article;
}

function renderJobs() {
  const filteredJobs = getFilteredJobs();
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * jobsPerPage;
  const visibleJobs = filteredJobs.slice(start, start + jobsPerPage);

  jobList.replaceChildren(...visibleJobs.map(createJobCard));
  jobCount.textContent = filteredJobs.length;
  emptyState.hidden = filteredJobs.length !== 0;
  jobList.hidden = filteredJobs.length === 0;
  pagination.hidden = filteredJobs.length <= jobsPerPage;
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pagination.replaceChildren();
  for (let page = 1; page <= totalPages; page += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `page-button ${page === currentPage ? "active" : ""}`;
    button.textContent = page;
    button.setAttribute("aria-label", `Page ${page}`);
    button.addEventListener("click", () => {
      currentPage = page;
      renderJobs();
    });
    pagination.append(button);
  }
}

document.querySelectorAll('.filters input[type="checkbox"]').forEach((input) => {
  input.addEventListener("change", () => {
    currentPage = 1;
    renderJobs();
  });
});

locationFilter.addEventListener("input", () => {
  currentPage = 1;
  renderJobs();
});

sortJobs.addEventListener("change", () => {
  currentPage = 1;
  renderJobs();
});

document.getElementById("clearFilters").addEventListener("click", clearFilters);
document.getElementById("resetSearch").addEventListener("click", clearFilters);

function clearFilters() {
  document.querySelectorAll('.filters input[type="checkbox"]').forEach((input) => {
    input.checked = false;
  });
  locationFilter.value = "";
  sortJobs.value = "relevant";
  currentPage = 1;
  renderJobs();
}

jobList.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save-id]");
  if (!saveButton) return;

  const jobId = Number(saveButton.dataset.saveId);

  if (savedJobs.has(jobId)) {
    savedJobs.delete(jobId);
  } else {
    const job = jobs.find(job => job.id === jobId);

    if (job) {
      savedJobs.set(jobId, job);
    }
  }

  // Store saved jobs
  localStorage.setItem(
    "noventraSavedJobs",
    JSON.stringify([...savedJobs.values()])
  );

  renderJobs();
});

document.getElementById("mobileFilterToggle").addEventListener("click", () => {
  const isOpen = filtersPanel.classList.toggle("show");
  document.getElementById("mobileFilterToggle").setAttribute("aria-expanded", String(isOpen));
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

renderJobs();

