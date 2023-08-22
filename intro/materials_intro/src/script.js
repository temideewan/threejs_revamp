import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const gui = new GUI();

THREE.ColorManagement.enabled = false;

// load textures
const loadingManager = new THREE.LoadingManager(
  () => console.log("loaded"),
  () => console.log(" in progress"),
  () => console.log("error loading textures")
);
const loader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader();
const alphaTexture = loader.load("/textures/door/alpha.jpg");
const ambientOcclusionTexture = loader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const colorTexture = loader.load("/textures/door/color.jpg");
const heightTexture = loader.load("/textures/door/height.jpg");
const metalnessTexture = loader.load("/textures/door/metalness.jpg");
const roughnessTexture = loader.load("/textures/door/roughness.jpg");
const normalTexture = loader.load("/textures/door/normal.jpg");
const firstGradientTexture = loader.load("/textures/gradients/5.jpg");
firstGradientTexture.minFilter = THREE.NearestFilter;
firstGradientTexture.magFilter = THREE.NearestFilter;
firstGradientTexture.generateMipmaps = false;
const matcapsTexture = loader.load("/textures/matcaps/2.png");

const environmentMap = cubeTextureLoader.load([
  "/textures/environmentMaps/4/px.png",
  "/textures/environmentMaps/4/nx.png",
  "/textures/environmentMaps/4/py.png",
  "/textures/environmentMaps/4/ny.png",
  "/textures/environmentMaps/4/pz.png",
  "/textures/environmentMaps/4/nz.png",
]);
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial();
// material.map = colorTexture
// material.color = new THREE.Color(0x00ff00)
// material.wireframe = true
// material.opacity = 0.4
// material.transparent = true
// material.alphaMap = alphaTexture
// material.side = THREE.DoubleSide
// console.log(material.color);
/**
 * Different types of materials
 * - MeshBasicMaterial
 * - MeshNormalMaterial
 * - MeshMatcapMaterial
 * - MeshDepthMaterial
 * - MeshLambertMaterial
 * - MeshPhongMaterial
 * - MeshToonMaterial
 * - MeshStandardMaterial
 */
// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapsTexture
// material.flatShading = true

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 1000
// material.specular = new THREE.Color(0x1100ff) // the color of the shininess

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = firstGradientTexture

// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.4
// material.roughness = 0.3
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 4
// material.displacementMap = heightTexture
// material.displacementScale = 0.05
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.alphaMap = alphaTexture
// material.transparent = true
// material.normalScale.set(0.5,0.5)
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMap;

gui.add(material, "roughness", 0, 10).name("roughness");
gui.add(material, "metalness").min(0).max(1).step(0.01).name("metalness");
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.01).name("intensity");
gui
  .add(material, "displacementScale")
  .min(0)
  .max(10)
  .step(0.01)
  .name("displacement");
gui
  .add(material.normalScale, "x")
  .min(0)
  .max(10)
  .step(0.01)
  .name("normalScaleX");
gui
  .add(material.normalScale, "y")
  .min(0)
  .max(10)
  .step(0.01)
  .name("normalScaleY");
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.2, 64, 128),
  material
);
sphere.position.x = -1.5;
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);
  // update objects
  // sphere.rotation.y = 0.1 * elapsedTime;
  // plane.rotation.y = 0.1 * elapsedTime;
  // torus.rotation.y = 0.1 * elapsedTime;
  // sphere.rotation.x = 0.15 * elapsedTime;
  // plane.rotation.x = 0.15 * elapsedTime;
  // torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
