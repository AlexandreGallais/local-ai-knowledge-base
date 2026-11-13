---
title: "Configure HTTP and JSON for gRPC JSON transcoding ASP.NET Core apps"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/grpc/json-transcoding-binding.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure HTTP and JSON for gRPC JSON transcoding

-->
-->

By James Newton-King

gRPC JSON transcoding creates RESTful JSON web APIs from gRPC methods. It uses annotations and options for customizing how a RESTful API maps to the gRPC methods.

## HTTP rules

gRPC methods must be annotated with an HTTP rule before they support transcoding. The HTTP rule includes information about calling the gRPC method as a RESTful API, such as the HTTP method and route.

```protobuf
import "google/api/annotations.proto";

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply) {
    option (google.api.http) = {
      get: "/v1/greeter/{name}"
    };
  }
}
```

An HTTP rule is:

* An annotation on gRPC methods.
* Identified by the name `google.api.http`.
* Imported from the `google/api/annotations.proto` file. The `google/api/http.proto` and `google/api/annotations.proto` files need to be in the project.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### HTTP method

The HTTP method is specified by setting the route to the matching HTTP method field name:

* `get`
* `put`
* `post`
* `delete`
* `patch`

The `custom` field allows for other HTTP methods.

In the following example, the `CreateAddress` method is mapped to `POST` with the specified route:

```protobuf
service Address {
  rpc CreateAddress (CreateAddressRequest) returns (CreateAddressReply) {
    option (google.api.http) = {
      post: "/v1/address",
      body: "*"
    };
  }
}
```

### Route

gRPC JSON transcoding routes support route parameters. For example, `{name}` in a route binds to the `name` field on the request message.

To bind a field on a nested message, specify the path to the field. In the following example, `{params.org}` binds to the `org` field on the `IssueParams` message:

```protobuf
service Repository {
  rpc GetIssue (GetIssueRequest) returns (GetIssueReply) {
    option (google.api.http) = {
      get: "/{apiVersion}/{params.org}/{params.repo}/issue/{params.issueId}"
    };
  }
}

message GetIssueRequest {
  int32 api_version = 1;
  IssueParams params = 2;
}
message IssueParams {
  string org = 1;
  string repo = 2;
  int32 issueId = 3;
}
```

Transcoding routes and ASP.NET Core routes have a similar syntax and feature set. However, some ASP.NET Core routing features aren't supported by transcoding. These include:

* Route constraints
* Default values
* Optional parameters
* Complex segments

### Request body

Transcoding deserializes the request body JSON to the request message. The `body` field specifies how the HTTP request body maps to the request message. The value is either the name of the request field whose value is mapped to the HTTP request body or `*` for mapping all request fields.

In the following example, the HTTP request body is deserialized to the `address` field:

```protobuf
service Address {
  rpc AddAddress (AddAddressRequest) returns (AddAddressReply) {
    option (google.api.http) = {
      post: "/{apiVersion}/address",
      body: "address"
    };
  }
}

message AddAddressRequest {
  int32 api_version = 1;
  Address address = 2;
}
message Address {
  string street = 1;
  string city = 2;
  string country = 3;
}
```

### Query parameters

Any fields in the request message that aren't bound by route parameters or the request body can be set using HTTP query parameters.

```protobuf
service Repository {
  rpc GetIssues (GetIssuesRequest) returns (GetIssuesReply) {
    option (google.api.http) = {
      get: "/v1/{org}/{repo}/issue"
    };
  }
}

message GetIssuesRequest {
  string org = 1;
  string repo = 2;
  string text = 3;
  PageParams page = 4;
}
message PageParams {
  int32 index = 1;
  int32 size = 2;
}
```

In the preceding example:

* `org` and `repo` fields are bound from route parameters.
* Other fields, such as `text` and the nested fields from `page`, can be bound from the query string: `?text=value&page.index=0&page.size=10`

### Response body

By default, transcoding serializes the entire response message as JSON. The `response_body` field allows serialization of a subset of the response message.

```protobuf
service Address {
  rpc GetAddress (GetAddressRequest) returns (GetAddressReply) {
    option (google.api.http) = {
      get: "/v1/address/{id}",
      response_body: "address"
    };
  }
}

message GetAddressReply {
  int32 version = 1;
  Address address = 2;
}
message Address {
  string street = 1;
  string city = 2;
  string country = 3;
}
```

In the preceding example, the `address` field is serialized to the response body as JSON.

### Specification

For more information about customizing gRPC transcoding, see the HttpRule specification.

## Customize JSON

Messages are converted to and from JSON using the JSON mapping in the Protobuf specification. Protobuf's JSON mapping is a standardized way to convert between JSON and Protobuf, and all serialization follows these rules.

However, gRPC JSON transcoding offers some limited options for customizing JSON with `Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings`, as shown in the following table.

| Option | Default Value | Description |
| ------ | ------------- | ----------- |
| `Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.IgnoreDefaultValues` | `false` | If set to `true`, fields with default values are ignored during serialization. |
| `Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.WriteEnumsAsIntegers` | `false` | If set to `true`, enum values are written as integers instead of strings. |
| `Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.WriteInt64sAsStrings` | `false` | If set to `true`, `Int64` and `UInt64` values are written as strings instead of numbers. |
| `Microsoft.AspNetCore.Grpc.JsonTranscoding.GrpcJsonSettings.WriteIndented` | `false` | If set to `true`, JSON is written using pretty printing. This option doesn't affect streaming methods, which write line-delimited JSON messages and can't use pretty printing. |

```csharp
builder.Services.AddGrpc().AddJsonTranscoding(o =>
{
    o.JsonSettings.WriteIndented = true;
});
```

In the `.proto` file, the `json_name` field option customizes a field's name when it's serialized as JSON, as in the following example:

```protobuf
message TestMessage {
  string my_field = 1 [json_name="customFieldName"];
}
```

Transcoding doesn't support advanced JSON customization. Apps requiring precise JSON structure control should consider using ASP.NET Core Web API.

## Related content

* gRPC JSON transcoding in ASP.NET Core gRPC apps
* HttpRule specification
