import html2canvas from "html2canvas";
import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);
  const qrRef = useRef(null); // Create a ref for the QR code container

  const handleQr = (e) => {
    e.preventDefault();
    setShow(true); // Show the QR code
  };

  const handleDownload = () => {
    if (qrRef.current) {
      html2canvas(qrRef.current, {
        useCORS: true, // Allow cross-origin images
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qr-code.png";
        link.click();
      });
    }
  };

  return (
    <div className="container p-5 mt-5 border rounded">
      <h1 className="text-center mb-4 text-white">QR Code Generator</h1>
      <form className="row g-3" onSubmit={handleQr}>
        <div className="col-md-8 offset-md-2">
          <input
            type="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="form-control"
            placeholder="Enter your URL"
            required
          />
        </div>
        <div className="col-12 text-center">
          <button className="btn btn-primary mt-2" type="submit">
            Generate QR Code
          </button>
        </div>
      </form>

      {show && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-4 text-center">
            <div ref={qrRef} className="qr-code-container">
              <img
                src={`https://quickchart.io/qr?text=${encodeURIComponent(url)}`}
                alt="QR Code"
                className="img-fluid border p-2"
                crossOrigin="anonymous" // Set crossorigin attribute
              />
            </div>
          </div>
          <div className="col-12 text-center mt-3">
            <button className="btn btn-success" onClick={handleDownload}>
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
