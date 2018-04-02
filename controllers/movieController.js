const Movie = require('../models').Movie;
const moment = require('moment');
const populateService   = require('./../services/populateService');

// Hardcode the days for the sake of simplicity
const days = ['Today', 'Tomorrow', moment().add(2, 'days').format('ddd, MMM D')];
// Same for the times
const times = ['9:00 AM', '11:10 AM', '12:00 PM', '1:50 PM', '4:30 PM', '6:00 PM', '7:10 PM', '9:45 PM'];

const get = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Movie.find().lean().exec((err, movies) => res.json(
    {
      movies: movies.map(movie => ({
        ...movie,
        days,
        times
      }))
    }
  ));

  return ReS(res, { movies: Movie.toWeb() });
}
module.exports.get = get;

const renderDb = async function (req, res) {
  populateService.renderMovies();
  return ReS(res, { message:'Successfully created new user.' });;
}
module.exports.renderDb = renderDb;