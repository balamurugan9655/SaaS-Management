import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

const EditTenantModal = ({ isOpen, onClose, editData, onUpdate }) => {

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // yyyy-mm-dd

  const [formData, setFormData] = useState({
    tenantsName: '',
    domain: '',
    adminEmail: '',
    subscriptionPlan: 'Free',
    status: 'Active',
    products: '',
    createdDate: formattedToday
  });

  // Fill data in edit mode
  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        createdDate: editData.createdDate
          ? formatToInputDate(editData.createdDate)
          : formattedToday
      });
    }
  }, [editData, formattedToday]);

  // Convert dd-mm-yyyy to yyyy-mm-dd for input
  const formatToInputDate = (dateStr) => {
    if (!dateStr.includes('-')) return dateStr;
    const parts = dateStr.split('-');
    return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dateStr;
  };

  // Convert yyyy-mm-dd to dd-mm-yyyy for display/storage
  const formatToDisplayDate = (isoDate) => {
    const [yyyy, mm, dd] = isoDate.split('-');
    return `${dd}-${mm}-${yyyy}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
      ...formData,
      products: editData ? formData.products : Math.floor(Math.random() * 5) + 1,
      createdDate: formatToDisplayDate(formData.createdDate)
    };

    onUpdate(dataToSave);
    onClose();
    setFormData({
      tenantsName: '',
      domain: '',
      adminEmail: '',
      subscriptionPlan: 'Free',
      status: 'Active',
      products: '',
      createdDate: formattedToday
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>{editData ? "Edit Tenant" : "Add New Tenant"}</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label>Tenant Name</label>
              <input
                type="text"
                name="tenantsName"
                value={formData.tenantsName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Domain</label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Admin Email</label>
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Subscription Plan</label>
              <select name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleChange}>
                <option value="Free">Free</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Professional">Professional</option>
                <option value="Starter">Starter</option>
              </select>
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
              <label>Created Date</label>
              <input
                type="date"
                name="createdDate"
                value={formData.createdDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="btn-row">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editData ? "Update Tenant" : "Save Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTenantModal;
