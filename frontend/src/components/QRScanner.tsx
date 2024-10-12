import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";
import { IonButton, IonItem, useIonRouter } from "@ionic/react";

interface QrScannerProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

const QrReader: React.FC<QrScannerProps> = ({
  setModalIsOpen,
}) => {
  const router = useIonRouter();

  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    console.log(result.data);
    setScannedResult(result.data);
    scanner.current?.stop();
    const cleanResult = result.data.replace('https://', '');
    const parts = cleanResult?.split('/');
    if(parts[0] === '12.viscon-hackathon.ch') {
      setModalIsOpen(false);
      router.push('/create/'+parts[2])
    } else {
      setModalIsOpen(false);
      alert('Invalid QR Code');
    }
    
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <>
      <div className="qr-reader">
            {/* QR */}
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box">
              <img
                src={QrFrame}
                alt="Qr Frame"
                width={256}
                height={256}
                className="qr-frame"
              />
            </div>
        </div>      
    </>
  );
};

export default QrReader;
