// scripts.js
const projects = [
  {
    title: "Project Alpha",
    tags: ["JavaScript", "React", "Node.js"],
    description: "A full-stack web application for project management, featuring a real-time collaborative editor and task tracking.",
    url: "#"
  },
  {
    title: "Project Beta",
    tags: ["Python", "Flask", "SQLAlchemy"],
    description: "A RESTful API for a social media platform, with a focus on performance and scalability.",
    url: "#"
  },
  {
    title: "Project Gamma",
    tags: ["HTML", "CSS", "JavaScript"],
    description: "A responsive and accessible front-end for a non-profit organization, designed to be easy to navigate for all users.",
    url: "#"
  }
];

function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;
  container.innerHTML = '';
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <h3>${project.title}</h3>
      <div class="project-tags">
        ${project.tags.map(tag => `<span>${tag}</span>`).join(' ')}
      </div>
      <p class="project-desc">${project.description}</p>
      <a href="${project.url}" target="_blank">View Project</a>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
});