import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { FiSearch, FiX, FiChevronRight } from 'react-icons/fi';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const position = [23.6850, 90.3563]; // Center of Bangladesh

// Custom icon
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function FlyToDistrict({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12, { duration: 1.5 });
    }
  }, [coords, map]);
  return null;
}

const BangladeshMap = ({ serviceCenters }) => {
  const [searchText, setSearchText] = useState('');
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [filteredCenters, setFilteredCenters] = useState(serviceCenters);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setFilteredCenters(serviceCenters);
  }, [serviceCenters]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      setFilteredCenters(serviceCenters);
      return;
    }
    
    const filtered = serviceCenters.filter(d =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCenters(filtered);
    
    if (filtered.length > 0) {
      setActiveCoords([filtered[0].latitude, filtered[0].longitude]);
      setActiveDistrict(filtered[0].district);
    }
  };

  const handleDistrictClick = (center) => {
    setActiveCoords([center.latitude, center.longitude]);
    setActiveDistrict(center.district);
    setSearchText(center.district);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchText('');
    setFilteredCenters(serviceCenters);
    setActiveCoords(null);
    setActiveDistrict(null);
  };

  return (
    <div className="h-[800px] w-full rounded-xl overflow-hidden shadow-2xl relative border border-gray-200">
      {/* Search Container */}
      <div className="absolute top-6 left-6 right-6 z-[1000] flex flex-col max-w-md">
        <form
          onSubmit={handleSearch}
          className="relative flex bg-white rounded-lg shadow-md"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search district..."
            className="flex-1 pl-10 pr-4 py-3 rounded-l-lg outline-none text-gray-700"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          {searchText && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-2 text-gray-500 hover:text-gray-700"
            >
              <FiX />
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Suggestions dropdown */}
        {showSuggestions && searchText && (
          <div className="mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredCenters.length > 0 ? (
              filteredCenters.map((center) => (
                <div
                  key={center.district}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between"
                  onClick={() => handleDistrictClick(center)}
                >
                  <span className="font-medium">{center.district}</span>
                  <FiChevronRight className="text-gray-400" />
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500">No districts found</div>
            )}
          </div>
        )}
      </div>

      {/* Map Container */}
      <MapContainer 
        center={position} 
        zoom={7} 
        scrollWheelZoom={true} 
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToDistrict coords={activeCoords} />

        {filteredCenters.map((center) => (
          <Marker
            key={center.district}
            position={[center.latitude, center.longitude]}
            icon={customIcon}
            eventHandlers={{
              click: () => {
                setActiveDistrict(center.district);
                setSearchText(center.district);
              },
            }}
          >
            <Popup autoOpen={center.district === activeDistrict} className="custom-popup">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-blue-600">{center.district}</h3>
                <div>
                  <h4 className="font-semibold text-sm">Covered Areas:</h4>
                  <ul className="list-disc list-inside text-sm">
                    {center.covered_area.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 z-[1000] flex flex-col space-y-2">
        <button
          onClick={() => setActiveCoords(position)}
          className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          title="Reset view"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BangladeshMap;