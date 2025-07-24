import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import { ArrowLeft, Download, Save, Eye } from "lucide-react";
import { generateShareableImage, downloadImage } from "../utils/imageGenerator";
import DoggeCardDisplay from "./DoggeCardDisplay";

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="preview-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-5">
              <button
                onClick={() => navigate("/builder")}
                className="btn btn-secondary d-flex align-items-center gap-2 px-3 py-2"
              >
                <ArrowLeft size={20} />
                Back to Builder
              </button>
              <h2 className="h2 fw-bold text-center text-md-start mb-0">
                Preview Your Dogge Card
              </h2>
              <div className="preview-actions d-flex flex-column flex-sm-row gap-2">
                <button
                  onClick={handleDownloadImage}
                  className="btn btn-primary d-flex align-items-center gap-2 px-3 py-2"
                  disabled={generatingImage || !hasContent()}
                >
                  <Download size={18} />
                  {generatingImage ? "Generating..." : "Download Image"}
                </button>
                <button
                  onClick={handleSaveCard}
                  className="btn btn-success d-flex align-items-center gap-2 px-3 py-2"
                  disabled={saving || !hasContent()}
                >
                  <Save size={18} />
                  {saving ? "Saving..." : "Save Card"}
                </button>
              </div>
            </div>

            <div className="preview-content d-flex justify-content-center">
              {hasContent() ? (
                <div className="preview-card">
                  <DoggeCardDisplay card={currentCard} isPreview={true} />
                </div>
              ) : (
                <div className="empty-preview-state text-center p-5 rounded-4 shadow-sm border">
                  <div className="text-muted mb-4">
                    <Eye size={64} className="opacity-50" />
                  </div>
                  <h3 className="h4 fw-bold mb-3">No Content to Preview</h3>
                  <p className="text-muted mb-4 lead">
                    Your card is empty. Please add some content in the builder
                    to see a preview.
                  </p>
                  <button
                    onClick={() => navigate("/builder")}
                    className="btn btn-primary btn-lg d-flex align-items-center gap-2 mx-auto"
                  >
                    <Eye size={20} />
                    Go to Builder
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
