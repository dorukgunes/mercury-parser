export const NYMagExtractor = {
  domain: 'nymag.com',
  content: {
    // Order by most likely. Extractor will stop on first occurrence
    selectors: ['div.article-content', 'section.body', 'article.article'],

    // Selectors to remove from the extracted content
    clean: ['.ad', 'aside', 'section.package-list' ,'.single-related-story', 'div.nym-image-collection', 'div.nym-image', 'div.divider_short', 'p.clay-paragraph:nth-child(2)', 'div.attribution', 'p.clay-paragraph:last-of-type'],

    // Object of tranformations to make on matched elements
    // Each key is the selector, each value is the tag to
    // transform to.
    // If a function is given, it should return a string
    // to convert to or nothing (in which case it will not perform
    // the transformation.
    transforms: {
      // Convert h1s to h2s
      h1: 'h2',

      // Convert lazy-loaded noscript images to figures
      noscript: ($node, $) => {
        const $children = $.browser ? $($node.text()) : $node.children();
        if (
          $children.length === 1 &&
          $children.get(0) !== undefined &&
          $children.get(0).tagName.toLowerCase() === 'img'
        ) {
          return 'figure';
        }

        return null;
      },
    },
  },

  title: {
    selectors: ['h1.lede-feature-title', 'h1.headline-primary', 'h1'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value'], '.by-authors', '.lede-feature-author'],
  },

  dek: {
    selectors: ['.lede-feature-teaser'],
  },

  excerpt: {
    selectors: ['h2.display-teaser', 'h2']
  },

  date_published: {
    selectors: [
      ['time.article-timestamp[datetime]', 'datetime'],
      'time.article-timestamp',
    ],
  },
};
