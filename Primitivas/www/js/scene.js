(function () { //FLOUSURE: FUNCION ANONIMA QUE SE LLAMA A SI MISMA

    let scene = new THREE.Scene(); //Creacion de la esena
    const aspectRatio = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(85, aspectRatio, 0.1, 100); //Perspectiva de la camara
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    var controls = new THREE.TrackballControls(camera);

    renderer.shadowMap.enabled = true;//DAR DE ALTA EL SERVICIO DE LAS SOBRAS PARA PODER USARLAS
    renderer.shadowMap.soft = true;//LA SOMBRA MAS SUAVE CON RESPECTO LA LUZ QUE ESTOY PROYECTANDO
    renderer.shadowMap.type = THREE.PCFShadowMap;//TIPO DE SOMBRA QUE VAMOS A USAR

    camera.position.z = 35; //PROFUNDIDAD CON LA QUE SE VIZUALISARA LA CAMARA
    camera.position.y = 5; //ALTURA DE LA CAMARA

    //Formas
    var piramideGeometria = new THREE.ConeGeometry(5, 10, 4, 1, false); // le modificamos a la figura para que tenga el aspecto a piramide
    var cuboGeometria = new THREE.BoxGeometry(6, 6, 6, 6);
    var donaGeometria = new THREE.TorusGeometry(4, 2, 16, 100);
    let planeGeometry = new THREE.PlaneGeometry(200, 900); //Creacion del plano y su tamano 
    planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2)); //Matrix de 4 ejes

    //Propiedades de las formas
    var piramide = new THREE.Mesh(piramideGeometria, color());
    var cubo = new THREE.Mesh(cuboGeometria, color());
    var dona = new THREE.Mesh(donaGeometria, color()); // puse esta figura para que se apreciara nas como una dona
    let groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    let plane = new THREE.Mesh(planeGeometry, groundMaterial);

    //Sombra
    piramide.castShadow = true;
    cubo.castShadow = true;
    dona.castShadow = true;
    plane.receiveShadow = true; //Le daremos al plane la propiedad de recibir la sombra

    //Posicionamiento de las formas
    piramide.position.x = 20;
    piramide.position.y = 8;
    cubo.position.x = -20;
    cubo.position.y = 5;
    dona.position.y = 6;


    //Luz
    let puntoLuz = new THREE.PointLight(0xdfebff, .9);
    let luzAmbiente = new THREE.AmbientLight('#DFFBFF'); //Luz de ambiente
    puntoLuz.position.set(50, 80, 20); //Definimos una posición para la luz
    puntoLuz.castShadow = true; //Agregamos true en castShadow por que es el que transmitirá la sombra

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    //Objetos a la escena
    scene.add(piramide);
    scene.add(cubo);
    scene.add(dona);
    scene.add(plane);
    
    //Cambiar de textura
    let changeTexture = 0;
    document.body.onkeypress = function(){ // Detecta si se preciona una tecla
        if(changeTexture % 2 == 0){// La funcion se inicializa que obtiene el mod para cambiar entre varias
                                    //texturas
            texture = new THREE.TextureLoader().load('img/Star.jpg');
        }else{
            texture = new THREE.TextureLoader().load('img/sun.jpg');
        }
        //Los materiales se alternan al precionar una tecla y se vuelve a cargar las primitivas
        dona.material = new THREE.MeshBasicMaterial({map:texture});
        piramide.material = new THREE.MeshBasicMaterial({map:texture});
        cubo.material = new THREE.MeshBasicMaterial({map:texture});
        renderer.render(scene,camera);

        changeTexture += 1; // Se aumenta en uno para que se alterne.
    }
    //Luz a la escena
    scene.add(puntoLuz);
    scene.add(luzAmbiente);

    function color() { //Funcion para el cambio de material con las formas
        var groundMaterialFormas = new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffff00
        });
        return groundMaterialFormas;
    }

    function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            var intersect = intersects[0];
            if (intersect.object.geometry.type == "ConeGeometry") {
                intersect.object.material = color();
                //intersect.object.material.color.set(Math.random() * 0xffff00);
                console.log("piramide");
            }
            if (intersect.object.geometry.type == "BoxGeometry") {
                intersect.object.material = color();
                //intersect.object.material.color.set(Math.random() * 0xffff00);
                console.log("Cubo");
            }
            if (intersect.object.geometry.type == "TorusGeometry") {
                intersect.object.material = color();
                //intersect.object.material.color.set(Math.random() * 0xffff00);
                console.log("Dona");
            }
        }
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
