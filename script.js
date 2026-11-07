// Fictional sample data. Replace these entries with verified opportunities
// before using this project as a real job board.
const jobs = [
  { title: "Junior Sales Executive", company: "Northstar Demo Co.", location: "Jaipur", category: "Sales", type: "Full-time", salary: "₹15,000–₹20,000", description: "Support customer enquiries, maintain follow-ups and help the sales team reach its goals." },
  { title: "Graphic Design Intern", company: "Pixel Grove Demo", location: "Remote", category: "Design", type: "Internship", salary: "₹8,000–₹12,000", description: "Create social media graphics and simple marketing layouts while learning a design workflow." },
  { title: "Customer Support Associate", company: "Bright Desk Demo", location: "Jaipur", category: "Support", type: "Full-time", salary: "₹14,000–₹18,000", description: "Help customers with product questions through email and chat. Clear written communication is useful." },
  { title: "Frontend Developer Trainee", company: "Code Meadow Demo", location: "Remote", category: "Technology", type: "Trainee", salary: "₹10,000–₹16,000", description: "Learn to build accessible web pages using HTML, CSS and JavaScript with guidance from a team." },
  { title: "Marketing Coordinator", company: "Amber Leaf Demo", location: "Delhi", category: "Marketing", type: "Full-time", salary: "₹18,000–₹24,000", description: "Assist with campaign schedules, content coordination and basic performance reporting." },
  { title: "Office Administrator", company: "Cedar Works Demo", location: "Jaipur", category: "Administration", type: "Full-time", salary: "₹13,000–₹17,000", description: "Organise records, coordinate routine office tasks and support day-to-day operations." }
];

const searchInput = document.querySelector("#searchInput");
const locationFilter = document.querySelector("#locationFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const jobList = document.querySelector("#jobList");
const resultCount = document.querySelector("#resultCount");

function populateFilter(select, values) {
  values.sort().forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

populateFilter(locationFilter, [...new Set(jobs.map(job => job.location))]);
populateFilter(categoryFilter, [...new Set(jobs.map(job => job.category))]);

function renderJobs() {
  const query = searchInput.value.trim().toLowerCase();
  const location = locationFilter.value;
  const category = categoryFilter.value;

  const filtered = jobs.filter(job => {
    const searchable = `${job.title} ${job.company} ${job.location} ${job.category} ${job.description}`.toLowerCase();
    return searchable.includes(query) &&
      (!location || job.location === location) &&
      (!category || job.category === category);
  });

  resultCount.textContent = `${filtered.length} of ${jobs.length} sample jobs`;
  jobList.replaceChildren();

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No matching jobs. Try changing your search or filters.";
    jobList.append(empty);
    return;
  }

  filtered.forEach(job => {
    const card = document.createElement("article");
    card.className = "job-card";

    const top = document.createElement("div");
    top.className = "card-top";
    const headingWrap = document.createElement("div");
    const company = document.createElement("p");
    company.className = "company";
    company.textContent = job.company;
    const title = document.createElement("h3");
    title.textContent = job.title;
    headingWrap.append(company, title);

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = job.category;
    top.append(headingWrap, tag);

    const meta = document.createElement("div");
    meta.className = "meta";
    [job.location, job.type, job.salary].forEach(value => {
      const item = document.createElement("span");
      item.textContent = value;
      meta.append(item);
    });

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = job.description;
    card.append(top, meta, description);
    jobList.append(card);
  });
}

[searchInput, locationFilter, categoryFilter].forEach(control => {
  control.addEventListener("input", renderJobs);
  control.addEventListener("change", renderJobs);
});

document.querySelector("#clearFilters").addEventListener("click", () => {
  searchInput.value = "";
  locationFilter.value = "";
  categoryFilter.value = "";
  renderJobs();
});

renderJobs();
