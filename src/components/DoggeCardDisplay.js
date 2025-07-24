import React from "react";

const DoggeCardDisplay = ({ card, isPreview = false }) => {
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

  // Different styling for preview vs saved cards
  const cardStyle = isPreview
    ? {
        backgroundColor: design.secondaryColor,
        color: "#333",
        fontFamily: "var(--font-family-sans)",
        maxWidth: "450px",
        margin: "0 auto",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
      }
    : {
        backgroundColor: design.secondaryColor,
        color: "#333",
        fontFamily: "var(--font-family-sans)",
        maxWidth: "280px",
        margin: "0 auto",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        transform: "scale(0.75)",
        transformOrigin: "top center",
      };

  const headerPadding = isPreview ? "p-4" : "p-3";
  const servicesPadding = isPreview ? "p-4" : "p-3";
  const footerPadding = isPreview ? "p-4" : "p-3";
  const titleSize = isPreview ? "h3" : "h6";
  const serviceTitleSize = isPreview ? "h5" : "h6";
  const serviceIconSize = isPreview ? "fs-4" : "fs-5";
  const servicePriceSize = isPreview ? "fs-4" : "fs-5";

  return (
    <div className="dogge-card shadow-lg border-0" style={cardStyle}>
      {/* Header */}
      <div
        className={`card-header text-center ${headerPadding}`}
        style={{
          backgroundColor: design.primaryColor,
          color: "white",
        }}
      >
        <h1 className={`${titleSize} fw-bold mb-2`}>PET SITTING SERVICES</h1>
        <p className="mb-2 opacity-75">
          {providerInfo.year || new Date().getFullYear()}
        </p>
        {providerInfo.name && (
          <p className="mb-0 small">
            {providerInfo.name}{" "}
            {providerInfo.phone && `(${providerInfo.phone})`}
            {providerInfo.apartment && ` - ${providerInfo.apartment}`}
          </p>
        )}
      </div>

      {/* Services */}
      {services && services.length > 0 && (
        <div className={`card-services ${servicesPadding}`}>
          {services
            .slice(0, isPreview ? services.length : 2)
            .map((service, index) => (
              <div key={service.id} className="service-item mb-4">
                <div className="service-header d-flex align-items-center mb-2">
                  <span className={`${serviceIconSize} me-3`}>
                    {service.icon}
                  </span>
                  <h3
                    className={`${serviceTitleSize} fw-bold mb-0 flex-grow-1`}
                  >
                    {service.name}
                  </h3>
                  <span
                    className={`fw-bold ${servicePriceSize}`}
                    style={{ color: design.accentColor }}
                  >
                    ${service.basePrice}
                  </span>
                </div>

                {isPreview && service.includedFeature && (
                  <p
                    className="mb-1 small fw-bold"
                    style={{ color: design.accentColor }}
                  >
                    {service.includedFeature}
                  </p>
                )}

                {isPreview && (
                  <p className="mb-1 small">{service.description}</p>
                )}

                {isPreview && service.specificTerms && (
                  <p className="mb-1 small fst-italic text-muted">
                    {service.specificTerms}
                  </p>
                )}

                {isPreview && service.additionalPetPrice > 0 && (
                  <p className="mb-0 small text-muted">
                    ADDITIONAL PET ({service.name}) $
                    {service.additionalPetPrice}
                  </p>
                )}
              </div>
            ))}
          {!isPreview && services.length > 2 && (
            <p className="text-center text-muted small mb-0">
              +{services.length - 2} more services
            </p>
          )}
        </div>
      )}

      {/* Holiday Rate - Only show in preview */}
      {isPreview &&
        holidayRate &&
        holidayRate.enabled &&
        holidayRate.dates &&
        holidayRate.dates.length > 0 && (
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
      {(targetAudience || generalInclusions) && (
        <div
          className={`card-footer text-center ${footerPadding}`}
          style={{
            backgroundColor: design.primaryColor,
            color: "white",
          }}
        >
          {targetAudience && (
            <div
              className="d-inline-block mb-2 px-3 py-1 rounded-pill small fw-bold"
              style={{
                backgroundColor: design.accentColor,
                color: "white",
              }}
            >
              {targetAudience}
            </div>
          )}
          {generalInclusions && (
            <p className="mb-0 small opacity-75">{generalInclusions}</p>
          )}
        </div>
      )}

      {/* Optional Sections - Only show in preview */}
      {isPreview && optionalSections && (
        <>
          {optionalSections.about &&
            optionalSections.about.enabled &&
            optionalSections.about.content && (
              <div className="about-section p-4 border-top">
                <h3 className="h6 fw-bold mb-2">About Me</h3>
                <p className="mb-0 small">{optionalSections.about.content}</p>
              </div>
            )}

          {optionalSections.testimonials &&
            optionalSections.testimonials.enabled &&
            optionalSections.testimonials.items &&
            optionalSections.testimonials.items.length > 0 && (
              <div className="testimonials-section p-4 border-top">
                <h3 className="h6 fw-bold mb-3">What Clients Say</h3>
                {optionalSections.testimonials.items.map(
                  (testimonial, index) => (
                    <div key={testimonial.id} className="mb-3">
                      <div className="d-flex align-items-center mb-1">
                        <span className="small me-2">
                          {"⭐".repeat(testimonial.rating)}
                        </span>
                        <span className="small fw-bold">
                          {testimonial.author}
                        </span>
                      </div>
                      <p className="mb-0 small fst-italic">
                        "{testimonial.text}"
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default DoggeCardDisplay;
