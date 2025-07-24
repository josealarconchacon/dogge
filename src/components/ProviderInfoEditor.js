import React from "react";
import { useDoggeCard } from "../context/DoggeCardContext";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  Users,
  Info,
} from "lucide-react";

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
      <div className="section-header mb-4">
        <h3 className="h3 fw-bold mb-2">Provider Information</h3>
        <p className="text-muted mb-0">
          Enter your contact details and basic information
        </p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label fw-semibold d-flex align-items-center gap-2"
            >
              <User size={16} />
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={providerInfo.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your name"
              className="form-control"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label
              htmlFor="phone"
              className="form-label fw-semibold d-flex align-items-center gap-2"
            >
              <Phone size={16} />
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={providerInfo.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              className="form-control"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label fw-semibold d-flex align-items-center gap-2"
            >
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={providerInfo.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your.email@example.com"
              className="form-control"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label
              htmlFor="year"
              className="form-label fw-semibold d-flex align-items-center gap-2"
            >
              <Calendar size={16} />
              Year
            </label>
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
              className="form-control"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label
              htmlFor="address"
              className="form-label fw-semibold d-flex align-items-center gap-2"
            >
              <MapPin size={16} />
              Address
            </label>
            <input
              type="text"
              id="address"
              value={providerInfo.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Street address"
              className="form-control"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label
              htmlFor="apartment"
              className="form-label fw-semibold d-flex align-items-center gap-2"
            >
              <Building size={16} />
              Apartment/Unit
            </label>
            <input
              type="text"
              id="apartment"
              value={providerInfo.apartment || ""}
              onChange={(e) => handleChange("apartment", e.target.value)}
              placeholder="Apt 30E"
              className="form-control"
            />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="mb-3">
            <label
              htmlFor="targetAudience"
              className="form-label fw-semibold d-flex align-items-center gap-2"
            >
              <Users size={16} />
              Target Audience
            </label>
            <input
              type="text"
              id="targetAudience"
              value={state.currentCard.targetAudience || ""}
              onChange={(e) => updateTargetAudience(e.target.value)}
              placeholder="SERVICES EXCLUSIVE TO Residents and direct family"
              className="form-control"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label
              htmlFor="generalInclusions"
              className="form-label fw-semibold d-flex align-items-center gap-2"
            >
              <Info size={16} />
              General Inclusions
            </label>
            <textarea
              id="generalInclusions"
              value={state.currentCard.generalInclusions || ""}
              onChange={(e) => updateGeneralInclusions(e.target.value)}
              placeholder="All services include back and forth messaging, pictures of your pets and on-call if needed"
              className="form-control"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderInfoEditor;
