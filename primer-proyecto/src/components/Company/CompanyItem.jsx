import React from "react";
import * as CompanyServer from './CompanyServer';
import { useNavigate } from "react-router-dom";

const CompanyItem = ({ company, listCompanies }) => {
    // console.log(company);
    const history = useNavigate();

    const handleDelete = async (companyId) =>{
        await CompanyServer.deleteCompany(companyId);
        listCompanies();
    };

    return(
        <div className="col-md-4 mb-4">
            <div className="card card-body">
                <h3 className="card-title">
                    {company.name}
                    <button className="btn btn-info btn-sm ms-2" onClick={()=>history(`/updateCompany/${company.id}`)}>Update</button>
                </h3>
                <p className="card-text">Founded: <strong>{company.foundation}</strong></p>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Go to website</a>
                <button className="btn btn-danger my-2" onClick={()=> company.id && handleDelete(company.id)}>Delete company</button>
            </div>
        </div>
    );
};

export default CompanyItem 