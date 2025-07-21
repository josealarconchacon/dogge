import React, { useState } from "react";
import { X, Save } from "lucide-react";

const ServiceEditor = ({ service, onSave, onCancel }) => {
  const [editedService, setEditedService] = useState({ ...service });

  const handleChange = (field, value) => {
    setEditedService((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedService);
  };

  const iconOptions = [
    "🏠",
    "☀️",
    "🌙",
    "🤝",
    "🦮",
    "🐕",
    "🐱",
    "🐾",
    "🏡",
    "🌳",
    "🚶",
    "🎾",
    "🦴",
    "💧",
    "🍽️",
  ];

  return (
    <div className="service-editor">
      <div className="editor-header">
        <h4>Edit Service</h4>
        <div className="editor-actions">
          <button onClick={handleSave} className="save-btn">
            <Save size={16} />
            Save
          </button>
          <button onClick={onCancel} className="cancel-btn">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="serviceName">Service Name</label>
            <input
              type="text"
              id="serviceName"
              value={editedService.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="form-input"
              placeholder="BOARDING"
            />
          </div>

          <div className="form-group">
            <label htmlFor="serviceIcon">Icon</label>
            <div className="icon-selector">
              <input
                type="text"
                id="serviceIcon"
                value={editedService.icon}
                onChange={(e) => handleChange("icon", e.target.value)}
                className="form-input"
                maxLength={2}
              />
              <div className="icon-options">
                {iconOptions.map((icon, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleChange("icon", icon)}
                    className="icon-option"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="basePrice">Base Price ($)</label>
            <input
              type="number"
              id="basePrice"
              value={editedService.basePrice}
              onChange={(e) =>
                handleChange("basePrice", parseInt(e.target.value) || 0)
              }
              className="form-input"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="additionalPetPrice">Additional Pet Price ($)</label>
            <input
              type="number"
              id="additionalPetPrice"
              value={editedService.additionalPetPrice}
              onChange={(e) =>
                handleChange(
                  "additionalPetPrice",
                  parseInt(e.target.value) || 0
                )
              }
              className="form-input"
              min="0"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="includedFeature">Included Feature</label>
          <input
            type="text"
            id="includedFeature"
            value={editedService.includedFeature || ""}
            onChange={(e) => handleChange("includedFeature", e.target.value)}
            className="form-input"
            placeholder="DOG WALK INCLUDED"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="specificTerms">Specific Terms/Hours</label>
          <input
            type="text"
            id="specificTerms"
            value={editedService.specificTerms || ""}
            onChange={(e) => handleChange("specificTerms", e.target.value)}
            className="form-input"
            placeholder="Check-in: 7 AM - Check-out: next day at 12 PM"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={editedService.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="form-textarea"
            rows={4}
            placeholder="Describe your service in detail..."
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceEditor;
