import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import { Phone, Mail, MessageSquare, Download } from "lucide-react";
import { generateShareableImage, downloadImage } from "../utils/imageGenerator";
import {
  generateSocialMetaTags,
  updatePageMetaTags,
  createWhatsAppShare,
  createFacebookShare,
  createTwitterShare,
} from "../utils/socialSharing";

const Share = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const { state } = useDoggeCard();
  const [generatingImage, setGeneratingImage] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });

  // Find the card by ID
  const card = cardId
    ? state.savedCards.find((c) => c.id === cardId)
    : state.currentCard;

  const shareUrl = cardId
    ? `${window.location.origin}/share/${cardId}`
    : window.location.href;

  // Update meta tags when component mounts
  useEffect(() => {
    if (card && card.providerInfo?.name) {
      const metaData = generateSocialMetaTags(card, shareUrl);
      updatePageMetaTags(metaData);
    }
  }, [card, shareUrl]);

  const handleDownloadImage = async () => {
    try {
      setGeneratingImage(true);
      const imageBlob = await generateShareableImage(card);
      const filename = `${card.providerInfo.name || "dogge"}-card.png`;
      downloadImage(imageBlob, filename);
    } catch (err) {
      console.error("Failed to download image:", err);
      alert("Failed to download image. Please try again.");
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleSocialShare = (platform) => {
    const shareText = `Check out ${card.providerInfo.name}'s pet services!`;

    let shareUrl;
    switch (platform) {
      case "whatsapp":
        shareUrl = createWhatsAppShare(shareUrl, shareText);
        break;
      case "facebook":
        shareUrl = createFacebookShare(shareUrl);
        break;
      case "twitter":
        shareUrl = createTwitterShare(shareUrl, shareText);
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleContact = (method) => {
    const { providerInfo } = card;

    switch (method) {
      case "phone":
        if (providerInfo.phone) {
          window.location.href = `tel:${providerInfo.phone}`;
        }
        break;
      case "email":
        if (providerInfo.email) {
          window.location.href = `mailto:${providerInfo.email}?subject=Pet Service Inquiry`;
        }
        break;
      case "sms":
        if (providerInfo.phone) {
          window.location.href = `sms:${providerInfo.phone}`;
        }
        break;
      default:
        break;
    }
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    // Here you would typically send the contact form data
    // For now, we'll just show an alert
    alert(
      "Thank you for your message! The service provider will contact you soon."
    );
    setContactForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      service: "",
    });
  };

  if (!card || !card.providerInfo?.name) {
    return (
      <div className="share-page">
        <div className="error-message">
          <h2>Card Not Found</h2>
          <p>This Dogge Card doesn't exist or hasn't been saved yet.</p>
          <p>
            If you're looking for a specific service provider, please contact
            them directly.
          </p>
          <button onClick={() => navigate("/builder")} className="btn-primary">
            Create Your Own Card
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="share-page">
      <div className="share-header">
        <div className="share-actions">
          <button
            onClick={handleDownloadImage}
            className="action-btn"
            disabled={generatingImage}
          >
            <Download size={16} />
            Download Image
          </button>
          <button onClick={() => window.print()} className="action-btn">
            <Download size={16} />
            Print
          </button>
        </div>
      </div>

      <div className="share-content">
        <div className="card-display">
          <DoggeCardDisplay card={card} />
        </div>

        <div className="contact-section">
          <h3>Contact {card.providerInfo.name}</h3>

          <div className="contact-methods">
            {card.providerInfo.phone && (
              <button
                onClick={() => handleContact("phone")}
                className="contact-btn phone"
              >
                <Phone size={20} />
                Call {card.providerInfo.phone}
              </button>
            )}

            {card.providerInfo.email && (
              <button
                onClick={() => handleContact("email")}
                className="contact-btn email"
              >
                <Mail size={20} />
                Email
              </button>
            )}

            {card.providerInfo.phone && (
              <button
                onClick={() => handleContact("sms")}
                className="contact-btn sms"
              >
                <MessageSquare size={20} />
                Send SMS
              </button>
            )}
          </div>

          <div className="social-sharing">
            <h4>Share This Card</h4>
            <div className="social-buttons">
              <button
                onClick={() => handleSocialShare("whatsapp")}
                className="social-btn whatsapp"
              >
                <span>📱</span>
                WhatsApp
              </button>
              <button
                onClick={() => handleSocialShare("facebook")}
                className="social-btn facebook"
              >
                <span>📘</span>
                Facebook
              </button>
              <button
                onClick={() => handleSocialShare("twitter")}
                className="social-btn twitter"
              >
                <span>🐦</span>
                Twitter
              </button>
            </div>
          </div>

          <div className="contact-form">
            <h4>Send a Message</h4>
            <form onSubmit={handleSubmitContact}>
              <div className="form-group">
                <label htmlFor="contactName">Your Name *</label>
                <input
                  type="text"
                  id="contactName"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactPhone">Phone</label>
                <input
                  type="tel"
                  id="contactPhone"
                  value={contactForm.phone}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactService">Service Interested In</label>
                <select
                  id="contactService"
                  value={contactForm.service}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      service: e.target.value,
                    }))
                  }
                  className="form-select"
                >
                  <option value="">Select a service</option>
                  {card.services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name} - ${service.basePrice}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contactMessage">Message</label>
                <textarea
                  id="contactMessage"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  rows={4}
                  className="form-textarea"
                  placeholder="Tell us about your pets and what you need..."
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
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

export default Share;
