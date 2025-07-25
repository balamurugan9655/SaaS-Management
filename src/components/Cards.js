// Cards.js
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Cards = ({ onAddClick, tenants, handleDeleteClick, onEditClick }) => {
  return (
    <div className='card-list'>
      {tenants.map((tenant) => (
        <div className='card-info' key={tenant._id}>
          <div>
            <div className="tenant-initials">
              {tenant?.tenantsName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <h4>{tenant.tenantsName}</h4>
              <p className="domain">{tenant.domain}</p>
            </div>
          </div>
          <div>
            <div className="tenant-tags">
              <span className={`tag ${tenant.status.toLowerCase()}`}>{tenant.status}</span>
              <span className={`tag plan ${tenant.subscriptionPlan.toLowerCase()}`}>{tenant.subscriptionPlan}</span>
            </div>
            <p className="products">{tenant.products} Products</p>
          </div>
          <div className="bottom-row">
            <button type='button' className='manage-products' onClick={() => onAddClick(tenant._id)}>
              Manage Products
            </button>
            <div className="icons">
              <MdEdit className="icon edit" onClick={() => onEditClick(tenant)} />
              <RiDeleteBin6Fill className="icon delete" onClick={() => handleDeleteClick(tenant._id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
