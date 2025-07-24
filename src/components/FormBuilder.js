import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import { DEFAULT_ICON } from "../utils/iconCategories";
import {
  Eye,
  Plus,
  Trash2,
  Settings,
  User,
  PawPrint,
  Calendar,
  PlusCircle,
  Palette,
} from "lucide-react";
import ServiceEditor from "./ServiceEditor";
import ProviderInfoEditor from "./ProviderInfoEditor";
import HolidayRateEditor from "./HolidayRateEditor";
import OptionalSectionsEditor from "./OptionalSectionsEditor";
import DesignEditor from "./DesignEditor";

const FormBuilder = () => {
  const { state, updateService, addService, removeService } = useDoggeCard();
  const [activeSection, setActiveSection] = useState("provider");
  const [editingService, setEditingService] = useState(null);

  const sections = [
    { id: "provider", label: "Provider Info", icon: User },
    { id: "services", label: "Services", icon: PawPrint },
    { id: "holiday", label: "Holiday Rates", icon: Calendar },
    { id: "optional", label: "Optional Sections", icon: PlusCircle },
    { id: "design", label: "Design", icon: Palette },
  ];

  const handleAddService = () => {
    const newService = {
      id: Date.now().toString(),
      name: "NEW SERVICE",
      icon: DEFAULT_ICON,
      description: "Describe your service here...",
      basePrice: 0,
      additionalPetPrice: 0,
    };
    addService(newService);
    setEditingService(newService.id);
  };

  const handleRemoveService = (serviceId) => {
    removeService(serviceId);
    // If we're editing the service that's being removed, close the editor
    if (editingService === serviceId) {
      setEditingService(null);
    }
  };

  return (
    <div className="form-builder">
      <div className="builder-header">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3">Build Your Dogge Card</h2>
              <p className="lead mb-4 opacity-75">
                Customize your pet service card to share with your community
              </p>
              <Link
                to="/preview"
                style={{
                  position: "relative",
                  zIndex: 10,
                  padding: "12px 24px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <Eye size={20} style={{ marginRight: "8px" }} />
                Preview Card
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="builder-content">
        <div className="builder-sidebar">
          <nav className="section-nav">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`section-nav-item d-flex align-items-center gap-3 w-100 border-0 rounded-3 p-3 text-start transition-all ${
                    activeSection === section.id ? "active" : ""
                  }`}
                >
                  <IconComponent size={20} className="flex-shrink-0" />
                  <span className="fw-semibold">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="builder-main">
          {activeSection === "provider" && <ProviderInfoEditor />}

          {activeSection === "services" && (
            <div className="services-section">
              <div className="section-header d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="h3 fw-bold mb-2">Services</h3>
                  <p className="text-muted mb-0">
                    Add and manage your pet services
                  </p>
                </div>
                <button
                  onClick={handleAddService}
                  className="btn btn-success d-flex align-items-center gap-2 px-3 py-2"
                >
                  <Plus size={18} />
                  Add Service
                </button>
              </div>

              <div className="services-list">
                {state.currentCard.services.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="text-muted mb-3">
                      <PawPrint size={48} className="opacity-50" />
                    </div>
                    <h5 className="fw-semibold mb-2">No Services Added</h5>
                    <p className="text-muted mb-3">
                      Start by adding your first service to create your card
                    </p>
                    <button
                      onClick={handleAddService}
                      className="btn btn-primary d-flex align-items-center gap-2 mx-auto"
                    >
                      <Plus size={18} />
                      Add Your First Service
                    </button>
                  </div>
                ) : (
                  state.currentCard.services.map((service, index) => (
                    <div key={service.id} className="service-item">
                      <div className="service-header">
                        <div className="service-icon d-flex align-items-center justify-content-center rounded-3 bg-light">
                          <span className="fs-4">{service.icon}</span>
                        </div>
                        <div className="service-name flex-grow-1">
                          <h6 className="fw-semibold mb-1">{service.name}</h6>
                          <p className="text-muted small mb-0">
                            {service.description}
                          </p>
                        </div>
                        <div className="service-price fw-bold text-success fs-5">
                          ${service.basePrice}
                        </div>
                        <div className="service-actions d-flex gap-2">
                          <button
                            onClick={() => setEditingService(service.id)}
                            className="btn btn-outline-primary btn-sm p-2"
                            title="Edit Service"
                          >
                            <Settings size={16} />
                          </button>
                          <button
                            onClick={() => handleRemoveService(service.id)}
                            className="btn btn-outline-danger btn-sm p-2"
                            title="Delete Service"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {editingService && (
                <ServiceEditor
                  service={state.currentCard.services.find(
                    (s) => s.id === editingService
                  )}
                  onSave={(updatedService) => {
                    updateService(updatedService);
                    setEditingService(null);
                  }}
                  onCancel={() => setEditingService(null)}
                />
              )}
            </div>
          )}

          {activeSection === "holiday" && <HolidayRateEditor />}

          {activeSection === "optional" && <OptionalSectionsEditor />}

          {activeSection === "design" && <DesignEditor />}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
