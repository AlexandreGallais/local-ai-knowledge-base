---
title: "HTTP (part 12 of 12)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP (part 12 of 12)

## Built-in Proxy Support

> Stability: 1.1 - Active development

When Node.js creates the global agent, if the `NODE_USE_ENV_PROXY` environment variable is
set to `1` or `--use-env-proxy` is enabled, the global agent will be constructed
with `proxyEnv: process.env`, enabling proxy support based on the environment variables.

To enable proxy support dynamically and globally, use `http.setGlobalProxyFromEnv()`.

Custom agents can also be created with proxy support by passing a
`proxyEnv` option when constructing the agent. The value can be `process.env`
if they just want to inherit the configuration from the environment variables,
or an object with specific setting overriding the environment.

The following properties of the `proxyEnv` are checked to configure proxy
support.

* `HTTP_PROXY` or `http_proxy`: Proxy server URL for HTTP requests. If both are set,
  `http_proxy` takes precedence.
* `HTTPS_PROXY` or `https_proxy`: Proxy server URL for HTTPS requests. If both are set,
  `https_proxy` takes precedence.
* `NO_PROXY` or `no_proxy`: Comma-separated list of hosts to bypass the proxy. If both are set,
  `no_proxy` takes precedence.

If the request is made to a Unix domain socket, the proxy settings will be ignored.

### Proxy security considerations

Built-in proxy support routes outbound requests through an HTTP(S) proxy, often
because a firewall requires one to access external networks. It is not an
anonymity or traffic-hiding feature and does not attempt to hide traffic from
the proxy, the local network, network operators, or authorities that govern the
deployment.

Configure only proxies that are trusted and authorized for the deployment. A
proxy can observe connection metadata; for plain HTTP requests, or when TLS is
terminated or intercepted by the proxy, it can also observe request and response
contents. Node.js does not support treating an untrusted proxy as a privacy
boundary. Deployment operators are responsible for controlling proxy
configuration and for meeting deployment-specific network policy and legal
requirements.

### Proxy URL Format

Proxy URLs can use either HTTP or HTTPS protocols:

* HTTP proxy: `http://proxy.example.com:8080`
* HTTPS proxy: `https://proxy.example.com:8080`
* Proxy with authentication: `http://username:password@proxy.example.com:8080`

### `NO_PROXY` Format

The `NO_PROXY` environment variable supports several formats:

* `*` - Bypass proxy for all hosts
* `example.com` - Exact host name match
* `.example.com` - Domain suffix match (matches `sub.example.com`)
* `*.example.com` - Wildcard domain match
* `192.168.1.100` - Exact IP address match
* `192.168.1.1-192.168.1.100` - IP address range
* `example.com:8080` - Hostname with specific port

Multiple entries should be separated by commas.

### Example

To start a Node.js process with proxy support enabled for all requests sent
through the default global agent, either use the `NODE_USE_ENV_PROXY` environment
variable:

```console
NODE_USE_ENV_PROXY=1 HTTP_PROXY=http://proxy.example.com:8080 NO_PROXY=localhost,127.0.0.1 node client.js
```

Or the `--use-env-proxy` flag.

```console
HTTP_PROXY=http://proxy.example.com:8080 NO_PROXY=localhost,127.0.0.1 node --use-env-proxy client.js
```

To enable proxy support dynamically and globally with `process.env` (the default option of `http.setGlobalProxyFromEnv()`):

```cjs
const http = require('node:http');

// Reads proxy-related environment variables from process.env
const restore = http.setGlobalProxyFromEnv();

// Subsequent requests will use the configured proxies from environment variables
http.get('http://www.example.com', (res) => {
  // This request will be proxied if HTTP_PROXY or http_proxy is set
});

fetch('https://www.example.com', (res) => {
  // This request will be proxied if HTTPS_PROXY or https_proxy is set
});

// To restore the original global agent and dispatcher settings, call the returned function.
// restore();
```

```mjs
import http from 'node:http';

// Reads proxy-related environment variables from process.env
http.setGlobalProxyFromEnv();

// Subsequent requests will use the configured proxies from environment variables
http.get('http://www.example.com', (res) => {
  // This request will be proxied if HTTP_PROXY or http_proxy is set
});

fetch('https://www.example.com', (res) => {
  // This request will be proxied if HTTPS_PROXY or https_proxy is set
});

// To restore the original global agent and dispatcher settings, call the returned function.
// restore();
```

To enable proxy support dynamically and globally with custom settings:

```cjs
const http = require('node:http');

const restore = http.setGlobalProxyFromEnv({
  http_proxy: 'http://proxy.example.com:8080',
  https_proxy: 'https://proxy.example.com:8443',
  no_proxy: 'localhost,127.0.0.1,.internal.example.com',
});

// Subsequent requests will use the configured proxies
http.get('http://www.example.com', (res) => {
  // This request will be proxied through proxy.example.com:8080
});

fetch('https://www.example.com', (res) => {
  // This request will be proxied through proxy.example.com:8443
});
```

```mjs
import http from 'node:http';

http.setGlobalProxyFromEnv({
  http_proxy: 'http://proxy.example.com:8080',
  https_proxy: 'https://proxy.example.com:8443',
  no_proxy: 'localhost,127.0.0.1,.internal.example.com',
});

// Subsequent requests will use the configured proxies
http.get('http://www.example.com', (res) => {
  // This request will be proxied through proxy.example.com:8080
});

fetch('https://www.example.com', (res) => {
  // This request will be proxied through proxy.example.com:8443
});
```

To create a custom agent with built-in proxy support:

```cjs
const http = require('node:http');

// Creating a custom agent with custom proxy support.
const agent = new http.Agent({ proxyEnv: { HTTP_PROXY: 'http://proxy.example.com:8080' } });

http.request({
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  agent,
}, (res) => {
  // This request will be proxied through proxy.example.com:8080 using the HTTP protocol.
  console.log(`STATUS: ${res.statusCode}`);
});
```

Alternatively, the following also works:

```cjs
const http = require('node:http');
// Use lower-cased option name.
const agent1 = new http.Agent({ proxyEnv: { http_proxy: 'http://proxy.example.com:8080' } });
// Use values inherited from the environment variables, if the process is started with
// HTTP_PROXY=http://proxy.example.com:8080 this will use the proxy server specified
// in process.env.HTTP_PROXY.
const agent2 = new http.Agent({ proxyEnv: process.env });
```
