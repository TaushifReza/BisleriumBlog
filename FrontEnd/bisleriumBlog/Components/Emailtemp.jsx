import React from 'react';

const EmailVerificationTemplate = () => {
  return (
    <div style={{
      backgroundColor: '#f4f4f4',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px 20px',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
      }}>
        <h1 style={{
          color: '#4B72FA',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          marginTop: '0',
        }}>
          Welcome to Bislerium!
        </h1>
        <h2 style={{
          color: '#333333',
        }}>
          Let's confirm your email
        </h2>
        <p style={{
          lineHeight: '1.6',
          color: '#555',
        }}>
          Hi Jane,
        </p>
        <p style={{
          lineHeight: '1.6',
          color: '#555',
        }}>
          We're excited to have you get started. First, you need to confirm your email address. Just press the button below.
        </p>
        <button style={{
          backgroundColor: '#4B72FA',
          color: '#ffffff',
          padding: '15px 30px',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '18px',
          margin: '20px 0',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s',
        }}
        onMouseOver={e => e.target.style.backgroundColor = '#3658A7'}
        onMouseOut={e => e.target.style.backgroundColor = '#4B72FA'}
        onClick={() => alert('Email verified!')}>
          Verify Email
        </button>
        <p style={{
          margin: '20px 0',
          color: '#999',
        }}>
          If that doesn't work, copy and paste the following link into your browser:
        </p>
        <a href="https://some-link-as-button" style={{
          color: '#4B72FA',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}>
          https://some-link-as-button
        </a>
        <p style={{
          borderTop: '1px solid #eee',
          paddingTop: '20px',
          marginTop: '30px',
          color: '#999',
        }}>
          If you did not create an account with Bislerium, no further action is required.
        </p>
        <p style={{
          color: '#4B72FA',
          fontWeight: 'bold',
        }}>
          The Bislerium Team
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationTemplate;
