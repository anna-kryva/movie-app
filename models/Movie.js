const {Schema, model} = require('mongoose');

const schema = new Schema(
    {
      title: {type: String, required: true, maxlength: 1000},
      releaseYear: {type: Number, required: true, min: 1800, max: 2100},
      format: {
        type: String,
        required: true,
        enum: ['VHS', 'DVD', 'Blu-Ray'],
      },
      stars: [{type: String, required: true, maxlength: 1000}],
    },
    {timestamps: true},
);

module.exports = model('Movie', schema);
