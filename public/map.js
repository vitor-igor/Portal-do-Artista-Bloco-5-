// Inicializando o mapa
var map = L.map('map').setView([-7.11532, -34.861], 12);  // João Pessoa

// Adicionando camada do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Lista de marcadores inicial
var markers = [
    { lat: -7.1479, lng: -34.8171, title: "Centro de Convenções - JP" },
    { lat: -7.1289, lng: -34.8485, title: "Espaço Cultural José Lins do Rego" },
    { lat: -7.1194, lng: -34.8782, title: "Teatro Santa Roza" },
    { lat: -7.1487, lng: -34.8045, title: "Estação Cabo Branco – Ciência, Cultura e Artes" },
    { lat: 0.01369755, lng: -51.05978652241146, title: "Releitura de obras" },
];

// Função para buscar projetos colaborativos
async function fetchProjColab() {
    try {
        const response = await fetch('/proj/api/projColab');
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar dados do banco de dados:", error);
        return [];
    }
}

// Função para adicionar marcadores ao mapa
async function addMarkersToMap() {
    const projects = await fetchProjColab();
    console.log(projects); // Verifique os dados no console

    // Adicionando novos marcadores do banco de dados
    projects.forEach(project => {
        if (project.lat && project.lng) {
            markers.push({
                lat: project.lat,
                lng: project.lng,
                title: project.title
            });
        }
    });

    // Loop para adicionar marcadores no Leaflet
    markers.forEach(function(markerInfo) {
        L.marker([markerInfo.lat, markerInfo.lng]).addTo(map)
            .bindPopup(markerInfo.title);
    });
    
    const lista = document.getElementById("eventos")
    projects.forEach(project => {
     lista.innerHTML += `<p>${project.title}</p>`
    });
}

// Chame a função para adicionar os marcadores ao mapa
addMarkersToMap();