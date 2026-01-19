import { createScene } from "./scene.js";
import { createWorld } from "./world.js";
import { createPlayer } from "./player.js";

const { scene, camera, renderer } = createScene();
createWorld(scene);
createPlayer(scene);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
