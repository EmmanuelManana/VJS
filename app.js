const grid = document.querySelector('.grid');


for (let i = 0; i < 255 ; i++){
    console.log("i: ", i)
    console.log(grid)
    const square = document.createElement('div');
    // square.value = i;
    // square.innerHTML = i;
    grid.appendChild(square);
}