import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Save,
  Edit3,
  DollarSign,
  Tag,
  FileText,
  Clock,
  Info,
  Search,
  ChevronDown,
  Plus,
} from "lucide-react";
import {
  iconCategories,
  filterIcons,
  DEFAULT_ICON,
  popularIcons,
} from "../utils/iconCategories";

const ServiceEditor = ({ service, onSave, onCancel }) => {
  const [editedService, setEditedService] = useState({ ...service });
  const [iconDropdownOpen, setIconDropdownOpen] = useState(false);
  const [iconSearchTerm, setIconSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIconDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (field, value) => {
    setEditedService((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!editedService.name.trim()) {
      alert("Please enter a service name");
      return;
    }
    if (editedService.basePrice < 0) {
      alert("Base price cannot be negative");
      return;
    }
    if (editedService.additionalPetPrice < 0) {
      alert("Additional pet price cannot be negative");
      return;
    }
    onSave(editedService);
  };

  // Filter icons based on search term and category
  const getFilteredIcons = () => {
    return filterIcons(iconSearchTerm, selectedCategory);
  };

  const handleIconSelect = (icon) => {
    handleChange("icon", icon);
    setIconDropdownOpen(false);
    setIconSearchTerm("");
  };

  const handleCustomIconInput = (e) => {
    const value = e.target.value;
    if (value.length <= 2) {
      handleChange("icon", value);
    }
  };

  return (
    <div className="service-editor">
      <div className="editor-header mb-4">
        <h4 className="h4 fw-bold mb-3 d-flex align-items-center gap-2">
          <Edit3 size={20} />
          Edit Service
        </h4>
        <div className="editor-actions d-flex gap-2">
          <button
            onClick={handleSave}
            className="btn btn-success d-flex align-items-center gap-2"
          >
            <Save size={16} />
            Save
          </button>
          <button
            onClick={onCancel}
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label
                htmlFor="serviceName"
                className="form-label fw-semibold d-flex align-items-center gap-2"
              >
                <Tag size={16} />
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                value={editedService.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="form-control"
                placeholder="BOARDING"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label
                htmlFor="serviceIcon"
                className="form-label fw-semibold d-flex align-items-center gap-2"
              >
                <Tag size={16} />
                Icon
              </label>
              <div className="position-relative" ref={dropdownRef}>
                <div className="d-flex gap-2">
                  <div className="flex-grow-1 position-relative">
                    <input
                      type="text"
                      id="serviceIcon"
                      value={editedService.icon}
                      onChange={handleCustomIconInput}
                      className="form-control"
                      maxLength={2}
                      placeholder="Select or type custom icon"
                      readOnly={iconDropdownOpen}
                    />
                    <button
                      type="button"
                      onClick={() => setIconDropdownOpen(!iconDropdownOpen)}
                      className="btn btn-outline-secondary position-absolute end-0 top-0 h-100 border-start-0"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-center bg-light border rounded px-3"
                    style={{ minWidth: "48px" }}
                  >
                    <span className="fs-4">{editedService.icon || "?"}</span>
                  </div>
                </div>

                {iconDropdownOpen && (
                  <div
                    className="position-absolute top-100 start-0 w-100 mt-1 bg-white border rounded-3 shadow-lg p-3"
                    style={{
                      zIndex: 1000,
                      maxHeight: "400px",
                      overflowY: "auto",
                    }}
                  >
                    {/* Search Bar */}
                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <Search size={16} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search icons..."
                          value={iconSearchTerm}
                          onChange={(e) => setIconSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Popular Icons */}
                    <div className="mb-3">
                      <h6 className="fw-semibold mb-2">Popular Icons</h6>
                      <div className="row g-2">
                        {popularIcons.map((icon, index) => (
                          <div key={index} className="col-2">
                            <button
                              type="button"
                              onClick={() => handleIconSelect(icon)}
                              className="btn btn-outline-primary border w-100 p-2 text-center fs-5"
                              style={{ minHeight: "48px" }}
                              title={icon}
                            >
                              {icon}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-3">
                      <select
                        className="form-select form-select-sm"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="all">All Categories</option>
                        {Object.entries(iconCategories).map(
                          ([key, category]) => (
                            <option key={key} value={key}>
                              {category.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* Icons Grid */}
                    <div className="row g-2">
                      {getFilteredIcons().map((icon, index) => (
                        <div key={index} className="col-2">
                          <button
                            type="button"
                            onClick={() => handleIconSelect(icon)}
                            className="btn btn-outline-light border w-100 p-2 text-center fs-5"
                            style={{ minHeight: "48px" }}
                            title={icon}
                          >
                            {icon}
                          </button>
                        </div>
                      ))}
                    </div>

                    {getFilteredIcons().length === 0 && (
                      <div className="text-center py-3 text-muted">
                        <p className="mb-0">
                          No icons found. Try a different search term.
                        </p>
                      </div>
                    )}

                    {/* Custom Icon Section */}
                    <div className="mt-3 pt-3 border-top">
                      <h6 className="fw-semibold mb-2 d-flex align-items-center gap-2">
                        <Plus size={16} />
                        Custom Icon
                      </h6>
                      <p className="text-muted small mb-2">
                        Type any emoji or character (max 2 characters)
                      </p>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Type custom icon..."
                        maxLength={2}
                        onChange={handleCustomIconInput}
                        value={editedService.icon}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label
                htmlFor="basePrice"
                className="form-label fw-semibold d-flex align-items-center gap-2"
              >
                <DollarSign size={16} />
                Base Price ($)
              </label>
              <input
                type="number"
                id="basePrice"
                value={editedService.basePrice}
                onChange={(e) =>
                  handleChange("basePrice", parseInt(e.target.value) || 0)
                }
                className="form-control"
                min="0"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label
                htmlFor="additionalPetPrice"
                className="form-label fw-semibold d-flex align-items-center gap-2"
              >
                <DollarSign size={16} />
                Additional Pet Price ($)
              </label>
              <input
                type="number"
                id="additionalPetPrice"
                value={editedService.additionalPetPrice}
                onChange={(e) =>
                  handleChange(
                    "additionalPetPrice",
                    parseInt(e.target.value) || 0
                  )
                }
                className="form-control"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <div className="mb-3">
              <label
                htmlFor="includedFeature"
                className="form-label fw-semibold d-flex align-items-center gap-2"
              >
                <Tag size={16} />
                Included Feature
              </label>
              <input
                type="text"
                id="includedFeature"
                value={editedService.includedFeature || ""}
                onChange={(e) =>
                  handleChange("includedFeature", e.target.value)
                }
                className="form-control"
                placeholder="DOG WALK INCLUDED"
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label
                htmlFor="specificTerms"
                className="form-label fw-semibold d-flex align-items-center gap-2"
              >
                <Clock size={16} />
                Specific Terms/Hours
              </label>
              <input
                type="text"
                id="specificTerms"
                value={editedService.specificTerms || ""}
                onChange={(e) => handleChange("specificTerms", e.target.value)}
                className="form-control"
                placeholder="Check-in: 7 AM - Check-out: next day at 12 PM"
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label
                htmlFor="description"
                className="form-label fw-semibold d-flex align-items-center gap-2"
              >
                <FileText size={16} />
                Description
              </label>
              <textarea
                id="description"
                value={editedService.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="form-control"
                rows={4}
                placeholder="Describe your service in detail..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceEditor;
