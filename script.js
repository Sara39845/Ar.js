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
                lat: 40.730610,
                lng: -73.935242,
            },
        },
    ];
}

var models = [
    {
        url: 'assets/magnemite/magnemite/scene.gltf',
        scale: "0.005 0.005 0.005",
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.005 0.005 0.005',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.005 0.005 0.005',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }
    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }
    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    // Agregamos el evento para asegurarnos de que el modelo cargó antes de cambiarlo
    entity.addEventListener('model-loaded', () => {
        console.log('Modelo cargado correctamente:', model.url);
    });

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);
        model.setAttribute('animation-mixer', '');

        // Modificamos el botón para ser pasivo y evitar bloqueos
        document.querySelector('button[data-action="change"]').addEventListener(
            'click',
            function () {
                var entity = document.querySelector('[gps-entity-place]');
                modelIndex++;
                var newIndex = modelIndex % models.length;
                setModel(models[newIndex], entity);
            },
            { passive: true } // Mejora el rendimiento en dispositivos móviles
        );

        scene.appendChild(model);
    });
}

