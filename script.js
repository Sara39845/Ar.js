document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('button[data-action="change"]');
    if (button) {
        button.innerText = '﹖';
    }

    let places = staticLoadPlaces();
    renderPlaces(places);
});

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
        url: './assets/magnemite/scene.gltf',  // 🔹 Asegúrate de que la ruta es correcta
        scale: '0.05 0.05 0.05',  // 🔹 Aumentamos el tamaño
        position: '0 0 -5',
        rotation: '0 180 0',
        info: 'Magnemite, Lv. 5, HP 10/10',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.02 0.02 0.02',
        position: '0 0 -5',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.02 0.02 0.02',
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
    if (div) {
        div.innerText = model.info;
    }
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach(() => {
        setModel(models[modelIndex], scene);

        let button = document.querySelector('button[data-action="change"]');
        if (button) {
            button.addEventListener('click', function () {
                modelIndex = (modelIndex + 1) % models.length;
                setModel(models[modelIndex], scene);
            });
        }
    });
}
