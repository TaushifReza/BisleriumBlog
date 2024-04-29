import React from 'react';
import '../style/TwoFactorAuth.css';
// If you have an image you want to use, import it here
import emailImage from '../assets/envelope1.png';

const EmailVerify = () => {
  return (
    <section className="email-verify-section bg-custom">
      <div className="email-verify-container">
        <div className="email-image-container">
          <img
            src={emailImage}
            alt="Check Your Email"
            className="email-image"
          />
        </div>
        <h1 className="email-verify-title">Verify Your Email</h1>
        <hr className="title-separator" />
        <p className="email-verify-message">
          Please check your email to verify your account. If you don't see it,
          make sure to check your spam folder.
        </p>
        <hr />
        <a href="/resend" className="email-resend-link">
          Didn't receive an email? Click here to resend.
        </a>
      </div>
    </section>
  );
};

export default EmailVerify;
