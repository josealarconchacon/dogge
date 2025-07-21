import React from "react";
import { useDoggeCard } from "../context/DoggeCardContext";

const DesignEditor = () => {
  const { state, updateDesign } = useDoggeCard();
  const { design } = state.currentCard;

  const handleColorChange = (colorType, value) => {
    updateDesign({ [colorType]: value });
  };

  const presetThemes = [
    {
      name: "Classic Teal",
      primaryColor: "#008080",
      secondaryColor: "#F5F5DC",
      accentColor: "#FF6B35",
    },
    {
      name: "Ocean Blue",
      primaryColor: "#1E3A8A",
      secondaryColor: "#F0F9FF",
      accentColor: "#F59E0B",
    },
    {
      name: "Forest Green",
      primaryColor: "#166534",
      secondaryColor: "#F0FDF4",
      accentColor: "#DC2626",
    },
    {
      name: "Sunset Orange",
      primaryColor: "#EA580C",
      secondaryColor: "#FEF7ED",
      accentColor: "#7C3AED",
    },
    {
      name: "Lavender",
      primaryColor: "#7C3AED",
      secondaryColor: "#FAF5FF",
      accentColor: "#059669",
    },
  ];

  const applyTheme = (theme) => {
    updateDesign({
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      accentColor: theme.accentColor,
    });
  };

  return (
    <div className="editor-section">
      <div className="section-header">
        <h3>Design & Colors</h3>
        <p>Customize the visual appearance of your Dogge Card</p>
      </div>

      <div className="design-section">
        <h4>Color Scheme</h4>

        <div className="color-inputs">
          <div className="color-input-group">
            <label htmlFor="primaryColor">Primary Color</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                id="primaryColor"
                value={design.primaryColor}
                onChange={(e) =>
                  handleColorChange("primaryColor", e.target.value)
                }
                className="color-picker"
              />
              <input
                type="text"
                value={design.primaryColor}
                onChange={(e) =>
                  handleColorChange("primaryColor", e.target.value)
                }
                className="color-text"
                placeholder="#008080"
              />
            </div>
            <p className="color-description">
              Used for headers and main elements
            </p>
          </div>

          <div className="color-input-group">
            <label htmlFor="secondaryColor">Secondary Color</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                id="secondaryColor"
                value={design.secondaryColor}
                onChange={(e) =>
                  handleColorChange("secondaryColor", e.target.value)
                }
                className="color-picker"
              />
              <input
                type="text"
                value={design.secondaryColor}
                onChange={(e) =>
                  handleColorChange("secondaryColor", e.target.value)
                }
                className="color-text"
                placeholder="#F5F5DC"
              />
            </div>
            <p className="color-description">
              Used for backgrounds and content areas
            </p>
          </div>

          <div className="color-input-group">
            <label htmlFor="accentColor">Accent Color</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                id="accentColor"
                value={design.accentColor}
                onChange={(e) =>
                  handleColorChange("accentColor", e.target.value)
                }
                className="color-picker"
              />
              <input
                type="text"
                value={design.accentColor}
                onChange={(e) =>
                  handleColorChange("accentColor", e.target.value)
                }
                className="color-text"
                placeholder="#FF6B35"
              />
            </div>
            <p className="color-description">Used for prices and highlights</p>
          </div>
        </div>
      </div>

      <div className="design-section">
        <h4>Preset Themes</h4>
        <p>Choose from pre-designed color schemes</p>

        <div className="theme-grid">
          {presetThemes.map((theme, index) => (
            <button
              key={index}
              onClick={() => applyTheme(theme)}
              className="theme-option"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 50%, ${theme.accentColor} 100%)`,
              }}
            >
              <span className="theme-name">{theme.name}</span>
              <div className="theme-colors">
                <div
                  className="theme-color-preview"
                  style={{ backgroundColor: theme.primaryColor }}
                ></div>
                <div
                  className="theme-color-preview"
                  style={{ backgroundColor: theme.secondaryColor }}
                ></div>
                <div
                  className="theme-color-preview"
                  style={{ backgroundColor: theme.accentColor }}
                ></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="design-section">
        <h4>Preview</h4>
        <div
          className="color-preview"
          style={{
            backgroundColor: design.secondaryColor,
            border: `2px solid ${design.primaryColor}`,
          }}
        >
          <div
            className="preview-header"
            style={{ backgroundColor: design.primaryColor }}
          >
            <h5 style={{ color: "white" }}>Sample Header</h5>
          </div>
          <div className="preview-content">
            <p>Sample content area</p>
            <span
              className="preview-accent"
              style={{ color: design.accentColor, fontWeight: "bold" }}
            >
              $90
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignEditor;
