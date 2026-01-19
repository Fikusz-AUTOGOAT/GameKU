const enemies = [];

function drawEnemies(ctx, camera) {
    ctx.fillStyle = "red";
    enemies.forEach(e => {
        ctx.fillRect(
            e.x - camera.x,
            e.y - camera.y,
            30,
            30
        );
    });
}
