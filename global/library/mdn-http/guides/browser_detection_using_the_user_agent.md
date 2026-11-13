---
title: "Browser detection using the user agent string (UA sniffing) (part 1 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/browser_detection_using_the_user_agent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Browser detection using the user agent string (UA sniffing)

Along with every request to a server, browsers include a `User-Agent` HTTP header with a value called a user agent (UA) string.
This string is intended to identify the browser, its version number, and its host operating system.

```http
User-Agent: <product> / <product-version> <comment>
```

You can also access this string via the `navigator.userAgent` property in JavaScript:

```js
console.log(window.navigator.userAgent);
// Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:138.0) Gecko/20100101 Firefox/138.0
```

It may be tempting to parse the UA string (sometimes called "UA sniffing") and change how your site behaves based on the values in the UA string, but this is very hard to do reliably, and is often a cause of bugs.

This document describes common pitfalls of using the UA string for browser detection and the recommended alternatives.
At the end we provide some hints for UA detection using the string, but you should do this only if it's absolutely necessary!

## Why feature detection is better than browser detection

To illustrate why trying to adapt site functionality per browser introduces complexity and possible bugs, consider the following example.
An application wants to make use of a `splitUpString()` function in JavaScript using lookbehind assertion (`?<=…`):

```js
let splitUpString;

if (navigator.userAgent.includes("Chrome")) {
  const camelCaseExpression = new RegExp("(?<=[A-Z])");
  splitUpString = (str) => String(str).split(camelCaseExpression);
} else {
  // This fallback is inefficient, but it works
  splitUpString = (str) =>
    String(str)
      .split(/(.*?[A-Z])/)
      .filter(Boolean);
}
console.log(splitUpString("fooBar")); // ["fooB", "ar"]
console.log(splitUpString("jQWhy")); // ["jQ", "W", "hy"]
```

This code makes several assumptions that may be wrong, and which will break the code if it is run on the wrong browser or browser version:

1. All user agent strings that include the substring `Chrome` indicate a Chrome browser.

   One of the biggest problems with browser detection based on UA strings is that browsers and user agents routinely pretend to be another browser, or include information based on multiple browsers.

2. The lookbehind feature is always available if the browser is Chrome.
   In reality, the browser might be an older version of Chrome before support was added, or it could be a later version of Chrome that removes it.
3. Most importantly, it assumes no other browsers support the feature, when it could be added to any other browser at any time.
   All non-matching browsers will be stuck using an inefficient fallback.

It's important to note that these problems will exist regardless of the browser detection method; UA sniffing, client hints, the presence, absence or contents of other HTTP headers, and so on.
Knowing what browser is used is irrelevant, what we're actually looking for in this case is feature detection, which is described in more detail below.

## Alternatives to UA sniffing

The following sections describe alternatives to browser detection that are more robust and applicable in many more scenarios than UA sniffing.

### Feature detection

Feature detection is where you check to see if a specific feature is available to the client instead of figuring out which browser is rendering your page.
For cases where a feature is not supported, you use a fallback instead.
The following feature detection example checks if the client supports the `Geolocation API`.
You can do this by checking for a `geolocation` property available on the global `Navigator` object.

```js
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    // show the location on a map, such as the Google Maps API
  });
} else {
  // Show a static map instead
}
```

You can do this for many features.
For example, you can determine whether PDF files can be viewed inline, or if the `VirtualKeyboard API` is supported, and so on:

```js
if ("application/pdf" in navigator.mimeTypes) {
  // browser supports inline viewing of PDF files.
}
if ("virtualKeyboard" in navigator) {
  // browser supports the Virtual Keyboard API
}
```

For styles, you can also do feature detection in CSS using the `@supports` at-rule, combined with the `not` keyword if you want to check for the absence of a feature.
See Using feature queries for information on using this in CSS.

```css
@supports (display: grid) {
  .box {
    display: grid;
    gap: 2rem;
  }
}

@supports not (property: value) {
  /* CSS rules for fallback */
}
```

In rare cases where behavior differs between browsers for a feature, you should test how browsers implement the API and determine how to use it based on that.
To learn more, see the Implementing feature detection documentation.

#### Mobile device detection

A common misuse of UA sniffing (and client hints) is to detect if the client is a mobile device.
Usually people are actually motivated to detect if the users' device is **touch-friendly** and has a small screen so they can optimize their website by adding extra padding to buttons, for example.

Instead, you should detect features using modern APIs.
For example, to check for touch support, try the maxTouchPoints property in the `Navigator` interface:

```js
if (navigator.maxTouchPoints > 1) {
  // browser supports multi-touch
}
```

For other concerns, like layout, use modern CSS like flexbox and grid for flexible layouts.
Instead of hiding content on smaller screens, adjust the layout dynamically.
Media queries should handle most layout changes, reducing the need for JavaScript-based adjustments.

If you want to ensure smooth transitions when users rotate their devices or switch between different screen modes, you can look at Detecting device orientation.
For foldable devices, there are newer APIs such as the Device Posture API, although be sure to check compatibility data as support varies widely.

### Client hints

For Blink-based browsers (Chromium, Edge, Brave, Vivaldi, etc.), an alternative is User agent client hints.
In client hints, the server proactively requests device information from a client through HTTP headers or via JavaScript API.

Client hints are better than UA sniffing for detecting Blink-based browsers in that they're not as commonly-spoofed, and they provide smaller, more reliable pieces of information that are easier to parse.
Changing site functionality based on client hints is still a bad idea!
Where possible you should instead use feature detection and progressive enhancement as described above.

For example, in the HTTP mechanism, the server includes an `Accept-CH` header along with a list of headers that should be included by the client in subsequent requests.
Let's assume the server sends this response to the client:

```http
Accept-CH: Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA
```

This asks for the following headers from the client in subsequent requests:

- `Sec-CH-UA-Mobile`: a boolean to indicate if the client is a mobile device.
- `Sec-CH-UA-Platform`: the platform the client is operating on ("Windows", "Android", etc.).
- `Sec-CH-UA`: the user-agent's branding and significant version information.

Assuming the client supports client hints, the UA client hints may appear in subsequent requests:

```http
GET /my/page HTTP/1.1
Host: example.site

Sec-CH-UA: " Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"
Sec-CH-UA-Mobile: ?1
Sec-CH-UA-Platform: "Android"
```

To learn more about client hints, see HTTP Client hints.
Be sure to check the Browser Compatibility details for more information before using this feature.

### Other techniques and principles

- Progressive enhancement
    This design technique involves developing your website in 'layers', using a bottom-up approach, starting with a simpler layer and improving the capabilities of the site in successive layers, each using more features.
- Graceful degradation
    This is a top-down approach in which you build the best possible site using all the features you want, then tweak it to make it work on older browsers. This can be harder to do, and less effective, than progressive enhancement, but may be useful in some cases.

## Invalid reasons to use browser detection

If you're still considering browser detection instead of feature detection and progressive enhancement, check if you are motivated by the following (invalid) reasons:

- **You are trying to work around a specific bug in a certain browser version**
    You're unlikely to be the first person to encounter it.
    Experts or people with another point of view may give you hints to better avoid or work around the bug.
    If the problem is uncommon, it's worth checking if this bug has been reported to the browser vendor via bug tracking systems (Mozilla; WebKit; Blink; Opera).
    Browser makers do pay attention to bug reports, and yours may help fix or provide more reliable workarounds for a problem.
- **Serving different HTML depending on the visitor's browser**
    This is usually a bad idea, but there are rare cases where this is necessary.
    Can you prevent it by adding non-semantic `` or `` elements?
    Consider if there's actually a problem with your design: can you use progressive enhancement or fluid layouts to help remove your need to do this?
    The effort in applying accurate UA detection compared to reworking your HTML should be a deciding factor.
- **Trying to find out if a visitor's browser has a specific feature**
    Your site needs to use a specific feature that some browsers don't yet support, and you want users with incompatible browsers to be served an older website with fewer features you know will work.
    This is the worst reason to use UA detection because all browsers will likely catch up, eventually.
    In addition, it's not practical to test each browser for different features in this way.
