import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { GoPaste } from "react-icons/go";

const TotalList = () => {
    return(
        <div className="stats-container">
            <div className="stat-card stat-purple">
                <div className="stat-icon-wrapper">
                <HiOutlineOfficeBuilding />
                </div>
                <div>
                <p>Total Tenants</p>
                <h3>3</h3>
                </div>
            </div>

            <div className="stat-card stat-green">
                <div className="stat-icon-wrapper">
                <FaRegCheckCircle />
                </div>
                <div>
                <p>Active Tenants</p>
                <h3>2</h3>
                </div>
            </div>

            <div className="stat-card stat-blue">
                <div className="stat-icon-wrapper">
                <FaRegUser />
                </div>
                <div>
                <p>Avg Products/Tenant</p>
                <h3>2.0</h3>
                </div>
            </div>

            <div className="stat-card stat-pink">
                <div className="stat-icon-wrapper">
                <GoPaste />
                </div>
                <div>
                <p>Total Features Enabled</p>
                <h3>18</h3>
                </div>
            </div>
        </div>

    )
}

export default TotalList;