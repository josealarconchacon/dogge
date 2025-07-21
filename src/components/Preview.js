import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import { ArrowLeft, Download } from "lucide-react";
import { generateShareableImage, downloadImage } from "../utils/imageGenerator";

const Preview = () => {
  const navigate = useNavigate();
  const { state } = useDoggeCard();
  const { currentCard } = state;
  const [generatingImage, setGeneratingImage] = useState(false);

  const handleDownloadImage = async () => {
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
            disabled={generatingImage}
          >
            <Download size={16} />
            Download Image
          </button>
        </div>
      </div>

      <div className="preview-content">
        <div className="preview-card">
          <DoggeCardDisplay card={currentCard} />
        </div>
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
          {providerInfo.year}
        </p>
        <p style={{ margin: "10px 0 0 0", fontSize: "14px" }}>
          {providerInfo.name} {providerInfo.phone && `(${providerInfo.phone})`}
          {providerInfo.apartment && ` - ${providerInfo.apartment}`}
        </p>
      </div>

      {/* Services */}
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
              <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>
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

            <p style={{ margin: "5px 0", fontSize: "14px", lineHeight: "1.4" }}>
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

      {/* Holiday Rate */}
      {holidayRate.enabled && (
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
      <div
        className="card-footer"
        style={{
          backgroundColor: design.primaryColor,
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
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
        <p style={{ margin: "0", fontSize: "12px", opacity: "0.9" }}>
          {generalInclusions}
        </p>
      </div>

      {/* Optional Sections */}
      {optionalSections.about.enabled && optionalSections.about.content && (
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

      {optionalSections.testimonials.enabled &&
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
