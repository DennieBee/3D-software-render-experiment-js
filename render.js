const cube = [
    { X: -1, Y: -1, Z: -1 },
    { X:  1, Y: -1, Z: -1 },
    { X:  1, Y:  1, Z: -1 },
    { X: -1, Y:  1, Z: -1 },
    { X: -1, Y: -1, Z: 1 },
    { X:  1, Y: -1, Z: 1 },
    { X:  1, Y:  1, Z: 1 },
    { X: -1, Y:  1, Z: 1 },
]

const lines = [
    { A: 0, B: 1 },
    { A: 1, B: 2 },
    { A: 2, B: 3 },
    { A: 3, B: 0 },
    { A: 0, B: 4 },
    { A: 1, B: 5 },
    { A: 2, B: 6 },
    { A: 3, B: 7 },
    { A: 4, B: 5 },
    { A: 5, B: 6 },
    { A: 6, B: 7 },
    { A: 7, B: 4 },
]

const width = 1280;
const height = 720;
const focalLength = 5;
const canvas = document.getElementById('render-canvas');
const context = canvas.getContext('2d');

window.requestAnimationFrame(loop);

function loop(t) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'rgb(32, 32, 32)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (const vertex of cube) {
        rotateY(vertex, 0.01);

        const projectedX = projectX(vertex);
        const projectedY = projectY(vertex);

        context.fillStyle = 'rgb(80, 100, 255)';
        context.fillRect(projectedX - 10.0, projectedY - 10.0, 20.0, 20.0);
    }

    for (const line of lines) {
        const projectedXA = projectX(cube[line.A]);
        const projectedYA = projectY(cube[line.A]);
        const projectedXB = projectX(cube[line.B]);
        const projectedYB = projectY(cube[line.B]);

        context.strokeStyle = 'rgb(255, 255, 255)';
        context.beginPath();
        context.moveTo(projectedXA, projectedYA);
        context.lineTo(projectedXB, projectedYB);
        context.stroke(); 
    }

    window.requestAnimationFrame(loop);
}

function rotateY(vertex, rotation) {
    let a = Math.atan(vertex.Z / vertex.X);
    const s = vertex.Z / Math.sin(a);

    a += rotation;

    const x = Math.cos(a) * s;
    const z = Math.sin(a) * s;

    vertex.X = x;
    vertex.Z = z;
}

function projectX(position) {
    return focalLength * position.X / (focalLength + position.Z) * 200 + (width / 2);
}

function projectY(position)
{
    return focalLength * position.Y / (focalLength + position.Z) * 200 + (height / 2);
}
