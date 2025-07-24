import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import {
  Phone,
  Mail,
  MessageSquare,
  Download,
  Printer,
  Share2,
  AlertCircle,
} from "lucide-react";
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
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="text-center p-5 rounded-4 shadow-sm border">
                <div className="text-muted mb-4">
                  <AlertCircle size={64} className="opacity-50" />
                </div>
                <h2 className="h3 fw-bold mb-3">Card Not Found</h2>
                <p className="text-muted mb-4 lead">
                  This Dogge Card doesn't exist or hasn't been saved yet.
                </p>
                <p className="text-muted mb-4">
                  If you're looking for a specific service provider, please
                  contact them directly.
                </p>
                <button
                  onClick={() => navigate("/builder")}
                  className="btn btn-primary btn-lg d-flex align-items-center gap-2 mx-auto"
                >
                  <Share2 size={20} />
                  Create Your Own Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="share-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="share-header d-flex justify-content-end mb-4">
              <div className="share-actions d-flex gap-2">
                <button
                  onClick={handleDownloadImage}
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  disabled={generatingImage}
                >
                  <Download size={18} />
                  {generatingImage ? "Generating..." : "Download Image"}
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                >
                  <Printer size={18} />
                  Print
                </button>
              </div>
            </div>

            <div className="share-content row g-5">
              <div className="col-12 col-lg-8">
                <div className="card-display d-flex justify-content-center">
                  <DoggeCardDisplay card={card} />
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="contact-section p-4 rounded-4 shadow-sm border">
                  <h3 className="h4 fw-bold mb-4">
                    Contact {card.providerInfo.name}
                  </h3>

                  <div className="contact-methods d-grid gap-3 mb-4">
                    {card.providerInfo.phone && (
                      <button
                        onClick={() => handleContact("phone")}
                        className="btn btn-success d-flex align-items-center gap-3"
                      >
                        <Phone size={20} />
                        Call {card.providerInfo.phone}
                      </button>
                    )}

                    {card.providerInfo.email && (
                      <button
                        onClick={() => handleContact("email")}
                        className="btn btn-primary d-flex align-items-center gap-3"
                      >
                        <Mail size={20} />
                        Email
                      </button>
                    )}

                    {card.providerInfo.phone && (
                      <button
                        onClick={() => handleContact("sms")}
                        className="btn btn-warning d-flex align-items-center gap-3"
                      >
                        <MessageSquare size={20} />
                        Send SMS
                      </button>
                    )}
                  </div>

                  <div className="social-sharing mb-4">
                    <h4 className="h5 fw-bold mb-3">Share This Card</h4>
                    <div className="social-buttons d-grid gap-2">
                      <button
                        onClick={() => handleSocialShare("whatsapp")}
                        className="btn btn-success d-flex align-items-center gap-3"
                      >
                        <span className="fs-5">📱</span>
                        WhatsApp
                      </button>
                      <button
                        onClick={() => handleSocialShare("facebook")}
                        className="btn btn-primary d-flex align-items-center gap-3"
                      >
                        <span className="fs-5">📘</span>
                        Facebook
                      </button>
                      <button
                        onClick={() => handleSocialShare("twitter")}
                        className="btn btn-info d-flex align-items-center gap-3"
                      >
                        <span className="fs-5">🐦</span>
                        Twitter
                      </button>
                    </div>
                  </div>

                  <div className="contact-form">
                    <h4 className="h5 fw-bold mb-3">Send a Message</h4>
                    <form onSubmit={handleSubmitContact}>
                      <div className="mb-3">
                        <label
                          htmlFor="contactName"
                          className="form-label fw-semibold"
                        >
                          Your Name *
                        </label>
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
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="contactEmail"
                          className="form-label fw-semibold"
                        >
                          Email
                        </label>
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
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="contactPhone"
                          className="form-label fw-semibold"
                        >
                          Phone
                        </label>
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
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="contactService"
                          className="form-label fw-semibold"
                        >
                          Service Interested In
                        </label>
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

                      <div className="mb-4">
                        <label
                          htmlFor="contactMessage"
                          className="form-label fw-semibold"
                        >
                          Message
                        </label>
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
                          className="form-control"
                          placeholder="Tell us about your pets and what you need..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                      >
                        <Mail size={18} />
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
      className="dogge-card shadow-lg border-0"
      style={{
        backgroundColor: design.secondaryColor,
        color: "#333",
        fontFamily: "var(--font-family-sans)",
        maxWidth: "450px",
        margin: "0 auto",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="card-header text-center p-4"
        style={{
          backgroundColor: design.primaryColor,
          color: "white",
        }}
      >
        <h1 className="h3 fw-bold mb-2">PET SITTING SERVICES</h1>
        <p className="mb-2 opacity-75">{providerInfo.year}</p>
        <p className="mb-0 small">
          {providerInfo.name} {providerInfo.phone && `(${providerInfo.phone})`}
          {providerInfo.apartment && ` - ${providerInfo.apartment}`}
        </p>
      </div>

      {/* Services */}
      <div className="card-services p-4">
        {services.map((service, index) => (
          <div key={service.id} className="service-item mb-4">
            <div className="service-header d-flex align-items-center mb-2">
              <span className="fs-4 me-3">{service.icon}</span>
              <h3 className="h5 fw-bold mb-0 flex-grow-1">{service.name}</h3>
              <span
                className="fw-bold fs-4"
                style={{ color: design.accentColor }}
              >
                ${service.basePrice}
              </span>
            </div>

            {service.includedFeature && (
              <p
                className="mb-1 small fw-bold"
                style={{ color: design.accentColor }}
              >
                {service.includedFeature}
              </p>
            )}

            <p className="mb-1 small">{service.description}</p>

            {service.specificTerms && (
              <p className="mb-1 small fst-italic text-muted">
                {service.specificTerms}
              </p>
            )}

            {service.additionalPetPrice > 0 && (
              <p className="mb-0 small text-muted">
                ADDITIONAL PET ({service.name}) ${service.additionalPetPrice}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Holiday Rate */}
      {holidayRate.enabled && (
        <div
          className="holiday-section p-3"
          style={{
            backgroundColor: design.primaryColor,
            color: "white",
          }}
        >
          <h3 className="h6 fw-bold mb-2">HOLIDAY RATE</h3>
          <p className="mb-2 small">
            Additional charge for holidays: +${holidayRate.additionalCharge}
          </p>
          <div className="small opacity-75">
            {holidayRate.dates.map((date, index) => (
              <span key={index} className="d-block mb-1">
                {date}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className="card-footer text-center p-4"
        style={{
          backgroundColor: design.primaryColor,
          color: "white",
        }}
      >
        <div
          className="d-inline-block mb-2 px-3 py-1 rounded-pill small fw-bold"
          style={{
            backgroundColor: design.accentColor,
            color: "white",
          }}
        >
          {targetAudience}
        </div>
        <p className="mb-0 small opacity-75">{generalInclusions}</p>
      </div>

      {/* Optional Sections */}
      {optionalSections.about.enabled && optionalSections.about.content && (
        <div className="about-section p-4 border-top">
          <h3 className="h6 fw-bold mb-2">About Me</h3>
          <p className="mb-0 small">{optionalSections.about.content}</p>
        </div>
      )}

      {optionalSections.testimonials.enabled &&
        optionalSections.testimonials.items.length > 0 && (
          <div className="testimonials-section p-4 border-top">
            <h3 className="h6 fw-bold mb-3">What Clients Say</h3>
            {optionalSections.testimonials.items.map((testimonial, index) => (
              <div key={testimonial.id} className="mb-3">
                <div className="d-flex align-items-center mb-1">
                  <span className="small me-2">
                    {"⭐".repeat(testimonial.rating)}
                  </span>
                  <span className="small fw-bold">{testimonial.author}</span>
                </div>
                <p className="mb-0 small fst-italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default Share;
