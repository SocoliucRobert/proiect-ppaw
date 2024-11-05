
import React, { useEffect, useState } from 'react';

import { UserAccessor } from './bazadate/databaseFirst'; 

const DemoTable = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUsers = async () => {

            const userAccessor = new UserAccessor(); 

            try {

                const data = await userAccessor.fetchUsers(); 
                setUsers(data);

            } catch (error) {

                console.error('Error fetching users:', error);

            }

            setLoading(false);

        };

        fetchUsers();

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


