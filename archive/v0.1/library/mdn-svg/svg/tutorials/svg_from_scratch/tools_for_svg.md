---
title: "Tools for SVG"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/tutorials/svg_from_scratch/tools_for_svg/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Tools for SVG

Now that we covered the basics of the SVG internals, we will take a look at some tools to work with SVG files.

## Inkscape

URL: www.inkscape.org

One of the most important tools for a graphics format is a decent drawing program. Inkscape offers state-of-the-art vector drawing, and it's open source.

Moreover, it uses SVG as its native file format. To store Inkscape specific data, it extends the SVG file with elements and attributes in a custom namespace, but you can also choose to export as plain SVG.

## Adobe Illustrator

URL: www.adobe.com/products/illustrator/

Before Adobe acquired Macromedia, it was the most prominent promoter of SVG. From this time stems the good support of SVG in Illustrator. However, the resulting SVG often shows some quirks that make it necessary to post-process it for general applicability.

## Apache Batik

URL: xmlgraphics.apache.org/batik/

Batik is a set of open-source tools under the roof of the Apache Software Foundation. The toolkit is written in Java and offers almost complete SVG 1.1 support, as well as some features that were originally planned for SVG 1.2.

Batik offers a viewer (Squiggle), a rasterizer for PNG output, and an SVG pretty printer to format SVG files.

Together with Apache FOP Batik can transform SVG to PDF.

### Other renderers

Several projects exist that can create a raster image from an SVG source. ImageMagick is one of the most famous command-line image processing tools. The GNOME library librsvg is used by Wikipedia to rasterize their SVG graphics, and resvg is a fast standalone renderer. Headless browsers driven by Puppeteer or Playwright are also popular for this purpose, as the image produced is closer to what the SVG will look like in the browser.

## Google Docs

URL: www.google.com/google-d-s/drawings/

Drawings from Google Docs can be exported as SVG.

## Science

The well-known plotting tools, xfig and gnuplot, both support exporting as SVG. To render graphs on the web, JSXGraph supports SVG and canvas, automatically deciding which technology to use based on browser capabilities.

In Geographic Information System (GIS) applications, SVG is often used as both storage and rendering format.

## More tools!

The W3C offers a list of programs that support SVG.
