import { useState, useEffect } from "react";
import ToDoBox from "./components/ToDoBox";
import "./assets/App.css";

const getCurrentTime = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default function App() {
  const [jobList, setJobList] = useState(
    JSON.parse(localStorage.getItem("jobList")) ?? []
  );
  const [showModal, setShowModal] = useState(false);
  const [currentJob, setCurrentJob] = useState({});

  useEffect(() => {
    localStorage.setItem("jobList", JSON.stringify(jobList));
  }, [jobList]);

  const handleClick = (job = {}) => {
    setCurrentJob(job);
    setShowModal(true);
  };

  const handleSubmit = () => {
    const setJob = {
      title: currentJob.title?.trim() || "Untitled",
      description: currentJob.description?.trim() || "No description",
    };

    if (currentJob.id !== undefined) {
      // update current job
      setJob.id = currentJob.id;
      setJob.publishTime = currentJob.publishTime;
      setJobList((prev) =>
        prev.map((job) => (job.id === currentJob.id ? setJob : job))
      );
    } else {
      // add new job
      setJob.id = jobList.length;
      setJob.publishTime = getCurrentTime();
      setJobList((prev) => [...prev, setJob]);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    const isConfirm = confirm("Are you sure you want to cancel?");
    if (isConfirm) setShowModal(false);
  };

  const deleteJob = (id) => {
    setJobList((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <div className="app-container">
      {!showModal && (
        <>
          <h1 id="introduction">TODO LIST</h1>
          <div className="job-container">
            {jobList.map((job, index) => (
              <div key={index} onClick={() => handleClick(job)}>
                <ToDoBox
                  id={job.id}
                  handleDelete={deleteJob}
                  title={job.title}
                  description={job.description}
                  publishTime={job.publishTime}
                />
              </div>
            ))}
          </div>
          <button id="add-btn" onClick={() => handleClick()}></button>
        </>
      )}
      {showModal && (
        <div className="modal">
          <input
            id="input-title"
            value={currentJob.title !== "Untitled" ? currentJob.title : ""}
            placeholder="Add title"
            onChange={(e) =>
              setCurrentJob({ ...currentJob, title: e.target.value })
            }
          />
          <textarea
            id="input-description"
            value={
              currentJob.description !== "No description"
                ? currentJob.description
                : ""
            }
            placeholder="Add description"
            onChange={(e) =>
              setCurrentJob({ ...currentJob, description: e.target.value })
            }
          ></textarea>
          <button className="submit-btn btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cancel-btn btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
