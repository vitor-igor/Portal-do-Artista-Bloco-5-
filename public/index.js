document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const filterArea = document.getElementById('filterArea');
    const postList = document.getElementById('postList');

    // Fetch data from the server
    fetch('/posts')
        .then(response => response.json())
        .then(data => {
            renderPosts(data);  

            // Event listener for the search bar
            searchBar.addEventListener('keyup', () => {
                filterAndRenderPosts(data);
            });

            // Event listener for the area filter
            filterArea.addEventListener('change', () => {
                filterAndRenderPosts(data);
            });

            function filterAndRenderPosts(posts) {
                const searchTerm = searchBar.value.toLowerCase();
                const selectedArea = filterArea.value;  // Agora filtramos pela área

                const filteredPosts = posts.filter(post => {
                    const matchesSearch = post.title.toLowerCase().includes(searchTerm);
                    const matchesArea = selectedArea === 'all' || post.area.includes(selectedArea); // Verifica se a área corresponde
                    return matchesSearch && matchesArea;
                });

                renderPosts(filteredPosts);
            }
        });

    // Function to render posts to the page
    function renderPosts(posts) {
        postList.innerHTML = '';  // Clear the list first
        if (posts.length === 0) {
            postList.innerHTML = '<p style="color: white">Não conseguimos encontrar nenhum projeto com este nome.</p>';
            return;
        }
        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'card';

            // If image_url is null, use a default image
            const imageUrl = post.image_url ? post.image_url : './assets/img/default.jpg';

            card.innerHTML = `
                <img src="${imageUrl}" class="card-img-top" alt="${post.title}">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text-2">Área de atuação: ${post.area}</p>
                    <a href="./anuncio.html?id=${post.id}" class="btn-ultra-voilet">Acessar</a>
                </div>
            `;

            postList.appendChild(card);
        });
    }
});