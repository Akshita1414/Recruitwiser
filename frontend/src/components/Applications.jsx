import React from 'react';
import './Applications.css';
import Navbar from "./Navbar";

const Applications = ({ appliedJobs }) => {
  return (
    <>
    <Navbar />
    <div className="applications-container">
    <h1 className="applications-title">My Applications</h1>
    {appliedJobs.length > 0 ? (
      <div className="applications-grid">
      {appliedJobs.map((job, index) => (
        <div key={index} className="job-card">
        <div className="job-card-header">
        <h3>{job.job_position}</h3>
        <p className="job-company">{job.company_name}</p>
        </div>
        <div className="job-card-body">
        <p><strong>Location:</strong> {job.job_location}</p>
        <p><strong>Type:</strong> {job.job_type}</p>
        <p><strong>Experience:</strong> {job.experience_level}</p>
        </div>
        <div className="job-card-footer">
        <button className="details-button">View Details</button>
        </div>
        </div>
        ))}
        </div>
        ) : (
        <p className="no-applications">No jobs applied yet. Start applying now!</p>
        )}
        </div>
        </>
        );
        };
        
        export default Applications;
        