---
title: "Accessibility information for web authors"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/information_for_web_authors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Accessibility information for web authors

This document lists guidelines and regulations, how-to's, and tools for checking and repairing accessibility problems with websites.

## Guidelines and Regulations

- ARIA Authoring Practices Guide (APG)
    Guide to accessibility semantics defined by the Accessible Rich Internet Application (ARIA) specification to create accessible web experiences. Describes how to apply accessibility semantics to common design patterns and widgets, providing design patterns and functional examples.
- Web Content Accessibility Guidelines (WCAG)
    Another important set of guidelines from the W3C _Web Accessibility Initiative (WAI)_. The European Union is looking to base their upcoming accessibility regulations on these guidelines. These guidelines are discussed on the WAI interest group discussion list.
- ARIA on this site
    MDN guide to all the ARIA roles and ARIA properties, including best practices, related roles and properties, and examples.

## How-to's

- Accessibility for teams
    A brief guide from the U.S. General Services administration's Technology Transformation Services covering several accessibility topics with links to "how-to" videos and to related WCAG references.
- Accessible Web Page Authoring
    IBM has made their accessibility requirements that need to be met public and interactive.

## Automated Checking & Repair

Use a tool to quickly check for common errors in your browser.

- HTML CodeSniffer
- aXe
- Lighthouse Accessibility Audit
- Accessibility Insights
- WAVE

Tools to integrate into your build process, programmatically adding accessibility tests, so you can catch errors as you develop your web application:

- axe-core
- jsx-a11y
- Lighthouse Audits
- AccessLint.js

Continuous integration tools to find accessibility issues in your GitHub pull requests:

- AccessLint

While best to test your web applications with real users, you can simulate color blindness, low vision, low contrast, and zooming. You should always test your site without a mouse and touch to test keyboard navigation. You may also want to try your site using voice commands. Try disabling your mouse and using browser extensions like Web Disability Simulator
