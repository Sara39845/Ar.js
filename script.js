window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                lat: 40.730610, // Asegúrate de tener coordenadas reales
                lng: -73.935242,
            },
        },
    ];
}

var models = [
    {
        url: 'assets/magnemite/magnemite/scene.gltf',
        scale: "0.15 0.15 0.15", // Tamaño intermedio
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.15 0.15 0.15', // Mismo tamaño que Magnemite
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.15 0.15 0.15', // Mismo tamaño que Magnemite
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;

function setModel(model, entity) {
    entity.setAttribute('scale', model.scale);
    entity.setAttribute('rotation', model.rotation);
    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);
        model.setAttribute('animation-mixer', '');

        scene.appendChild(model);

        // Corregimos el evento del botón para cambiar modelos
        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            modelIndex = (modelIndex + 1) % models.length; // Ciclar entre modelos
            setModel(models[modelIndex], model);
        });
    });
}