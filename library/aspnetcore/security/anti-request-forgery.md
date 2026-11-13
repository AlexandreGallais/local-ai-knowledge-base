---
title: "Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/anti-request-forgery.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core

By Fiyaz Hasan and Rick Anderson

Cross-site request forgery is an attack against web-hosted apps whereby a malicious web app can influence the interaction between a client browser and a web app that trusts that browser. These attacks are possible because web browsers send some types of authentication tokens automatically with every request to a website. This form of exploit is also known as a *one-click attack* or *session riding* because the attack takes advantage of the user's previously authenticated session. Cross-site request forgery is also known as XSRF or CSRF.

An example of a CSRF attack:

1. A user signs into `www.good-banking-site.example.com` using forms authentication. The server authenticates the user and issues a response that includes an authentication cookie. The site is vulnerable to attack because it trusts any request that it receives with a valid authentication cookie.
1. The user visits a malicious site, `www.bad-crook-site.example.com`.

   The malicious site, `www.bad-crook-site.example.com`, contains an HTML form similar to the following example:

```html
<h1>Congratulations! You're a Winner!</h1>
<form action="https://www.good-banking-site.example.com/api/account" method="post">
    <input type="hidden" name="Transaction" value="withdraw" />
    <input type="hidden" name="Amount" value="1000000" />
    <input type="submit" value="Click to collect your prize!" />
</form>
```
   Notice that the form's `action` posts to the vulnerable site, not to the malicious site. This is the "cross-site" part of CSRF.

1. The user selects the submit button. The browser makes the request and automatically includes the authentication cookie for the requested domain, `www.good-banking-site.example.com`.
1. The request runs on the `www.good-banking-site.example.com` server with the user's authentication context and can perform any action that an authenticated user is allowed to perform.

In addition to the scenario where the user selects the button to submit the form, the malicious site could:

* Run a script that automatically submits the form.
* Send the form submission as an AJAX request.
* Hide the form using CSS.

These alternative scenarios don't require any action or input from the user other than initially visiting the malicious site.

Using HTTPS doesn't prevent a CSRF attack. The malicious site can send `https://www.good-banking-site.example.com/` a request just as easily as it can send an insecure request.

Some attacks target endpoints that respond to GET requests, in which case an image tag can be used to perform the action. This form of attack is common on forum sites that permit images but block JavaScript. Apps that change state on GET requests, where variables or resources are altered, are vulnerable to malicious attacks. **GET requests that change state are insecure. A best practice is to never change state on a GET request.**

CSRF attacks are possible against web apps that use cookies for authentication because:

* Browsers store cookies issued by a web app.
* Stored cookies include session cookies for authenticated users.
* Browsers send all of the cookies associated with a domain to the web app every request regardless of how the request to app was generated within the browser.

However, CSRF attacks aren't limited to exploiting cookies. For example, Basic and Digest authentication are also vulnerable. After a user signs in with Basic or Digest authentication, the browser automatically sends the credentials until the session ends.

In this context, *session* refers to the client-side session during which the user is authenticated. It's unrelated to server-side sessions or ASP.NET Core session middleware.

Users can protect against CSRF vulnerabilities by taking precautions:

* Sign out of web apps when finished using them.
* Clear browser cookies periodically.

However, CSRF vulnerabilities are fundamentally a problem with the web app, not the end user.

## Authentication fundamentals

Cookie-based authentication is a popular form of authentication. Token-based authentication systems are growing in popularity, especially for Single Page Applications (SPAs).

### Cookie-based authentication

When a user authenticates using their username and password they'<example-value>'s sent with every request the client makes. Generating and validating this cookie is performed with the cookie authentication middleware. The middleware serializes a user principal into an encrypted cookie. On subsequent requests, the middleware validates the cookie, recreates the principal, and assigns the principal to the `Microsoft.AspNetCore.Http.HttpContext.User` property.

Modern web browsers support the `SameSite` cookie attribute, which specifies whether a cookie is sent with cross-site requests. Configuring `SameSite` on cookies provides a browser-level defense against CSRF attacks:

* `SameSiteMode.Strict`: The cookie is sent only in a first-party context, which is when the site, defined by scheme plus registrable domain, in the URL matches the request destination. The browser never includes the cookie in cross-site requests, including ordinary link navigations. This provides the highest CSRF protection.
* `SameSiteMode.Lax`: The cookie is withheld on cross-site subrequests, such as images or frames, and on cross-site requests using unsafe HTTP methods, such as form `POST`s. The cookie is sent on cross-site requests only during top-level navigation that uses a safe HTTP method, such as following a `GET` link. This is the default in modern browsers and in ASP.NET Core cookie authentication.
* `SameSiteMode.None`: The cookie is sent with both same-site and cross-site requests. The cookie must also be marked `Secure`.

While `SameSite` cookies mitigate many CSRF attacks, they should be used as part of a defense-in-depth strategy:

* Older browsers or non-browser HTTP clients may not enforce the `SameSite` attribute.
* `SameSite=Lax` cookies are still sent with top-level `GET` requests, meaning any state-changing `GET` endpoints remain vulnerable.
* Subdomains sharing cookies under the same parent domain can still impact cookie trust boundaries.

Therefore, combining `SameSite` cookies with ASP.NET Core antiforgery tokens or automatic CSRF protection provides the most comprehensive protection. For more information, see Work with SameSite cookies in ASP.NET Core.

### Token-based authentication

When a user is authenticated, they'<example-value>'t *encrypted*; it'<example-value>'s local storage. Placing a token in the browser local storage and retrieving it and using it as a bearer token <example-value> protection against CSRF attacks. However, should the app be vulnerable to script injection via XSS or a compromised external JavaScript file, a cyberattacker could retrieve any value from local storage and send it to themselves. ASP.NET Core encodes all server side output from variables by default, reducing the risk of XSS. If you override this behavior by using Html.Raw or custom code with untrusted input then you may increase the risk of XSS.

Don'<example-value>'s local storage. CSRF is a concern when the token is stored in a cookie. For more information, see the GitHub issue SPA code sample adds two cookies.

### Multiple apps hosted at one domain

Shared hosting environments are vulnerable to session hijacking, sign-in CSRF, and other attacks.

Although `example1.contoso.net` and `example2.contoso.net` are different hosts, there's an implicit trust relationship between hosts under the `*.contoso.net` domain. This implicit trust relationship allows potentially untrusted hosts to affect each other's cookies (the same-origin policies that govern AJAX requests don't necessarily apply to HTTP cookies).

Attacks that exploit trusted cookies between apps hosted on the same domain can be prevented by not sharing domains. When each app is hosted on its own domain, there's no implicit cookie trust relationship to exploit.

### Fetch metadata headers

Modern browsers attach Fetch Metadata request headers—most importantly `Sec-Fetch-Site`—to every request. `Sec-Fetch-Site` describes the relationship between the origin that initiated the request and the origin being requested: `same-origin` identifies a request the site made to itself, while `same-site` and `cross-site` identify requests initiated by another origin. The `Origin` header carries the initiating origin and serves as a fallback for browsers that predate Fetch Metadata.

`Sec-Fetch-Site` and `Origin` are forbidden request headers: the browser sets them, and JavaScript running in a page can'<example-value>'s own requests apart from cross-site requests without a server-issued token. The automatic CSRF protection built into ASP.NET Core uses this signal to reject cross-site form posts that aren't explicitly trusted.
