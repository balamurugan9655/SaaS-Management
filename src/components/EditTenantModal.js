import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

const EditTenantModal = ({ isOpen, onClose, editData, onUpdate }) => {
  const [formData, setFormData] = useState({
    tenantsName: '',
    domain: '',
    status: '',
    subscriptionPlan: '',
    products: ''
  });

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Edit Tenant</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label>Tenant Name</label>
              <input type="text" name="tenantsName" value={formData.tenantsName} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Domain</label>
              <input type="text" name="domain" value={formData.domain} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="input-group">
              <label>Plan</label>
              <select name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleChange}>
                <option value="Free">Free</option>
                <option value="Starter">Starter</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Products</label>
              <input type="number" name="products" value={formData.products} onChange={handleChange} required />
            </div>
          </div>

          <div className="btn-row">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTenantModal;
