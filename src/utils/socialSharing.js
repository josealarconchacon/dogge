// Social Media Sharing Utilities
export const generateSocialMetaTags = (cardData, shareUrl) => {
  const title = `${cardData.providerInfo.name || "Pet Services"} - Dogge Card`;
  const description = cardData.services
    .map((s) => `${s.name}: $${s.basePrice}`)
    .join(", ");
  const imageUrl = `${window.location.origin}/api/card-image/${cardData.id}`; // This would be your backend endpoint

  return {
    title,
    description,
    imageUrl,
    url: shareUrl,
    type: "website",
  };
};

export const updatePageMetaTags = (metaData) => {
  // Update or create meta tags for social sharing
  const updateMetaTag = (property, content) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("property", property);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  };

  // Open Graph tags
  updateMetaTag("og:title", metaData.title);
  updateMetaTag("og:description", metaData.description);
  updateMetaTag("og:image", metaData.imageUrl);
  updateMetaTag("og:url", metaData.url);
  updateMetaTag("og:type", metaData.type);

  // Twitter Card tags
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:title", metaData.title);
  updateMetaTag("twitter:description", metaData.description);
  updateMetaTag("twitter:image", metaData.imageUrl);

  // Standard meta tags
  const updateStandardMeta = (name, content) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", name);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  };

  updateStandardMeta("description", metaData.description);
  updateStandardMeta(
    "keywords",
    "pet services, dog walking, pet sitting, pet care"
  );
};

export const shareToSocialMedia = async (cardData, shareUrl) => {
  try {
    // Generate the card image
    const { generateShareableImage } = await import("./imageGenerator");
    const imageBlob = await generateShareableImage(cardData);

    // For a full implementation, you would upload this image to your server
    // and get a public URL. For now, we'll provide instructions.

    const instructions = `
To enable full social media preview functionality:

1. Upload the generated image to your server or CDN
2. Get a public URL for the image
3. Update the share URL with proper Open Graph meta tags
4. The image will then appear when shared on social media

Current share URL: ${shareUrl}
Image generated successfully!

For immediate use, you can:
- Download the image and upload it manually to social media
- Use the QR code to share the link
- Print the card for physical distribution
    `;

    alert(instructions);

    return {
      success: true,
      shareUrl,
      imageBlob,
      instructions,
    };
  } catch (error) {
    console.error("Error sharing to social media:", error);
    throw error;
  }
};

export const createWhatsAppShare = (shareUrl, text) => {
  const message = encodeURIComponent(
    text || "Check out this pet service card!"
  );
  return `https://wa.me/?text=${message}%20${encodeURIComponent(shareUrl)}`;
};

export const createFacebookShare = (shareUrl) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;
};

export const createTwitterShare = (shareUrl, text) => {
  const message = encodeURIComponent(
    text || "Check out this pet service card!"
  );
  return `https://twitter.com/intent/tweet?text=${message}&url=${encodeURIComponent(
    shareUrl
  )}`;
};
