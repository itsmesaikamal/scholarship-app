import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage, setDoc, doc, uploadBytes, getDownloadURL, ref } from '../firebaseConfig';
import './Form.css';

const ReimbursementForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    vuid: '',
    scholarship: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branch: '',
    mobileNumber: '',
    admissionLetter: null,
    feePaymentChallan: null,
    passbookXerox: null,
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadFile = async (file, filePath) => {
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const admissionLetterURL = await uploadFile(formData.admissionLetter, `documents/${formData.vuid}/admissionLetter`);
      const feePaymentChallanURL = await uploadFile(formData.feePaymentChallan, `documents/${formData.vuid}/feePaymentChallan`);
      const passbookXeroxURL = await uploadFile(formData.passbookXerox, `documents/${formData.vuid}/passbookXerox`);

      const newDoc = doc(db, 'submissions', formData.vuid);
      await setDoc(newDoc, { 
        ...formData, 
        admissionLetter: admissionLetterURL,
        feePaymentChallan: feePaymentChallanURL,
        passbookXerox: passbookXeroxURL,
        status: 'submitted' 
      });
      setSuccessMessage('Form submitted successfully!');
      navigate('/check-status');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Reimbursement Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="studentName" placeholder="Name of the student" value={formData.studentName} onChange={handleChange} required />
        <input type="text" name="vuid" placeholder="VUID/Reg no" value={formData.vuid} onChange={handleChange} required />
        <input type="number" name="scholarship" placeholder="Scholarship per sem" value={formData.scholarship} onChange={handleChange} required />
        <input type="text" name="accountHolderName" placeholder="Bank account holder name" value={formData.accountHolderName} onChange={handleChange} required />
        <input type="text" name="accountNumber" placeholder="Bank account number" value={formData.accountNumber} onChange={handleChange} required />
        <input type="text" name="ifscCode" placeholder="Bank IFSC code" value={formData.ifscCode} onChange={handleChange} required />
        <input type="text" name="bankName" placeholder="Name of bank" value={formData.bankName} onChange={handleChange} required />
        <input type="text" name="branch" placeholder="Branch of bank" value={formData.branch} onChange={handleChange} required />
        <input type="text" name="mobileNumber" placeholder="Mobile number" value={formData.mobileNumber} onChange={handleChange} required />
        <label>
          Admission letter xerox:
          <input type="file" name="admissionLetter" accept=".jpg,.png,.pdf" onChange={handleChange} required />
        </label>
        <label>
          Fee payment challan xerox:
          <input type="file" name="feePaymentChallan" accept=".jpg,.png,.pdf" onChange={handleChange} required />
        </label>
        <label>
          Bank passbook xerox:
          <input type="file" name="passbookXerox" accept=".jpg,.png,.pdf" onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ReimbursementForm;
