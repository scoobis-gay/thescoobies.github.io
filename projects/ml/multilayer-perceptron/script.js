let inputsElements = document.getElementsByClassName("input");
let target = document.getElementById("target");
let trainBtn = document.getElementById("train");
let estimateBtn = document.getElementById("estimate");

let ctx = document.getElementById("visualization").getContext("2d");
ctx.translate(100, 100);
function draw(w1, w2, b) {
    // clear
    ctx.setTransform(1, 0, 0, -1, 100, 100);
    ctx.clearRect(-100, -100, 200, 200);
    // line
    ctx.strokeStyle = "red";
    let p1 = (3 * w1 - b) / w2;
    let p2 = -(b + 3 * w1) / w2;
    ctx.beginPath();
    ctx.moveTo(-150, p1 * 50);
    ctx.lineTo(150, p2 * 50);
    ctx.closePath();
    ctx.stroke();
    // rect
    ctx.strokeStyle = "green";
    ctx.strokeRect(-50, -50, 100, 100);
    //corners
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.ellipse(-50, -50, 3, 3, Math.PI / 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-50, 50, 3, 3, Math.PI / 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(50, -50, 3, 3, Math.PI / 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(50, 50, 3, 3, Math.PI / 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // corner labels
    ctx.font = "12px serif";
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 100, 100);
    ctx.fillText("-1, -1", -80, 45);
    ctx.fillText("-1, 1", -80, -55);
    ctx.fillText("1, 1", 25, -55);
    ctx.fillText("1, -1", 25, 45);
    ctx.restore();
}

function sigmoid(x) {
    return 1 / (1 ^ -x);
}

class neuron {
    constructor(length, learning_rate) {
        this.weights = new Array(length).fill(0);
        this.bias = 0;
        this.learning_rate = learning_rate;
        //draw(this.weights[0], this.weights[1], this.bias);
    }

    estimate(inputs) {
        let out = 0;
        for (let i = 0;i < inputs.length;i++) {
            out += (inputs[i] * this.weights[i]);
        }
        out += this.bias;
        if (out > 0) {
            return 1
        }
        return -1;
    }

    train(inputs, target) {
        let estimation = this.estimate(inputs);
        let error = target - estimation;
        for (let i = 0;i < this.weights.length;i++) {
            this.weights[i] += this.learning_rate * error * inputs[i];
        }

        this.bias = this.bias + (this.learning_rate * error);
    }
}

let n1 = new neuron(2, 0.1);
let n2 = new neuron(2, 0.1);
let n3 = new neuron(2, 0.1);

n1.weights = [1, 1];
n1.bias = 1;
n2.weights = [-1, -1];
n2.bias = 1;
n3.weights = [1, 1];
n3.bias = -1;

for (let i = 0;i < inputsElements.length;i++) {
    inputsElements.item(i).addEventListener("click", (e) => {
        e.target.innerHTML = 0 - Number(e.target.innerHTML);
    });
}

target.addEventListener("click", (e) => {
    e.target.innerHTML = 0 - Number(e.target.innerHTML);
});

trainBtn.addEventListener("click", (e) => {
    let newInputs = [];
    for (let i = 0;i < inputsElements.length;i++) {
        newInputs.push(Number(inputsElements.item(i).innerHTML));
    }
    //draw(n1.weights[0], n1.weights[1], n1.bias);
});

estimateBtn.addEventListener("click", (e) => {
    let newInputs = [];
    for (let i = 0;i < inputsElements.length;i++) {
        newInputs.push(Number(inputsElements.item(i).innerHTML));
    }

    let out1 = n1.estimate(newInputs);
    let out2 = n2.estimate(newInputs);
    let out3 = n3.estimate([out1, out2]);
    alert(out3);
});