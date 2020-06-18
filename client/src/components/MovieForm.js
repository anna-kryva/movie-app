import React from "react";
import { useForm } from "react-hook-form";
import { useHttp } from "../hooks/http.hook";

export default function MovieForm () {
  const { request } = useHttp();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data, e) => {
    try {
      const res = await request('/api/movies/', 'POST', {...data}, {});
      console.log(res);
      clearForm(e);
    } catch (e) {
      console.log(e);
    }
  };

  const clearForm = (e) => {
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="form-group">
        <label>Title</label>
        <input className="form-control" type="text" name="title" ref={register({ required: true, maxLength: 1000 })} />
        {errors.title && 'Title is required and its length should be less 1000'}
      </div>
      <div className="form-group">
        <label>Release Year</label>
        <input className="form-control" type="number" name="releaseYear" ref={register({ required: true, min: 1800, max: 2100 })} />
        {errors.releaseYear && 'releaseYear is required and it should be in the range 1800 and 2100'}
      </div>
      <div className="form-group">
        <label>Format</label>
        <select className="form-control" name="format" ref={register({ required: true })} >
          <option value='VHS'>VHS</option>
          <option value='DVD'>DVD</option>
          <option value='Blu-Ray'>Blu-Ray</option>
        </select>
      </div>
      <div className="form-group">
        <label>Stars</label>
        <input className="form-control" type="text" name="stars" ref={register({ required: true, maxLength: 1000 })}/>
        {errors.stars && 'Stars are required.'}
      </div>
      <button className="btn btn-primary" type="submit">Add movie</button>
    </form>
    )
};
