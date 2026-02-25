import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, isAuthenticated, getAdminUser, setAdminUser, createResetToken } from './utils.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [adminExists] = useState(!!getAdminUser());
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated()) navigate('/admin');
  }, [navigate]);

  const checkStrength = (pwd) => {
    return {
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      symbol: /[^A-Za-z0-9]/.test(pwd),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = loginUser(email, password);
    if (!res) {
      setError('Invalid credentials');
      return;
    }
    navigate('/admin');
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Email and password required');
    const s = checkStrength(password);
    if (!s.length || !s.upper || !s.number || !s.symbol) return setError('Password does not meet strength requirements');
    setAdminUser(email, password);
    alert('Admin account created. You can now login.');
    window.location.reload();
  };

  const handleForgot = (e) => {
    e.preventDefault();
    if (!forgotEmail) return alert('Enter email');
    const token = createResetToken(forgotEmail);
    const link = `${window.location.origin}/admin/reset-password?token=${token}`;
    // since we don't have email, show simulated link
    alert('Password reset link (simulated):\n' + link + '\nUse this link to reset the admin password.');
    setShowForgot(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}

        {!adminExists ? (
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" type="email" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Set Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded" type="password" required />
            </div>
            <PasswordRules password={password} />
            <div>
              <button className="w-full bg-green-600 text-white py-2 rounded">Create Admin</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" type="email" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded" type="password" required />
            </div>
            <PasswordRules password={password} />
            <div className="flex items-center justify-between">
              <button className="bg-[#1E73BE] text-white py-2 px-4 rounded">Login</button>
              <button type="button" onClick={()=>setShowForgot(true)} className="text-sm text-gray-600 underline">Forgot password?</button>
            </div>
          </form>
        )}

        {showForgot && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Forgot Password</h3>
            <form onSubmit={handleForgot} className="space-y-2">
              <input placeholder="Enter admin email" value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)} className="w-full p-2 border rounded" type="email" />
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-[#1E73BE] text-white rounded">Send Reset Link</button>
                <button type="button" onClick={()=>setShowForgot(false)} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

const PasswordRules = ({ password }) => {
  const ok = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };
  const rule = (flag, text) => (
    <div className={`text-sm ${flag ? 'text-green-600' : 'text-gray-400'}`}>{flag ? '✓' : '•'} {text}</div>
  );
  return (
    <div className="p-3 bg-gray-50 rounded">
      {rule(ok.length, 'At least 8 characters')}
      {rule(ok.upper, 'At least one uppercase letter')}
      {rule(ok.number, 'At least one number')}
      {rule(ok.symbol, 'At least one symbol')}
    </div>
  );
};
