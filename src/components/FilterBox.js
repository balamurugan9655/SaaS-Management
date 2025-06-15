const FilterBox = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <div className="search-filter-bar">
      <input
        type="text"
        placeholder="🔍︎ Search tenants..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <select
        className="filter-select"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select className="filter-select">
        <option>All Products</option>
      </select>
    </div>
  );
};

export default FilterBox;
