class Perceptron {
  
  constructor(totalInputs, learningRate) {
    this.weights = [];
    this.learningConstant = learningRate;
    for (let i = 0; i < totalInputs; i++) {
      this.weights[i] = random(-1,1);
    }
  }

  feedForward(inputs) {
    let sum = 0;
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    return (this.activate(sum));
  }

  activate(sum) {
    if (sum > 0) return 1;
    else return -1;
  }
  
  train(inputs, desired) {
    let guess = this.feedForward(inputs);
    let error = desired - guess;
    for (let i = 0; i < inputs.length; i++) {
      //this.weights[i] = this.weights[i] + error * inputs[i] * this.learningConstant;
      this.weights[i] = this.weights[i] + error * this.learningConstant;
    }
  }
}

let perceptron;
let training = [];
let count = 0;

function f(x) {
  return 0.5 * x - 1;
}

// calculates the model's pre-activation prediction boundary based on weights array
// x, y, weights[]
// x*w[0] + y*w[1] + w[2] = 0
// Rearranging algebraically, y = (-x*w[0] - w[2]) / w[1]
function g(x, weights) {
  return (-x * weights[0] - weights[2]) / weights[1];
}

function setup() {
  createCanvas(640, 240);
  
  perceptron = new Perceptron(3, 1);
  
  // Make 2000 training data points
  for(let i = 0; i < 2000; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    training[i] = [x, y, 1];
  }
}

function draw() {
  background(255);
  
  // Reorient the canvas to match a Cartesian plane
  translate(width / 2, height / 2);
  scale(1,-1);
  
  //Draw the line
  stroke(0);
  strokeWeight(2);
  line(-width / 2, f(-width / 2), width / 2, f(width / 2));
  
  //Draw the model's line
  
  stroke(255, 0, 0);
  strokeWeight(2);
  line(-width / 2, g(-width / 2, perceptron.weights), width / 2, g(width / 2, perceptron.weights));
  
  let x = training[count][0];
  let y = training[count][1];

  let desired = -1;
  if(y > f(x)) desired = 1;
  
  perceptron.train(training[count], desired);
  // The mod operator makes the model train the training data over again when count reaches the length of the training array
  count = (count + 1) % training.length;
  
  // Draw data points and color according to output of the perceptron
  for (let dataPoint of training) {
    let guess = perceptron.feedForward(dataPoint);
    if (guess > 0) fill(127);
    else fill(255);
    strokeWeight(0.1);
    //stroke(0);
    circle(dataPoint[0], dataPoint[1], 8);
  }
  if (count % 10 == 0) {
    print(count, perceptron.weights);
  }
}