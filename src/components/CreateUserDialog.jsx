import React, { useState } from 'react';
import Modal from './Modal';

export default function CreateUserDialog({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');

  function reset() {
    setName(''); setEmail(''); setRole('Member');
  }

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const newUser = { id: Date.now(), name: name.trim(), email: email.trim(), role };
    onCreate(newUser);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create new user">
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-sm block mb-1">Name</label>
          <input className="w-full border rounded-md px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
        </div>
        <div>
          <label className="text-sm block mb-1">Email</label>
          <input className="w-full border rounded-md px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
        </div>
        <div>
          <label className="text-sm block mb-1">Role</label>
          <select className="w-full border rounded-md px-3 py-2" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Member</option>
            <option>Admin</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 justify-end">
          <button type="button" onClick={() => { reset(); onClose(); }} className="px-4 py-2 border rounded-md">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-brand text-white rounded-md">Create</button>
        </div>
      </form>
    </Modal>
  );
}
