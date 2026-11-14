---
title: "Content Security Policy (CSP) (part 1 of 4)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/csp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content Security Policy (CSP)

**Content Security Policy** (CSP) is a feature that helps to prevent or minimize the risk of certain types of security threats. It consists of a series of instructions from a website to a browser, which instruct the browser to place restrictions on the things that the code comprising the site is allowed to do.

The primary use case for CSP is to control which resources, in particular JavaScript resources, a document is allowed to load. This is mainly used as a defense against cross-site scripting (XSS) attacks, in which an attacker is able to inject malicious code into the victim's site.

A CSP can have other purposes as well, including defending against clickjacking and helping to ensure that a site's pages will be loaded over HTTPS.

In this guide we'll start by describing how a CSP is delivered to a browser and what it looks like at a high level.

Then we'll describe how it can be used to:

1. Control which resources are loaded, to protect against XSS.
2. Restrict embedding, to protect against clickjacking.
3. Upgrade insecure requests, to help ensure that all resources are served over HTTPS.
4. Require the use of trusted types, to help defend against client-side XSS.

Note that there's no dependency between the different use cases: if you want to add clickjacking protection but not XSS mitigation, you can just add the directives for that use case.

Finally we'll describe strategies for deploying a CSP and tools that can help to make this process easier.

## CSP overview

A CSP should be delivered to the browser in the `Content-Security-Policy` response header. It should be set on all responses to all requests, not just the main document.

You can also specify it using the `http-equiv` attribute of your document's `<meta>` element, and this is a useful option for some use cases, such as a client-side-rendered single page app which has only static resources, because you can then avoid relying on any server infrastructure. However, this option does not support all CSP features.

The policy is specified as a series of _directives_, separated by semi-colons. Each directive controls a different aspect of the security policy. Each directive has a name, followed by a space, followed by a value. Different directives can have different syntaxes.

For example, consider the following CSP:

```http
Content-Security-Policy: default-src 'self'; img-src 'self' example.com
```

It sets two directives:

- the `default-src` directive is set to `'self'`
- the `img-src` directive is set to `'self' example.com`.

The first directive, `default-src`, tells the browser to load only resources that are same-origin with the document, unless other more specific directives set a different policy for other resource types. The second, `img-src`, tells the browser to load images that are same-origin or that are served from `example.com`.

In the next section, we'll look at the tools available to control resource loads, which is the main function of a CSP.
