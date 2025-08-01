import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';
import axios from '../utils/axios';

const ManageProducts = ({ isOpen, onClose, togglesData }) => {
  const productFeatures = [
    {
      category: 'Core Features',
      items: [
        { id: 'pipeline', name: 'Deal Pipeline', desc: 'Track and manage sales opportunities' },
        { id: 'task', name: 'Task Management', desc: 'Create and assign tasks to team members' },
        { id: 'email', name: 'Email Integration', desc: 'Send and track emails within the CRM' },
        { id: 'reporting', name: 'Advanced Reporting', desc: 'Generate detailed sales and activity reports' }
      ]
    },
    {
      category: 'Analytics',
      items: [
        { id: 'analytics', name: 'Analytics', desc: 'Business Intelligence and Reporting' },
        { id: 'dashboards', name: 'Custom Dashboards', desc: 'Create personalized analytics dashboards' },
        { id: 'scheduled', name: 'Scheduled Reports', desc: 'Set up automated report delivery' },
        { id: 'export', name: 'Data Export', desc: 'Export data in various formats' },
        { id: 'api', name: 'API Access', desc: 'Access analytics data via API' },
        { id: 'predictive', name: 'Predictive Analytics', desc: 'AI-powered business predictions' }
      ]
    },
    {
      category: 'Marketing',
      items: [
        { id: 'marketing', name: 'Marketing', desc: 'Marketing Automation and Campaigns' }
      ]
    },
    {
      category: 'Support',
      items: [
        { id: 'support', name: 'Support', desc: 'Customer Support and Ticketing' }
      ]
    }
  ];

  const [featureState, setFeatureState] = useState([]);

  // Initialize featureState from props when modal opens
  useEffect(() => {
    if (isOpen) {
      const fData = togglesData.features;
      console.log(togglesData);
      setFeatureState([...fData]);
    }
  }, [isOpen, togglesData]);

  const handleToggle = (id) => {
    const updated = featureState.map(f =>
      f.id === id ? { ...f, enabled: !f.enabled } : f
    );
    setFeatureState(updated);
  };

  const handleSave = async () => {
    const id = togglesData._id;
    console.log(id);
    try {
      const res = await axios.put(`/tenants/${id}/features`, { features: featureState });
      alert(res.data.msg);
      onClose();
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
   
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="manage-modal">
        <div className="modal-header">
          <h3>Manage Product Features</h3>
          <FaTimes className="close-icon" onClick={() => onClose()} />
        </div>

        <div className="modal-body">
          {productFeatures.map(section => (
            <div className='section' key={section.category}>
              {section.items.map(i => {
                const current = featureState.find(f => f.id === i.id);
                const checked = current ? current.enabled : false;

                return (
                  <div className="feature-row" key={i.id}>
                    <div className="feature-text">
                      <strong>{i.name}</strong>
                      <p>{i.desc}</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggle(i.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="btn-row">
          <button className="cancel-btn" onClick={() => onClose()}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
