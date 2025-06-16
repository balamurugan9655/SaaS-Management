import { useState } from 'react';
import Navbar from '../components/Navbar';
import FilterBox from '../components/FilterBox';
import TotalList from '../components/TotalList';
import Cards from '../components/Cards';
import AddTenantModal from '../components/AddTenantModal';
import ManageProducts from '../components/ManageProducts';
import EditTenantModal from '../components/EditTenantModal';
import { useUser } from "../components/UserContext";
import { useEffect } from 'react';
import axios from "../utils/axios";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFeatureModel, setShowFeatureModel] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tenantToEdit, setTenantToEdit] = useState(null);

  // 
  const { userData } = useUser();
  console.log(userData);
  // 

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  

  const features = [
    {
      id:'pipeline',
      name: 'Deal Pipeline',
      enabled: false
    },
    {
      id:'task',
      name: 'Task Management',
      enabled: false
    },
    {
      id:'email',
      name: 'Email Integration',
      enabled: false
    },
    {
      id:'reporting',
      name: 'Advanced Reporting',
      enabled: false
    },
    {
      id:'analytics',
      name: 'Analytics',
      enabled: false
    },
    {
      id:'dashboards',
      name: 'Custom Dashboards',
      enabled: false
    },
    {
      id:'scheduled',
      name: 'Scheduled Reports',
      enabled: false
    },
    {
      id:'export',
      name: 'Data Export',
      enabled: false
    },
    {
      id:'api',
      name: 'API Access',
      enabled: false
    },
    {
      id:'predictive',
      name: 'Predictive Analytics',
      enabled: false
    },
    {
      id:'marketing',
      name: 'Marketing',
      enabled: false
    },
    {
      id:'support',
      name: 'Support',
      enabled: false
    }
  ];

  const [tenants, setTenants] = useState([]);

  const fetchData = async () => {
      try {
        const res = await axios.get('/tenants')
        setTenants(res.data)
      } catch (err) {
        alert(err.response?.data?.msg || "Something went wrong");
      }
    }

  useEffect(()=>{
    // const data = tenants.map(t => ({...t, features: features.map(f => ({...f})) }));
    // setTenants(data);

    fetchData();

  },[]);

  // console.log(tenants);

  // const handleAddTenant = (newTenant) => {
  //   const newId = tenants.length + 1;
  //   const data = { ...newTenant, id: newId, features: features };
  //   setTenants(prev => [...prev, data]);
  // };

  const handleAddTenant = async (newTenant) => {
    const data = {...newTenant, features: features}
    try {
      console.log(data)
      const res = await axios.post('/tenants', data );
      alert(res.data.msg)
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };
  
  // const sample = tenants.map(i => console.log(i.features))
  // console.log(sample);

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure to delete this tenant?")) {
      // setTenants(prev => prev.filter(t => t._id !== id));
      try {
        const res = await axios.delete(`/tenants/${id}`)
        alert(res.data.msg);
        fetchData();
      } catch (err) {
        alert(err.response?.data?.msg || "Something went wrong");
      }
    }
  };

  const handleEditClick = (tenant) => {
    setTenantToEdit(tenant);
    setEditModalOpen(true);
  };

  const handleUpdateTenant = async (updatedTenant) => {
    // setTenants(prev =>
    //   prev.map(t => (t._id === updatedTenant._id ? updatedTenant : t))
    // );
    const id = updatedTenant._id;
    try {
      const res = await axios.put(`/tenants/${id}`,updatedTenant);
      alert(res.data.msg);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  // Filter Logic
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.tenantsName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.domain.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === '' || tenant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 
  const [userFeatureAccess, setUserFeatureAccess] = useState([])
    const featuresAccess = (id) => {
      setShowFeatureModel(true);
      console.log(id);
      const data = tenants.find(t => t._id === id);
      setUserFeatureAccess(data.features)
    }

    // console.log(userFeatureAccess);

    // const handelUpdateFeatureAccess = (featuresState) => {
    //   setShowFeatureModel(false)
    // }

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
        onAddClick={featuresAccess}
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
        togglesData={userFeatureAccess}
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
