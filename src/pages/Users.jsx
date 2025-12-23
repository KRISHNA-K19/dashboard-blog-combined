import React, { useState } from 'react';
import SimpleTable from '../components/SimpleTable';
import CreateUserDialog from '../components/CreateUserDialog';
import sampleUsers from '../data/sampleUsers';
import Avatar from '../components/Avatar';

export default function Users() {
  const [users, setUsers] = useState(sampleUsers);
  const [showCreate, setShowCreate] = useState(false);

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (u) => (
        <div className="flex items-center gap-3">
          <Avatar name={u.name} email={u.email} useImage={true} />
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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div>
          <button onClick={() => setShowCreate(true)} className="px-3 py-2 bg-brand text-white rounded-md">Create User</button>
        </div>
      </div>

      <SimpleTable columns={columns} rows={users} />

      <CreateUserDialog isOpen={showCreate} onClose={() => setShowCreate(false)} onCreate={addUser} />
    </div>
  );
}
