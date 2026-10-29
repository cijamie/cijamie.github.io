<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/atom:feed/atom:title"/> RSS feed</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&amp;family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&amp;display=swap" rel="stylesheet"/>
        <style>
          *, *::before, *::after { box-sizing: border-box; }
          body {
            margin: 0 auto;
            padding: 3rem 1.25rem 4rem;
            max-width: 44rem;
            background: #fbf9f4;
            color: #1b1a17;
            font-family: 'Newsreader', 'Iowan Old Style', Palatino, Georgia, serif;
            line-height: 1.6;
          }
          .sans { font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif; }
          a { color: inherit; text-decoration-color: #8b1c1c; text-underline-offset: 0.18em; }
          a:hover { color: #8b1c1c; }
          .back-link { display: inline-block; margin-bottom: 2.5rem; font-size: 0.875rem; font-weight: 500; color: #8b1c1c; }
          h1 { font-size: 2.6rem; font-weight: 500; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 0.75rem; }
          .feed-notice {
            margin: 0 0 3rem;
            padding: 1.25rem 1.4rem;
            background: #f3efe6;
            border-top: 2px solid #8b1c1c;
            font-size: 0.9375rem;
            color: #4f4a43;
          }
          .feed-notice p { margin: 0 0 0.6rem; }
          .feed-notice p:last-child { margin: 0; }
          .feed-entry { padding: 1.4rem 0; border-top: 1px solid #ddd6c8; }
          .feed-date { font-size: 0.8125rem; color: #716b62; }
          .feed-title { margin: 0.3rem 0 0; font-size: 1.4rem; font-weight: 500; line-height: 1.3; }
          .feed-title a { text-decoration: none; }
          .feed-title a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <a href="/" class="back-link sans">Back to <xsl:value-of select="/atom:feed/atom:title"/></a>
        <h1>RSS feed</h1>
        <div class="feed-notice sans">
          <p>This is the RSS feed for <strong><xsl:value-of select="/atom:feed/atom:title"/></strong>.</p>
          <p>To get new papers automatically, copy this page’s address into a feed reader such as Feedly, NetNewsWire, or Inoreader.</p>
        </div>

        <main>
          <xsl:for-each select="/atom:feed/atom:entry">
            <article class="feed-entry">
              <div class="feed-date sans">
                <xsl:value-of select="substring(atom:published, 1, 10)"/>
              </div>
              <h2 class="feed-title">
                <a href="{atom:link/@href}">
                  <xsl:value-of select="atom:title"/>
                </a>
              </h2>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
