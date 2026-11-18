

const jobList = document.getElementById("jobList");
const jobCount = document.getElementById("jobCount");
const emptyState = document.getElementById("emptyState");
const pagination = document.getElementById("pagination");
const sortJobs = document.getElementById("sortJobs");
const locationFilter = document.getElementById("locationFilter");
const filtersPanel = document.getElementById("filtersPanel");
// Get the currently logged-in user
const loggedInUser = JSON.parse(
  localStorage.getItem("noventraLoggedInUser")
);

// Create a separate storage key for each user
const savedJobsKey = loggedInUser
  ? `noventraSavedJobs_${loggedInUser.id}`
  : null;

// Get saved jobs belonging to this user
const savedJobs = new Map(
  (JSON.parse(localStorage.getItem(savedJobsKey)) || [])
    .map(job => [job.id, job])
);
const jobsPerPage = 5;
let currentPage = 1;

function checkedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)]
    .map((input) => input.value);
}

// Read query from URL (sent from Home Page search bar)
const urlParams = new URLSearchParams(window.location.search);
let urlKeyword = (urlParams.get("keyword") || "").trim().toLowerCase();
let urlLocation = (urlParams.get("location") || "").trim().toLowerCase();
let urlCategory = (urlParams.get("category") || "").trim().toLowerCase();

// Pre-fill location search box or check location checkbox if passed from URL
if (urlLocation && locationFilter) {
  locationFilter.value = urlLocation;
  // Also auto-check the corresponding location checkbox if it exists
  document.querySelectorAll('input[name="location"]').forEach((input) => {
    const val = input.value.toLowerCase();
    if (val === urlLocation || (urlLocation.includes("bangalore") && val === "bengaluru")) {
      input.checked = true;
    }
  });
}

function getFilteredJobs() {
  const selectedTypes = checkedValues("type");
  const selectedExperience = checkedValues("experience");
  const selectedLocations = checkedValues("location");
  const searchLocation = locationFilter.value.trim().toLowerCase();

  // Split keyword into individual search words (e.g. "python chennai" -> ["python", "chennai"])
  const keywordWords = urlKeyword ? urlKeyword.split(/\s+/).filter(Boolean) : [];

  let filtered = jobs.filter((job) => {
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(job.type);
    
    const experienceMatch = selectedExperience.length === 0 ||
      selectedExperience.some((value) => {
        if (value === "1-2 Years") return job.experience.includes("1-") || job.experience.includes("2-");
        if (value === "3-5 Years") return job.experience.includes("3-") || job.experience.includes("4-") || job.experience.includes("5+");
        if (value === "5+ Years") return job.experience === "5+ Years";
        return job.experience === value;
      });

    // Check location from checkboxes or input
    const jobLoc = job.location.toLowerCase();
    const locFilterNormalized = searchLocation.replace("bangalore", "bengaluru");
    const locationMatch = selectedLocations.length === 0 || selectedLocations.some(l => {
      const normL = l.toLowerCase().replace("bangalore", "bengaluru");
      return normL === jobLoc;
    });
    const searchMatch = !searchLocation || jobLoc.includes(locFilterNormalized) || (locFilterNormalized.includes("bangalore") && jobLoc.includes("bengaluru"));

    // Smart Keyword Match:
    // Searches across title, company, location, and type!
    const fullJobText = `${job.title} ${job.company} ${job.location} ${job.type}`.toLowerCase();
    const keywordMatch = keywordWords.length === 0 || keywordWords.every((word) => {
      // Auto-correct common typos (e.g., "pyhton" -> "python", "bangalore" -> "bengaluru")
      const normalizedWord = word.replace("pyhton", "python").replace("bangalore", "bengaluru");
      return fullJobText.includes(normalizedWord);
    });

    // Category match
    let categoryMatch = true;
    if (urlCategory) {
      const isDesign = urlCategory === "design" && (fullJobText.includes("design") || fullJobText.includes("ui/ux"));
      const isIT = urlCategory === "it" && (fullJobText.includes("developer") || fullJobText.includes("engineer") || fullJobText.includes("tech") || fullJobText.includes("python"));
      categoryMatch = isDesign || isIT || fullJobText.includes(urlCategory);
    }

    // If a specific keyword was typed, don't let an accidental category mismatch hide the job
    const effectiveCategoryMatch = urlKeyword ? (categoryMatch || keywordMatch) : categoryMatch;

    return typeMatch && experienceMatch && locationMatch && searchMatch && keywordMatch && effectiveCategoryMatch;
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
      <a class="view-link" href="job-details.html?id=${job.id}" aria-label="View ${job.title} details"> View Details →</a>
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
  urlKeyword = "";
  urlCategory = "";
  if (window.history.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  currentPage = 1;
  renderJobs();
}

jobList.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save-id]");
  if (!saveButton) return;

  // Check whether user is logged in
  if (!loggedInUser) {
    alert("Please login to save jobs.");
    window.location.href = "login.html";
    return;
  }

  const jobId = Number(saveButton.dataset.saveId);

  if (savedJobs.has(jobId)) {
    savedJobs.delete(jobId);
  } else {
    const job = jobs.find(job => job.id === jobId);

    if (job) {
      savedJobs.set(jobId, job);
    }
  }

  // Save jobs using the logged-in user's ID
  localStorage.setItem(
    savedJobsKey,
    JSON.stringify([...savedJobs.values()])
  );

  renderJobs();
});

const mobileFilterBtn = document.getElementById("mobileFilterToggle");
if (mobileFilterBtn && filtersPanel) {
  mobileFilterBtn.addEventListener("click", () => {
    const isOpen = filtersPanel.classList.toggle("show");
    mobileFilterBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

// Mobile drawer navigation support for jobs.html
const menuico = document.getElementById("menuico");
const sidenav = document.getElementById("sidenav");
const closenav = document.getElementById("closenav");

if (menuico && sidenav) {
  menuico.addEventListener("click", () => {
    sidenav.style.left = "0";
  });
}
if (closenav && sidenav) {
  closenav.addEventListener("click", () => {
    sidenav.style.left = "-100%";
  });
}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

renderJobs();

