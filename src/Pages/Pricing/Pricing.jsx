import React, { useState } from "react";

const initialState = {
  type: "",
  destination: "",
  weight: "",
};

const getBreakdown = (type, destination, weight) => {
  let baseCost = 0;
  let extraCost = 0;
  let breakdown = "";
  const isSame = destination === "same";
  const weightNum = parseFloat(weight) || 0;

  if (type === "document") {
    baseCost = isSame ? 60 : 80;
    breakdown = `ডকুমেন্ট ডেলিভারি ${isSame ? "একই জেলা" : "বহির জেলা"}।`;
  } else if (type === "non-document") {
    if (weightNum <= 3) {
      baseCost = isSame ? 110 : 150;
      breakdown = `নন-ডকুমেন্ট (৩ কেজি পর্যন্ত) ${isSame ? "একই জেলা" : "বহির জেলা"}।`;
    } else {
      const extraKg = weightNum - 3;
      const perKgCharge = extraKg * 40;
      const districtExtra = isSame ? 0 : 40;
      baseCost = isSame ? 110 : 150;
      extraCost = perKgCharge + districtExtra;
      breakdown = `নন-ডকুমেন্ট (৩ কেজির বেশি) ${isSame ? "একই জেলা" : "বহির জেলা"}।\nঅতিরিক্ত চার্জ: ৪০৳ × ${extraKg.toFixed(1)} কেজি = ${perKgCharge}৳${districtExtra ? ` + ৪০৳ (বহির জেলা)` : ""}`;
    }
  }
  const total = baseCost + extraCost;
  return {
    total,
    breakdown,
    baseCost,
    extraCost,
  };
};

const Pricing = () => {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult(null);
  };

  const handleReset = () => {
    setForm(initialState);
    setResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.type || !form.destination || (form.type === "non-document" && !form.weight)) return;
    const calc = getBreakdown(form.type, form.destination, form.weight);
    setResult(calc);
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-3xl p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B2B2A] mb-4">Pricing Calculator</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>
        <hr className="my-8 border-gray-200" />
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#0B2B2A]">Calculate Your Cost</h2>
          <form className="w-full max-w-md space-y-6 bg-white rounded-xl shadow p-8" onSubmit={handleSubmit} onReset={handleReset}>
            <div>
              <label className="block font-semibold mb-2">Parcel type</label>
              <select name="type" value={form.type} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300 text-gray-700" required>
                <option value="" disabled>Select Parcel type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Delivery Destination</label>
              <select name="destination" value={form.destination} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300 text-gray-700" required>
                <option value="" disabled>Select Delivery Destination</option>
                <option value="same">একই জেলা (Same District)</option>
                <option value="outside">বহির জেলা (Outside District)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Weight (KG)</label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300 text-gray-700"
                placeholder="Weight (only for Non-Document)"
                min="0"
                step="0.1"
                disabled={form.type !== "non-document"}
                required={form.type === "non-document"}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button type="reset" className="w-1/2 py-2 rounded-md border border-lime-300 bg-white text-[#0B2B2A] font-semibold hover:bg-gray-100 transition">Reset</button>
              <button type="submit" className="w-1/2 py-2 rounded-md bg-lime-300 text-[#0B2B2A] font-semibold hover:bg-lime-400 transition">Calculate</button>
            </div>
          </form>
          {result && (
            <div className="mt-10 w-full max-w-md bg-lime-50 border border-lime-200 rounded-xl shadow p-6 text-center">
              <h3 className="text-xl font-bold text-lime-700 mb-2">Estimated Cost: <span className="text-2xl">৳{result.total}</span></h3>
              <div className="text-gray-700 whitespace-pre-line mb-2">{result.breakdown}</div>
              <div className="text-gray-500 text-sm">Base: ৳{result.baseCost} {result.extraCost > 0 && `| Extra: ৳${result.extraCost}`}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing; 