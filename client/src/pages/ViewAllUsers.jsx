import React, { useState, useEffect } from 'react';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/user/delete/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      setError('Error deleting user');
    }
  };

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-28  p-8">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {users && users.length === 0 && <p>No users found.</p>}

      {users && users.length > 0 && (
        <table className="table-auto w-full border-collapse border border-green-800">
          <thead>
            <tr>
              <th className="border border-green-600 p-2">Username</th>
              <th className="border border-green-600 p-2">Email</th>
              <th className="border border-green-600 p-2">Role</th>
              <th className="border border-green-600 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-green-600 p-2">{user.username}</td>
                <td className="border border-green-600 p-2">{user.email}</td>
                <td className="border border-green-600 p-2">{user.role}</td>
                <td className="border border-green-600 p-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAllUsers;
