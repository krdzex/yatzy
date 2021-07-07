import React from 'react';

const Table = (props) => {

    return (
        <div>
            <table className="table">
                <tbody>
                    {props.table.map((row, id) => (
                        <tr key={id} className="border_bottom">
                            <td>
                                {row.name}
                            </td>
                            <td className={row.finalScore ? "finalScore" : "notFinalScore"} onClick={() => props.onResultClick(row)}>
                                {row.value}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Table;