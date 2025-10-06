// This endpoint is intentionally disabled because contact submissions
// are now handled entirely by FormSubmit (client-side form POST).
// Respond with 410 Gone for all requests.
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(410).json({
    error: 'This endpoint has been deprecated. Please use the site\'s contact form (FormSubmit).'
  });
};
