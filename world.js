import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export const trees = [];

export function createWorld(scene) {
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(300, 300),
        new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    for (let i = 0; i < 40; i++) {
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.5, 4),
            new THREE.MeshStandardMaterial({ color: 0x5d4037 })
        );

        const leaves = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            new THREE.MeshStandardMaterial({ color: 0x1b5e20 })
        );

        trunk.position.set(
            Math.random() * 200 - 100,
            2,
            Math.random() * 200 - 100
        );
        leaves.position.set(0, 3, 0);
        trunk.add(leaves);

        scene.add(trunk);
        trees.push(trunk);
    }
}
