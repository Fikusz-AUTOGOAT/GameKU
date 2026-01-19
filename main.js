import { createScene } from "./scene.js";
import { createWorld } from "./world.js";
import { setupPlayer } from "./player.js";

const { scene, camera, renderer, sun } = createScene();
createWorld(scene);

const updatePlayer = setupPlayer(scene, camera, renderer);

let time = 0;
let last = performance.now();

function animate(now) {
    const delta = (now - last) / 1000;
    last = now;

    // DZIEŃ / NOC
    time += delta * 0.05;
    sun.position.y = Math.sin(time) * 100;
    sun.intensity = Math.max(0.1, Math.sin(time) + 0.5);

    updatePlayer(delta);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate(performance.now());
