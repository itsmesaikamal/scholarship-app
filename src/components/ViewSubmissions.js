import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, getDocs, collection } from '../firebaseConfig';
import './ViewSubmission.css';  // Import the CSS file

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const submissionsCollection = collection(db, 'submissions');
      const submissionSnapshot = await getDocs(submissionsCollection);
      const submissionsList = submissionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubmissions(submissionsList);
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="view-submissions">
      <h2>Submissions</h2>
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <Link to={`/submission/${submission.id}`}>{submission.vuid}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSubmissions;
