import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMovie = (props) => {
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: [],
        id: ''
    });

    useEffect(() => {
        const id = props.match.params.id;

        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    const editMovie = e => {
        movie.id = props.match.params.id;
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => {
                props.history.push('/');
            })
            .catch(err => console.log(err));
    };
    
    const handleChangesTitle = e => {
        setMovie({ ...movie, title: e.target.value });
    };

    const handleChangesDirector = e => {
        setMovie({ ...movie, director: e.target.value});
    };

    const handleChangesMetascore = e => {
        setMovie({ ...movie, metascore: e.target.value });
    };

    return (
        <div className="list">
            <h1>Movie</h1>
            <label>Title</label>
            <input
                className="input"
                type="text"
                name="title"
                defaultValue={movie.title}
                placeholder="Title"
                onChange={handleChangesTitle}
            />
            <label>Director</label>
            <input
                className="input"
                type="text"
                name="director"
                value={movie.director}
                placeholder="Director"
                onChange={handleChangesDirector}
            />
            <label>Metascore</label>
            <input
                className="input"
                type="text"
                name="metascore"
                value={movie.metascore}
                placeholder="Metascore"
                onChange={handleChangesMetascore}
            />
            <button className="submitButton" onClick={() => {
                editMovie();
            }}>
                Update Movie
                </button>
        </div>
    );

}

export default EditMovie;