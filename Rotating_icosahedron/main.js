import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;
const scene = new THREE.Scene();
const geometry = new THREE.IcosahedronGeometry(1.0, 2);
const material = new THREE.MeshStandardMaterial(
    {color: new THREE.Color("blue")});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const wirematerial = new THREE.MeshBasicMaterial
({color:0xffffff,
    wireframe:true
});
const wiremesh = new THREE.Mesh(geometry, wirematerial);
wiremesh.scale.setScalar(1.02);
mesh.add(wiremesh);
const hemilight = new THREE.HemisphereLight
(
    0xffffff, 0x000000
);
scene.add(hemilight);


function animate(){
    mesh.rotation.y += 0.01;
    renderer.render(scene,camera);

}
renderer.setAnimationLoop(animate);