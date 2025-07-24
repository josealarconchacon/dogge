import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import {
  ArrowLeft,
  Download,
  Trash2,
  Edit,
  Eye,
  FolderOpen,
  AlertTriangle,
  CheckCircle,
  Info,
  MoreVertical,
  Calendar,
  Tag,
  Users,
} from "lucide-react";
import { generateShareableImage, downloadImage } from "../utils/imageGenerator";
import DoggeCardDisplay from "./DoggeCardDisplay";
import { SavedCardsEmptyState } from "../utils/emptyStates";

const SavedCards = () => {
  const navigate = useNavigate();
  const { state, loadCard, clearSavedCards, deleteCard } = useDoggeCard();
  const { savedCards } = state;
  const [generatingImage, setGeneratingImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [alert, setAlert] = useState(null);

  const deleteModalRef = useRef(null);
  const clearAllModalRef = useRef(null);

  // Bootstrap modal management
  useEffect(() => {
    if (showDeleteModal && deleteModalRef.current) {
      const modal = new window.bootstrap.Modal(deleteModalRef.current);
      modal.show();

      const handleHidden = () => {
        setShowDeleteModal(false);
        setCardToDelete(null);
      };

      deleteModalRef.current.addEventListener("hidden.bs.modal", handleHidden);

      return () => {
        if (deleteModalRef.current) {
          deleteModalRef.current.removeEventListener(
            "hidden.bs.modal",
            handleHidden
          );
        }
      };
    }
  }, [showDeleteModal]);

  useEffect(() => {
    if (showClearAllModal && clearAllModalRef.current) {
      const modal = new window.bootstrap.Modal(clearAllModalRef.current);
      modal.show();

      const handleHidden = () => {
        setShowClearAllModal(false);
      };

      clearAllModalRef.current.addEventListener(
        "hidden.bs.modal",
        handleHidden
      );

      return () => {
        if (clearAllModalRef.current) {
          clearAllModalRef.current.removeEventListener(
            "hidden.bs.modal",
            handleHidden
          );
        }
      };
    }
  }, [showClearAllModal]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

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
      showAlert("success", "Card downloaded successfully!");
    } catch (err) {
      console.error("Failed to download image:", err);
      showAlert("danger", "Failed to download image. Please try again.");
    } finally {
      setGeneratingImage(null);
    }
  };

  const handleDeleteCard = (card) => {
    setCardToDelete(card);
    setShowDeleteModal(true);
  };

  const confirmDeleteCard = () => {
    if (cardToDelete) {
      deleteCard(cardToDelete.id);
      showAlert("success", "Card deleted successfully!");
    }
    if (deleteModalRef.current) {
      const modal = window.bootstrap.Modal.getInstance(deleteModalRef.current);
      if (modal) modal.hide();
    }
  };

  const handleClearAllCards = () => {
    setShowClearAllModal(true);
  };

  const confirmClearAllCards = () => {
    clearSavedCards();
    navigate("/builder");
    showAlert("success", "All cards cleared successfully!");
    if (clearAllModalRef.current) {
      const modal = window.bootstrap.Modal.getInstance(
        clearAllModalRef.current
      );
      if (modal) modal.hide();
    }
  };

  // Card Component
  const SavedCardItem = ({ card }) => (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all">
        <div className="card-body p-0">
          {/* Card Preview */}
          <div className="bg-light p-3 border-bottom">
            <div className="d-flex justify-content-center">
              <DoggeCardDisplay card={card} isPreview={false} />
            </div>
          </div>

          {/* Card Info */}
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="flex-grow-1">
                <h5 className="card-title fw-bold text-dark mb-1">
                  {card.providerInfo.name || "Unnamed Card"}
                </h5>
                <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                  <Calendar size={14} />
                  <span>{new Date(card.savedAt).toLocaleDateString()}</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-muted small">
                  <Tag size={14} />
                  <span>
                    {card.services.length} service
                    {card.services.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-link btn-sm text-muted p-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MoreVertical size={16} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handlePreviewCard(card)}
                    >
                      <Eye size={16} />
                      Preview
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleLoadCard(card)}
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleDownloadCard(card)}
                      disabled={generatingImage === card.id}
                    >
                      <Download size={16} />
                      {generatingImage === card.id
                        ? "Generating..."
                        : "Download"}
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger d-flex align-items-center gap-2"
                      onClick={() => handleDeleteCard(card)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-grid gap-2">
              <button
                onClick={() => handlePreviewCard(card)}
                className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-2"
                title="Preview Card"
              >
                <Eye size={16} />
                Preview
              </button>
              <div className="row g-2">
                <div className="col-6">
                  <button
                    onClick={() => handleLoadCard(card)}
                    className="btn btn-outline-success btn-sm w-100 d-flex align-items-center justify-content-center gap-1"
                    title="Edit Card"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                </div>
                <div className="col-6">
                  <button
                    onClick={() => handleDownloadCard(card)}
                    className="btn btn-outline-warning btn-sm w-100 d-flex align-items-center justify-content-center gap-1"
                    disabled={generatingImage === card.id}
                    title="Download Image"
                  >
                    <Download size={14} />
                    {generatingImage === card.id ? "..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Content
  if (savedCards.length === 0) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <button
                onClick={() => navigate("/builder")}
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back to Builder
              </button>
            </div>
            <SavedCardsEmptyState />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Alert Messages */}
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <div className="d-flex align-items-center gap-2">
            {alert.type === "success" && <CheckCircle size={20} />}
            {alert.type === "danger" && <AlertTriangle size={20} />}
            {alert.type === "info" && <Info size={20} />}
            {alert.message}
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <button
                onClick={() => navigate("/builder")}
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back to Builder
              </button>
              <div>
                <h1 className="h3 fw-bold text-dark mb-0">Saved Cards</h1>
                <p className="text-muted small mb-0">
                  {savedCards.length} card{savedCards.length !== 1 ? "s" : ""}{" "}
                  saved
                </p>
              </div>
            </div>
            <button
              onClick={handleClearAllCards}
              className="btn btn-outline-danger d-flex align-items-center gap-2"
            >
              <Trash2 size={18} />
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="row">
        {savedCards.map((card) => (
          <SavedCardItem key={card.id} card={card} />
        ))}
      </div>

      {/* Delete Card Modal */}
      <div
        ref={deleteModalRef}
        className="modal fade"
        id="deleteCardModal"
        tabIndex="-1"
        aria-labelledby="deleteCardModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold" id="deleteCardModalLabel">
                Delete Card
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  if (deleteModalRef.current) {
                    const modal = window.bootstrap.Modal.getInstance(
                      deleteModalRef.current
                    );
                    if (modal) modal.hide();
                  }
                }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-0">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <AlertTriangle size={24} className="text-danger" />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Are you sure?</h6>
                  <p className="text-muted mb-0 small">
                    This action cannot be undone. The card "
                    {cardToDelete?.providerInfo.name || "Unnamed Card"}" will be
                    permanently deleted.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  if (deleteModalRef.current) {
                    const modal = window.bootstrap.Modal.getInstance(
                      deleteModalRef.current
                    );
                    if (modal) modal.hide();
                  }
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDeleteCard}
              >
                Delete Card
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clear All Cards Modal */}
      <div
        ref={clearAllModalRef}
        className="modal fade"
        id="clearAllCardsModal"
        tabIndex="-1"
        aria-labelledby="clearAllCardsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0 pb-0">
              <h5
                className="modal-title fw-bold text-danger"
                id="clearAllCardsModalLabel"
              >
                Clear All Cards
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  if (clearAllModalRef.current) {
                    const modal = window.bootstrap.Modal.getInstance(
                      clearAllModalRef.current
                    );
                    if (modal) modal.hide();
                  }
                }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-0">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <AlertTriangle size={24} className="text-danger" />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Clear all saved cards?</h6>
                  <p className="text-muted mb-0 small">
                    This will permanently delete all {savedCards.length} saved
                    card{savedCards.length !== 1 ? "s" : ""}. This action cannot
                    be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  if (clearAllModalRef.current) {
                    const modal = window.bootstrap.Modal.getInstance(
                      clearAllModalRef.current
                    );
                    if (modal) modal.hide();
                  }
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmClearAllCards}
              >
                Clear All Cards
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedCards;
