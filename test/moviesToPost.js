module.exports.sortedMovies = [{
  title: 'A - the first test movie',
  releaseYear: 2019,
  format: 'DVD',
  stars: ['Test Actor', 'New Actor'],
},
{
  title: 'Z - the third test movie',
  releaseYear: 2019,
  format: 'DVD',
  stars: ['Test Actor', 'New Actor'],
},
{
  title: 'B - the second test movie',
  releaseYear: 2019,
  format: 'DVD',
  stars: ['Test Actor', 'New Actor'],
},
];

module.exports.validNewMovie = {
  title: 'New test movie',
  releaseYear: 2020,
  format: 'VHS',
  stars: ['Test Actor'],
};

module.exports.invalidNewMovie = {
  title: 'New test movie',
  releaseYear: 2020,
  format: 'test',
  stars: ['Test Actor'],
};

module.exports.toGetIdMovie = {
  title: 'One more test movie',
  releaseYear: 2021,
  format: 'DVD',
  stars: ['New Case', 'Moor Actor'],
};

module.exports.toDeleteMovie = {
  title: 'Third test movie',
  releaseYear: 2021,
  format: 'DVD',
  stars: ['Test Actor', 'New Actor'],
};
