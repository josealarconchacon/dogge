import React from "react";
import { useDoggeCard } from "../context/DoggeCardContext";
import { Plus, Trash2, Image, MessageSquare, User, Clock } from "lucide-react";

const OptionalSectionsEditor = () => {
  const { state, updateOptionalSection } = useDoggeCard();
  const { optionalSections } = state.currentCard;

  const sections = [
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <MessageSquare size={20} />,
      description: "Add customer reviews and testimonials",
    },
    {
      id: "about",
      label: "About Me",
      icon: <User size={20} />,
      description: "Tell customers about yourself and your experience",
    },
    {
      id: "images",
      label: "Photos",
      icon: <Image size={20} />,
      description: "Add photos of your work or happy pets",
    },
    {
      id: "availability",
      label: "Availability",
      icon: <Clock size={20} />,
      description: "Show your weekly schedule and availability",
    },
  ];

  const handleToggleSection = (sectionId) => {
    const currentState = optionalSections[sectionId].enabled;
    updateOptionalSection(sectionId, { enabled: !currentState });
  };

  const handleAddTestimonial = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      text: "",
      author: "",
      rating: 5,
    };
    updateOptionalSection("testimonials", {
      items: [...optionalSections.testimonials.items, newTestimonial],
    });
  };

  const handleUpdateTestimonial = (id, field, value) => {
    const updatedItems = optionalSections.testimonials.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateOptionalSection("testimonials", { items: updatedItems });
  };

  const handleRemoveTestimonial = (id) => {
    const updatedItems = optionalSections.testimonials.items.filter(
      (item) => item.id !== id
    );
    updateOptionalSection("testimonials", { items: updatedItems });
  };

  const handleUpdateAvailability = (day, status) => {
    const updatedSchedule = {
      ...optionalSections.availability.schedule,
      [day]: status,
    };
    updateOptionalSection("availability", { schedule: updatedSchedule });
  };

  const getAvailabilityStatus = (day) => {
    return optionalSections.availability.schedule[day] || "Available";
  };

  return (
    <div className="editor-section">
      <div className="section-header">
        <h3>Optional Sections</h3>
        <p>Add extra sections to make your card more engaging</p>
      </div>

      <div className="optional-sections">
        {sections.map((section) => (
          <div key={section.id} className="section-toggle">
            <div className="section-toggle-header">
              <div className="section-toggle-info">
                <span className="section-icon">{section.icon}</span>
                <div>
                  <h4>{section.label}</h4>
                  <p>{section.description}</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={optionalSections[section.id].enabled}
                  onChange={() => handleToggleSection(section.id)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {optionalSections[section.id].enabled && (
              <div className="section-content">
                {section.id === "testimonials" && (
                  <div className="testimonials-editor">
                    <div className="testimonials-list">
                      {optionalSections.testimonials.items.map(
                        (testimonial) => (
                          <div
                            key={testimonial.id}
                            className="testimonial-item"
                          >
                            <div className="testimonial-header">
                              <input
                                type="text"
                                value={testimonial.author}
                                onChange={(e) =>
                                  handleUpdateTestimonial(
                                    testimonial.id,
                                    "author",
                                    e.target.value
                                  )
                                }
                                placeholder="Customer name"
                                className="form-input"
                              />
                              <select
                                value={testimonial.rating}
                                onChange={(e) =>
                                  handleUpdateTestimonial(
                                    testimonial.id,
                                    "rating",
                                    parseInt(e.target.value)
                                  )
                                }
                                className="form-select"
                              >
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <option key={rating} value={rating}>
                                    {"⭐".repeat(rating)}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() =>
                                  handleRemoveTestimonial(testimonial.id)
                                }
                                className="remove-btn"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <textarea
                              value={testimonial.text}
                              onChange={(e) =>
                                handleUpdateTestimonial(
                                  testimonial.id,
                                  "text",
                                  e.target.value
                                )
                              }
                              placeholder="Customer testimonial..."
                              className="form-textarea"
                              rows={3}
                            />
                          </div>
                        )
                      )}
                    </div>
                    <button onClick={handleAddTestimonial} className="add-btn">
                      <Plus size={16} />
                      Add Testimonial
                    </button>
                  </div>
                )}

                {section.id === "about" && (
                  <div className="about-editor">
                    <textarea
                      value={optionalSections.about.content}
                      onChange={(e) =>
                        updateOptionalSection("about", {
                          content: e.target.value,
                        })
                      }
                      placeholder="Tell customers about yourself, your experience with pets, and why they should choose your services..."
                      className="form-textarea"
                      rows={6}
                    />
                  </div>
                )}

                {section.id === "images" && (
                  <div className="images-editor">
                    <p className="info-text">
                      Image upload functionality would be implemented here. For
                      now, you can add image URLs.
                    </p>
                    <input
                      type="text"
                      placeholder="Image URL (optional)"
                      className="form-input"
                    />
                  </div>
                )}

                {section.id === "availability" && (
                  <div className="availability-editor">
                    <p className="info-text">
                      Availability schedule editor would be implemented here.
                    </p>
                    <div className="schedule-grid">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <div key={day} className="schedule-day">
                          <label>{day}</label>
                          <select
                            value={getAvailabilityStatus(day)}
                            onChange={(e) =>
                              handleUpdateAvailability(day, e.target.value)
                            }
                            className="form-select"
                          >
                            <option value="Available">Available</option>
                            <option value="Limited">Limited</option>
                            <option value="Unavailable">Unavailable</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionalSectionsEditor;
