---
title: "Using HTTP cookies (part 1 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cookies/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using HTTP cookies

A **cookie** (also known as a web cookie or browser cookie) is a small piece of data a server sends to a user's web browser. The browser may store cookies, create new cookies, modify existing ones, and send them back to the same server with later requests. Cookies enable web applications to store limited amounts of data and remember state information; by default the HTTP protocol is stateless.

In this article we will explore the main uses of cookies, explain best practices for using them, and look at their privacy and security implications.

## What cookies are used for

Typically, the server will use the contents of HTTP cookies to determine whether different requests come from the same browser/user and then issue a personalized or generic response as appropriate. The following describes a basic user sign-in system:

1. The user sends sign-in credentials to the server, for example via a form submission.
2. If the credentials are correct, the server updates the UI to indicate that the user is signed in, and responds with a cookie containing a session ID that records their sign-in status on the browser.
3. At a later time, the user moves to a different page on the same site. The browser sends the cookie containing the session ID along with the corresponding request to indicate that it still thinks the user is signed in.
4. The server checks the session ID and, if it is still valid, sends the user a personalized version of the new page. If it is not valid, the session ID is deleted and the user is shown a generic version of the page (or perhaps shown an "access denied" message and asked to sign in again).

Cookies are mainly used for three purposes:

- **Session management**: User sign-in status, shopping cart contents, game scores, or any other user session-related details that the server needs to remember.
- **Personalization**: User preferences such as display language and UI theme.
- **Tracking**: Recording and analyzing user behavior.

### Data storage

In the early days of the web when there was no other option, cookies were used for general client-side data storage purposes. Modern storage APIs are now recommended, for example the Web Storage API (`localStorage` and `sessionStorage`) and IndexedDB.

They are designed with storage in mind, never send data to the server, and don't come with other drawbacks of using cookies for storage:

- Browsers are generally limited to a maximum number of cookies per domain (varies by browser, generally in the hundreds), and a maximum size per cookie (usually 4KB). Storage APIs can store larger amounts of data.
- Cookies are sent with every request, so they can worsen performance (for example on slow mobile data connections), especially if you have a lot of cookies set.

> **Note:**
> To see stored cookies (and other storage that a web page is using) you can use the Storage Inspector in Firefox Developer Tools, or the Application panel in Chrome Developer Tools.

## Creating, removing, and updating cookies

After receiving an HTTP request, a server can send one or more `Set-Cookie` headers with the response, each one of which will set a separate cookie. A cookie is set by specifying a name-value pair like this:

```http
Set-Cookie: <cookie-name>=<cookie-value>
```

The following HTTP response instructs the receiving browser to store a pair of cookies:

```http
HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie: yummy_cookie=chocolate
Set-Cookie: tasty_cookie=strawberry

[page content]
```

> **Note:**
> Find out how to use the `Set-Cookie` header in various server-side languages/frameworks: PHP, Node.js, Python, Ruby on Rails.

When a new request is made, the browser usually sends previously stored cookies for the current domain back to the server within a `Cookie` HTTP header:

```http
GET /sample_page.html HTTP/2.0
Host: www.example.org
Cookie: yummy_cookie=chocolate; tasty_cookie=strawberry
```

### Removal: defining the lifetime of a cookie

You can specify an expiration date or time period after which the cookie should be deleted and no longer sent. Depending on the attributes set within the `Set-Cookie` header when the cookies are created, they can be either _permanent_ or _session_ cookies:

- Permanent cookies are deleted after the date specified in the `Expires` attribute:

  ```http
  Set-Cookie: id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;
  ```

  or after the period specified in the `Max-Age` attribute:

  ```http
  Set-Cookie: id=a3fWa; Max-Age=2592000
  ```

  > **Note:**
  > `Expires` has been available for longer than `Max-Age`, however `Max-Age` is less error-prone, and takes precedence when both are set. The rationale behind this is that when you set an `Expires` date and time, they're relative to the client the cookie is being set on. If the server is set to a different time, this could cause errors.

- _Session_ cookies — cookies without a `Max-Age` or `Expires` attribute – are deleted when the current session ends. The browser defines when the "current session" ends, and some browsers use _session restoring_ when restarting. This can cause session cookies to last indefinitely.

  > **Note:**
  > If your site authenticates users, it should regenerate and resend session cookies, even ones that already exist, whenever a user authenticates. This approach helps prevent session fixation attacks, where a third-party can reuse a user's session.

To immediately remove a cookie, set the cookie again with the same name, path, and domain (if specified), and set its `Expires` attribute to a date in the past or its `Max-Age` attribute to `0` or negative. This instructs the browser to delete the cookie right away. For example:

```http
Set-Cookie: id=a3fWa; Max-Age=0
```

You can also clear all cookies associated with a registrable domain using the `Clear-Site-Data` response header.
For example, the following header sent from `https://foo.example.com/` would clear all cookies sent by `example.com` and all of its subdomains, such as `all.bar.example.com`.

```http
Clear-Site-Data: "cookies"
```

There are some techniques designed to recreate cookies after they're deleted. These are known as "zombie" cookies. These techniques violate the principles of user privacy and control, may violate data privacy regulations, and could expose a website using them to legal liability.

### Updating cookie values

To update a cookie via HTTP, the server can send a `Set-Cookie` header with the existing cookie's name and a new value. For example:

```http
Set-Cookie: id=new-value
```

There are several reasons why you might want to do this, for example if a user has updated their preferences and the application wants to reflect the changes in client-side data (you could also do this with a client-side storage mechanism such as Web Storage).

#### Updating cookies via JavaScript

In the browser, you can create new cookies via JavaScript using the `Document.cookie` property, or the asynchronous `Cookie Store API`. Note that all examples below use `Document.cookie`, as it is the most widely supported/established option.

```js
document.cookie = "yummy_cookie=chocolate";
document.cookie = "tasty_cookie=strawberry";
```

You can also access existing cookies and set new values for them:

```js
console.log(document.cookie);
// logs "yummy_cookie=chocolate; tasty_cookie=strawberry"

document.cookie = "yummy_cookie=blueberry";

console.log(document.cookie);
// logs "tasty_cookie=strawberry; yummy_cookie=blueberry"
```

For security purposes, you can't change cookie values by sending an updated `Cookie` header directly when initiating a request, for example, via `fetch()` or `XMLHttpRequest`.

There are good reasons why you shouldn't allow JavaScript to modify cookies at all. You can prevent JavaScript from accessing a cookie by specifying the `HttpOnly` attribute during its creation. See the Security section for more details.
