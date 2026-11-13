---
title: "External OAuth authentication providers"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/social/other-logins.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# External OAuth authentication providers

By Rick Anderson, Pranav Rastogi, and Valeriy Novytskyy

The following list includes common external OAuth authentication providers that work with ASP.NET Core apps. Third-party NuGet packages, such as the ones maintained by OpenIddict or aspnet-contrib, can be used to complement the authentication providers implemented by the ASP.NET Core team.

* LinkedIn

* Instagram

* Reddit (Instructions)

* Github (Instructions)

* Yahoo (Instructions)

* Tumblr (Instructions)

* Pinterest (Instructions)

* Flickr (Instructions)

* Dribbble (Instructions)

* Vimeo (Instructions)

* SoundCloud (Instructions)

* VK (Instructions)

To use multiple authentication providers, see Using external login providers with Identity in ASP.NET Core.

## Forward request information with a proxy or load balancer

If the app is deployed behind a proxy server or load balancer, some of the original request information might be forwarded to the app in request headers. This information usually includes the secure request scheme (`https`), host, and client IP address. Apps don't automatically read these request headers to discover and use the original request information.

The scheme is used in link generation that affects the authentication flow with external providers. Losing the secure scheme (`https`) results in the app generating incorrect insecure redirect URLs.

Use forwarded headers middleware to make the original request information available to the app for request processing.

For more information, see Configure ASP.NET Core to work with proxy servers and load balancers.
