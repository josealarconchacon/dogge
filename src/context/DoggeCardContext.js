import React, { createContext, useContext, useReducer, useEffect } from "react";

const DoggeCardContext = createContext();

const initialState = {
  currentCard: {
    id: null,
    providerInfo: {
      name: "",
      phone: "",
      email: "",
      address: "",
      apartment: "",
      year: new Date().getFullYear(),
    },
    services: [],
    holidayRate: {
      enabled: false,
      additionalCharge: 0,
      dates: [],
    },
    targetAudience: "",
    generalInclusions: "",
    optionalSections: {
      testimonials: { enabled: false, items: [] },
      about: { enabled: false, content: "" },
      images: { enabled: false, items: [] },
      availability: { enabled: false, schedule: {} },
    },
    design: {
      primaryColor: "#008080",
      secondaryColor: "#F5F5DC",
      accentColor: "#FF6B35",
    },
  },
  savedCards: [],
};

const doggeCardReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PROVIDER_INFO":
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          providerInfo: {
            ...state.currentCard.providerInfo,
            ...action.payload,
          },
        },
      };

    case "UPDATE_SERVICE":
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          services: state.currentCard.services.map((service) =>
            service.id === action.payload.id
              ? { ...service, ...action.payload }
              : service
          ),
        },
      };

    case "ADD_SERVICE":
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          services: [...state.currentCard.services, action.payload],
        },
      };

    case "REMOVE_SERVICE":
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          services: state.currentCard.services.filter(
            (service) => service.id !== action.payload
          ),
        },
      };

    case "UPDATE_HOLIDAY_RATE":
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          holidayRate: {
            ...state.currentCard.holidayRate,
            ...action.payload,
          },
        },
      };

    case "UPDATE_OPTIONAL_SECTION":
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          optionalSections: {
            ...state.currentCard.optionalSections,
            [action.payload.section]: {
              ...state.currentCard.optionalSections[action.payload.section],
              ...action.payload.data,
            },
          },
        },
      };

    case "UPDATE_TARGET_AUDIENCE":
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          targetAudience: action.payload,
        },
      };

    case "UPDATE_GENERAL_INCLUSIONS":
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          generalInclusions: action.payload,
        },
      };

    case "UPDATE_DESIGN":
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          design: {
            ...state.currentCard.design,
            ...action.payload,
          },
        },
      };

    case "SAVE_CARD":
      const cardToSave = {
        ...state.currentCard,
        id: state.currentCard.id || Date.now().toString(),
        savedAt: new Date().toISOString(),
      };
      return {
        ...state,
        currentCard: cardToSave,
        savedCards: [
          ...state.savedCards.filter((card) => card.id !== cardToSave.id),
          cardToSave,
        ],
      };

    case "LOAD_CARD":
      return {
        ...state,
        currentCard: action.payload,
      };

    case "RESET_CARD":
      return {
        ...state,
        currentCard: { ...initialState.currentCard, id: null },
      };

    case "CLEAR_SAVED_CARDS":
      return {
        ...state,
        savedCards: [],
      };

    case "DELETE_CARD":
      return {
        ...state,
        savedCards: state.savedCards.filter(
          (card) => card.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const DoggeCardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(doggeCardReducer, initialState);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedCards = localStorage.getItem("doggeSavedCards");

    if (savedCards) {
      const parsedCards = JSON.parse(savedCards);
      parsedCards.forEach((card) => {
        dispatch({ type: "SAVE_CARD", payload: card });
      });
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("doggeSavedCards", JSON.stringify(state.savedCards));
  }, [state.savedCards]);

  const value = {
    state,
    dispatch,
    updateProviderInfo: (data) =>
      dispatch({ type: "UPDATE_PROVIDER_INFO", payload: data }),
    updateService: (data) =>
      dispatch({ type: "UPDATE_SERVICE", payload: data }),
    addService: (service) =>
      dispatch({ type: "ADD_SERVICE", payload: service }),
    removeService: (id) => dispatch({ type: "REMOVE_SERVICE", payload: id }),
    updateHolidayRate: (data) =>
      dispatch({ type: "UPDATE_HOLIDAY_RATE", payload: data }),
    updateOptionalSection: (section, data) =>
      dispatch({
        type: "UPDATE_OPTIONAL_SECTION",
        payload: { section, data },
      }),
    updateTargetAudience: (audience) =>
      dispatch({ type: "UPDATE_TARGET_AUDIENCE", payload: audience }),
    updateGeneralInclusions: (inclusions) =>
      dispatch({ type: "UPDATE_GENERAL_INCLUSIONS", payload: inclusions }),
    updateDesign: (data) => dispatch({ type: "UPDATE_DESIGN", payload: data }),
    saveCard: () => dispatch({ type: "SAVE_CARD" }),
    loadCard: (card) => dispatch({ type: "LOAD_CARD", payload: card }),
    resetCard: () => dispatch({ type: "RESET_CARD" }),
    clearSavedCards: () => dispatch({ type: "CLEAR_SAVED_CARDS" }),
    deleteCard: (cardId) => dispatch({ type: "DELETE_CARD", payload: cardId }),
  };

  return (
    <DoggeCardContext.Provider value={value}>
      {children}
    </DoggeCardContext.Provider>
  );
};

export const useDoggeCard = () => {
  const context = useContext(DoggeCardContext);
  if (!context) {
    throw new Error("useDoggeCard must be used within a DoggeCardProvider");
  }
  return context;
};
