const { ZodError } = require('zod');

/**
 * Usage: validate({ body: someZodSchema, query: otherSchema, params: idSchema })
 */
function validate(schemas) {
  return (req, res, next) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
        return res.status(400).json({ success: false, message });
      }
      next(err);
    }
  };
}

module.exports = { validate };
