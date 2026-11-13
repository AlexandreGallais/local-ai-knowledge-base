---
title: "Proxy Auto-Configuration (PAC) file (part 3 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/proxy_servers_and_tunneling/proxy_auto-configuration_pac_file/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Proxy Auto-Configuration (PAC) file (part 3 of 3)

## Example 4

### Subnet based decisions

In this example all of the hosts in a given subnet are connected-to directly, others are connected through the proxy:

```js
function FindProxyForURL(url, host) {
  if (isInNet(host, "192.0.2.172", "255.255.0.0")) {
    return "DIRECT";
  }
  return "PROXY proxy.example.com:8080";
}
```

Again, use of the DNS server in the above can be minimized by adding redundant rules in the beginning:

```js
function FindProxyForURL(url, host) {
  if (
    isPlainHostName(host) ||
    dnsDomainIs(host, ".example.com") ||
    isInNet(host, "192.0.2.0", "255.255.0.0")
  ) {
    return "DIRECT";
  }
  return "PROXY proxy.example.com:8080";
}
```

## Example 5

### Load balancing/routing based on URL patterns

This example is more sophisticated. There are four (4) proxy servers; one of them is a hot stand-by for all of the other ones, so if any of the remaining three goes down the fourth one will take over. Furthermore, the three remaining proxy servers share the load based on URL patterns, which makes their caching more effective (there is only one copy of any document on the three servers - as opposed to one copy on each of them). The load is distributed like this:

| Proxy | Purpose           |
| ----- | ----------------- |
| #1    | .com domain       |
| #2    | .edu domain       |
| #3    | all other domains |
| #4    | hot stand-by      |

All local accesses are desired to be direct. All proxy servers run on the port 8080 (they don't need to, you can just change your port but remember to modify your configurations on both side). Note how strings can be concatenated with the **`+`** operator in JavaScript.

```js
function FindProxyForURL(url, host) {
  if (isPlainHostName(host) || dnsDomainIs(host, ".example.com")) {
    return "DIRECT";
  } else if (shExpMatch(host, "*.com")) {
    return "PROXY proxy1.example.com:8080; PROXY proxy4.example.com:8080";
  } else if (shExpMatch(host, "*.edu")) {
    return "PROXY proxy2.example.com:8080; PROXY proxy4.example.com:8080";
  }
  return "PROXY proxy3.example.com:8080; PROXY proxy4.example.com:8080";
}
```

## Example 6

### Setting a proxy for a specific protocol

Most of the standard JavaScript functionality is available for use in the `FindProxyForURL()` function. As an example, to set different proxies based on the protocol the `startsWith()` function can be used:

```js
function FindProxyForURL(url, host) {
  if (url.startsWith("http:")) {
    return "PROXY http-proxy.example.com:8080";
  } else if (url.startsWith("ftp:")) {
    return "PROXY ftp-proxy.example.com:8080";
  } else if (url.startsWith("gopher:")) {
    return "PROXY gopher-proxy.example.com:8080";
  } else if (url.startsWith("https:") || url.startsWith("snews:")) {
    return "PROXY security-proxy.example.com:8080";
  }
  return "DIRECT";
}
```

> **Note:**
> The same can be accomplished using the `shExpMatch()` function described earlier.

For example:

```js
if (shExpMatch(url, "http:*")) {
  return "PROXY http-proxy.example.com:8080";
}
```

> **Note:**
> The autoconfig file can be output by a CGI script. This is useful, for example, when making the autoconfig file act differently based on the client IP address (the `REMOTE_ADDR` environment variable in CGI).
>
> Usage of `isInNet()`, `isResolvable()` and `dnsResolve()` functions should be carefully considered, as they require the DNS server to be consulted. All the other autoconfig-related functions are mere string-matching functions that don't require the use of a DNS server. If a proxy is used, the proxy will perform its DNS lookup which would double the impact on the DNS server. Most of the time these functions are not necessary to achieve the desired result.

## History and implementation

Proxy auto-config was introduced into Netscape Navigator 2.0 in the late 1990s, at the same time when JavaScript was introduced. Open-sourcing Netscape eventually lead to Firefox itself.

The most "original" implementation of PAC and its JavaScript libraries is, therefore, `nsProxyAutoConfig.js` found in early versions of Firefox. These utilities are found in many other open-source systems including Chromium. Firefox later integrated the file into `ProxyAutoConfig.cpp` as a C++ string literal. To extract it into its own file, it suffices to copy the chunk into JavaScript with a `console.log` directive to print it.

Microsoft in general made its own implementation. There used to be some problems with their libraries, but most are resolved by now. They have defined some new "Ex" suffixed functions around the address handling parts to support IPv6. The feature is supported by Chromium, but not yet by Firefox (bugzilla #558253).

## See also

- Proxy server
- MIME types (IANA media types)
- Automatic proxy HTTP server configuration in web browsers
