import html2canvas from "html2canvas";

export const generateCardImage = async (cardElement, cardData) => {
  try {
    // Configure html2canvas options for better quality
    const canvas = await html2canvas(cardElement, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: cardData.design.secondaryColor || "#F5F5DC",
      width: 400,
      height: cardElement.scrollHeight,
      logging: false,
      imageTimeout: 0,
      removeContainer: true,
    });

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/png",
        0.95
      );
    });
  } catch (error) {
    console.error("Error generating card image:", error);
    throw error;
  }
};

export const generateShareableImage = async (cardData) => {
  // Check if card has meaningful content
  const hasContent = () => {
    const { providerInfo, services, targetAudience, generalInclusions } =
      cardData;

    const hasProviderInfo =
      providerInfo?.name && providerInfo.name.trim() !== "";
    const hasServices = services && services.length > 0;
    const hasAdditionalInfo =
      (targetAudience && targetAudience.trim() !== "") ||
      (generalInclusions && generalInclusions.trim() !== "");

    return hasProviderInfo || hasServices || hasAdditionalInfo;
  };

  if (!hasContent()) {
    throw new Error("Card has no meaningful content to generate image");
  }

  // Create a temporary container for the card
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.width = "400px";
  container.style.backgroundColor = cardData.design.secondaryColor || "#F5F5DC";
  container.style.fontFamily = "Arial, sans-serif";
  container.style.borderRadius = "12px";
  container.style.overflow = "hidden";
  container.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";

  document.body.appendChild(container);

  // Create the card HTML structure
  container.innerHTML = `
    <div style="
      background-color: ${cardData.design.primaryColor};
      color: white;
      padding: 20px;
      text-align: center;
    ">
      <h1 style="margin: 0 0 5px 0; font-size: 24px; font-weight: bold;">
        PET SITTING SERVICES
      </h1>
      <p style="margin: 0; font-size: 18px; opacity: 0.9;">
        ${cardData.providerInfo.year || new Date().getFullYear()}
      </p>
      ${
        cardData.providerInfo.name
          ? `
        <p style="margin: 10px 0 0 0; font-size: 14px;">
          ${cardData.providerInfo.name} 
          ${
            cardData.providerInfo.phone
              ? `(${cardData.providerInfo.phone})`
              : ""
          }
          ${
            cardData.providerInfo.apartment
              ? ` - ${cardData.providerInfo.apartment}`
              : ""
          }
        </p>
      `
          : ""
      }
    </div>
    
    ${
      cardData.services && cardData.services.length > 0
        ? `
    <div style="padding: 20px;">
      ${cardData.services
        .map(
          (service) => `
        <div style="margin-bottom: 20px;">
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 20px; margin-right: 10px;">${
              service.icon
            }</span>
            <h3 style="margin: 0; font-size: 18px; font-weight: bold;">${
              service.name
            }</h3>
            <span style="
              margin-left: auto; 
              font-size: 20px; 
              font-weight: bold;
              color: ${cardData.design.accentColor}
            ">$${service.basePrice}</span>
          </div>
          ${
            service.includedFeature
              ? `
            <p style="margin: 5px 0; font-size: 12px; font-weight: bold; color: ${cardData.design.accentColor};">
              ${service.includedFeature}
            </p>
          `
              : ""
          }
          <p style="margin: 5px 0; font-size: 14px; line-height: 1.4;">
            ${service.description}
          </p>
          ${
            service.specificTerms
              ? `
            <p style="margin: 5px 0; font-size: 12px; font-style: italic; color: #666;">
              ${service.specificTerms}
            </p>
          `
              : ""
          }
          ${
            service.additionalPetPrice > 0
              ? `
            <p style="margin: 5px 0; font-size: 12px; color: #666;">
              ADDITIONAL PET (${service.name}) $${service.additionalPetPrice}
            </p>
          `
              : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
    `
        : ""
    }
    
    ${
      cardData.holidayRate &&
      cardData.holidayRate.enabled &&
      cardData.holidayRate.dates &&
      cardData.holidayRate.dates.length > 0
        ? `
    <div style="
      background-color: ${cardData.design.primaryColor};
      color: white;
      padding: 15px 20px;
    ">
      <h3 style="margin: 0 0 10px 0; font-size: 16px;">
        HOLIDAY RATE
      </h3>
      <p style="margin: 0 0 10px 0; font-size: 14px;">
        Additional charge for holidays: +$${
          cardData.holidayRate.additionalCharge
        }
      </p>
      <div style="font-size: 12px; opacity: 0.9;">
        ${cardData.holidayRate.dates
          .map(
            (date) =>
              `<span style="display: block; margin-bottom: 2px;">${date}</span>`
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
    
    ${
      cardData.targetAudience || cardData.generalInclusions
        ? `
    <div style="
      background-color: ${cardData.design.primaryColor};
      color: white;
      padding: 20px;
      text-align: center;
    ">
      ${
        cardData.targetAudience
          ? `
        <div style="
          background-color: ${cardData.design.accentColor};
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 10px;
          font-size: 12px;
          font-weight: bold;
        ">
          ${cardData.targetAudience}
        </div>
      `
          : ""
      }
      ${
        cardData.generalInclusions
          ? `
        <p style="margin: 0; font-size: 12px; opacity: 0.9;">
          ${cardData.generalInclusions}
        </p>
      `
          : ""
      }
    </div>
    `
        : ""
    }
    
    ${
      cardData.optionalSections &&
      cardData.optionalSections.about &&
      cardData.optionalSections.about.enabled &&
      cardData.optionalSections.about.content
        ? `
    <div style="padding: 20px; border-top: 1px solid #eee;">
      <h3 style="margin: 0 0 10px 0; font-size: 16px;">About Me</h3>
      <p style="margin: 0; font-size: 14px; line-height: 1.4;">
        ${cardData.optionalSections.about.content}
      </p>
    </div>
    `
        : ""
    }
    
    ${
      cardData.optionalSections &&
      cardData.optionalSections.testimonials &&
      cardData.optionalSections.testimonials.enabled &&
      cardData.optionalSections.testimonials.items &&
      cardData.optionalSections.testimonials.items.length > 0
        ? `
    <div style="padding: 20px; border-top: 1px solid #eee;">
      <h3 style="margin: 0 0 15px 0; font-size: 16px;">What Clients Say</h3>
      ${cardData.optionalSections.testimonials.items
        .map(
          (testimonial) => `
        <div style="margin-bottom: 15px;">
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <span style="font-size: 12px; margin-right: 10px;">
              ${"⭐".repeat(testimonial.rating)}
            </span>
            <span style="font-size: 12px; font-weight: bold;">
              ${testimonial.author}
            </span>
          </div>
          <p style="margin: 0; font-size: 14px; font-style: italic;">
            "${testimonial.text}"
          </p>
        </div>
      `
        )
        .join("")}
    </div>
    `
        : ""
    }
  `;

  try {
    const blob = await generateCardImage(container, cardData);
    document.body.removeChild(container);
    return blob;
  } catch (error) {
    document.body.removeChild(container);
    throw error;
  }
};

export const createImageUrl = (blob) => {
  return URL.createObjectURL(blob);
};

export const downloadImage = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "dogge-card.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
