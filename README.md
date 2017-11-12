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
