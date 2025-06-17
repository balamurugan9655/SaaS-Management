import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { GoPaste } from "react-icons/go";
import { useState } from "react";
import { useEffect } from "react";

const TotalList = ({tenantData}) => {

    const [totalTenants, setTotalTenants] = useState(0);
    const [totalActive, setTotalActive] = useState(0);
    const [avgProducts, setAvgProducts] = useState(0);
    const [totalFeatures, setTotalFeatures] = useState(0);

    useEffect(() => {
        setTotalTenants(tenantData.length);
        setTotalActive(tenantData.filter(t => t.status === 'Active').length)
        const productCount = tenantData.map(t => t.products);
        setAvgProducts(Math.round(productCount.reduce((sum, num) => sum + num, 0))/2);
        setTotalFeatures(18);
    },[tenantData]);

    return(
        <div className="stats-container">
            <div className="stat-card stat-purple">
                <div className="stat-icon-wrapper">
                <HiOutlineOfficeBuilding />
                </div>
                <div>
                <p>Total Tenants</p>
                <h3> {totalTenants} </h3>
                </div>
            </div>

            <div className="stat-card stat-green">
                <div className="stat-icon-wrapper">
                <FaRegCheckCircle />
                </div>
                <div>
                <p>Active Tenants</p>
                <h3> {totalActive} </h3>
                </div>
            </div>

            <div className="stat-card stat-blue">
                <div className="stat-icon-wrapper">
                <FaRegUser />
                </div>
                <div>
                <p>Avg Products/Tenant</p>
                <h3> {avgProducts} </h3>
                </div>
            </div>

            <div className="stat-card stat-pink">
                <div className="stat-icon-wrapper">
                <GoPaste />
                </div>
                <div>
                <p>Total Features Enabled</p>
                <h3> {totalFeatures} </h3>
                </div>
            </div>
        </div>

    )
}

export default TotalList;