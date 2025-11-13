import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import {Outlet, Link} from "react-router-dom";

const DirectorContainer = () => {
    const [directors, setDirectors] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/directors")
        .then(r => {
            if (!r.ok) { throw new Error("failed to fetch directors") }
            return r.json()
        })
        .then(setDirectors)
        .catch(console.log)
    }, [])

    const addDirector = (newDirector) => {
        setDirectors(previousDirectors => [...previousDirectors, newDirector])
    }

    const updateDirectors = (updatedDirectors) => {
        setDirectors(previousDirectors => previousDirectors.map(movie => {
            if (movie.id === updatedDirectors.id){
                return updatedDirectors;
            }
            return movie;
        }))
    }


    return (
        <>
            <NavBar />
            <main>
                <h1>Welcome to the Director's Directory!</h1>
                <Link to="new">Add a new Director</Link>
                <Outlet context={{directors, addDirector, updateDirectors}}/>
                {/* all director components should render here depending on route */}
            </main>
        </>
    );
}

export default DirectorContainer;
