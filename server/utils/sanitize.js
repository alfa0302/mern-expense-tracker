const SENSITIVE_FIELDS = ["password", "token", "authorization"];

function sanitize(obj) {
  if (!obj || typeof obj !== "object") return obj;

  const clone = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (SENSITIVE_FIELDS.includes(key.toLowerCase())) {
      clone[key] = "***";
    } else if (typeof obj[key] === "object") {
      clone[key] = sanitize(obj[key]); // recursive
    } else {
      clone[key] = obj[key];
    }
  }

  return clone;
}

module.exports = sanitize;
