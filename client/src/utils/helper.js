export const isValidEmail = (email) => {
  if (!email) return false;

  const trimmed = email.trim();

  // basic sanity check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(trimmed);
};

export const formatNumber = (value) => {
  if (value === null || value === undefined) return "";

  const number = Number(value);
  if (isNaN(number)) return value;

  return number.toLocaleString("en-US");
};
