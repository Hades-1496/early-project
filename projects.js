const API_URL =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

// 3. Función para pintar los datos
async function loadHomeProjects() {
  const response = await fetch(API_URL);
  const projects = await response.json();

  // Seleccionamos el contenedor donde están los artículos
  const container = document.querySelector("#projects");
  container.innerHTML = ""; // Limpieza de contenido.
  const containerMainProject = document.querySelector("#project-content");
  if (!containerMainProject) {
    // 3 proyectos, del cuarto al primero.
    const recentProjects = projects.slice(1, 4).reverse();

    recentProjects.forEach((project) => {
      container.innerHTML += `
            <article>
              <img src="${project.image}" alt="${project.name}" />
              <h3>${project.name}</h3>
              <p>${project.description}</p>
              <a href="project-detail.html?uuid=${project.uuid}">Learn more</a>
            </article>
        `;
    });
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("uuid"); // Obtenemos el ID de la URL
    const mainProject = projects.find((p) => p.uuid === projectId);
    containerMainProject.innerHTML = "";

    containerMainProject.innerHTML = `
        <img src="${mainProject.image}" alt="${mainProject.name}"
        <h1>${mainProject.name}</h1>
        <p id="completed_on">${mainProject.completed_on}</p>
        <p id="description" style="font-weight: bold;">${mainProject.content}</p>`;
    const remainingProjects = projects
      .filter((p) => p.uuid !== projectId)
      .reverse();
    remainingProjects.forEach((project) => {
      container.innerHTML += `
            <article>
              <img src="${project.image}" alt="${project.name}" />
              <h3>${project.name}</h3>
              <p>${project.description}</p>
              <a href="project-detail.html?uuid=${project.uuid}">Learn more</a>
            </article>
        `;
    });
  }
}

window.addEventListener("load", loadHomeProjects);
