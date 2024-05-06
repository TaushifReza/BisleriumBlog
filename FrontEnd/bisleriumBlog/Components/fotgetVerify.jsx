import React, { useState } from "react";
import "../style/TwoFactorAuth.css";

const ForgetVerify = () => {

  return (
    <section className="h-screen flex items-center justify-center inset-0 bg-custom">
      <div className="two-factor-auth-container">
        <div className="two-factor-auth-card">
          <div className="auth-envelope">📧</div>
          <div className="auth-content">
            <div className="auth-title">
              <b>Please Check Your Email</b>
            </div>

            <div className="auth-message"></div>
            Verification link has been sent to your email.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetVerify;
