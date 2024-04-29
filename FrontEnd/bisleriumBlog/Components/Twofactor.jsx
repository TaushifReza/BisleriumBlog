import React, { useState } from 'react';
import '../style/TwoFactorAuth.css';

const TwoFactor = () => {
  const [code, setCode] = useState('');

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Verification code submitted:', code);
  };

  return (
<section className="h-screen flex items-center justify-center inset-0 bg-custom">
    <div className="two-factor-auth-container">
      <div className="two-factor-auth-card">
        <div className="auth-envelope">📧</div>
        <div className="auth-content">
          <div className="auth-title"><b>Two Factor Authentication</b></div>
          
          <div className="auth-message">
                  A verification code has been sent to your email.<br></br> This code will be valid for 15 minutes.

          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="auth-input"
              placeholder="Please enter the code here"
              value={code}
              onChange={handleInputChange}
            />
                                    <button className="bg-sky-600 text-white font-medium text-xl rounded-full px-14 py-3">Verify</button>          </form>
        </div>
      </div>
    </div>
    </section>
  );
};

export default TwoFactor;
