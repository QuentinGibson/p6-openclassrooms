const { RateLimiterMemory } = require("rate-limiter-flexible");

const opts = {
  points: 6, // 6 points
  duration: 1, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

module.exports = (req, res, next) => {
  const ipAddress =
    req.header("x-forwarded-for") || req.connection.remoteAddress;
  rateLimiter
    .consume(ipAddress, 2) // consume 2 points
    .then((rateLimiterRes) => {
      console.log(
        `rate info: ipdress - ${ipAddress}, score - ${rateLimiterRes}`
      );
      // 2 points consumed
      next();
    })
    .catch((rateLimiterRes) => {
      // Not enough points to consume
      return res.status(400).json({
        error: "Rate Limit Reached.",
      });
    });
};
