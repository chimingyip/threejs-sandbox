import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// Loading
const textureLoader = new THREE.TextureLoader(); // Create new texture loader
const normalTexture = textureLoader.load('/textures/NormalMap2.png') // Load the normal map texture 

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x7f4834);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//// LIGHTS ////

// Light 1
const pointLight = new THREE.PointLight(0x7f4834, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Light 2
const pointLight2 = new THREE.PointLight(0x8e4126, 0.1);
pointLight2.position.set(2.1, 6, -1.52);
pointLight2.intensity = 6.2;
scene.add(pointLight2);

//// *** GUI TESTING *** ////

// Note: the slider will appear when you set both a minimum and a maximum
// const light2Gui = gui.addFolder('Light 2');
// light2Gui.add(pointLight2.position, 'x').min(-5).max(5).step(0.01);
// light2Gui.add(pointLight2.position, 'y').min(-6).max(6).step(0.01);
// light2Gui.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
// light2Gui.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

// // Colour slider GUI
// const light2Color = {
//     color: 0x8e4126
// }

// // When the colour is changed in GUI, trigger onChange() function to do that colour change.
// light2Gui.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight2.color.set(light2Color.color)
//     });

// Visual representation of the light source's position in the environment
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper2);

//// *** GUI TESTING END*** ////

// Light 3
const pointLight3 = new THREE.PointLight(0x460b04, 0.1);
pointLight3.position.set(-1.43, -1, -2.25);
pointLight3.intensity = 1.5;
scene.add(pointLight3);

//// *** GUI TESTING *** ////

// Note: the slider will appear when you set both a minimum and a maximum
// const light3Gui = gui.addFolder('Light 3');
// light3Gui.add(pointLight3.position, 'x').min(-5).max(5).step(0.01);
// light3Gui.add(pointLight3.position, 'y').min(-6).max(6).step(0.01);
// light3Gui.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
// light3Gui.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

// // Colour slider GUI
// const light3Color = {
//     color: 0x460b04
// }

// // When the colour is changed in GUI, trigger onChange() function to do that colour change.
// light3Gui.addColor(light3Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light3Color.color)
//     });

// Visual representation of the light source's position in the environment
// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper3);

//// *** GUI TESTING END*** ////

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001;
}

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock();

const tick = () =>
{

    targetX = mouseX * .001;
    targetY = mouseY * .001;

    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = .5 * elapsedTime;

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y);
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x);
    sphere.position.z += -.05 * (targetY - sphere.rotation.x);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame --> vanilla js --> runs the tick function every frame
    window.requestAnimationFrame(tick);
}

tick();