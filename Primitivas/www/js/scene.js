(function(){//FLOUSURE: FUNCION ANONIMA QUE SE LLAMA A SI MISMA
    
        let scene = new THREE.Scene();//ASI SE CREA LA ESCENA (ES COMO UN CANVAS LA PERSPECTIVA DEL CANVAS)
        const aspectRatio = window.innerWidth / window.innerHeight;
        let camera = new THREE.PerspectiveCamera(85, aspectRatio, 0.1, 100);//PRIMER DATO(FOV):ENFOQUE QUE TIENE LA CAMARA, SEGUNDO DATO(ASPECT): ANCHO Y ALTO DE LA CAMARA (COMO SE VA A VER LA CAMARA), TECER DATO CERCA(NEAR) Y CUARTO DATO LEJOS(FAR)
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);//TAMAÑO AL RENDERER OSEA ANCHO Y ALTO DE LA ESCENA Y RENDER ES DIBUJAR LO QUE SE ESTA CREANDO
        document.body.appendChild(renderer.domElement);

        renderer.shadowMap.enabled = true;//DAR DE ALTA EL SERVICIO DE LAS SOBRAS PARA PODER USARLAS
        renderer.shadowMap.soft = true;//LA SOMBRA MAS SUAVE CON RESPECTO LA LUZ QUE ESTOY PROYECTANDO
        renderer.shadowMap.type = THREE.PCFShadowMap;//TIPO DE SOMBRA QUE VAMOS A USAR

        camera.position.z = 20;//PROFUNDIDAD CON LA QUE SE VIZUALISARA LA CAMARA
        camera.position.y = 5;//ALTURA DE LA CAMARA
        //camera.position.x = 0;//LARGO DE LA CAMARA    

    
        //la plataforma gris 
        let planeGeometry = new THREE.PlaneGeometry(200,1500);// creacion del plano y su tamano 
        planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));// matrix de 4 ejes
        //  se rota y se refresque constantemente 
        let groundMaterial = new THREE.MeshPhongMaterial({// genera el material en el mesh
            color: 0xffffff
        });
        let plane = new THREE.Mesh(planeGeometry, groundMaterial);// crear la geometria del plano
        plane.receiveShadow  = true;//QUIEN VA A RECBIR LA SOMBRA
        let loader = new THREE.TextureLoader();


    
    
        let piramideGeometria = new THREE.ConeGeometry( 5, 10, 50, 50, false);//1ATRIBUTO ES EL RADIO DE LA PARTE BASE (DEFAULT=20), 2ATRIBUTO ES LA ALTURA DEL CONO (DEFAULT=100), 3ATRIBUTO ES EL NO. DE FIGURAS QUE CONFORMA LA BASE DEL CONO, 4ATRIBUTO ES EL NUMERO DE FIGURAS QUE CONFORMA LA ALTURA DEL CONO, 5ATRIBUTO INDICA SI ESTA TAPADA LA BASE DEL CONO (DEFAULT=FALSE ES DECIR TIENE "CARA"), 6ATRIBUTO ES EL ANGULO INICIAL (DEFAULT=0), 7ATRIBUTO ES EL ANGULO CENTRAL (DEFAULT=2*Pi)
        let cuboGeometria = new THREE.BoxGeometry(2, 2, 2, 2);//SE DEFINE EL TIMPO DE FIGURA GEOMETRIA (EN ESTE CASA UN CUBO)
        let donaGeometria = new THREE.TorusGeometry(3, 2, 16, 100);
        
        let materialPiramide = new THREE.MeshPhongMaterial({ //DECLARA MATERIAL CON EL QUE SE RELLENA LA FIGURA ACEPTA PROPIEDADES (PhongMaterial)
            color: 0x00D4FF
        });

        let materialCubo = new THREE.MeshPhongMaterial({
            color: 0xFF0000
        });

        let materialDona = new THREE.MeshPhongMaterial({
            color: 0xffff00, 
        });
        
        
        let piramide = new THREE.Mesh(piramideGeometria, materialPiramide);//GENERAMOS UNA REJILLA (mesh) DONDE GUARDAMOS LAS PROPIEDADES DE LA GEOMETRIA Y DEL MATERIAL DE LA FIGURA 
        piramide.position.x = 20;
        piramide.position.y = 8;

        let cubo = new THREE.Mesh(cuboGeometria, materialCubo );
        cubo.position.x = -20;
        cubo.position.y = 5;
 
        let dona = new THREE.Mesh(donaGeometria, materialDona );
        dona.position.y = 6;
        
    
        let puntoLuz = new THREE.PointLight(0x404040);//CREAMOS UNA LUZ DE TIPO PUNTO
        puntoLuz.position.y = 80;//POSICION (EN EL EJE) DE LA LUZ 
        puntoLuz.position.z = 20;//POSICION (EN EL EJE) DE LA LUZ 
    
        puntoLuz.castShadow = true;//PARA QUE LA LUZ(PUNTUAL) PROYECTE LA SOMBRA

        scene.add(piramide);//AGREGAMOS LA REGILLA (mesh) A LA ESCENA 
        scene.add(cubo);
        scene.add(dona);
        scene.background = new THREE.Color(0xeeeeee);
        scene.add(new THREE.AmbientLight(0x404040));//AGREGAMOS OTRA PEQUEÑA LUZ (luz de ambiente)
        scene.add(puntoLuz);//AGREGAMOS EL PUNTO LUZ A LA ESCENA
        scene.add(plane);
            
        
        let controls = new THREE.OrbitControls(camera, renderer.domElement);//ESTO ES PARA PODER MOVER LA CAMARA POR LA ESCENA
    
    
        function loop(){//CICLA CONSTANTEMENTE LOS FRAMES QUE VAS A GENERAR
            requestAnimationFrame(loop);//PERMITE HABLAR A CADA FRAME (CILCLO DEL PROCESO QUE PERMITE VISUALIZAR LA ESCENA)

            dona.rotation.x += 0.01;//PARA ROTAR LA FIGURA EN EL EJE X
            cubo.rotation.y += 0.01;//PARA ROTAR LA FIGURA EN EL EJE Y
            piramide.rotation.z += 0.01;//PARA ROTAR LA FIGURA EN EL EJE Z
          
            renderer.render(scene, camera);//SE PONE AQUI PARA QUE VUELVA A RENDERIZAR LA ESCENA 
    
        }
    
        loop();
    
    })();