import { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { isLoading, isError, data: riders = [], refetch, error } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  const handleDecision = async (id, action, email) => {
    const confirm = await Swal.fire({
      title: `${action === "approve" ? "Approve" : "Reject"} Application?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}/status`, {
        status: action === "approve" ? "active" : "rejected",
        email, // email পাস করলাম backend update এর জন্য
      });

      await refetch();
      Swal.fire("Success", `Rider ${action}d successfully`, "success");
    } catch (err) {
      Swal.fire("Error", "Could not update rider status", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin h-10 w-10 border-b-2 border-green-600 rounded-full"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-semibold mt-6">
        Error: {error?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Pending Rider Applications
      </h2>

      {riders.length === 0 ? (
        <div className="text-center text-gray-500">No pending applications found.</div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-green-100 text-green-800 text-sm font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Region</th>
                <th className="px-4 py-3 text-left">District</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Applied</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr key={rider._id} className="hover:bg-green-50">
                  <td className="px-4 py-3">{rider?.name}</td>
                  <td className="px-4 py-3">{rider?.email}</td>
                  <td className="px-4 py-3">{rider?.region || "N/A"}</td>
                  <td className="px-4 py-3">{rider?.district || "N/A"}</td>
                  <td className="px-4 py-3">{rider?.phone || "N/A"}</td>
                  <td className="px-4 py-3">{new Date(rider.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedRider(rider)}
                        className="btn btn-sm btn-info"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleDecision(rider._id, "approve", rider.email)}
                        className="btn btn-sm btn-success"
                        title="Approve"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleDecision(rider._id, "reject", rider.email)}
                        className="btn btn-sm btn-error"
                        title="Reject"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal without black background */}
      {selectedRider && (
        <div className="fixed top-20 right-10 left-10 z-50 bg-white shadow-xl border border-gray-300 rounded-lg p-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-xl font-bold">Rider Application Details</h3>
            <button
              onClick={() => setSelectedRider(null)}
              className="text-gray-500 hover:text-red-500"
              title="Close"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Name" value={selectedRider.name} />
            <DetailItem label="Email" value={selectedRider.email} />
            <DetailItem label="Phone" value={selectedRider.phone || "N/A"} />
            <DetailItem label="Age" value={selectedRider.age || "N/A"} />
            <DetailItem label="NID" value={selectedRider.nid || "N/A"} />
            <DetailItem label="Bike Brand" value={selectedRider.bike_brand || "N/A"} />
            <DetailItem label="Bike Registration" value={selectedRider.bike_registration || "N/A"} />
            <DetailItem label="Region" value={selectedRider.region || "N/A"} />
            <DetailItem label="District" value={selectedRider.district || "N/A"} />
            <DetailItem label="Applied At" value={new Date(selectedRider.created_at).toLocaleString()} />
          </div>

          {selectedRider.note && (
            <div className="mt-4">
              <DetailItem label="Note" value={selectedRider.note} />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => {
                handleDecision(selectedRider._id, "approve", selectedRider.email);
                setSelectedRider(null);
              }}
              className="btn btn-success"
            >
              <FaCheck className="mr-2" /> Approve
            </button>
            <button
              onClick={() => {
                handleDecision(selectedRider._id, "reject", selectedRider.email);
                setSelectedRider(null);
              }}
              className="btn btn-error"
            >
              <FaTimes className="mr-2" /> Reject
            </button>
            <button onClick={() => setSelectedRider(null)} className="btn btn-outline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className="text-sm font-semibold text-gray-700 break-words">{value || "N/A"}</p>
  </div>
);

export default PendingRiders;
