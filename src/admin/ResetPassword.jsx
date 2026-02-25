import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyResetToken, consumeResetToken, setAdminUser } from './utils.js';

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
    if (!token) return setError('No token provided');
    const e = verifyResetToken(token);
    if (!e) return setError('Invalid or expired token');
    setEmail(e);
  }, [token]);

  const checkStrength = (pwd) => ({ length: pwd.length >= 8, upper: /[A-Z]/.test(pwd), number: /[0-9]/.test(pwd), symbol: /[^A-Za-z0-9]/.test(pwd) });

  const handleSubmit = (e) => {
    e.preventDefault();
    const s = checkStrength(password);
    if (!s.length || !s.upper || !s.number || !s.symbol) return setError('Password does not meet strength requirements');
    setAdminUser(email, password);
    consumeResetToken(token);
    alert('Password updated. You can now login.');
    navigate('/admin/login');
  };

  if (error) return <div className="p-6">{error}</div>;
  if (!email) return <div className="p-6">Validating token...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <div className="mb-2 text-sm text-gray-600">Resetting password for <strong>{email}</strong></div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="password" placeholder="New password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded" />
          <div className="p-3 bg-gray-50 rounded">
            <PasswordRules password={password} />
          </div>
          <div>
            <button className="w-full bg-green-600 text-white py-2 rounded">Set Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
    <div>
      {rule(ok.length, 'At least 8 characters')}
      {rule(ok.upper, 'At least one uppercase letter')}
      {rule(ok.number, 'At least one number')}
      {rule(ok.symbol, 'At least one symbol')}
    </div>
  );
};

export default ResetPassword;
