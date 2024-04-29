import '../style/MFA.css';

function MFA() {
    const handleCodeCopy = () => {
      navigator.clipboard.writeText("HLA8G4LIB9ZX4");
     
    };
  
    return (
        <section className="h-screen flex items-center justify-center inset-0 bg-custom">

<div className="authenticator-container mx-auto w-1/2">
        <div className="authenticator-header">
          <h1>Scan QR code</h1>
          <p>Scan this QR code in-app to verify a device.</p>
        </div>
        <div className="authenticator-body">
          <img src="../assets/qr.png" alt="QR Code" />
          <div className="manual-code">
            <p>or enter the code manually</p>
            <div className="code-container">
              <span>HLA8G4LIB9ZX4</span>
              <button onClick={handleCodeCopy} className="copy-button">📋</button>
            </div>
          </div>
        </div>
        <button className="continue-button">Continue</button>
      </div>
      </section>
    );
  }
  
  export default MFA;