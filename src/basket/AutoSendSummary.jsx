// SendBoilerSummary.jsx
import React, { useState } from 'react';
import axios from 'axios';

/**
 * Props:
 *   referenceCode: string — code passed down to trigger email send
 */
export default function AutoSendSummary({ referenceCode }) {
  const [status, setStatus] = useState('');

  const handleClick = async () => {
    setStatus('📨 Sending summary email…');
    try {
      const { data } = await axios.post(
        'https://api-iotdawlwvq-uc.a.run.app/sendBoilerSummary',
        { referenceCode }
      );
      if (data.success) {
        setStatus('✅ Email sent successfully!');
      } else {
        setStatus('⚠️ Unexpected server response');
      }
    } catch (err) {
      console.error('Error:', err);
      setStatus('❌ Failed: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 4 }}>
      <h3>Send Boiler Summary</h3>
      <p>Reference Code: <strong>{referenceCode}</strong></p>
      <button onClick={handleClick} disabled={!referenceCode} style={{ padding: '8px 16px' }}>
        Send Summary
      </button>
      {status && <p style={{ marginTop: 16 }}>{status}</p>}
    </div>
  );
}
