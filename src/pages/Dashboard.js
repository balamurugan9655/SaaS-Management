import { useState } from 'react';
import Navbar from '../components/Navbar';
import FilterBox from '../components/FilterBox';
import TotalList from '../components/TotalList';
import Cards from '../components/Cards';
import AddTenantModal from '../components/AddTenantModal';
import ManageProducts from '../components/ManageProducts';
import EditTenantModal from '../components/EditTenantModal';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFeatureModel, setShowFeatureModel] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tenantToEdit, setTenantToEdit] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [tenants, setTenants] = useState([
    { id: 1, name: "Acme Corporation", domain: "acme.example.com", status: "Active", plan: "Enterprise", products: 3 },
    { id: 2, name: "Globex Industries", domain: "globex.example.com", status: "Active", plan: "Professional", products: 2 },
    { id: 3, name: "Initech LLC", domain: "initech.example.com", status: "Inactive", plan: "Starter", products: 1 },
  ]);

  const handleAddTenant = (newTenant) => {
    const newId = tenants.length + 1;
    const data = { ...newTenant, id: newId };
    setTenants(prev => [...prev, data]);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure to delete this tenant?")) {
      setTenants(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleEditClick = (tenant) => {
    setTenantToEdit(tenant);
    setEditModalOpen(true);
  };

  const handleUpdateTenant = (updatedTenant) => {
    setTenants(prev =>
      prev.map(t => (t.id === updatedTenant.id ? updatedTenant : t))
    );
  };

  // Filter Logic
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.domain.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === '' || tenant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 
  
  // 

  return (
    <div className="dashboard-container1">
      <Navbar onAddClick={() => setShowModal(true)} />
      
      <FilterBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <TotalList />

      <Cards
        onAddClick={() => setShowFeatureModel(true)}
        tenants={filteredTenants}
        handleDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
      />

      <AddTenantModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddTenant}
      />

      <ManageProducts
        isOpen={showFeatureModel}
        onClose={() => setShowFeatureModel(false)}
      />

      <EditTenantModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        editData={tenantToEdit}
        onUpdate={handleUpdateTenant}
      />
    </div>
  );
};

export default Dashboard;
