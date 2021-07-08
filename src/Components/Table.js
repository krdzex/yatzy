import React from 'react';

const Table = (props) => {

    return (
        <div className="tableWrapper">
            <div className="score">
                <p>Total score: {props.finalScore}</p>
            </div>
            <table className="table">
                <tbody>
                    {props.table.map((row, id) => (

                        <tr key={id} className={"row " + (row.finalScore ? "finalScore" : "notFinalScore")} onClick={() => props.onResultClick(row)}>
                            <td className="name">
                                {row.name}
                            </td>
                            <td>
                                <p className="value">{row.finalScore ? row.value : row.rule}</p>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Table;