import React from "react";
import { useDoggeCard } from "../context/DoggeCardContext";

const ProviderInfoEditor = () => {
  const {
    state,
    updateProviderInfo,
    updateTargetAudience,
    updateGeneralInclusions,
  } = useDoggeCard();
  const { providerInfo } = state.currentCard;

  const handleChange = (field, value) => {
    if (field === "year") {
      const yearValue = parseInt(value) || new Date().getFullYear();
      if (yearValue < 2020 || yearValue > 2030) {
        alert("Please enter a valid year between 2020 and 2030");
        return;
      }
    }
    updateProviderInfo({ [field]: value });
  };

  return (
    <div className="editor-section">
      <div className="section-header">
        <h3>Provider Information</h3>
        <p>Enter your contact details and basic information</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            value={providerInfo.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Your name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            value={providerInfo.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="(555) 123-4567"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={providerInfo.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="your.email@example.com"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={providerInfo.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Street address"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="apartment">Apartment/Unit</label>
          <input
            type="text"
            id="apartment"
            value={providerInfo.apartment || ""}
            onChange={(e) => handleChange("apartment", e.target.value)}
            placeholder="Apt 30E"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            value={providerInfo.year || new Date().getFullYear()}
            onChange={(e) =>
              handleChange(
                "year",
                parseInt(e.target.value) || new Date().getFullYear()
              )
            }
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="targetAudience">Target Audience</label>
        <input
          type="text"
          id="targetAudience"
          value={state.currentCard.targetAudience || ""}
          onChange={(e) => updateTargetAudience(e.target.value)}
          placeholder="SERVICES EXCLUSIVE TO 11 Hoyt Residents and direct family"
          className="form-input"
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="generalInclusions">General Inclusions</label>
        <textarea
          id="generalInclusions"
          value={state.currentCard.generalInclusions || ""}
          onChange={(e) => updateGeneralInclusions(e.target.value)}
          placeholder="All services include back and forth messaging, pictures of your pets and on-call if needed"
          className="form-textarea"
          rows={3}
        />
      </div>
    </div>
  );
};

export default ProviderInfoEditor;
