import { useEffect, useState } from "react";

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

      console.log(data);
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

      setGeneratedOtp({
        ...generatedOtp,
        [visitorId]: "",
      });

      setOtpInputs({
        ...otpInputs,
        [visitorId]: "",
      });

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
    <div style={{ padding: "40px" }}>
      <h2>Security Check-in</h2>

      <table border="1" cellPadding="10">
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
                {v.status === "Approved" && (
                  <>
                    <button onClick={() => sendOtp(v.visitorId)}>
                      Send OTP
                    </button>

                    <button
                      onClick={() => verifyAndCheckIn(v.visitorId)}
                      style={{ marginLeft: "10px" }}
                    >
                      Verify OTP & Check In
                    </button>

                    <button
                      onClick={() => checkout(v.visitorId)}
                      style={{ marginLeft: "10px" }}
                    >
                      Check Out
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>{message}</p>

      {/* For demo only */}
      <div style={{ marginTop: "20px" }}>
        <h4>Generated OTPs (Demo Only)</h4>
        {Object.keys(generatedOtp).map((id) => (
          <p key={id}>
            Visitor {id}: {generatedOtp[id]}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Security;