import React from "react";
import { useNavigate } from "react-router-dom";
import { FolderOpen, Edit } from "lucide-react";

export const SavedCardsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="text-center">
            <div className="mb-4">
              <div
                className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "120px", height: "120px" }}
              >
                <FolderOpen size={48} className="text-muted" />
              </div>
            </div>
            <h2 className="h3 fw-bold text-dark mb-3">No Saved Cards</h2>
            <p className="text-muted lead mb-4">
              You haven't saved any cards yet. Create your first professional
              pet sitting service card to get started.
            </p>
            <button
              onClick={() => navigate("/builder")}
              className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
            >
              <Edit size={20} />
              Create Your First Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
