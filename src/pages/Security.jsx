import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

function Security() {
  const [visitors, setVisitors] = useState([]);
  const [otpInputs, setOtpInputs] = useState({});
  const [message, setMessage] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState({});

  const loadVisitors = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("https://localhost:7043/api/visitor", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();
    setVisitors(data);
  };

  const sendOtp = async (visitorId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://localhost:7043/api/Otp/generate/${visitorId}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || data.title || "Failed to generate OTP");
        return;
      }

      setGeneratedOtp({
        ...generatedOtp,
        [visitorId]: data.code || data.otp,
      });

      setMessage(`OTP generated for visitor ${visitorId}`);
    } catch {
      setMessage("Error sending OTP");
    }
  };

  const verifyAndCheckIn = async (visitorId) => {
    try {
      const token = localStorage.getItem("token");
      const code = otpInputs[visitorId];

      if (!code) {
        setMessage("Please enter OTP");
        return;
      }

      const verifyResponse = await fetch(
        `https://localhost:7043/api/Otp/verify?visitorId=${visitorId}&code=${code}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!verifyResponse.ok) {
        const errorText = await verifyResponse.text();
        console.log("Verify OTP failed:", errorText);
        setMessage(errorText || "OTP verification failed");
        return;
      }

      const checkInResponse = await fetch(
        `https://localhost:7043/api/visit/checkin/${visitorId}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!checkInResponse.ok) {
        const errorText = await checkInResponse.text();
        setMessage(errorText || "Check-in failed");
        return;
      }

      setMessage("Visitor checked in successfully");
      loadVisitors();
    } catch {
      setMessage("Error connecting to server");
    }
  };

  const checkout = async (visitorId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://localhost:7043/api/visit/checkout-by-visitor/${visitorId}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        setMessage("Checkout failed");
        return;
      }

      setMessage("Visitor checked out");
      loadVisitors();
    } catch {
      setMessage("Error during checkout");
    }
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  return (
    <AppLayout
      title="Security Check-in"
      subtitle="Generate OTP, verify visitor, and manage entry/exit"
      menuItems={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Create Walk-in Visitor", path: "/create-visitor" },
        { label: "View Visitors", path: "/visitors" },
      ]}
    >
      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>OTP</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((v) => (
              <tr key={v.visitorId}>
                <td>{v.fullName}</td>
                <td>{v.purpose}</td>
                <td>{v.status}</td>
                <td>
                  <input
                    className="input"
                    placeholder="Enter OTP"
                    value={otpInputs[v.visitorId] || ""}
                    onChange={(e) =>
                      setOtpInputs({
                        ...otpInputs,
                        [v.visitorId]: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  {(v.status === "Approved" || v.status === "OTP Sent") && (
                    <>
                      <button
                        className="btn btn-warning"
                        onClick={() => sendOtp(v.visitorId)}
                      >
                        Send OTP
                      </button>

                      <button
                        className="btn btn-success"
                        onClick={() => verifyAndCheckIn(v.visitorId)}
                      >
                        Check In
                      </button>
                    </>
                  )}
                {v.status === "Checked In" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => checkout(v.visitorId)}
                  >
                    Check Out
                  </button>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {message && <p className="message">{message}</p>}

        <div className="info-box" style={{ marginTop: "20px" }}>
          <strong>Generated OTPs (Demo Only)</strong>
          {Object.keys(generatedOtp).map((id) => (
            <p key={id}>
              Visitor {id}: {generatedOtp[id]}
            </p>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default Security;
