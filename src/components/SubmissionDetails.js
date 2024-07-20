import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, getDoc, doc, updateDoc } from '../firebaseConfig';
import './SubmissionDetails.css';

const SubmissionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      const docRef = doc(db, 'submissions', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSubmission(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchSubmission();
  }, [id]);

  const handleDecision = async (status, conclusion) => {
    const docRef = doc(db, 'submissions', id);
    await updateDoc(docRef, { status, conclusion });
    navigate('/admin');
  };

  if (!submission) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="submission-details">
      <h2 className="submission-details__title">Submission Details</h2>
      <div className="submission-details__content">
        <p className="submission-details__item"><strong>Student Name:</strong> {submission.studentName}</p>
        <p className="submission-details__item"><strong>VUID:</strong> {submission.vuid}</p>
        <p className="submission-details__item"><strong>Scholarship:</strong> {submission.scholarship}</p>
        <p className="submission-details__item"><strong>Account Holder Name:</strong> {submission.accountHolderName}</p>
        <p className="submission-details__item"><strong>Account Number:</strong> {submission.accountNumber}</p>
        <p className="submission-details__item"><strong>IFSC Code:</strong> {submission.ifscCode}</p>
        <p className="submission-details__item"><strong>Bank Name:</strong> {submission.bankName}</p>
        <p className="submission-details__item"><strong>Branch:</strong> {submission.branch}</p>
        <p className="submission-details__item"><strong>Mobile Number:</strong> {submission.mobileNumber}</p>
        <p className="submission-details__item"><strong>Admission Letter:</strong> <a href={submission.admissionLetter} target="_blank" rel="noopener noreferrer">View</a></p>
        <p className="submission-details__item"><strong>Fee Payment Challan:</strong> <a href={submission.feePaymentChallan} target="_blank" rel="noopener noreferrer">View</a></p>
        <p className="submission-details__item"><strong>Passbook Xerox:</strong> <a href={submission.passbookXerox} target="_blank" rel="noopener noreferrer">View</a></p>
      </div>
      <div className="submission-details__actions">
        <button className="btn btn--accept" onClick={() => handleDecision('accepted', 'Accepted')}>Accept</button>
        <button className="btn btn--reject" onClick={() => handleDecision('rejected', 'Rejected')}>Reject</button>
      </div>
    </div>
  );
};

export default SubmissionDetails;
