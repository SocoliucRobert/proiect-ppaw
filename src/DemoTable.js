import React, { useEffect, useState } from 'react';
import { UserAccessor } from './bazadate/databaseFirst'; // Importă UserAccessor

const DemoTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      UserAccessor();
    }, []);

    if (loading) {
        return <div>Se încarcă</div>;
    }

    return (
        <div>
            <h1>Utilizatori</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nume utilizator</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DemoTable;
