---
title: "TransportContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/TransportContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TransportContext class

Namespace: `System.Net`

```csharp
public abstract class TransportContext
```

Provides additional context about the underlying transport layer.

#### Remarks
The `TransportContext` class is used with classes in the `ExtendedProtection` namespace to provide support for authentication using extended protection for applications.

The design of integrated Windows authentication allows for some credential <example-value> responses to be universal, meaning they can be re-used or forwarded. If this particular design feature is not needed then the challenge responses should be constructed with, at minimum, target specific information and, at best, also some channel specific information. Services can then provide extended protection to ensure that credential <example-value> responses contain service specific information (a Service Provider Name or SPN) and, if necessary, channel specific information (a channel binding token or CBT). With this information in the credential <example-value>, services are able to better protect against malicious use of credential <example-value> responses that might have been improperly obtained.

`HttpWebRequest` is the only class derived from `WebRequest` class that can potentially use IWA. The `FtpWebRequest` class does only FTP clear text authentication. The `FileWebRequest` class doesn't perform any authentication.

There are several ways an application may get a `TransportContext` instance. An application that uses `SslStream` can get the `TransportContext` using the `TransportContext` property. An application that uses `HttpWebRequest` can get a `TransportContext` using the `HttpWebRequest.GetRequestStream` or `HttpWebRequest.EndGetRequestStream` methods.

## TransportContext.TransportContext() constructor

```csharp
protected TransportContext ();
```

Creates a new instance of the `TransportContext` class.

To be added.

## TransportContext.GetChannelBinding(ChannelBindingKind) method

```csharp
public abstract System.Security.Authentication.ExtendedProtection.ChannelBinding? GetChannelBinding (System.Security.Authentication.ExtendedProtection.ChannelBindingKind kind);
```

Retrieves the requested channel binding.

Parameters:

- `kind`: The type of channel binding to retrieve.

Returns: The requested `ChannelBinding`, or `null` if the channel binding is not supported by the current transport or by the operating system.

Exceptions:

- `NotSupportedException`: `kind` is must be `ChannelBindingKind.Endpoint` for use with the `TransportContext` retrieved from the `HttpListenerRequest.TransportContext` property.

#### Remarks
The possible values for the `kind` parameter are `Endpoint` or `Unique`.

If an application attempts to retrieve the channel binding token (CBT) from the `TransportContext` property using the `TransportContext.GetChannelBinding` method and the `ChannelBindingKind` is not `Endpoint`, then the `HttpListenerRequest` will throw `NotSupportedException`. The `HttpListenerRequest` overrides the `TransportContext.GetChannelBinding` method with an internal implementation
