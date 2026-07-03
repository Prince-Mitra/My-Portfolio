function slugify(title) {
  return title
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Generates a unique slug by appending -2, -3, ... if needed.
 * `exists(slug)` should be an async function returning boolean.
 */
async function generateUniqueSlug(title, exists, excludeId = null) {
  const base = slugify(title);
  let slug = base;
  let counter = 2;

  while (await exists(slug, excludeId)) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
}

module.exports = { slugify, generateUniqueSlug };
