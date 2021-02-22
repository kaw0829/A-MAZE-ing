//examples of destructuring and arrow functions

//////////// ARROW FUNCTIONS  ////////////

// function for generation array of false values
//map function works by applying a function to each entry in an array
// example of using an arrow function, equivalent to below example if x and y are 3
function maze_generator(x, y)  {
    const grid = Array(x)
    .fill(null)
    .map(() => Array(y).fill(false));
    return grid;
}
// cant just use fill to fill with false entry as that would just create
// pointers to the same array and altering one would alter all.
let gridy = Array(3).fill(null);
// example of using an anonymous function
let false_gridy = gridy.map(function(array){
    return Array(3).fill(false);
});
console.log(gridy)
console.log(false_gridy)
//using for loop to create areas array of circles

let circles = [
    10, 30, 50
];
let areas = []; // to store areas of circles
let area = 0;
for (let i = 0; i < circles.length; i++) {
    area = Math.floor(Math.PI * circles[i] * circles[i]);
    areas.push(area);
}
//console.log(areas);

// defining function to calculate area and then applying it to each entry in the array using map
function circleArea(radius) {
    return Math.floor(Math.PI * radius * radius);
}
let areas2 = circles.map(circleArea);
//console.log(areas2);

// same as above using an annomyous function
let areas3 = circles.map(function(radius){
    return Math.floor(Math.PI * radius * radius);
});
//console.log(areas3);

//same as above using arrow function
let areas4 = circles.map(radius => Math.floor(Math.PI * radius * radius));
//console.log(areas4);

/////////////Destructuring///////////////

const { Engine, Render, Runner, World, Bodies } = Matter;

// equivalent to
const Engine = Matter.Engine;
const Render = Matter.Render;
//etc,  I think this is correct need to verify
//creates an instance of an engine object
const engine = Engine.create();
