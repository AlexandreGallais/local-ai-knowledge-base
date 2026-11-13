---
title: "YARP Request Transforms (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/yarp/transforms-request.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Request transforms

Request transforms include the request path, query, HTTP version, method, and headers. In code these are represented by the RequestTransformContext object and processed by implementations of the abstract class RequestTransform.

Notes:

* The proxy request scheme (http/https), authority, and path base, are taken from the destination server address (`https://localhost:10001/Path/Base` in the example above) and should not be modified by transforms.
* The Host header can be overridden by transforms independent of the authority, see RequestHeader below.
* The request's original PathBase property is not used when constructing the proxy request, see X-Forwarded.
* All incoming request headers are copied to the proxy request by default with the exception of the Host header (see `Defaults` Defaults). X-Forwarded headers are also added by default. These behaviors can be configured using the following transforms. Additional request headers can be specified, or request headers can be excluded by setting them to an empty value.

The following are built in transforms identified by their primary config key. These transforms are applied in the order they are specified in the route configuration.

## PathPrefix

**Modifies the request path adding a prefix value**

| Key        | Value                      | Required |
| ---------- | -------------------------- | -------- |
| PathPrefix | A path starting with a '/' | yes      |

Config:
```json
{ "PathPrefix": "/prefix" }
```
Code:
```csharp
routeConfig = routeConfig.WithTransformPathPrefix(prefix: "/prefix");
```
```csharp
transformBuilderContext.AddPathPrefix(prefix: "/prefix");
```
Example:
`/request/path` becomes `/prefix/request/path`

This will prefix the request path with the given value.

## PathRemovePrefix

**Modifies the request path removing a prefix value**

| Key              | Value                      | Required |
| ---------------- | -------------------------- | -------- |
| PathRemovePrefix | A path starting with a '/' | yes      |

Config:
```json
{ "PathRemovePrefix": "/prefix" }
```
Code:
```csharp
routeConfig = routeConfig.WithTransformPathRemovePrefix(prefix: "/prefix");
```
```csharp
transformBuilderContext.AddPathRemovePrefix(prefix: "/prefix");
```
Example:
`/prefix/request/path` becomes `/request/path`
`/prefix2/request/path` is not modified

This will remove the matching prefix from the request path. Matches are made on path segment boundaries (`/`). If the prefix does not match then no changes are made.

## PathSet

**Replaces the request path with the specified value**

| Key     | Value                      | Required |
| ------- | -------------------------- | -------- |
| PathSet | A path starting with a '/' | yes      |

Config:
```json
{ "PathSet": "/newpath" }
```
Code:
```csharp
routeConfig = routeConfig.WithTransformPathSet(path: "/newpath");
```
```csharp
transformBuilderContext.AddPathSet(path: "/newpath");
```
Example:
`/request/path` becomes `/newpath`

This will set the request path with the given value.

## PathPattern

**Replaces the request path using a pattern template**

| Key         | Value                               | Required |
| ----------- | ----------------------------------- | -------- |
| PathPattern | A path template starting with a '/' | yes      |

Config:
```json
{ "PathPattern": "/my/{plugin}/api/{**remainder}" }
```
Code:
```csharp
routeConfig = routeConfig.WithTransformPathRouteValues(
    pattern: new PathString("/my/{plugin}/api/{**remainder}"));
```
```csharp
transformBuilderContext.AddPathRouteValues(
    pattern: new PathString("/my/{plugin}/api/{**remainder}"));
```

This will set the request path with the given value and replace any `{}` segments with the associated route value. `{}` segments without a matching route value are removed. The final `{}` segment can be marked as `{**remainder}` to indicate this is a catch-all segment that may contain multiple path segments. See ASP.NET Core's routing docs for more information about route templates.

Example:

| Step             | Value                               |
| ---------------- | ----------------------------------- |
| Route definition | `/api/{plugin}/stuff/{**remainder}` |
| Request path     | `/api/v1/stuff/more/stuff`          |
| Plugin value     | `v1`                                |
| Remainder value  | `more/stuff`                        |
| PathPattern      | `/my/{plugin}/api/{**remainder}`    |
| Result           | `/my/v1/api/more/stuff`             |

## QueryValueParameter

**Adds or replaces parameters in the request query string**

| Key                 | Value                            | Required |
| ------------------- | -------------------------------- | -------- |
| QueryValueParameter | Name of a query string parameter | yes      |
| Set/Append          | Static value                     | yes      |

Config:
```json
{
  "QueryValueParameter": "foo",
  "Append": "bar"
}
```
Code:
```csharp
routeConfig = routeConfig.WithTransformQueryValue(
    queryKey: "foo", value: "bar", append: true);
```
```csharp
transformBuilderContext.AddQueryValue(
    queryKey: "foo", value: "bar", append: true);
```

This will add a query string parameter with the name `foo` and sets it to the static value `bar`.

Example:

| Step                | Value                |
| ------------------- | -------------------- |
| Query               | `?a=b`               |
| QueryValueParameter | `foo`                |
| Append              | `remainder`          |
| Result              | `?a=b&foo=remainder` |

## QueryRouteParameter

**Adds or replaces a query string parameter with a value from the route configuration**

| Key                 | Value                            | Required |
| ------------------- | -------------------------------- | -------- |
| QueryRouteParameter | Name of a query string parameter | yes      |
| Set/Append          | The name of a route value        | yes      |

Config:
```json
{
  "QueryRouteParameter": "foo",
  "Append": "remainder"
}
```
Code:
```csharp
routeConfig = routeConfig.WithTransformQueryRouteValue(
    queryKey: "foo", routeValueKey: "remainder", append: true);
```
```csharp
transformBuilderContext.AddQueryRouteValue(
    queryKey: "foo", routeValueKey: "remainder", append: true);
```

This will add a query string parameter with the name `foo` and sets it to the value of the associated route value.

Example:

| Step                | Value               |
| ------------------- | ------------------- |
| Route definition    | `/api/{*remainder}` |
| Request path        | `/api/more/stuff`   |
| Remainder value     | `more/stuff`        |
| QueryRouteParameter | `foo`               |
| Append              | `remainder`         |
| Result              | `?foo=more/stuff`   |

## QueryRemoveParameter

**Removes the specified parameter from the request query string**

| Key                  | Value                            | Required |
| -------------------- | -------------------------------- | -------- |
| QueryRemoveParameter | Name of a query string parameter | yes      |

Config:
```json
{ "QueryRemoveParameter": "foo" }
```
Code:
```csharp
routeConfig = routeConfig.WithTransformQueryRemoveKey(queryKey: "foo");
```
```csharp
transformBuilderContext.AddQueryRemoveKey(queryKey: "foo");
```

This will remove a query string parameter with the name `foo` if present on the request.

Example:

| Step                 | Value        |
| -------------------- | ------------ |
| Request path         | `?a=b&foo=c` |
| QueryRemoveParameter | `foo`        |
| Result               | `?a=b`       |

## HttpMethodChange

**Changes the http method used in the request**

| Key              | Value                      | Required |
| ---------------- | -------------------------- | -------- |
| HttpMethodChange | The http method to replace | yes      |
| Set              | The new http method        | yes      |

Config:
```json
{
  "HttpMethodChange": "PUT",
  "Set": "POST"
}
```
Code:
```csharp
routeConfig = routeConfig.WithTransformHttpMethodChange(
    fromHttpMethod: HttpMethods.Put, toHttpMethod: HttpMethods.Post);
```

```csharp
transformBuilderContext.AddHttpMethodChange(
    fromHttpMethod: HttpMethods.Put, toHttpMethod: HttpMethods.Post);
```

This will change PUT requests to POST.

## RequestHeadersCopy

**Sets whether incoming request headers are copied to the outbound request**

| Key                | Value      | Default | Required |
| ------------------ | ---------- | ------- | -------- |
| RequestHeadersCopy | true/false | true    | yes      |

Config:
```json
{ "RequestHeadersCopy": "false" }
```
Code:
```csharp
routeConfig = routeConfig.WithTransformCopyRequestHeaders(copy: false);
```
```csharp
transformBuilderContext.CopyRequestHeaders = false;
```

This sets if all incoming request headers are copied to the proxy request. This setting is enabled by default and can by disabled by configuring the transform with a `false` value. Transforms that reference specific headers will still be run if this is disabled.

## RequestHeaderOriginalHost

**Specifies if the incoming request Host header should be copied to the proxy request**

| Key                       | Value      | Default | Required |
| ------------------------- | ---------- | ------- | -------- |
| RequestHeaderOriginalHost | true/false | false   | yes      |

Config:
```json
{ "RequestHeaderOriginalHost": "true" }
```
```csharp
routeConfig = routeConfig.WithTransformUseOriginalHostHeader(useOriginal: true);
```
```csharp
transformBuilderContext.AddOriginalHost(true);
```

This specifies if the incoming request Host header should be copied to the proxy request. This setting is disabled by default and can be enabled by configuring the transform with a `true` value. Transforms that directly reference the `Host` header will override this transform.

## RequestHeader

**Adds or replaces request headers**

| Key           | Value            | Required |
| ------------- | ---------------- | -------- |
| RequestHeader | The header name  | yes      |
| Set/Append    | The header value | yes      |

Config:
```json
{
  "RequestHeader": "MyHeader",
  "Set": "MyValue"
}
```
Code:
```csharp
routeConfig = routeConfig.WithTransformRequestHeader(
    headerName: "MyHeader", value: "MyValue", append: false);
```
```csharp
transformBuilderContext.AddRequestHeader(
    headerName: "MyHeader", value: "MyValue", append: false);
```

Example:
```
MyHeader: MyValue
```

This sets or appends the value for the named header. Set replaces any existing header. Append adds an additional header with the given value.
Note: setting "" as a header value is not recommended and can cause an undefined behavior.

## RequestHeaderRouteValue

**Adds or replaces a header with a value from the route configuration**

| Key           | Value                            | Required |
| ------------- | -------------------------------- | -------- |
| RequestHeader | Name of a query string parameter | yes      |
| Set/Append    | The name of a route value        | yes      |

Config:
```json
{
  "RequestHeaderRouteValue": "MyHeader",
  "Set": "MyRouteKey"
}
```
Code:
```csharp
routeConfig = routeConfig.WithTransformRequestHeaderRouteValue(
    headerName: "MyHeader", routeValueKey: "key", append: false);
```
```csharp
transformBuilderContext.AddRequestHeaderRouteValue(
    headerName: "MyHeader", routeValueKey: "key", append: false);
```

Example:

| Step                   | Value               |
| ---------------------- | ------------------- |
| Route definition       | `/api/{*remainder}` |
| Request path           | `/api/more/stuff`   |
| Remainder value        | `more/stuff`        |
| RequestHeaderFromRoute | `foo`               |
| Append                 | `remainder`         |
| Result                 | `foo: more/stuff`   |

This sets or appends the value for the named header with a value from the route configuration. Set replaces any existing header. Append adds an additional header with the given value.
Note: setting "" as a header value is not recommended and can cause an undefined behavior.

## RequestHeaderRemove

**Removes request headers**

| Key                 | Value           | Required |
| ------------------- | --------------- | -------- |
| RequestHeaderRemove | The header name | yes      |

Config:
```json
{
  "RequestHeaderRemove": "MyHeader"
}
```
Code:
```csharp
routeConfig = routeConfig.WithTransformRequestHeaderRemove(headerName: "MyHeader");
```
```csharp
transformBuilderContext.AddRequestHeaderRemove(headerName: "MyHeader");
```

Example:
```
MyHeader: MyValue
AnotherHeader: AnotherValue
```

This removes the named header.

## RequestHeadersAllowed

| Key                   | Value                                               | Required |
| --------------------- | --------------------------------------------------- | -------- |
| RequestHeadersAllowed | A semicolon separated list of allowed header names. | yes      |

Config:
```json
{
  "RequestHeadersAllowed": "Header1;header2"
}
```
Code:
```csharp
routeConfig = routeConfig.WithTransformRequestHeadersAllowed("Header1", "header2");
```
```csharp
transformBuilderContext.AddRequestHeadersAllowed("Header1", "header2");
```

YARP copies most request headers to the proxy request by default (see RequestHeadersCopy). Some security models only allow specific headers to be proxied. This transform disables RequestHeadersCopy and only copies the given headers. Other transforms that modify or append to existing headers may be affected if not included in the allow list.

Note that there are some headers YARP does not copy by default since they are connection specific or otherwise security sensitive (e.g. `Connection`, `Alt-Svc`). Putting those header names in the allow list will bypass that restriction but is strongly discouraged as it may negatively affect the functionality of the proxy or cause security vulnerabilities.

Example:
```
Header1: value1
Header2: value2
AnotherHeader: AnotherValue
```

Only header1 and header2 are copied to the proxy request.
