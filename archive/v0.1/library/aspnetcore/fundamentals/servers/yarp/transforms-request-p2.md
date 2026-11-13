---
title: "YARP Request Transforms (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/yarp/transforms-request.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# YARP Request Transforms (part 2 of 2)

## X-Forwarded

**Adds headers with information about the original client request**

| Key          | Value                                                                                | Default           | Required |
| ------------ | ------------------------------------------------------------------------------------ | ----------------- | -------- |
| X-Forwarded  | Default action (Set, Append, Remove, Off) to apply to all X-Forwarded-* listed below | Set               | yes      |
| For          | Action to apply to this header                                                       | * See X-Forwarded | no       |
| Proto        | Action to apply to this header                                                       | * See X-Forwarded | no       |
| Host         | Action to apply to this header                                                       | * See X-Forwarded | no       |
| Prefix       | Action to apply to this header                                                       | * See X-Forwarded | no       |
| HeaderPrefix | The header name prefix                                                               | "X-Forwarded-"    | no       |

Action "Off" completely disables the transform.

Config:
```json
{
  "X-Forwarded": "Set",
  "For": "Remove",
  "Proto": "Append",
  "Prefix": "Off",
  "HeaderPrefix": "X-Forwarded-"
}
```
Code:
```csharp
routeConfig = routeConfig.WithTransformXForwarded(
  headerPrefix = "X-Forwarded-",
  ForwardedTransformActions xDefault = ForwardedTransformActions.Set,
  ForwardedTransformActions? xFor = null,
  ForwardedTransformActions? xHost = null,
  ForwardedTransformActions? xProto = null,
  ForwardedTransformActions? xPrefix = null);
```
```csharp
transformBuilderContext.AddXForwarded(ForwardedTransformActions.Set);
transformBuilderContext.AddXForwardedFor(headerName: "X-Forwarded-For", ForwardedTransformActions.Append);
transformBuilderContext.AddXForwardedHost(headerName: "X-Forwarded-Host", ForwardedTransformActions.Append);
transformBuilderContext.AddXForwardedProto(headerName: "X-Forwarded-Proto", ForwardedTransformActions.Off);
transformBuilderContext.AddXForwardedPrefix(headerName: "X-Forwarded-Prefix", ForwardedTransformActions.Remove);
```

Example:
```
X-Forwarded-For: 5.5.5.5
X-Forwarded-Proto: https
X-Forwarded-Host: IncomingHost:5000
X-Forwarded-Prefix: /path/base
```
Disable default headers:
```json
{ "X-Forwarded": "Off" }
```
```csharp
transformBuilderContext.UseDefaultForwarders = false;
```

When the proxy connects to the destination server, the connection is independent from the one the client made to the proxy. The destination server likely needs original connection information for security checks and to properly generate absolute URIs for links and redirects. To enable information about the client connection to be passed to the destination a set of extra headers can be added. Until the `Forwarded` standard was created, a common solution is to use `X-Forwarded-*` headers. There is no official standard that defines the `X-Forwarded-*` headers and implementations vary, check your destination server for support.

This transform is enabled by default even if not specified in the route config.

Set the `X-Forwarded` value to a comma separated list containing the headers you need to enable. All for headers are enabled by default. All can be disabled by specifying the value `"Off"`.

The Prefix specifies the header name prefix to use for each header. With the default `X-Forwarded-` prefix the resulting headers will be `X-Forwarded-For`, `X-Forwarded-Proto`, `X-Forwarded-Host`, and `X-Forwarded-Prefix`.

Transform action specifies how each header should be combined with an existing header of the same name. It can be "Set", "Append", "Remove, or "Off" (completely disable the transform). A request traversing multiple proxies may accumulate a list of such headers and the destination server will need to evaluate the list to determine the original value. If action is "Set" and the associated value is not available on the request (e.g. RemoteIpAddress is null), any existing header is still removed to prevent spoofing.

The {Prefix}For header value is taken from `HttpContext.Connection.RemoteIpAddress` representing the prior caller's IP address. The port is not included. IPv6 addresses do not include the bounding `[]` brackets.

The {Prefix}Proto header value is taken from `HttpContext.Request.Scheme` indicating if the prior caller used HTTP or HTTPS.

The {Prefix}Host header value is taken from the incoming request's Host header. This is independent of RequestHeaderOriginalHost specified above. Unicode/IDN hosts are punycode encoded.

The {Prefix}Prefix header value is taken from `HttpContext.Request.PathBase`. The PathBase property is not used when generating the proxy request so the destination server will need the original value to correctly generate links and directs. The value is in the percent encoded Uri format.

## Forwarded

**Adds a header with information about the original client request**

| Key       | Value                                                                                                             | Default | Required |
| --------- | ----------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| Forwarded | A comma separated list containing any of these values: for,by,proto,host                                          | (none)  | yes      |
| ForFormat | Random/RandomAndPort/RandomAndRandomPort/Unknown/UnknownAndPort/UnknownAndRandomPort/Ip/IpAndPort/IpAndRandomPort | Random  | no       |
| ByFormat  | Random/RandomAndPort/RandomAndRandomPort/Unknown/UnknownAndPort/UnknownAndRandomPort/Ip/IpAndPort/IpAndRandomPort | Random  | no       |
| Action    | Action to apply to this header (Set, Append, Remove, Off)                                                         | Set     | no       |

Config:
```json
{
  "Forwarded": "by,for,host,proto",
  "ByFormat": "Random",
  "ForFormat": "IpAndPort",
  "Action": "Append"
},
```
Code:
```csharp
routeConfig = routeConfig.WithTransformForwarded(
    useHost: true, useProto: true, forFormat: NodeFormat.IpAndPort, 
    ByFormat: NodeFormat.Random, action: ForwardedTransformAction.Append);
```
```csharp
transformBuilderContext.AddForwarded(
    useHost: true, useProto: true, forFormat: NodeFormat.IpAndPort, 
    ByFormat: NodeFormat.Random, action: ForwardedTransformAction.Append);
```
Example:
```
Forwarded: proto=https;host="localhost:5001";for="[::1]:20173";by=_YQuN68tm6
```

The `Forwarded` header is defined by RFC 7239. It consolidates many of the same functions as the unofficial X-Forwarded headers, flowing information to the destination server that would otherwise be obscured by using a proxy.

Enabling this transform will disable the default X-Forwarded transforms as they carry similar information in another format. The X-Forwarded transforms can still be explicitly enabled.

Action: This specifies how the transform should handle an existing Forwarded header. It can be "Set", "Append", "Remove, or "Off" (completely disable the transform). A request traversing multiple proxies may accumulate a list of such headers and the destination server will need to evaluate the list to determine the original value.

Proto: This value is taken from `HttpContext.Request.Scheme` indicating if the prior caller used HTTP or HTTPS.

Host: This value is taken from the incoming request's Host header. This is independent of RequestHeaderOriginalHost specified above. Unicode/IDN hosts are punycode encoded.

For: This value identifies the prior caller. IP addresses are taken from `HttpContext.Connection.RemoteIpAddress`. See ByFormat and ForFormat below for details.

By: This value identifies where the proxy received the request. IP addresses are taken from `HttpContext.Connection.LocalIpAddress`. See ByFormat and ForFormat below for details.

ByFormat and ForFormat:

The RFC allows a variety of formats for the By and For fields. It requires that the default format uses an obfuscated identifier identified here as Random.

| Format | Description | Example |
|--------|-------------|---------|
| Random | An obfuscated identifier that is generated randomly per request. This allows for diagnostic tracing scenarios while limiting the flow of uniquely identifying information for privacy reasons. | `by=_YQuN68tm6` |
| RandomAndPort | The Random identifier plus the port. | `by="_YQuN68tm6:80"` |
| RandomAndRandomPort | The Random identifier plus another random identifier for the port. | `by="_YQuN68tm6:_jDw5Cf3tQ"` |
| Unknown | This can be used when the identity of the preceding entity is not known, but the proxy server still wants to signal that the request was forwarded. | `by=unknown` |
| UnknownAndPort | The Unknown identifier plus the port if available. | `by="unknown:80"` |
| UnknownAndRandomPort | The Unknown identifier plus random identifier for the port. | `by="unknown:_jDw5Cf3tQ"` |
| Ip | An IPv4 address or an IPv6 address including brackets. | `by="[::1]"` |
| IpAndPort | The IP address plus the port. | `by="[::1]:80"` |
| IpAndRandomPort | The IP address plus random identifier for the port. | `by="[::1]:_jDw5Cf3tQ"` |

## ClientCert

**Forwards the client cert used on the inbound connection as a header to destination**

| Key        | Value           | Required |
| ---------- | --------------- | -------- |
| ClientCert | The header name | yes      |

Config:
```json
{ "ClientCert": "X-Client-Cert" }
```
Code:
```csharp
routeConfig = routeConfig.WithTransformClientCertHeader(headerName: "X-Client-Cert");
```
```csharp
transformBuilderContext.AddClientCertHeader(headerName: "X-Client-Cert");
```
Example:
```
X-Client-Cert: SSdtIGEgY2VydGlmaWNhdGU...
```
As the inbound and outbound connections are independent, there needs to be a way to pass any inbound client certificate to the destination server. This transform causes the client certificate taken from `HttpContext.Connection.ClientCertificate` to be Base64 encoded and set as the value for the given header name. The destination server may need that certificate to authenticate the client. There is no standard that defines this header and implementations vary, check your destination server for support.

Servers do minimal validation on the incoming client certificate by default. The certificate should be validated either in the proxy or the destination, see the client certificate auth docs for details.

This transform will only apply if the client certificate is already present on the connection. See the optional certs doc if it needs to be requested from the client on a per-route basis.
