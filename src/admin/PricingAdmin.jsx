import React, { useEffect, useState } from 'react';
import { getPricingPlans, savePricingPlan, updatePricingPlan, deletePricingPlan } from './utils.js';

const PricingAdmin = () => {
  const [plans, setPlans] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ planName: '', price: '', features: [''] });

  useEffect(()=>{ load(); const h=()=>load(); window.addEventListener('dataUpdated',h); return ()=>window.removeEventListener('dataUpdated',h); },[]);
  const load = () => setPlans(getPricingPlans() || []);

  const handleChange = (e) => setForm(prev=>({...prev,[e.target.name]: e.target.value}));
  const handleFeatureChange = (i, val) => { setForm(prev=>{ const f=[...prev.features]; f[i]=val; return {...prev, features: f}; }); };
  const addFeature = () => setForm(prev=>({...prev, features: [...prev.features, '']}));
  const removeFeature = (i) => setForm(prev=>{ const f=[...prev.features]; f.splice(i,1); return {...prev, features: f}; });

  const startAdd = () => { setEditing(null); setForm({ planName:'', price:'', features:[''] }); };
  const startEdit = (p) => { setEditing(p); setForm({ planName: p.planName||'', price: p.price||'', features: p.features||[''] }); };

  const handleSubmit = (e) => { e.preventDefault(); if(!form.planName) return alert('Plan name required'); if(editing){ updatePricingPlan(editing.id, { planName: form.planName, price: form.price, features: form.features }); alert('Updated'); } else { savePricingPlan({ planName: form.planName, price: form.price, features: form.features }); alert('Saved'); } load(); setEditing(null); }
  const handleDelete = (id) => { if(!window.confirm('Delete plan?')) return; deletePricingPlan(id); load(); }

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Pricing Management</h2>
        <button onClick={startAdd} className="px-3 py-2 bg-[#1E73BE] text-white rounded">Add Plan</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-gray-50 p-4 rounded">
        <div>
          <label className="block text-sm font-medium">Plan Name</label>
          <input name="planName" value={form.planName} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Price (AFG)</label>
          <input name="price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Features</label>
          <div className="space-y-2">
            {form.features.map((f,i) => (
              <div key={i} className="flex gap-2">
                <input value={f} onChange={(e)=>handleFeatureChange(i, e.target.value)} className="flex-1 p-2 border rounded" />
                <button type="button" onClick={()=>removeFeature(i)} className="px-2 py-1 bg-red-100 text-red-700 rounded">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addFeature} className="px-3 py-1 bg-gray-200 rounded">Add Feature</button>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-[#1E73BE] text-white rounded">Save</button>
        </div>
      </form>

      <div className="space-y-3">
        {plans.map(p => (
          <div key={p.id} className="flex items-center justify-between border p-3 rounded">
            <div>
              <div className="font-semibold">{p.planName}</div>
              <div className="text-sm text-gray-600">{p.price} AFG</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>startEdit(p)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded">Edit</button>
              <button onClick={()=>handleDelete(p.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingAdmin;
