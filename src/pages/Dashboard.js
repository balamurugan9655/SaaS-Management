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

    fetchData();

  },[]);

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


  const handleDeleteClick = async (id) => {
    if(userData.accountType === 'admin') {
       if (window.confirm("Are you sure to delete this tenant?")) {
        
        try {
          const res = await axios.delete(`/tenants/${id}`)
          alert(res.data.msg);
          fetchData();
        } catch (err) {
          alert(err.response?.data?.msg || "Something went wrong");
        }
      }
    }
    else {
      alert('Admin Access Only')
    }
  };

  const handleEditClick = (tenant) => {
    if(userData.accountType === 'admin') {
      setTenantToEdit(tenant);
      setEditModalOpen(true);
    }
    else {
      alert('Admin Access Only')
    }
  };

  const handleUpdateTenant = async (updatedTenant) => {
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
    const featuresAccess = async (id) => {
      if(userData.accountType === 'admin') {
        try {
          const res = await axios.get(`/tenants/${id}/features`);
          console.log(res.data);
          setUserFeatureAccess(res.data);
          setShowFeatureModel(true);
        } catch (err) {
          alert(err.response?.data?.msg || "Something went wrong");
        }
      }
      else {
        alert('Admin Access Only')
      }
    }

    const refreshData = () => {
      setShowFeatureModel(false);
      fetchData();
    }

  // 
  const addTenantClick = ()=> {
    if(userData.accountType === 'admin') {
      setShowModal(true)
    }
    else {
      alert('Admin Access Only')
    }
  }

  return (
    <div className="dashboard-container1">
      <Navbar onAddClick={addTenantClick} />
      
      <FilterBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <TotalList 
        tenantData={tenants}
      />

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
        onClose={refreshData}
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
