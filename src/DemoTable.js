
import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient'; 


const DemoTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*');
                console.log(data);

            if (error) {
                console.error('Error fetching users:', error);
            } else {
                setUsers(data);
            }
            setLoading(false);
        };



        fetchUsers();
    }, []);

    if (loading) {
        return <div>Se încarca</div>;
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
