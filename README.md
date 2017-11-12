Derecho a examen
=================
#### Equipo 1 ####
* Javier Alejandro Conde Carrera
* Monica Fernanda Ortiz Quezada
* Luis Angel Alcudia Juarez
* Jose David Lujan Gallegos

Características
--------
* Rotación de formas
* Movimiento de cámara

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

