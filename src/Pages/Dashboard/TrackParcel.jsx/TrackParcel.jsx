import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTrackingLogger from '../../../hooks/useTrackingLogger';

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState('');
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { logTracking } = useTrackingLogger();

  const handleTrack = async () => {
    const trimmedId = trackingId.trim();

    if (!trimmedId) {
      setError('⚠️ Please enter a tracking ID');
      setLogs([]);
      setSuccess('');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axiosSecure.get(`/trackings/${trimmedId}`);
      
      if (res.data && res.data.length > 0) {
        setLogs(res.data);
        setSuccess('✅ Tracking history loaded successfully.');
        setError('');

        // Log this tracking view attempt as a system record
        await logTracking({
          tracking_id: trimmedId,
          status: 'viewed',
          details: 'User viewed parcel tracking history',
          location: 'user-side', // You can dynamically update based on region or IP
          updated_by: 'guest-user', // Or logged-in email if available
        });
      } else {
        setLogs([]);
        setError('No tracking history found for this ID');
      }
    } catch (err) {
      setLogs([]);
      setError('❌ Tracking ID not found or server error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 Track Your Parcel</h2>

      <input
        type="text"
        placeholder="Enter Tracking ID (e.g. PCL-20250624-WH0XG)"
        className="input input-bordered w-full mb-4"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleTrack();
          }
        }}
      />

      <button
        onClick={handleTrack}
        disabled={loading}
        className={`w-full py-2 px-4 rounded font-semibold transition duration-300 ${
          loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? '🔄 Tracking...' : '🚚 Track Parcel'}
      </button>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mt-4 text-center">{success}</p>}

      {logs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2">📜 Tracking History:</h3>
          <ul className="space-y-3">
            {logs.map((log, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded shadow-sm border">
                <p><strong>Status:</strong> {log.status}</p>
                <p><strong>Message:</strong> {log.message}</p>
                <p><strong>Time:</strong> {new Date(log.time).toLocaleString('en-BD', {
                  year: 'numeric', month: 'short', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}</p>
                {log.updated_by && <p><strong>Updated By:</strong> {log.updated_by}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
