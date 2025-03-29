import { readFile } from 'fs/promises';

const file = await readFile('./data.json', 'utf-8')

const movies = JSON.parse(file)

// /*Filtrado de peliculas por un genero en especifico*/

// const moviesFiltered = () => {
//     let moviesFilteredForName = movies.filter(e => e.category === 'Drama')

//     return moviesFilteredForName
// }

// console.log(moviesFiltered());

// /*Todas las peliculas que su duracion sea menor a 120 minutos*/

// const moviesFilteredDuration = () => {
//     let moviesFilteredForDuration = movies.filter(e => e.duration >= 120)
//     let response = [];

//     response.push({lista: moviesFilteredForDuration})


//     return moviesFilteredForDuration
// }

// console.log(moviesFilteredDuration())

/* Todas las peliculas que tengan un director especifico */

const moviesFilteredDirector = () => {
    let moviesFilterForDirector = movies.filter(e => e.director === 'James Cameron')
    let responseDirector = [];

    responseDirector.push({lista: moviesFilterForDirector})


    return moviesFilterForDirector
}

console.log(moviesFilteredDirector())

