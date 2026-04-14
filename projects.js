const API_URL =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";
const emailInput = document.getElementById('email-input');
const btn = document.getElementById('btn-subscribe');

// Función para pintar los datos
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
    <h1>${mainProject.name}</h1>
    <div>
    
    <p>${mainProject.description}</p>
    <p>${mainProject.completed_on}</p>
    </div>
    <img src="${mainProject.image}" alt="${mainProject.name}"
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
              <a href="./pages/project-detail.html?uuid=${project.uuid}">Learn more</a>
            </article>
        `;
    });
  }
}
// Función para verificar el correo:
btn.addEventListener('click', (e) => {
  e.preventDefault();

  if (emailInput.checkValidity() && emailInput.value != "") {
    console.log(`¡Perfecto! El correo ${emailInput.value} es un correo válido`);
  } else if (!emailInput.checkValidity() && emailInput.value != ""){
    console.log(`${emailInput.value} no es un correo válido. Inténtalo de nuevo.`);
    emailInput.reportValidity();
  } else {
    console.log(`El campo está vacío. Inténtalo de nuevo.`);
    emailInput.reportValidity();
  }
});
window.addEventListener("load", loadHomeProjects);
