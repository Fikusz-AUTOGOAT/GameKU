import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { getHeightAt } from "./world.js";

const keys = {};
let yaw = 0;
let pitch = 0;

let hunger = 100;
let stamina = 100;

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

export function setupPlayer(camera, renderer) {
    renderer.domElement.addEventListener("click", () => {
        renderer.domElement.requestPointerLock();
    });

    document.addEventListener("mousemove", e => {
        if (document.pointerLockElement) {
            yaw -= e.movementX * 0.002;
            pitch -= e.movementY * 0.002;
            pitch = Math.max(-1.5, Math.min(1.5, pitch));
            camera.rotation.set(pitch, yaw, 0);
        }
    });

    // HUD
    const hud = document.createElement("div");
    hud.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        color: white;
        font-family: Arial;
        background: rgba(0,0,0,0.5);
        padding: 10px;
        border-radius: 8px;
    `;
    document.body.appendChild(hud);

    return function updatePlayer(delta = 0.016) {
        const speed = keys["shift"] && stamina > 0 ? 6 : 3;

        if (keys["shift"] && stamina > 0) {
            stamina -= delta * 20;
        } else {
            stamina += delta * 10;
        }

        hunger -= delta * 1;

        stamina = Math.max(0, Math.min(100, stamina));
        hunger = Math.max(0, hunger);

        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        dir.y = 0;
        dir.normalize();

        const right = new THREE.Vector3().crossVectors(dir, camera.up);

        if (keys["w"]) camera.position.add(dir.clone().multiplyScalar(delta * speed));
        if (keys["s"]) camera.position.add(dir.clone().multiplyScalar(-delta * speed));
        if (keys["a"]) camera.position.add(right.clone().multiplyScalar(-delta * speed));
        if (keys["d"]) camera.position.add(right.clone().multiplyScalar(delta * speed));

        // dopasowanie do terenu
        const groundY = getHeightAt(camera.position.x, camera.position.z);
        camera.position.y = groundY + 1.7;

        hud.innerHTML = `
            🍖 Hunger: ${hunger.toFixed(0)}<br>
            ⚡ Stamina: ${stamina.toFixed(0)}
        `;
    };
}
