---
title: "JavaScript technologies overview"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/javascript_technologies_overview/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript technologies overview

Whereas HTML defines a webpage's structure and content and CSS sets the formatting and appearance, JavaScript adds interactivity to a webpage and creates rich web applications.

However, the umbrella term "JavaScript" as understood in a web browser context contains several very different elements. One of them is the core language (ECMAScript), another is the collection of the Web APIs, including the DOM (Document Object Model).

## JavaScript, the core language (ECMAScript)

The core language of JavaScript is standardized by the ECMA TC39 committee as a language named ECMAScript. "ECMAScript" is the term for the language standard, but "ECMAScript" and "JavaScript" can be used interchangeably.

This core language is also used in non-browser environments, for example in Node.js.

### What falls under the ECMAScript scope?

Among other things, ECMAScript defines:

- Language syntax (parsing rules, keywords, control flow, object literal initialization, ...)
- Error handling mechanisms (`throw`, `try...catch`, ability to create user-defined `Error` types)
- Types (boolean, number, string, function, object, ...)
- A prototype-based inheritance mechanism
- Built-in objects and functions, including `JSON`, `Math`, Array methods, `parseInt`, `decodeURI`, etc.
- Strict mode
- A module system
- Basic <example-value> model

### Standardization process

ECMAScript editions are approved and published as a standard by the ECMA General Assembly on a yearly basis. All development is public on the Ecma TC39 GitHub organization, which hosts proposals, the official specification text, and meeting notes.

Before the 6th edition of ECMAScript (known as ES6), specifications were published once every several years, and are commonly referred to by their major version numbers — ES3, ES5, etc. After ES6, the specification is named by the publishing year — ES2017, ES2018, etc. ES6 is synonymous with ES2015. _ESNext_ is a dynamic name that refers to whatever the next version is at the time of writing. ESNext features are more correctly called proposals, because, by definition, the specification has not been finalized yet.

The current committee-approved snapshot of ECMA-262 is available in PDF and HTML format on Ecma International's ECMA-262 language specification page. ECMA-262 and ECMA-402 are continuously maintained and kept up to date by the specification editors; the TC39 website hosts the latest, up-to-date ECMA-262 and ECMA-402 versions.

New language features, including introduction of new syntaxes and APIs and revision of existing behaviors, are discussed in the form of proposals. Each proposal goes through a staged process, and is typically implemented by JavaScript engines at stage 3 or stage 4 and thus available for public consumption.

See Wikipedia ECMAScript entry for more information on ECMAScript history.

### Internationalization API

The ECMAScript Internationalization API Specification is an addition to the ECMAScript Language Specification, also standardized by Ecma TC39. The internationalization API provides collation (string comparison), number formatting, and date-and-time formatting for JavaScript applications, letting the applications choose the language and tailor the functionality to their needs. The initial standard was approved in December 2012; the status of implementations in browsers is tracked in the documentation of the `Intl` object. The Internationalization specification is nowadays also ratified on a yearly basis and browsers constantly improve their implementation.

### Related resources

There are a variety of ways you can participate in or just track current work on the ECMAScript Language Specification and the ECMAScript Internationalization API Specification and related resources:

- ECMAScript Language Specification repo
- ECMAScript Internationalization API Specification repo
- ECMAScript proposals repo
- ECMAScript conformance test suite repo
- TC39 meeting notes
- ECMAScript spec discussion; current mailing list
- ECMAScript spec discussion; historical mailing-list archives (until March 2021)

## DOM APIs

### WebIDL

The WebIDL specification provides the glue between the DOM technologies and ECMAScript.

### The Core of the DOM

The Document Object Model (DOM) is a cross-platform, **language-independent convention** for representing and interacting with objects in HTML, XHTML and XML documents. Objects in the **DOM tree** may be addressed and manipulated by using methods on the objects. Nowadays, the DOM core spec is maintained by WHATWG (superseding the W3C version). It defines language-agnostic interfaces that abstract HTML and XML documents as objects, and also defines mechanisms to manipulate this abstraction. This includes: `Node`, `Element`, `DocumentFragment`, `Document`, `DOMImplementation`, `Event`, `EventTarget`, and more.

From the ECMAScript point of view, objects defined in the DOM specification are called "host objects".

### HTML DOM

HTML, the Web's markup language, is specified in terms of the DOM. Layered above the abstract concepts defined in DOM Core, HTML also defines the _meaning_ of elements. The HTML DOM includes APIs such as `Document.body` and HTML element interfaces.

The HTML specification also defines restrictions on documents; for example, it requires all children of a `` element, which represents an unordered list, to be `` elements, as those represent list items. In general, it also forbids using elements and attributes that aren't defined in a standard.

Looking for the `Document` object, `Window` object, and the other DOM elements? Read the DOM documentation.

## Other notable APIs

- The `setTimeout()` and `setInterval()` functions were first specified on the `Window` interface in HTML Standard.
- XMLHttpRequest makes it possible to send asynchronous HTTP requests.
- The Fetch API provides a more ergonomic abstraction for network requests.
- The CSS Object Model abstracts CSS rules as objects.
- WebWorkers allow parallel computation.
- WebSockets allow low-level bidirectional communication.
- Canvas 2D Context is a drawing API for `<canvas>`.
- The WebAssembly interface provides utilities for communication between JavaScript code and WebAssembly modules.

Non-browser environments (like Node.js) often do not have DOM APIs — because they don't interact with a document — but they still usually implement many web APIs, such as `fetch()` and `setTimeout()`.

## JavaScript implementations

JavaScript engines used in current web browsers include:

- Mozilla's SpiderMonkey, used in Firefox, Servo, and Flow. Other non-browser usage includes MongoDB, CouchDB, and more. This was the first _ever_ JavaScript engine, created by Brendan Eich at Netscape.
- Google's V8, used in Chrome and Chromium-based browsers such as Opera, Edge, and Brave. Other non-browser usage includes Node.js, Deno, Electron, and more.
- Apple's JavaScriptCore (also known as SquirrelFish/Nitro), used in Safari and other WebKit-based browsers. Other non-browser usage includes Bun.
- LibJS, used in Ladybird.

Some JavaScript engines used in earlier browsers include:

- Carakan, used in Opera before it became a Chromium-based browser.
- Microsoft's Chakra, used in Internet Explorer (although the language it implements is formally called "JScript" to avoid trademark issues). Earlier versions of Edge used another JavaScript engine, confusingly also called Chakra, before it became a Chromium-based browser.

Some JavaScript engines specifically tailored for non-browser purposes include:

- Engine262, written in JavaScript and intended essentially as a reference implementation of the language.
- Meta's Hermes, optimized for React Native.
- Mozilla's Rhino, written in Java.
- Oracle's GraalJS, written in Java and built on top of GraalVM.
- Moddable XS, intended for IoT/embedded systems.
- QuickJS, intended to be small and lightweight.

JavaScript engines expose a public API which application developers can use to integrate JavaScript into their software. By far, the most common host environment for JavaScript is web browsers. Web browsers typically use the public API to create **host objects** responsible for reflecting the DOM into JavaScript.

Another common application for JavaScript is as a (Web) server-side scripting language. A JavaScript web server exposes host objects representing an HTTP request and response objects, which can then be manipulated by a JavaScript program to dynamically generate web pages. Node.js is a popular example of this.

## Shells

A JavaScript shell allows you to quickly test snippets of JavaScript code without having to reload a web page. They are extremely useful for developing and debugging code.

### Standalone JavaScript shells

The following JavaScript shells are stand-alone environments, like Perl or Python.

- Node.js - A V8-based JavaScript runtime.
- Bun - A JavaScriptCore-based JavaScript runtime.

### Browser-based JavaScript shells

The following JavaScript shells run code through the browser's JavaScript engine.

- Firefox has a built-in JavaScript console, which supports multi-line editing.
- Babel REPL - A browser-based REPL for experimenting with future JavaScript.
- TypeScript playground — A browser-based playground for experimenting with both new JavaScript features (via the tsc compiler) and TypeScript syntax.

## Tools & resources

Helpful tools for writing and debugging your JavaScript code.

- Firefox Developer Tools
    Web Console, JavaScript Profiler, Debugger, and more.
- Learn JavaScript
    An excellent resource for aspiring web developers — Learn JavaScript in an interactive environment, with short lessons and interactive tests, guided by automated assessment. The first 40 lessons are free, and the complete course is available for a small one-time payment.
- TogetherJS
    Collaboration made easy. By adding TogetherJS to your site, your users can help each other out on a website in real-time!
- Stack Overflow
    Stack Overflow questions tagged with "JavaScript".
- JSFiddle
    Edit JavaScript, CSS, and HTML and get live results. Use external resources and collaborate with your team online.
- Plunker
    Plunker is an online community for creating, collaborating on, and sharing your web development ideas. Edit your JavaScript, CSS, and HTML files and get live results and file structure.
- JS Bin
    JS Bin is an open-source collaborative web development debugging tool.
- CodePen
    CodePen is another collaborative web development tool used as a live result playground.
- StackBlitz
    StackBlitz is another online playground/debugging tool, which can host and deploy full-stack applications using React, Angular, etc.
- RunJS
    RunJS is a desktop playground/scratchpad tool, which provides live results and access to both Node and Browser APIs.
