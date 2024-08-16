var map = L.map('map').setView([-7.11532, -34.861], 12);  // João Pessoa

        // Adicionando camada do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Adicionando marcadores
        var markers = [
            { lat: -7.1479, lng: -34.8171, title: "Centro de Convenções - JP" },
            { lat: -7.1289, lng: -34.8485, title: "Espaço Cultural José Lins do Rego" },
            { lat: -7.1194, lng: -34.8782, title: "Teatro Santa Roza" },
            { lat: -7.1487, lng: -34.8045, title: "Estação Cabo Branco – Ciência, Cultura e Artes" },
        ];

        // Loop para adicionar marcadores no Leaflet
        markers.forEach(function(markerInfo) {
            L.marker([markerInfo.lat, markerInfo.lng]).addTo(map)
                .bindPopup(markerInfo.title).openPopup();
        });