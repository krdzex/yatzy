import React from 'react';
import Table from './Table';

const ScoreBoard = ({ table, onResultClick, finalScore }) => {
    return (
        <div>
            <Table table={table} onResultClick={onResultClick} finalScore={finalScore} />
        </div>
    );
};

export default ScoreBoard;