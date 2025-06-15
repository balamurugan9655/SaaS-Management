import React, { useState } from 'react';
import './example.css';
import { FaTimes } from 'react-icons/fa';

const Example = () => {
  const [showModal, setShowModal] = useState(false);

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

  const [toggles, setToggles] = useState(() => {
    const init = {};
    productFeatures.forEach(group =>
      group.items.forEach(item => (init[item.id] = true))
    );
    return init;
  });

  const handleToggle = (id) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    const result = [];
    productFeatures.forEach(section =>
      section.items.forEach(item =>
        result.push({ name: item.name, enabled: toggles[item.id] })
      )
    );
    console.log('🟢 Feature Status:', result);
    setShowModal(false);
  };

  return (
    <div className="dashboard-container">
      <button className="btn-add" onClick={() => setShowModal(true)}>Manage Products</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="manage-modal">
            <div className="modal-header">
              <h3>Manage Product Features</h3>
              <FaTimes className="close-icon" onClick={() => setShowModal(false)} />
            </div>

            <div className="modal-body">
              {productFeatures.map(section => (
                <div className="section" key={section.category}> 
                
                  <h4>{section.category}</h4>
                  {section.items.map(item => (
                    <div className="feature-row" key={item.id}>
                      <div className="feature-text">
                        <strong>{item.name}</strong>
                        <p>{item.desc}</p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={toggles[item.id]}
                          onChange={() => handleToggle(item.id)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="btn-row">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
      {/* {productFeatures.map(sec => (
        <div className='section' key={sec.category}>
          {sec.items.map(i => (
            i.name === sec.category ? (
            <div className='feature-row' key={i.id}>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={toggles[i.id]}
                  onChange={() => handleToggle(i.id)}
                />
                <span className="slider"></span>
              </label>
              <div className="feature-text">
                <strong>{i.name}</strong>
                <p>{i.desc}</p>
              </div>
            </div>
          ) : (
            <div className="feature-row" key={i.id}>
              <div className="feature-text">
                <strong>{i.name}</strong>
                <p>{i.desc}</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={toggles[i.id]}
                  onChange={() => handleToggle(i.id)}
                />
                <span className="slider"></span>
              </label>
            </div>
          )
          ))}
        </div>
      ))} */}
    </div>
  );
};

export default Example;

