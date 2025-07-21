import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import { Eye, Plus, Trash2, Settings } from "lucide-react";
import ServiceEditor from "./ServiceEditor";
import ProviderInfoEditor from "./ProviderInfoEditor";
import HolidayRateEditor from "./HolidayRateEditor";
import OptionalSectionsEditor from "./OptionalSectionsEditor";
import DesignEditor from "./DesignEditor";

const FormBuilder = () => {
  const navigate = useNavigate();
  const { state, updateService, addService, removeService } = useDoggeCard();
  const [activeSection, setActiveSection] = useState("provider");
  const [editingService, setEditingService] = useState(null);

  const sections = [
    { id: "provider", label: "Provider Info", icon: "👤" },
    { id: "services", label: "Services", icon: "🐕" },
    { id: "holiday", label: "Holiday Rates", icon: "🎄" },
    { id: "optional", label: "Optional Sections", icon: "➕" },
    { id: "design", label: "Design", icon: "🎨" },
  ];

  const handleAddService = () => {
    const newService = {
      id: Date.now().toString(),
      name: "NEW SERVICE",
      icon: "🐾",
      description: "Describe your service here...",
      basePrice: 0,
      additionalPetPrice: 0,
    };
    addService(newService);
    setEditingService(newService.id);
  };

  const handlePreview = () => {
    navigate("/preview");
  };

  return (
    <div className="form-builder">
      <div className="builder-header">
        <h2>Build Your Dogge Card</h2>
        <p>Customize your pet service card to share with your community</p>
        <button onClick={handlePreview} className="preview-btn">
          <Eye size={16} />
          Preview Card
        </button>
      </div>

      <div className="builder-content">
        <div className="builder-sidebar">
          <nav className="section-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`section-nav-item ${
                  activeSection === section.id ? "active" : ""
                }`}
              >
                <span className="section-icon">{section.icon}</span>
                <span className="section-label">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="builder-main">
          {activeSection === "provider" && <ProviderInfoEditor />}

          {activeSection === "services" && (
            <div className="services-section">
              <div className="section-header">
                <h3>Services</h3>
                <button onClick={handleAddService} className="add-btn">
                  <Plus size={16} />
                  Add Service
                </button>
              </div>

              <div className="services-list">
                {state.currentCard.services.map((service, index) => (
                  <div key={service.id} className="service-item">
                    <div className="service-header">
                      <span className="service-icon">{service.icon}</span>
                      <span className="service-name">{service.name}</span>
                      <span className="service-price">
                        ${service.basePrice}
                      </span>
                      <div className="service-actions">
                        <button
                          onClick={() => setEditingService(service.id)}
                          className="edit-btn"
                        >
                          <Settings size={14} />
                        </button>
                        <button
                          onClick={() => removeService(service.id)}
                          className="delete-btn"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
