import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import { ArrowLeft, Download, Save } from "lucide-react";
import { generateShareableImage, downloadImage } from "../utils/imageGenerator";

const Preview = () => {
  const navigate = useNavigate();
  const { state, saveCard } = useDoggeCard();
  const { currentCard } = state;
  const [generatingImage, setGeneratingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  // Check if the card has meaningful content
  const hasContent = () => {
    const { providerInfo, services, targetAudience, generalInclusions } =
      currentCard;

    // Check if provider has basic info
    const hasProviderInfo =
      providerInfo.name && providerInfo.name.trim() !== "";

    // Check if there are services
    const hasServices = services && services.length > 0;

    // Check if there's target audience or general inclusions
    const hasAdditionalInfo =
      (targetAudience && targetAudience.trim() !== "") ||
      (generalInclusions && generalInclusions.trim() !== "");

    return hasProviderInfo || hasServices || hasAdditionalInfo;
  };

  const handleDownloadImage = async () => {
    if (!hasContent()) {
      alert("Please add some content to your card before downloading.");
      return;
    }

    try {
      setGeneratingImage(true);
      const imageBlob = await generateShareableImage(currentCard);
      const filename = `${currentCard.providerInfo.name || "dogge"}-card.png`;
      downloadImage(imageBlob, filename);
    } catch (err) {
      console.error("Failed to download image:", err);
      alert("Failed to download image. Please try again.");
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleSaveCard = async () => {
    if (!hasContent()) {
      alert("Please add some content to your card before saving.");
      return;
    }

    try {
      setSaving(true);
      saveCard();
      alert("Card saved successfully!");
    } catch (err) {
      console.error("Failed to save card:", err);
      alert("Failed to save card. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="preview-page">
      <div className="preview-header">
        <button onClick={() => navigate("/builder")} className="back-btn">
          <ArrowLeft size={20} />
          Back to Builder
        </button>
        <h2>Preview Your Dogge Card</h2>
        <div className="preview-actions">
          <button
            onClick={handleDownloadImage}
            className="action-btn"
            disabled={generatingImage || !hasContent()}
          >
            <Download size={16} />
            Download Image
          </button>
          <button
            onClick={handleSaveCard}
            className="save-btn"
            disabled={saving || !hasContent()}
          >
            <Save size={16} />
            Save Card
          </button>
        </div>
      </div>

      <div className="preview-content">
        {hasContent() ? (
          <div className="preview-card">
            <DoggeCardDisplay card={currentCard} />
          </div>
        ) : (
          <div className="empty-preview-state">
            <h3>No Content to Preview</h3>
            <p>
              Your card is empty. Please add some content in the builder to see
              a preview.
            </p>
            <button
              onClick={() => navigate("/builder")}
              className="btn-primary"
            >
              Go to Builder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DoggeCardDisplay = ({ card }) => {
  const {
    design,
    providerInfo,
    services,
    holidayRate,
    targetAudience,
    generalInclusions,
    optionalSections,
  } = card;

  // Don't render if no meaningful content
  if (!providerInfo?.name?.trim() && (!services || services.length === 0)) {
    return null;
  }

  return (
    <div
      className="dogge-card"
      style={{
        backgroundColor: design.secondaryColor,
        color: "#333",
        fontFamily: "Arial, sans-serif",
        maxWidth: "400px",
        margin: "0 auto",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div
        className="card-header"
        style={{
          backgroundColor: design.primaryColor,
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{ margin: "0 0 5px 0", fontSize: "24px", fontWeight: "bold" }}
        >
          PET SITTING SERVICES
        </h1>
        <p style={{ margin: "0", fontSize: "18px", opacity: "0.9" }}>
          {providerInfo.year || new Date().getFullYear()}
        </p>
        {providerInfo.name && (
          <p style={{ margin: "10px 0 0 0", fontSize: "14px" }}>
            {providerInfo.name}{" "}
            {providerInfo.phone && `(${providerInfo.phone})`}
            {providerInfo.apartment && ` - ${providerInfo.apartment}`}
          </p>
        )}
      </div>

      {/* Services */}
      {services && services.length > 0 && (
        <div className="card-services" style={{ padding: "20px" }}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-item"
              style={{ marginBottom: "20px" }}
            >
              <div
                className="service-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <span style={{ fontSize: "20px", marginRight: "10px" }}>
                  {service.icon}
                </span>
                <h3
                  style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}
                >
                  {service.name}
                </h3>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: design.accentColor,
                  }}
                >
                  ${service.basePrice}
                </span>
              </div>

              {service.includedFeature && (
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: design.accentColor,
                  }}
                >
                  {service.includedFeature}
                </p>
              )}

              <p
                style={{ margin: "5px 0", fontSize: "14px", lineHeight: "1.4" }}
              >
                {service.description}
              </p>

              {service.specificTerms && (
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "#666",
                  }}
                >
                  {service.specificTerms}
                </p>
              )}

              {service.additionalPetPrice > 0 && (
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  ADDITIONAL PET ({service.name}) ${service.additionalPetPrice}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Holiday Rate */}
      {holidayRate &&
        holidayRate.enabled &&
        holidayRate.dates &&
        holidayRate.dates.length > 0 && (
          <div
            className="holiday-section"
            style={{
              backgroundColor: design.primaryColor,
              color: "white",
              padding: "15px 20px",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
              HOLIDAY RATE
            </h3>
            <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
              Additional charge for holidays: +${holidayRate.additionalCharge}
            </p>
            <div style={{ fontSize: "12px", opacity: "0.9" }}>
              {holidayRate.dates.map((date, index) => (
                <span
                  key={index}
                  style={{ display: "block", marginBottom: "2px" }}
                >
                  {date}
                </span>
              ))}
            </div>
          </div>
        )}

      {/* Footer */}
      {(targetAudience || generalInclusions) && (
        <div
          className="card-footer"
          style={{
            backgroundColor: design.primaryColor,
            color: "white",
            padding: "20px",
            textAlign: "center",
          }}
        >
          {targetAudience && (
            <div
              style={{
                backgroundColor: design.accentColor,
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "10px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {targetAudience}
            </div>
          )}
          {generalInclusions && (
            <p style={{ margin: "0", fontSize: "12px", opacity: "0.9" }}>
              {generalInclusions}
            </p>
          )}
        </div>
      )}

      {/* Optional Sections */}
      {optionalSections &&
        optionalSections.about &&
        optionalSections.about.enabled &&
        optionalSections.about.content && (
          <div
            className="about-section"
            style={{ padding: "20px", borderTop: "1px solid #eee" }}
          >
            <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>About Me</h3>
            <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.4" }}>
              {optionalSections.about.content}
            </p>
          </div>
        )}

      {optionalSections &&
        optionalSections.testimonials &&
        optionalSections.testimonials.enabled &&
        optionalSections.testimonials.items &&
        optionalSections.testimonials.items.length > 0 && (
          <div
            className="testimonials-section"
            style={{ padding: "20px", borderTop: "1px solid #eee" }}
          >
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px" }}>
              What Clients Say
            </h3>
            {optionalSections.testimonials.items.map((testimonial, index) => (
              <div key={testimonial.id} style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <span style={{ fontSize: "12px", marginRight: "10px" }}>
                    {"⭐".repeat(testimonial.rating)}
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                    {testimonial.author}
                  </span>
                </div>
                <p
                  style={{ margin: "0", fontSize: "14px", fontStyle: "italic" }}
                >
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default Preview;
