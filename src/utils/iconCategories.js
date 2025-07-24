// Icon categories for the service editor
export const iconCategories = {
  pets: {
    name: "Pets & Animals",
    icons: [
      "🐕",
      "🐕‍🦺",
      "🦮",
      "🐩",
      "🐕‍🦺",
      "🐱",
      "🐈",
      "🐈‍⬛",
      "🐰",
      "🐹",
      "🐭",
      "🐹",
      "🐰",
      "🦜",
      "🦎",
      "🐠",
      "🐟",
      "🐢",
      "🐍",
      "🦜",
    ],
  },
  activities: {
    name: "Activities & Play",
    icons: [
      "🎾",
      "🦴",
      "🧸",
      "🏃",
      "🚶",
      "🏃‍♀️",
      "🚶‍♀️",
      "🎯",
      "🎪",
      "🎨",
      "🎭",
      "🎪",
      "🎯",
      "🏆",
      "🥇",
      "🥈",
      "🥉",
      "🏅",
      "🎖️",
      "🏆",
    ],
  },
  care: {
    name: "Care & Health",
    icons: [
      "💊",
      "🏥",
      "🩺",
      "💉",
      "🩹",
      "🩻",
      "🦷",
      "👨‍⚕️",
      "👩‍⚕️",
      "🦴",
      "🫀",
      "🫁",
      "🧠",
      "🦿",
      "🦾",
      "🦷",
      "👁️",
      "👂",
      "👃",
      "👄",
    ],
  },
  grooming: {
    name: "Grooming & Beauty",
    icons: [
      "✂️",
      "🪒",
      "🧴",
      "🛁",
      "🚿",
      "🧼",
      "🪮",
      "💇",
      "💇‍♀️",
      "💅",
      "💄",
      "🎀",
      "🦋",
      "🌸",
      "🌺",
      "🌷",
      "🌹",
      "🌻",
      "🌼",
      "🌿",
    ],
  },
  home: {
    name: "Home & Environment",
    icons: [
      "🏠",
      "🏡",
      "🏘️",
      "🏚️",
      "🏗️",
      "🏭",
      "🏢",
      "🏬",
      "🏣",
      "🏤",
      "🏥",
      "🏨",
      "🏪",
      "🏫",
      "🏩",
      "💒",
      "⛪",
      "🕌",
      "🛕",
      "🕍",
    ],
  },
  nature: {
    name: "Nature & Outdoors",
    icons: [
      "🌳",
      "🌲",
      "🌴",
      "🌵",
      "🌾",
      "🌿",
      "☘️",
      "🍀",
      "🎍",
      "🎋",
      "🍃",
      "🍂",
      "🍁",
      "🌺",
      "🌸",
      "🌼",
      "🌻",
      "🌞",
      "🌝",
      "🌛",
    ],
  },
  food: {
    name: "Food & Nutrition",
    icons: [
      "🍽️",
      "🍴",
      "🥄",
      "🍽️",
      "🥣",
      "🥡",
      "🥢",
      "🍱",
      "🍘",
      "🍙",
      "🍚",
      "🍛",
      "🍜",
      "🍝",
      "🍞",
      "🥖",
      "🥨",
      "🥯",
      "🥞",
      "🧇",
    ],
  },
  time: {
    name: "Time & Schedule",
    icons: [
      "⏰",
      "🕐",
      "🕑",
      "🕒",
      "🕓",
      "🕔",
      "🕕",
      "🕖",
      "🕗",
      "🕘",
      "🕙",
      "🕚",
      "🕛",
      "🕜",
      "🕝",
      "🕞",
      "🕟",
      "🕠",
      "🕡",
      "🕢",
    ],
  },
  weather: {
    name: "Weather & Seasons",
    icons: [
      "☀️",
      "🌤️",
      "⛅",
      "🌥️",
      "☁️",
      "🌦️",
      "🌧️",
      "⛈️",
      "🌩️",
      "🌨️",
      "🌪️",
      "🌫️",
      "🌈",
      "☔",
      "🌂",
      "🌡️",
      "🔥",
      "❄️",
      "💧",
      "💦",
    ],
  },
};

// Utility function to get all icons from all categories
export const getAllIcons = () => {
  let allIcons = [];
  Object.values(iconCategories).forEach((category) => {
    allIcons = allIcons.concat(category.icons);
  });
  return allIcons;
};

// Utility function to get icons by category
export const getIconsByCategory = (categoryKey) => {
  return iconCategories[categoryKey]?.icons || [];
};

// Utility function to find which category an icon belongs to
export const findIconCategory = (icon) => {
  for (const [key, category] of Object.entries(iconCategories)) {
    if (category.icons.includes(icon)) {
      return key;
    }
  }
  return null;
};

// Utility function to get category name by key
export const getCategoryName = (categoryKey) => {
  return iconCategories[categoryKey]?.name || "Unknown";
};

// Utility function to filter icons based on search term and category
export const filterIcons = (searchTerm = "", selectedCategory = "all") => {
  let allIcons = [];

  if (selectedCategory === "all") {
    allIcons = getAllIcons();
  } else {
    allIcons = getIconsByCategory(selectedCategory);
  }

  if (searchTerm.trim()) {
    return allIcons.filter((icon) => {
      const categoryKey = findIconCategory(icon);
      const categoryName = getCategoryName(categoryKey);
      return categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return allIcons;
};

// Default icon for new services
export const DEFAULT_ICON = "🐾";

// Popular icons for quick access
export const popularIcons = [
  "🐕",
  "🐱",
  "🏠",
  "🎾",
  "🛁",
  "✂️",
  "💊",
  "🍽️",
  "⏰",
  "☀️",
];

// Utility function to validate if an icon is valid (not empty and within length limit)
export const isValidIcon = (icon) => {
  return icon && icon.trim().length > 0 && icon.length <= 2;
};

// Utility function to get a random icon from a specific category
export const getRandomIcon = (categoryKey = null) => {
  if (categoryKey && iconCategories[categoryKey]) {
    const icons = iconCategories[categoryKey].icons;
    return icons[Math.floor(Math.random() * icons.length)];
  }
  const allIcons = getAllIcons();
  return allIcons[Math.floor(Math.random() * allIcons.length)];
};

// Utility function to get icons by service type (suggested icons for common services)
export const getSuggestedIcons = (serviceName) => {
  const name = serviceName.toLowerCase();

  if (
    name.includes("board") ||
    name.includes("stay") ||
    name.includes("home")
  ) {
    return ["🏠", "🏡", "🏘️", "🌙", "🛏️"];
  }
  if (name.includes("walk") || name.includes("exercise")) {
    return ["🚶", "🏃", "🎾", "🦴", "🌳"];
  }
  if (name.includes("groom") || name.includes("bath")) {
    return ["✂️", "🛁", "🚿", "🧴", "💇"];
  }
  if (name.includes("feed") || name.includes("food")) {
    return ["🍽️", "🍴", "🥄", "🍱", "🍖"];
  }
  if (
    name.includes("vet") ||
    name.includes("health") ||
    name.includes("care")
  ) {
    return ["💊", "🏥", "🩺", "💉", "🩹"];
  }
  if (name.includes("train") || name.includes("behavior")) {
    return ["🎯", "🏆", "🎪", "🎨", "📚"];
  }

  return popularIcons;
};
