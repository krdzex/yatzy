import React from 'react';

const Table = (props) => {

    return (
        <div>
            <table style={{ border: "1px solid black" }}>
                <tbody>
                    {props.table.map((row, id) => (
                        <tr key={id}>
                            <td>
                                {row.name}
                            </td>
                            <td>
                                {row.value}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;