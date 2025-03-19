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
                lat: 40.730610, // Asegúrate de tener coordenadas reales
                lng: -73.935242,
            },
        },
    ];
}

var models = [
    {
        url: 'assets/magnemite/magnemite/scene.gltf',
        scale: "0.1 0.1 0.1", // Tamaño intermedio
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.1 0.1 0.1', // Tamaño intermedio
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.1 0.1 0.1', // Tamaño intermedio
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var currentModel = null; // Guardar el modelo actual para eliminarlo después

function setModel(model, scene) {
    // Si ya hay un modelo visible, lo eliminamos antes de agregar el nuevo
    if (currentModel) {
        scene.removeChild(currentModel);
    }

    let entity = document.createElement('a-entity');
    entity.setAttribute('scale', model.scale);
    entity.setAttribute('rotation', model.rotation);
    entity.setAttribute('gltf-model', model.url);
    entity.setAttribute('gps-entity-place', `latitude: 40.730610; longitude: -73.935242;`);
    entity.setAttribute('animation-mixer', '');

    scene.appendChild(entity);
    currentModel = entity; // Guardamos el modelo actual para futuras eliminaciones

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach(() => {
        setModel(models[modelIndex], scene);

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            modelIndex = (modelIndex + 1) % models.length; // Cambiar al siguiente modelo
            setModel(models[modelIndex], scene);
        });
    });
}
