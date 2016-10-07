import React from 'react';
import BookList from "./BookList";
import WordList from "./WordList";

const Home = () => (
    <div>
        <div className="row">
            <div className="col-xs-12">
                <BookList/>
            </div>
        </div>
        <div className="row margin-top-1rem">
            <div className="col-xs-12">
                <WordList/>
            </div>
        </div>
    </div>
);

export default Home;