import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import { ArrowLeft, Download, Trash2, Edit, Eye } from "lucide-react";
import { generateShareableImage, downloadImage } from "../utils/imageGenerator";

const SavedCards = () => {
  const navigate = useNavigate();
  const { state, loadCard, clearSavedCards, deleteCard } = useDoggeCard();
  const { savedCards } = state;
  const [generatingImage, setGeneratingImage] = useState(null);

  const handleLoadCard = (card) => {
    loadCard(card);
    navigate("/builder");
  };

  const handlePreviewCard = (card) => {
    loadCard(card);
    navigate("/preview");
  };

  const handleDownloadCard = async (card) => {
    try {
      setGeneratingImage(card.id);
      const imageBlob = await generateShareableImage(card);
      const filename = `${card.providerInfo.name || "dogge"}-card.png`;
      downloadImage(imageBlob, filename);
    } catch (err) {
      console.error("Failed to download image:", err);
      alert("Failed to download image. Please try again.");
    } finally {
      setGeneratingImage(null);
    }
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteCard(cardId);
    }
  };

  const handleClearAllCards = () => {
    if (window.confirm("Are you sure you want to delete all saved cards?")) {
      clearSavedCards();
      navigate("/builder");
    }
  };

  if (savedCards.length === 0) {
    return (
      <div className="saved-cards-page">
        <div className="saved-cards-header">
          <button onClick={() => navigate("/builder")} className="back-btn">
            <ArrowLeft size={20} />
            Back to Builder
          </button>
          <h2>Saved Cards</h2>
        </div>
        <div className="empty-state">
          <h3>No Saved Cards</h3>
          <p>
            You haven't saved any cards yet. Create a card and save it to see it
            here.
          </p>
          <button onClick={() => navigate("/builder")} className="btn-primary">
            Create Your First Card
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-cards-page">
      <div className="saved-cards-header">
        <button onClick={() => navigate("/builder")} className="back-btn">
          <ArrowLeft size={20} />
          Back to Builder
        </button>
        <h2>Saved Cards ({savedCards.length})</h2>
        <button onClick={handleClearAllCards} className="clear-all-btn">
          <Trash2 size={16} />
          Clear All
        </button>
      </div>

      <div className="saved-cards-grid">
        {savedCards.map((card) => (
          <div key={card.id} className="saved-card-item">
            <div className="card-preview">
              <DoggeCardDisplay card={card} />
            </div>

            <div className="card-info">
              <h3>{card.providerInfo.name || "Unnamed Card"}</h3>
              <p className="card-date">
                Saved on {new Date(card.savedAt).toLocaleDateString()}
              </p>
              <p className="card-services">
                {card.services.length} service
                {card.services.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="card-actions">
              <button
                onClick={() => handlePreviewCard(card)}
                className="action-btn preview-btn"
                title="Preview Card"
              >
                <Eye size={16} />
                Preview
              </button>

              <button
                onClick={() => handleLoadCard(card)}
                className="action-btn edit-btn"
                title="Edit Card"
              >
                <Edit size={16} />
                Edit
              </button>

              <button
                onClick={() => handleDownloadCard(card)}
                className="action-btn download-btn"
                disabled={generatingImage === card.id}
                title="Download Image"
              >
                <Download size={16} />
                {generatingImage === card.id ? "Generating..." : "Download"}
              </button>

              <button
                onClick={() => handleDeleteCard(card.id)}
                className="action-btn delete-btn"
                title="Delete Card"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DoggeCardDisplay = ({ card }) => {
  const { design, providerInfo, services, targetAudience, generalInclusions } =
    card;

  return (
    <div
      className="dogge-card"
      style={{
        backgroundColor: design.secondaryColor,
        color: "#333",
        fontFamily: "Arial, sans-serif",
        maxWidth: "300px",
        margin: "0 auto",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transform: "scale(0.8)",
        transformOrigin: "top center",
      }}
    >
      {/* Header */}
      <div
        className="card-header"
        style={{
          backgroundColor: design.primaryColor,
          color: "white",
          padding: "15px",
          textAlign: "center",
        }}
      >
        <h1
          style={{ margin: "0 0 5px 0", fontSize: "18px", fontWeight: "bold" }}
        >
          PET SITTING SERVICES
        </h1>
        <p style={{ margin: "0", fontSize: "14px", opacity: "0.9" }}>
          {providerInfo.year}
        </p>
        <p style={{ margin: "8px 0 0 0", fontSize: "12px" }}>
          {providerInfo.name} {providerInfo.phone && `(${providerInfo.phone})`}
          {providerInfo.apartment && ` - ${providerInfo.apartment}`}
        </p>
      </div>

      {/* Services */}
      <div className="card-services" style={{ padding: "15px" }}>
        {services.slice(0, 2).map((service, index) => (
          <div
            key={service.id}
            className="service-item"
            style={{ marginBottom: "15px" }}
          >
            <div
              className="service-header"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "16px", marginRight: "8px" }}>
                {service.icon}
              </span>
              <h3 style={{ margin: "0", fontSize: "14px", fontWeight: "bold" }}>
                {service.name}
              </h3>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: design.accentColor,
                }}
              >
                ${service.basePrice}
              </span>
            </div>
          </div>
        ))}
        {services.length > 2 && (
          <p
            style={{
              margin: "0",
              fontSize: "12px",
              color: "#666",
              textAlign: "center",
            }}
          >
            +{services.length - 2} more services
          </p>
        )}
      </div>

      {/* Footer */}
      <div
        className="card-footer"
        style={{
          backgroundColor: design.primaryColor,
          color: "white",
          padding: "15px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: design.accentColor,
            color: "white",
            padding: "6px 12px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "8px",
            fontSize: "10px",
            fontWeight: "bold",
          }}
        >
          {targetAudience}
        </div>
        <p style={{ margin: "0", fontSize: "10px", opacity: "0.9" }}>
          {generalInclusions}
        </p>
      </div>
    </div>
  );
};

export default SavedCards;
