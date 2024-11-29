import React, { createContext, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const addJob = (job) => {
    // Avoid duplicates
    if (!appliedJobs.some((appliedJob) => appliedJob.job_position === job.job_position)) {
      setAppliedJobs((prevJobs) => [...prevJobs, job]);
    }
  };

  return (
    <JobContext.Provider value={{ appliedJobs, addJob }}>
      {children}
    </JobContext.Provider>
  );
};
