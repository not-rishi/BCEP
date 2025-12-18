// Rate limiting email requests to prevent abuse

const rateStore = {}; // { identifier: { count, expiry } }

module.exports = function checkEmailRateLimit(identifier) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const max = 3;

  if (!rateStore[identifier]) {
    rateStore[identifier] = {
      count: 1,
      expiry: now + windowMs,
    };
    return;
  }

  const record = rateStore[identifier];

  if (now > record.expiry) {
    rateStore[identifier] = { count: 1, expiry: now + windowMs };
    return;
  }

  if (record.count >= max) {
    const retryAfterMs = record.expiry - now;
    const retryAfterMin = Math.ceil(retryAfterMs / 60000);

    const error = new Error(
      `Too many email attempts. Try again in ${retryAfterMin} min`
    );
    error.statusCode = 429;
    throw error;
  }

  record.count++;
};
