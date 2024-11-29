import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import JobList from './components/Jobs';
import Test from './components/Test';
import Applications from './components/Applications';
import Resources from './components/Resources';

function App() {
  // State to track applied jobs
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Handler to add a job to the applied jobs list
  const handleApplyJob = (job) => {
    if (!appliedJobs.some((appliedJob) => appliedJob.job_position === job.job_position)) {
      setAppliedJobs((prevJobs) => [...prevJobs, job]);
    }
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/home',
      element: <ProtectedRoute element={<Home />} />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/jobs',
      element: <JobList onApply={handleApplyJob} />, // Pass handler to JobList
    },
    {
      path: '/test/:skill',
      element: <ProtectedRoute element={<Test />} />,
    },
    {
      path: '/applications',
      element: <ProtectedRoute element={<Applications appliedJobs={appliedJobs} />} />, // Pass applied jobs to Applications
    },
    {
      path: '/upload-resume',
      element: <ProtectedRoute element={<Resources />} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
