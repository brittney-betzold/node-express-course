class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode; // Add this line to assign the statusCode
  }
}

module.exports = CustomAPIError;
