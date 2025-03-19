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
                lat: 40.730610, 
                lng: -73.935242,
            },
        },
    ];
}

var models = [
    {
        url: './assets/magnemite/magnemite/scene.gltf',
        scale: '0.02 0.02 0.02', // Más pequeño
        position: '0 0 -5', // Alejado de la cámara
        rotation: '0 180 0',
        info: 'Magnemite, Lv. 5, HP 10/10',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.02 0.02 0.02', // Más pequeño
        position: '0 0 -5',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.02 0.02 0.02', // Más pequeño
        position: '0 0 -5',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var currentModel = null;

function setModel(model, scene) {
    if (currentModel) {
        scene.removeChild(currentModel);
    }

    let entity = document.createElement('a-entity');
    entity.setAttribute('scale', model.scale);
    entity.setAttribute('position', model.position);
    entity.setAttribute('rotation', model.rotation);
    entity.setAttribute('gltf-model', model.url);
    entity.setAttribute('gps-entity-place', `latitude: 40.730610; longitude: -73.935242;`);
    entity.setAttribute('animation-mixer', '');

    scene.appendChild(entity);
    currentModel = entity;

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach(() => {
        setModel(models[modelIndex], scene);

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            modelIndex = (modelIndex + 1) % models.length;
            setModel(models[modelIndex], scene);
        });
    });
}
