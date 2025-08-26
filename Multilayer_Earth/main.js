import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import getStarfield from './starfield';

const width = window.innerWidth;
const height = window.innerHeight;
const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 100;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
const loader = new THREE.TextureLoader();

const starfield = new getStarfield();
scene.add(starfield);

const geo = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/earth4k.jpg")
})
const earthMesh = new THREE.Mesh(geo, material);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
earthGroup.add(earthMesh);
scene.add(earthGroup);

const lightsMat = new THREE.MeshBasicMaterial({
    map : loader.load("./textures/earthlight4k.jpg"),
    blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geo, lightsMat);
earthGroup.add(lightsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/clouds.jpg"),
    blending: THREE.AdditiveBlending,
    opacity : 0.6
    
})

const cloudsMesh = new THREE.Mesh(geo, cloudsMat);
cloudsMesh.scale.setScalar(1.004);
earthGroup.add(cloudsMesh);

const sunlight = new THREE.DirectionalLight(new THREE.Color("white"));
sunlight.position.set(-2,0.5,1.5);
scene.add(sunlight);

function animate(){
    requestAnimationFrame(animate);
    earthGroup.rotation.y += 0.002
    // cloudsMesh.rotation.y += 0.02
    renderer.render(scene, camera);
}

animate();
