import Fireworks from 'matter-fireworks';
const fireworks = new Fireworks;

const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
const height = (window.innerHeight-10);
const width = window.innerWidth-10;
const xmaze = 6;//Math.floor(height/30);
const ymaze = 4;//Math.floor(width/120);
const unit_length = width / xmaze;
const unit_height = height/ ymaze;
const engine = Engine.create();
//disables gravity in y direction
engine.world.gravity.y = 0.3;
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height,
    }

});

Render.run(render);
Runner.run(Runner.create(), engine);

//activates mouse use,  must add MouseConstraint and Mouse to the destructuring of Matter
// World.add(world, MouseConstraint.create(engine, {
//     mouse: Mouse.create(render.canvas)
// }));

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

 const shuffle = (array) => {
     let counter = array.length
     
     while (counter > 0) {
        const random_index = math.floor(Math.random() * counter);

        counter--;
        const temp = array[counter];
        arr[counter] = array[random_index];
        array[random_index] = temp;
        //inplace swap
        //[array[counter], array[random_index]] = [array[random_index], array[counter]];

     }
     return array;
 }

function maze_generator(x, y)  {
    const grid = Array(y)
    .fill(null)
    .map(() => Array(x).fill(false));
    return grid;
}
function horizontals_generator(x,y) {
    const hors = Array(y-1)
    .fill(null)
    .map(() => Array(x).fill(false));
    return hors; 
}
const horizontals = (horizontals_generator(xmaze,ymaze))

function verticals_generator(x,y) {
    const verts = Array(y)
    .fill(null)
    .map(() => Array(x-1).fill(false));
    return verts; 
}
const verticals = verticals_generator(xmaze,ymaze)

function generate_starting_pos(x,y) {
    const row = Math.floor(Math.random() * x)
    const column = Math.floor(Math.random() * y)
    return [row,column]
}
const starting_pos = generate_starting_pos(xmaze, ymaze)
const grid = maze_generator(xmaze,ymaze)

function step_through_cell(row, column) {
    //if cell has been already visited
    if (grid[row][column]) {
        return;
    }
    grid[row][column] = true;
    // create an array of neighbors in N E S W directions
    const neighbors = [[row -1, column, 'up'], [row, column + 1, 'right'], [row+1, column, 'down'], [row, column -1, 'left']];
    shuffleArray(neighbors)
   
    for (let neighbor of neighbors) {
        //destructuring 
        const [next_row, next_column, direction] = neighbor;
        // checking for locations out of bounds
        if (next_row < 0 || next_row >= ymaze || next_column < 0 || next_column  >= xmaze) {
            continue;
        }
        // checking to see if location has already been visited
        if (grid[next_row][next_column]) {
            continue
        }
        if (direction === 'left') {
            verticals[row][column-1] = true;
        }
        else if (direction === 'right') {
            verticals[row][column] = true;
        }
        else if (direction === 'up') {
            horizontals[row-1][column] = true;
        }
        else if (direction === 'down') {
            horizontals[row][column] = true;
        }
        step_through_cell(next_row,next_column)
    }
}
const move_through_cell = (row,column) => {
    
}

//walls
const walls = [
    Bodies.rectangle(width/2, 0, width, 5, {isStatic: true}),
    Bodies.rectangle(width/2, height, width, 5, {isStatic: true}),
    Bodies.rectangle(0,height/2, 5, height, {isStatic: true}),
    Bodies.rectangle(width,height/2, 5, height, {isStatic: true})
]
World.add(world, walls);

//random shapes
// for (let i = 0; i < 60; i++) {
//     if (Math.random() < .5 ) {
// World.add(world, Bodies.rectangle(height * Math.random(), width * Math.random(), 50, 50))
//     }
//     else {
//         World.add(world, Bodies.circle(height * Math.random(), width * Math.random(), 35))
//     }
//};

// console.log(grid)
// console.log(horizontals_generator(xmaze, ymaze))
// console.log(verticals_generator(xmaze, ymaze))
// starting_coords =generate_starting_pos(xmaze, ymaze)
// console.log(starting_coords)
step_through_cell(1,1)

horizontals.forEach((row, row_index) => {
    row.forEach((boundary, column_index) => {
        if (boundary) {
            return;
        }
        const wall = Bodies.rectangle(column_index * unit_length + unit_length/2,
                                      row_index * unit_height + unit_height,
                                      unit_length,
                                      5, {
                                          label: 'wall',
                                          isStatic: true,
                                          render: {
                                              fillStyle: '#1919a6'
                                          }
                                      });
    World.add(world, wall);                           
    });
});

verticals.forEach((row, row_index) => {
    row.forEach((boundary, column_index) => {
        if (boundary) {
            return;
        }
        const wall = Bodies.rectangle(column_index * unit_length + unit_length,
                                      row_index * unit_height + unit_height/2,
                                      5,
                                      unit_height, {
                                          label: 'wall',
                                          isStatic: true,
                                          render: {
                                            fillStyle: '#1919a6'
                                      }
                                    });
    console.log(wall);                                
    World.add(world, wall);                           
    });
});
//create goal
const goal = Bodies.rectangle(width-unit_length/2, height-unit_height/2,unit_length*.7,unit_height*.7,{
    label: 'goal',
    isStatic: true,
    render: {
        fillStyle: '#FF6347'
  }
    
});
World.add(world,goal);
// console.log(horizontals)
// console.log(verticals)

//ball

const ball = Bodies.circle(unit_length/2,unit_height/2, unit_length/3, {
    label: 'ball',
    render: {
        fillStyle: '#FFFF00'
    }
});
World.add(world, ball);

// event listener
document.addEventListener('keydown', event => {
   const {x,y} = ball.velocity;
//console.log(event);
    if (event.code === 'KeyW' || event.code === 'ArrowUp') {
        Body.setVelocity(ball, {x, y: y -5});
        //console.log('move up');
    }; 
    if (event.code === 'KeyS'|| event.code === 'ArrowDown' ) {
        Body.setVelocity(ball, {x, y: y + 5});
        //console.log('move down');
    }; 
    if (event.code === 'KeyD'|| event.code === 'ArrowRight' ) {
        Body.setVelocity(ball, {x: x + 5, y});
        //console.log('move right');
    }; 
    if (event.code === 'KeyA'|| event.code === 'ArrowLeft' ) {
        Body.setVelocity(ball, {x: x - 5, y});
        //console.log('move left');
    }; 
});

//win condition
Events.on(engine, 'collisionStart', event =>{
 event.pairs.forEach(collision => {
     const labels = ['ball', 'goal'];
     if (labels.includes(collision.bodyA.label) &&
     labels.includes(collision.bodyB.label)) {
         document.querySelector('.winner').classList.remove('hidden');
         world.gravity.y = 1.5;
         world.gravity.x = .3;
         fireworks.showStarted(true);
         world.bodies.forEach(body => {
             if (body.label === 'wall') {
                 Body.setStatic(body, false);
                
            
             }
         })
     }
 });
});