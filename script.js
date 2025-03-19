document.addEventListener('DOMContentLoaded', function () {
    var models = [
        {
            url: './assets/magnemite/scene.gltf',
            scale: '0.05 0.05 0.05', // Ajustamos tamaño
            position: '0 0 -3',
            rotation: '0 180 0',
            info: 'Magnemite, Lv. 5, HP 10/10',
        },
        {
            url: './assets/articuno/scene.gltf',
            scale: '0.05 0.05 0.05',
            position: '0 0 -3',
            rotation: '0 180 0',
            info: 'Articuno, Lv. 80, HP 100/100',
        },
        {
            url: './assets/dragonite/scene.gltf',
            scale: '0.05 0.05 0.05',
            position: '0 0 -3',
            rotation: '0 180 0',
            info: 'Dragonite, Lv. 99, HP 150/150',
        },
    ];

    let currentModelIndex = 0;

    const modelEntity = document.querySelector('#model');
    const infoText = document.querySelector('#info');
    const button = document.querySelector('button[data-action="change"]');

    function updateModel() {
        const model = models[currentModelIndex];

        modelEntity.setAttribute('gltf-model', model.url);
        modelEntity.setAttribute('position', model.position);
        modelEntity.setAttribute('rotation', model.rotation);
        modelEntity.setAttribute('scale', model.scale);
        infoText.innerText = model.info;
    }

    button.addEventListener('click', function () {
        currentModelIndex = (currentModelIndex + 1) % models.length;
        updateModel();
    });

    // Cargar el primer modelo al inicio
    updateModel();
});
