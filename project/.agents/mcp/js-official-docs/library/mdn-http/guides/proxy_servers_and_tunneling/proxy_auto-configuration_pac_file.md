---
title: "Proxy Auto-Configuration (PAC) file (part 1 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/proxy_servers_and_tunneling/proxy_auto-configuration_pac_file/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Proxy Auto-Configuration (PAC) file

A **Proxy Auto-Configuration (PAC)** file is a JavaScript function that determines whether web browser requests (HTTP, HTTPS, and FTP) go directly to the destination or are forwarded to a web proxy server. The JavaScript function contained in the PAC file defines the function:

## Syntax

```js
function FindProxyForURL(url, host) {
  // …
}
```

### Parameters

- `url`
    The URL being accessed. The path and query components of `https://` URLs are stripped. In Chrome (versions 52 to 73), you can disable this by setting `PacHttpsUrlStrippingEnabled` to `false` in policy or by launching with the `--unsafe-pac-url` command-line flag (in Chrome 74, only the flag works, and from 75 onward, there is no way to disable path-stripping; as of Chrome 81, path-stripping does not apply to HTTP URLs, but there is interest in changing this behavior to match HTTPS); in Firefox, the preference is `network.proxy.autoconfig_url.include_path`.
- `host`
    The hostname extracted from the URL. This is only for convenience; it is the same string as between `://` and the first `:` or `/` after that. The port number is not included in this parameter. It can be extracted from the URL when necessary.

## Description

Returns a string describing the configuration. The format of this string is defined in **return value format** below.

### Return value format

- The JavaScript function returns a single string
- If the string is null, no proxies should be used
- The string can contain any number of the following building blocks, separated by a semicolon:

- `DIRECT`
    Connections should be made directly, without any proxies
- `PROXY host:port`
    The specified proxy should be used
- `SOCKS host:port`
    The specified SOCKS server should be used

Recent versions of Firefox support as well:

- `HTTP host:port`
    The specified proxy should be used
- `HTTPS host:port`
    The specified HTTPS proxy should be used
- `SOCKS4 host:port`, `SOCKS5 host:port`
    The specified SOCKS server (with the specified SOCK version) should be used

If there are multiple semicolon-separated settings, the left-most setting will be used, until Firefox fails to establish the connection to the proxy. In that case, the next value will be used, etc.

The browser will automatically retry a previously unresponsive proxy after 30 minutes. Additional attempts will continue beginning at one hour, always adding 30 minutes to the elapsed time between attempts.

If all proxies are down, and there was no DIRECT option specified, the browser will ask if proxies should be temporarily ignored, and direct connections attempted. After 20 minutes, the browser will ask if proxies should be retried, asking again after an additional 40 minutes. Queries will continue, always adding 20 minutes to the elapsed time between queries.

#### Examples

- `PROXY w3proxy.netscape.com:8080; PROXY mozilla.netscape.com:8081`
    Primary proxy is w3proxy:8080; if that goes down start using mozilla:8081 until the primary proxy comes up again.
- `PROXY w3proxy.netscape.com:8080; PROXY mozilla.netscape.com:8081; DIRECT`
    Same as above, but if both proxies go down, automatically start making direct connections. (In the first example above, Netscape will ask user confirmation about making direct connections; in this case, there is no user intervention.)
- `PROXY w3proxy.netscape.com:8080; SOCKS socks:1080`
    Use SOCKS if the primary proxy goes down.

The auto-config file should be saved to a file with a .pac filename extension: `proxy.pac`.

And the MIME type should be set to `application/x-ns-proxy-autoconfig`.

Next, you should configure your server to map the .pac filename extension to the MIME type.

> **Note:**
>
> - The JavaScript function should always be saved to a file by itself but not be embedded in an HTML file or any other file.
> - The examples at the end of this document are complete. There is no additional syntax needed to save it into a file and use it. (Of course, the JavaScripts must be edited to reflect your site's domain name and/or subnets.)
