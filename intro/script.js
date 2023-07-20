// scene
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffa6ab})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
 
// sizes
const sizes = {
  width: 800,
  height: 600
}
// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 3.5
camera.position.x = 0.9
camera.position.y = 0.9
scene.add(camera);

const canvas = document.querySelector(".webgl")
console.log(canvas);
// renderer
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

