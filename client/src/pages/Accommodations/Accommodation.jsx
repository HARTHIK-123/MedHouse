import { Link } from "react-router-dom";

function Accommodation() {
  return (
    <div className="accommodation-container">
      <div className="dashboard-card">
        <h1 className="page-title">Accommodation</h1>
        <div className="button-container">
          <Link to="/accommodation/form" className="btn btn-primary">
            Add New Accommodation
          </Link>
          <div></div>
          <Link to="/accommodation/inquire" className="btn btn-primary">
            Room Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Accommodation;
