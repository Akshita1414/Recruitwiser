import React, { useState } from "react";
import Navbar from "./Navbar";
import "./JobList.css";
import axios from "axios";

const JobList = ({ onApply }) => {
  const [jobs, setJobs] = useState([]);
  const [jobType, setJobType] = useState("All");
  const [expLevel, setExpLevel] = useState("All");
  const [jobLocation, setJobLocation] = useState("All");
  const user_email = "arnav090404@gmail.com";

  const jobsData = [
    { job_position: "Frontend Developer", company_name: "Company A", job_location: "San Francisco", job_type: "Full Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "Backend Developer", company_name: "Company B", job_location: "Remote", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Web Developer", company_name: "Company C", job_location: "New York", job_type: "Part Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "Software Engineer", company_name: "Company D", job_location: "San Francisco", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "UX Designer", company_name: "Company E", job_location: "Los Angeles", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Product Manager", company_name: "Company F", job_location: "Austin", job_type: "Full Time", experience_level: "Senior Level", job_link: "#" },
    { job_position: "Mobile Developer", company_name: "Company G", job_location: "San Francisco", job_type: "Full Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "Data Scientist", company_name: "Company H", job_location: "New York", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "DevOps Engineer", company_name: "Company I", job_location: "Remote", job_type: "Full Time", experience_level: "Senior Level", job_link: "#" },
    { job_position: "Fullstack Developer", company_name: "Company J", job_location: "San Francisco", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Cloud Engineer", company_name: "Company K", job_location: "Chicago", job_type: "Part Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "QA Engineer", company_name: "Company L", job_location: "Los Angeles", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Marketing Specialist", company_name: "Company M", job_location: "Remote", job_type: "Part Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "Data Analyst", company_name: "Company N", job_location: "Austin", job_type: "Full Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "Security Engineer", company_name: "Company O", job_location: "San Francisco", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Product Designer", company_name: "Company P", job_location: "Los Angeles", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Business Analyst", company_name: "Company Q", job_location: "New York", job_type: "Full Time", experience_level: "Senior Level", job_link: "#" },
    { job_position: "Systems Architect", company_name: "Company R", job_location: "Chicago", job_type: "Full Time", experience_level: "Senior Level", job_link: "#" },
    { job_position: "Frontend Developer", company_name: "Company S", job_location: "San Francisco", job_type: "Full Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "Backend Developer", company_name: "Company T", job_location: "Remote", job_type: "Part Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Software Engineer", company_name: "Company U", job_location: "Austin", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "DevOps Engineer", company_name: "Company V", job_location: "San Francisco", job_type: "Full Time", experience_level: "Senior Level", job_link: "#" },
    { job_position: "UX/UI Designer", company_name: "Company W", job_location: "Remote", job_type: "Full Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "Mobile Developer", company_name: "Company X", job_location: "Chicago", job_type: "Part Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Product Manager", company_name: "Company Y", job_location: "Los Angeles", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Data Scientist", company_name: "Company Z", job_location: "San Francisco", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Business Analyst", company_name: "Company AA", job_location: "New York", job_type: "Full Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "QA Engineer", company_name: "Company AB", job_location: "Remote", job_type: "Full Time", experience_level: "Senior Level", job_link: "#" },
    { job_position: "Security Engineer", company_name: "Company AC", job_location: "San Francisco", job_type: "Part Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Cloud Engineer", company_name: "Company AD", job_location: "Los Angeles", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Data Analyst", company_name: "Company AE", job_location: "Austin", job_type: "Part Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "Product Designer", company_name: "Company AF", job_location: "Chicago", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Fullstack Developer", company_name: "Company AG", job_location: "Remote", job_type: "Part Time", experience_level: "Entry Level", job_link: "#" },
    { job_position: "Mobile Developer", company_name: "Company AH", job_location: "San Francisco", job_type: "Full Time", experience_level: "Mid-Senior Level", job_link: "#" },
    { job_position: "Software Engineer", company_name: "Company AI", job_location: "Los Angeles", job_type: "Full Time", experience_level: "Senior Level", job_link: "#" },
  ];

  // Function to filter jobs
  const filterJobs = () => {
    let filteredJobs = jobsData;

    if (jobType !== "All") {
      filteredJobs = filteredJobs.filter((job) => job.job_type === jobType);
    }

    if (expLevel !== "All") {
      filteredJobs = filteredJobs.filter((job) => job.experience_level === expLevel);
    }

    if (jobLocation !== "All") {
      filteredJobs = filteredJobs.filter((job) => job.job_location === jobLocation);
    }

    setJobs(filteredJobs);
  };

  // Handle Apply Now button click
  const handleApplyNow = (job) => {
    onApply(job); // Call the parent handler
    alert(`You have applied for ${job.job_position} at ${job.company_name}!`);
  };

  return (
    <>
      <Navbar />
      <div className="JobContainer">
        <div className="jobBody">
          <div className="filter-container">
            <select value={jobLocation} onChange={(e) => setJobLocation(e.target.value)}>
              <option value="All">All Locations</option>
              <option value="San Francisco">San Francisco</option>
              <option value="New York">New York</option>
              <option value="Remote">Remote</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Austin">Austin</option>
            </select>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="All">All Job Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </select>
            <select value={expLevel} onChange={(e) => setExpLevel(e.target.value)}>
              <option value="All">All Experience Levels</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid-Senior Level">Mid-Senior Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
            <button onClick={filterJobs}>Apply Filters</button>
          </div>

          <div className="job-list">
            {jobs.map((job, index) => (
              <div key={index} className="job-card">
                <div className="job-details">
                  <h3>{job.job_position}</h3>
                  <p><strong>Company:</strong> {job.company_name}</p>
                  <p><strong>Location:</strong> {job.job_location}</p>
                  <p><strong>Job Type:</strong> {job.job_type}</p>
                  <p><strong>Experience Level:</strong> {job.experience_level}</p>
                  <button onClick={() => handleApplyNow(job)} className="apply-btn">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobList;
