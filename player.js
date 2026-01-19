const player = {
    x: 400,
    y: 300,
    speed: 3,
    size: 20,
    health: 100
};

function drawPlayer(ctx) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
}
