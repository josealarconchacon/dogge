import React, { useState } from "react";
import { useDoggeCard } from "../context/DoggeCardContext";
import { Plus, Trash2 } from "lucide-react";

const HolidayRateEditor = () => {
  const { state, updateHolidayRate } = useDoggeCard();
  const { holidayRate } = state.currentCard;
  const [newDate, setNewDate] = useState("");

  const handleToggleHolidayRate = () => {
    updateHolidayRate({ enabled: !holidayRate.enabled });
  };

  const handleAdditionalChargeChange = (value) => {
    updateHolidayRate({ additionalCharge: parseInt(value) || 0 });
  };

  const handleAddDate = () => {
    if (newDate.trim()) {
      updateHolidayRate({
        dates: [...holidayRate.dates, newDate.trim()],
      });
      setNewDate("");
    }
  };

  const handleRemoveDate = (index) => {
    const updatedDates = holidayRate.dates.filter((_, i) => i !== index);
    updateHolidayRate({ dates: updatedDates });
  };

  const handleDateChange = (index, value) => {
    const updatedDates = [...holidayRate.dates];
    updatedDates[index] = value;
    updateHolidayRate({ dates: updatedDates });
  };

  return (
    <div className="editor-section">
      <div className="section-header">
        <h3>Holiday Rates</h3>
        <p>Configure additional charges for holiday periods</p>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={holidayRate.enabled}
            onChange={handleToggleHolidayRate}
            className="checkbox-input"
          />
          <span className="checkbox-text">Enable holiday rates</span>
        </label>
      </div>

      {holidayRate.enabled && (
        <>
          <div className="form-group">
            <label htmlFor="additionalCharge">Additional Charge ($)</label>
            <input
              type="number"
              id="additionalCharge"
              value={holidayRate.additionalCharge}
              onChange={(e) => handleAdditionalChargeChange(e.target.value)}
              className="form-input"
              min="0"
              placeholder="10"
            />
          </div>

          <div className="form-group">
            <label>Holiday Dates</label>
            <div className="dates-list">
              {holidayRate.dates.map((date, index) => (
                <div key={index} className="date-item">
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                    className="form-input"
                    placeholder="Jan 17-20, 2025"
                  />
                  <button
                    onClick={() => handleRemoveDate(index)}
                    className="remove-btn"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="add-date-section">
              <input
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="form-input"
                placeholder="Add new holiday date range"
                onKeyPress={(e) => e.key === "Enter" && handleAddDate()}
              />
              <button onClick={handleAddDate} className="add-btn">
                <Plus size={16} />
                Add Date
              </button>
            </div>
          </div>

          <div className="info-box">
            <p>
              <strong>Example formats:</strong>
            </p>
            <ul>
              <li>Jan 17-20, 2025</li>
              <li>Dec 24, 2025 - Jan 1, 2026</li>
              <li>Jul 4-6, 2025</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default HolidayRateEditor;
