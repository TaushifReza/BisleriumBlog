import React from 'react';

const Emailtemp = () => {
    return (
        <div style={{
            backgroundColor: '#f7f7f7',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 15px',
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: '60px',
                textAlign: 'center',
                maxWidth: '600px',
                width: '100%',
                position: 'relative',
            }}>
                <div style={{
                    backgroundColor: '#4B72FA',
                    height: '4px',
                    width: '70px',
                    margin: '0 auto 30px',
                    borderRadius: '2px',
                }} />
                <h1 style={{
                    color: '#333333',
                    fontWeight: '700',
                    fontSize: '32px',
                    marginBottom: '10px',
                    textTransform: 'none',
                }}>
                    A Warm Welcome to Bislerium!
                </h1>
                <p style={{
                    margin: '30px auto',
                    lineHeight: '1.6',
                    color: '#666666',
                    maxWidth: '450px',
                }}>
                    Hi Himani,
                </p>
                <p style={{
                    lineHeight: '1.6',
                    color: '#666666',
                    marginBottom: '30px',
                    maxWidth: '450px',
                    margin: '0 auto 30px',
                }}>
                    We're excited to have you on board. Before you dive in, let's confirm your email address to get things rolling.
                </p>
                <button style={{
                    backgroundColor: '#4B72FA',
                    color: '#ffffff',
                    padding: '12px 35px',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '20px',
                    fontWeight: '600',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.2s',
                    margin: '0 auto 30px',
                }}
                    onMouseOver={e => {
                        e.target.style.backgroundColor = '#3658A7';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={e => {
                        e.target.style.backgroundColor = '#4B72FA';
                        e.target.style.transform = 'scale(1)';
                    }}
                    onClick={() => alert('Email verified!')}>
                    Click to Verify
                </button>
                <p style={{
                    margin: '30px 0',
                    color: '#888888',
                }}>
                    If clicking the button above does not work, kindly copy and paste this link into your browser:
                </p>
                <a href="https://some-link-as-button" style={{
                    color: '#4B72FA',
                    textDecoration: 'none',
                    fontWeight: '600',
                    marginBottom: '40px',
                }}>
                    https://some-link-as-button
                </a>
                <p style={{
                    borderTop: '2px dashed #eeeeee',
                    paddingTop: '25px',
                    marginTop: '40px',
                    color: '#bbbbbb',
                    fontSize: '14px',
                }}>
                    If you did not sign up for a Bislerium account, please disregard this message.
                    <br />
                    <span style={{ display: 'block', marginTop: '15px', color: '#333333' }}>
                        Cheers,
                        <br />
                        <span style={{ fontWeight: 'bold', color: '#4B72FA' }}>The Bislerium Team</span>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Emailtemp;
