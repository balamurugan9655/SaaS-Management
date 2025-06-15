import Brandicon from "../assets/image/Brand-icon.png"

const Navbar = ({onAddClick}) => {
    return(
      <nav className="navbar">
        <div className="navbar-left">
          <img src={Brandicon} alt="Brand-Icon" width={20} className="brand-icon" />
          <span className="navbar-title">SaaS Tenant Manager</span>
        </div>
        <button className="btn-add" onClick={onAddClick}>+ Add New Tenant</button>
      </nav>
    )
}

export default Navbar;