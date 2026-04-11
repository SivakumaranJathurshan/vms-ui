import { useEffect, useState } from "react";

function Visitors() {
  const [visitors, setVisitors] = useState([]);

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

  const approveVisitor = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://localhost:7043/api/visitor/approve/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    loadVisitors();
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Visitors</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((v) => (
            <tr key={v.visitorId}>
              <td>{v.fullName}</td>
              <td>{v.mobile}</td>
              <td>{v.purpose}</td>
              <td>{v.status}</td>
              <td>
                {v.status === "Pending" && (
                  <button onClick={() => approveVisitor(v.visitorId)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Visitors;