import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as CompanyServer from "./CompanyServer";

const CompanyForm = () => {

    const initialState = { id: 0, name: '', website: '', foundation: 1900 };
    const [company, setCompany] = useState(initialState, []);

    const history = useNavigate();
    const params = useParams();

    const handleInputChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    };


    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFormSubmitted(true);
        // Realiza la validación personalizada y el envío del formulario aquí

        if (e.currentTarget.checkValidity()) {
            try {
                let res;
                if (!params.id) {
                    res = await CompanyServer.registerCompany(company);
                    const data = await res.json();
                    if (data.message === 'Success') {
                        setCompany(initialState);
                    }
                } else {
                    await CompanyServer.updateCompany(params.id, company);
                }

                history('/');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getCompany = async (companyId) => {
        try {
            const res = await CompanyServer.getCompany(companyId);
            const data = await res.json();
            const { name, foundation, website } = data.company;
            setCompany({ name, foundation, website });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            getCompany(params.id)
        }
    }
        // eslint-disable-next-line
        , []);

    return (
        <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">Company</h2>
            <form className={`needs-validation ${isFormSubmitted ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
                <div className="mb-3 ">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" name="name" value={company.name} onChange={handleInputChange} minLength={2} maxLength={50} autoFocus required />
                    <div className="invalid-feedback">
                        Please select a valid name.!
                    </div>
                </div>
                <div className="mb-3 ">
                    <label htmlFor="name" className="form-label">Website:</label>
                    <input type="url" className="form-control" name="website" value={company.website} onChange={handleInputChange} minLength={2} maxLength={150} required />
                    <div className="invalid-feedback">
                        Please select a valid website.!
                    </div>
                </div>
                <div className="mb-3 ">
                    <label htmlFor="foundation" className="form-label">Foundation:</label>
                    <input type="number" className="form-control" name="foundation" value={company.foundation} onChange={handleInputChange} min={1900} max={2023} required />
                    <div className="invalid-feedback">
                        Please select a valid foundation.!
                    </div>
                </div>

                {
                    params.id ? (
                        <div className="d-grip gap-2">
                            <button type="submit" className="btn btn-primary form-control">Update</button>
                        </div>
                    ) : (
                        <div className="d-grip gap-2">
                            <button type="submit" className="btn btn-success form-control">Register</button>
                        </div>
                    )
                }

            </form>
        </div>

    );
};

export default CompanyForm