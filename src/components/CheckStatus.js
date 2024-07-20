import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import './Status.css';

const CheckStatus = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const querySnapshot = await getDocs(collection(db, 'submissions'));
      const submissionData = [];
      querySnapshot.forEach((doc) => {
        submissionData.push({ id: doc.id, ...doc.data() });
      });
      setSubmissions(submissionData);
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="status-container">
      <h2>Check Status</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table className="status-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Registration Number</th>
              <th>Status</th>
              <th>Conclusion</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.studentName}</td>
                <td>{submission.vuid}</td>
                <td>{submission.status}</td>
                <td>{submission.conclusion || 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckStatus;
