Derecho a examen
=================
#### Equipo 1 ####
* Javier Alejandro Conde Carrera
* Monica Fernanda Ortiz Quezada
* Luis Angel Alcudia Juarez
* Jose David Lujan Gallegos
* Isis D. Hernandez Martinez

Características
--------
* Rotación de formas
* Movimiento de cámara
* Cambio de material

Código
---------
#### Funciones usadas ####

| Funciones   | Descripción |
| --------- |:----------- |
| `loop()`  | Esta función sirve para repetir constantemente los frames que va a a generar|
| `colores()` | Esta función sirve para cambiar el tipo de material a cada forma          | 

#### Funciones ####
La función `color()` la utilizamos para el cambio de color.

```javascript 
var cubo = new THREE.Mesh(cuboGeometria, color()); 
```

Cada vez que se manda a llamar esta función da un material random para la forma.
```javascript 
function color() {
    var groundMaterialFormas = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffff00
        });
    return groundMaterialFormas;
}
```
La función `loop()` es una de las principales funciones ya que es la que se encarga de todas la animaciones del proyecto.

```javascript
function loop() {
    controls.update(); //Actualización de los controles de camara
    requestAnimationFrame(loop);
    
    //Rotación de las formas
    dona.rotation.x += 0.01; 
    cubo.rotation.y += 0.01;
    piramide.rotation.z += 0.01;

    renderer.render(scene, camera);
}
loop();
```
La función `onDocumentMouseDown` la utilizamos cuando presionamos el mouse sobre una de las primitivas.

El raycaster hace una selección con el mouse
```javascript 
raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    document.addEventListener('mousedown', onDocumentMouseDown, false);
```    

Y actualizamos el raycaster con la posicion del mouse y de la camara
```javascript 
 raycaster.setFromCamera(mouse, camera);
 ```  

La variable intersects calcula los objetos que se cruzan con el raycaster, donde si el arreglo es mayor a 0 y si encuentra el tipo de objeto segun su geometria, toma el material y lo cambia utilizando la funcion de material
En mouse.x y mouse.y se calcula la posición del mouse en las coordenadas del recurso normalizado
```javascript 
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
```

#### Light and Shadow ####
Para el manejo de sombras utilizamos luz `PointLight` esta es la encargada de mostrar luz y agregar las sombras. Para que nuestra escena pueda realizar la acción de sombreado tenemos que definirla en el render para poder realizar el sombreado.
```javascript
    renderer.shadowMap.enabled = true;//DAR DE ALTA EL SERVICIO DE LAS SOBRAS PARA PODER USARLAS
    renderer.shadowMap.soft = true;//LA SOMBRA MAS SUAVE CON RESPECTO LA LUZ QUE ESTOY PROYECTANDO
    renderer.shadowMap.type = THREE.PCFShadowMap;//TIPO DE SOMBRA QUE VAMOS A USAR
```
Una vez realizado en el `render` podemos agregar sombras. Dos cosas importantes a tomar en cuenta son quien provocara la sombra y quien la recibirá.

`castShadow` : Quien provoca la sombra (`object`).

`receiveShadow` : Quien recibe la sombra (`plane`).

Para agregar luces a la escena utilizamos 2 tipos de luces  `PointLight` y `AmbientLight` .

` PointLight (color, intensity) ` : La luz sale desde un miso punto a todas las direcciones.

`AmbientLight (color)`  : Luz que ilumina todos los objetos de la escena.

Ejemplo

```javascript
//Definiendo luces
let puntoLuz = new THREE.PointLight(0xdfebff, .9);
let luzAmbiente= new THREE.AmbientLight('#DFFBFF');

puntoLuz.position.set(50, 80, 20); //Definimos una posición para la luz
puntoLuz.castShadow = true; //Agregamos true en castShadow por que es el que tranmitira la sombra
//Agregamos la luz a la escena
scene.add(puntoLuz);
scene.add(luzAmbiente); 
```

Para agregar sombras tendremos que decirle a nuestro objeto(`dona`) que provoque la sombra.

```javascript
plane = new THREE.Mesh(planeGeometry, groundMaterial); 
dona = new THREE.Mesh(donaGeometria, color()); 
dona.castShadow = true; //Se encargara de transmitir la sombra
plane.receiveShadow = true; //Le daremos al plane la propiedad de recibir la sombra
```
#### Texture ####
Para cambiarde textura a las primitivas al momento en que se preione una tecla(`onkeypress`) que sera toda nuestra funcion.

```javascript
document.body.onkeypress = function(){
```

Para cargar los diferentes materiales nos ayuda nuestra variable(`changeTexture`) donde si el residuo hara que se alternen las diferentes texturas.

```javascript
if(changeTexture % 2 == 0){// La funcion se inicializa que obtiene el mod para cambiar entre varias
                                    //texturas
            texture = new THREE.TextureLoader().load('img/Star.jpg');
        }else{
            texture = new THREE.TextureLoader().load('img/sun.jpg');
        }
```

Se vuelve a cargar el material de las primitivas con las texturas que se desean y se vuelve a renderizar la camara y la scena.

```javascript
renderer.render(scene,camera);
```

La variable (`changeTexture`) se estara aunmentando en 1 para que exista esa alternancia

```javascript
changeTexture += 1;
```
aqui le agregamos las formas y propiedades de las figuras con su respectibo material y la geometria (tamanos y propiedades) en el caso del plano fue similar teniamos que agregarle lo de los 4 matrixes para que igual se mostrara abajo y atras.

```javascript
   //Formas
        var piramideGeometria = new THREE.ConeGeometry(5, 10, 4, 1, false); // le modificamos a la figura para que tenga el aspecto a piramide
        var cuboGeometria = new THREE.BoxGeometry(6, 6, 6, 6); 
        var donaGeometria = new THREE.TorusGeometry(4, 2, 16, 100);
        let planeGeometry = new THREE.PlaneGeometry(200, 900); //Creacion del plano y su tamano 
        planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2)); //Matrix de 4 ejes
...

```
 despues lo mandamos  a llamar con el mesh respectivo y dandole su color, al igual con su material y geometria.
 
```javascript
        //Propiedades de las formas
        var piramide = new THREE.Mesh(piramideGeometria, color());
        var cubo = new THREE.Mesh(cuboGeometria, color());
        var dona = new THREE.Mesh(donaGeometria, color()); // puse esta figura para que se apreciara nas como una dona
        let groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        let plane = new THREE.Mesh(planeGeometry, groundMaterial); // geometria y material del plano
...

```
al final le agregamos que se muestre en la scena  al igual que las demas figuras.
        
    
```javascript
       //Objetos a la escena
        scene.add(piramide);
        scene.add(cubo);
        scene.add(dona);
        scene.add(plane); //que se muestre el plano en la scena
...
