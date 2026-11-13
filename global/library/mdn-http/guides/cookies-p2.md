---
title: "Using HTTP cookies (part 2 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cookies/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using HTTP cookies (part 2 of 2)

## Security

When you store information in cookies, by default all cookie values are visible to, and can be changed by, the end user. You really don't want your cookies to be misused — for example accessed/modified by bad actors, or sent to domains where they shouldn't be sent. The potential consequences can range from annoying — apps not working or exhibiting strange behavior — to catastrophic. A criminal could for example steal a session ID and use it to set a cookie that makes it look like they are logged in as someone else, taking control of their bank or e-commerce account in the process.

You can secure your cookies in a variety of ways, which are reviewed in this section.

### Block access to your cookies

You can ensure that cookies are sent securely and aren't accessed by unintended parties or scripts in one of two ways: with the `Secure` attribute and the `HttpOnly` attribute:

```http
Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly
```

- A cookie with the `Secure` attribute is only sent to the server with an encrypted request over the HTTPS protocol. It's never sent with unsecured HTTP (except on localhost, although this exception is not supported by Safari), which means manipulator in the middle (MITM) attackers can't access it easily. Insecure sites (with `http:` in the URL) can't set cookies with the `Secure` attribute. However, don't assume that `Secure` prevents all access to sensitive information in cookies. For example, someone with access to the client's hard disk (or JavaScript if the `HttpOnly` attribute isn't set) can read and modify the information.

- A cookie with the `HttpOnly` attribute can't be accessed by JavaScript, for example using `Document.cookie`; it can only be accessed when it reaches the server. Cookies that persist user sessions for example should have the `HttpOnly` attribute set — it would be really insecure to make them available to JavaScript. This precaution helps mitigate cross-site scripting (XSS) attacks.

> **Note:**
> Depending on the application, you may want to use an opaque identifier that the server looks up rather than storing sensitive information directly in cookies, or investigate alternative authentication/confidentiality mechanisms such as JSON Web Tokens.

### Define where cookies are sent

The `Domain` and `Path` attributes define the _scope_ of a cookie: what URLs the cookies are sent to.

- The `Domain` attribute specifies which server can receive a cookie. If specified, cookies are available on the specified server and its subdomains. For example, if you set `Domain=mozilla.org` from `mozilla.org`, cookies are available on that domain and subdomains like `developer.mozilla.org`.

  ```http
  Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly; Domain=mozilla.org
  ```

  If the `Set-Cookie` header does not specify a `Domain` attribute, the cookies are available on the server that sets it _but not on its subdomains_. Therefore, specifying `Domain` is less restrictive than omitting it.
  Note that a server can only set the `Domain` attribute to its own domain or a parent domain, not to a subdomain or some other domain.
  So, for example, a server with domain `foo.example.com` could set the attribute to `example.com` or `foo.example.com`, but not `bar.foo.example.com` or `elsewhere.com` (the cookies would still be _sent_ to subdomains such as `bar.foo.example.com` though).
  See Invalid domains for more details.

- The `Path` attribute indicates a URL path that must exist in the requested URL in order to send the `Cookie` header. For example:

  ```http
  Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly; Path=/docs
  ```

  The `%x2F` ("/") character is considered a directory separator, and subdirectories match as well. For example, if you set `Path=/docs`, these request paths match:
  - `/docs`
  - `/docs/`
  - `/docs/Web/`
  - `/docs/Web/HTTP`

  But these request paths don't:
  - `/`
  - `/docsets`
  - `/fr/docs`

  > **Note:**
  > The `path` attribute lets you control what cookies the browser sends based on the different parts of a site.
  > It is not intended as a security measure, and does not protect against unauthorized reading of the cookie from a different path.

### Controlling third-party cookies with `SameSite`

The `SameSite` attribute lets servers specify whether/when cookies are sent with cross-site requests — i.e., third-party cookies. Cross-site requests are requests where the site (the registrable domain) and/or the scheme (http or https) do not match the site the user is currently visiting. This includes requests sent when links are clicked on other sites to navigate to your site, and any request sent by embedded third-party content.

`SameSite` helps to prevent leakage of information, preserving user privacy and providing some protection against cross-site request forgery attacks. It takes three possible values: `Strict`, `Lax`, and `None`:

- `Strict` causes the browser to only send the cookie in response to requests originating from the cookie's origin site. This should be used when you have cookies relating to functionality that will always be behind an initial navigation, such as authentication or storing shopping cart information.

  ```http
  Set-Cookie: cart=110045_77895_53420; SameSite=Strict
  ```

  > **Note:**
  > Cookies that are used for sensitive information should also have a short lifetime.

- `Lax` is similar, except the browser also sends the cookie when the user _navigates_ to the cookie's origin site (even if the user is coming from a different site). This is useful for cookies affecting the display of a site — for example you might have partner product information along with an affiliate link on your website. When that link is followed to the partner website, they might want to set a cookie stating that the affiliate link was followed, which displays a reward banner and provides a discount if the product is purchased.

  ```http
  Set-Cookie: affiliate=e4rt45dw; SameSite=Lax
  ```

- `None` specifies that cookies are sent on both originating and cross-site requests. This is useful if you want to send cookies along with requests made from third-party content embedded in other sites, for example, ad-tech or analytics providers. Note that if `SameSite=None` is set then the `Secure` attribute must also be set — `SameSite=None` requires a _secure context_.

  ```http
  Set-Cookie: widget_session=7yjgj57e4n3d; SameSite=None; Secure; HttpOnly
  ```

If no `SameSite` attribute is set, the cookie is treated as `Lax` by default.

### Cookie prefixes

Because of the design of the cookie mechanism, a server can't confirm that a cookie was set from a secure origin or even tell _where_ a cookie was originally set.

An application on a subdomain can set a cookie with the `Domain` attribute, which gives access to that cookie on all other subdomains. This mechanism can be abused in a session fixation attack.

As a defense-in-depth measure, you can use _cookie prefixes_ to impose specific restrictions on a cookie's attributes in supporting user-agents. All cookie prefixes start with a double-underscore (`__`) and end in a dash (`-`). Four prefixes are available:

- **`__Secure-`**: Cookies with names starting with `__Secure-` must be set with the `Secure` attribute by a secure page (HTTPS).
- **`__Host-`**: Cookies with names starting with `__Host-` must be set with the `Secure` attribute by a secure page (HTTPS). In addition, they must not have a `Domain` attribute specified, and the `Path` attribute must be set to `/`. This guarantees that such cookies are only sent to the host that set them, and not to any other host on the domain. It also guarantees that they are set host-wide and cannot be overridden on any path on that host. This combination yields a cookie that is as close as can be to treating the origin as a security boundary.
- **`__Http-`**: Cookies with names starting with `__Http-` must be set with the `Secure` flag by a secure page (HTTPS) and in addition must have the `HttpOnly` attribute set to prove that they were set via the `Set-Cookie` header (they can't be set or modified via JavaScript features such as `Document.cookie` or the Cookie Store API).
- **`__Host-Http-`**: Cookies with names starting with `__Host-Http-` must be set with the `Secure` flag by a secure page (HTTPS) and must have the `HttpOnly` attribute set to prove that they were set via the `Set-Cookie` header. In addition, they also have the same restrictions as `__Host-`-prefixed cookies. This combination yields a cookie that is as close as can be to treating the origin as a security boundary while at the same time ensuring developers and server operators know that its scope is limited to HTTP requests.

The browser will reject cookies with these prefixes that don't comply with their restrictions. As the application server only checks for a specific cookie name when determining if the user is authenticated or a CSRF token is correct, this effectively acts as a defense measure against session fixation.

> **Note:**
> On the server, the web application _must_ check for the full cookie name including the prefix. User agents _do not_ strip the prefix from the cookie before sending it in a request's `Cookie` header.

For more information about cookie prefixes and the current state of browser support, see the Prefixes section of the Set-Cookie reference article.

## Privacy and tracking

Earlier on we talked about how the `SameSite` attribute can be used to control when third-party cookies are sent, and that this can help preserve user privacy. Privacy is a very important consideration when building websites which, when done right, can build trust with your users. If done badly, it can completely erode that trust and cause all kinds of other problems.

Third-party cookies can be set by third-party content embedded in sites via ``s. They have many legitimate uses include sharing user profile information, counting ad impressions, or collecting analytics across different related domains.

However, third-party cookies can also be used to create creepy, invasive user experiences. A third-party server can create a profile of a user's browsing history and habits based on cookies sent to it by the same browser when accessing multiple sites. The classic example is when you search for product information on one site and are then chased around the web by adverts for similar products wherever you go.

Browser vendors know that users don't like this behavior, and as a result have all started to block third-party cookies by default, or at least made plans to go in that direction. Third-party cookies (or just tracking cookies) may also be blocked by other browser settings or extensions.

> **Note:**
> Cookie blocking can cause some third-party components (such as social media widgets) not to function as intended. As browsers impose further restrictions on third-party cookies, developers should start to look at ways to reduce their reliance on them.

See our Third-party cookies article for detailed information on third-party cookies, the issues associated with them, and what alternatives are available. See our Privacy landing page for more information on privacy in general.

## Cookie-related regulations

Legislation or regulations that cover the use of cookies include:

- The General Data Privacy Regulation (GDPR) in the European Union
- The ePrivacy Directive in the EU
- The California Consumer Privacy Act

These regulations have global reach. They apply to any site on the _World Wide_ Web that users from these jurisdictions access (the EU and California, with the caveat that California's law applies only to entities with gross revenue over 25 million USD, among things).

These regulations include requirements such as:

- Notifying users that your site uses cookies.
- Allowing users to opt out of receiving some or all cookies.
- Allowing users to use the bulk of your service without receiving cookies.

There may be other regulations that govern the use of cookies in your locality. The burden is on you to know and comply with these regulations. There are companies that offer "cookie banner" code that helps you comply with these regulations.

> **Note:**
> Companies should disclose the types of cookies they use on their sites for transparency purposes and to comply with regulations. For example, see Google's notice on the types of cookies it uses and Mozilla's Websites, Communications & Cookies Privacy Notice.

## See also

- Related HTTP headers: `Set-Cookie`, `Cookie`
- Related JavaScript APIs: `Document.cookie`, `Navigator.cookieEnabled`, `Cookie Store API`
- Third-party cookies
- Cookie specification: RFC 6265
- Cookies, the GDPR, and the ePrivacy Directive
