import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import SimpleTable from '../components/SimpleTable';
import CreateUserDialog from '../components/CreateUserDialog';
import Avatar from '../components/Avatar';

import sampleUsers from '../data/sampleUsers';

const initialUsers = sampleUsers.slice(0, 8);

export default function Dashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [showCreate, setShowCreate] = useState(false);

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (u) => (
        <div className="flex items-center gap-3">
          <Avatar name={u.name} email={u.email} useImage={false} />
          <div>
            <div className="font-medium text-sm">{u.name}</div>
            <div className="text-xs text-muted">{u.email}</div>
          </div>
        </div>
      )
    },
    { header: 'Role', accessor: 'role' }
  ];

  const addUser = (u) => setUsers((s) => [u, ...s]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div>
          <button onClick={() => setShowCreate(true)} className="px-3 py-2 bg-brand text-white rounded-md">Create User</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={users.length.toLocaleString()} delta={4.6} />
        <StatCard title="Active Today" value="312" delta={-1.2} />
        <StatCard title="Revenue" value="$21,340" delta={8.1} />
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Users</h2>
        <SimpleTable columns={columns} rows={users} />
      </section>

      <CreateUserDialog isOpen={showCreate} onClose={() => setShowCreate(false)} onCreate={addUser} />
    </div>
  );
}
