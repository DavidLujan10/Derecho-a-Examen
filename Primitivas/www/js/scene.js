(function () { //FLOUSURE: FUNCION ANONIMA QUE SE LLAMA A SI MISMA

    let scene = new THREE.Scene(); //Creacion de la esena
    const aspectRatio = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(85, aspectRatio, 0.1, 100); //Perspectiva de la camara
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    var controls = new THREE.TrackballControls(camera);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 10;
    controls.maxDistance = 75;
    controls.target.set( 0, 2.5, 0 );

    renderer.shadowMap.enabled = true;//DAR DE ALTA EL SERVICIO DE LAS SOBRAS PARA PODER USARLAS
    renderer.shadowMap.soft = true;//LA SOMBRA MAS SUAVE CON RESPECTO LA LUZ QUE ESTOY PROYECTANDO
    renderer.shadowMap.type = THREE.PCFShadowMap;//TIPO DE SOMBRA QUE VAMOS A USAR

    camera.position.z = 35; //PROFUNDIDAD CON LA QUE SE VIZUALISARA LA CAMARA
    camera.position.y = 5; //ALTURA DE LA CAMARA

    //Formas
    var piramideGeometria = new THREE.ConeGeometry(5, 10, 4, 1, false);
    var cuboGeometria = new THREE.BoxGeometry(2, 2, 2, 2);
    var donaGeometria = new THREE.TorusGeometry(3, 2, 16, 100);
    let planeGeometry = new THREE.PlaneGeometry(200, 900); //Creacion del plano y su tamano 
    planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2)); //Matrix de 4 ejes

    //Propiedades de las formas
    var piramide = new THREE.Mesh(piramideGeometria, color());
    var cubo = new THREE.Mesh(cuboGeometria, color());
    var dona = new THREE.Mesh(donaGeometria, color());
    let groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    let plane = new THREE.Mesh(planeGeometry, groundMaterial);

    //Sombra
    piramide.castShadow = true;
    cubo.castShadow = true;
    dona.castShadow = true;
    plane.receiveShadow = true;

    //Posicionamiento de las formas
    piramide.position.x = 20;
    piramide.position.y = 8;
    cubo.position.x = -20;
    cubo.position.y = 5;
    dona.position.y = 6;

    let puntoLuz = new THREE.PointLight(0xdfebff, .9);
    puntoLuz.position.set(50, 80, 20);
    puntoLuz.castShadow = true;

    scene.add(new THREE.AmbientLight('#DFFBFF'));

    scene.add(piramide);
    scene.add(cubo);
    scene.add(dona);
    scene.add(plane);
    scene.add(puntoLuz);

    function color() { //Funcion para el cambio de material con las formas
        var groundMaterialFormas = new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffff00
        });
        return groundMaterialFormas;
    }


    function loop() {
        controls.update(); //Actualizacion de los controles de camara
        requestAnimationFrame(loop);

        dona.rotation.x += 0.01;
        cubo.rotation.y += 0.01;
        piramide.rotation.z += 0.01;

        renderer.render(scene, camera);
    }
    loop();
})();