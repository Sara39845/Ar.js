window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokémon',
            location: {
                lat: 41.892590,  // Reemplaza con tu latitud real
                lng: 12.489820,  // Reemplaza con tu longitud real
            },
        },
    ];
}

var models = [
    {
        url: './assets/magnemite/magnemite/scene.gltf',
        scale: '0.1 0.1 0.1',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;

function setModel(model, entity) {
    entity.setAttribute('gltf-model', model.url);
    entity.setAttribute('scale', model.scale);
    entity.setAttribute('rotation', model.rotation);
    
    const infoDiv = document.querySelector('.instructions');
    infoDiv.innerText = model.info;
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('animation-mixer', '');

        // Agregar el modelo correcto al inicio
        setModel(models[modelIndex], model);

        // Botón para cambiar modelos
        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            modelIndex = (modelIndex + 1) % models.length; // Cambia al siguiente modelo
            setModel(models[modelIndex], model);
        });

        scene.appendChild(model);
    });
}
