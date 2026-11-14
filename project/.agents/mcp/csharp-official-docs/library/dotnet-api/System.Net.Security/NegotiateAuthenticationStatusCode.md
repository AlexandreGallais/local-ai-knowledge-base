---
title: "NegotiateAuthenticationStatusCode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateAuthenticationStatusCode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateAuthenticationStatusCode enum

Namespace: `System.Net.Security`

```csharp
public enum NegotiateAuthenticationStatusCode
```

Specifies the statuses for a single step of an authentication exchange.

To be added.

## NegotiateAuthenticationStatusCode.BadBinding field

```csharp
BadBinding
```

Channel binding mismatch between client and server.

## NegotiateAuthenticationStatusCode.Completed field

```csharp
Completed
```

Operation completed successfully.

## NegotiateAuthenticationStatusCode.ContextExpired field

```csharp
ContextExpired
```

Referenced authentication context has expired.

## NegotiateAuthenticationStatusCode.ContinueNeeded field

```csharp
ContinueNeeded
```

Operation completed successfully but more tokens are to be exchanged with the other party.

## NegotiateAuthenticationStatusCode.CredentialsExpired field

```csharp
CredentialsExpired
```

Authentication credentials have expired.

## NegotiateAuthenticationStatusCode.GenericFailure field

```csharp
GenericFailure
```

Operation resulted in failure but no specific error code was given.

## NegotiateAuthenticationStatusCode.ImpersonationValidationFailed field

```csharp
ImpersonationValidationFailed
```

Validation of the impersonation level failed.

## NegotiateAuthenticationStatusCode.InvalidCredentials field

```csharp
InvalidCredentials
```

Consistency checks performed on the credential failed.

## NegotiateAuthenticationStatusCode.InvalidToken field

```csharp
InvalidToken
```

Checks performed on the authentication token failed.

## NegotiateAuthenticationStatusCode.MessageAltered field

```csharp
MessageAltered
```

Message was altered and failed an integrity check validation.

## NegotiateAuthenticationStatusCode.OutOfSequence field

```csharp
OutOfSequence
```

Authentication token was identfied as duplicate, old, or out of expected sequence.

## NegotiateAuthenticationStatusCode.QopNotSupported field

```csharp
QopNotSupported
```

Requested protection level is not supported.

## NegotiateAuthenticationStatusCode.SecurityQosFailed field

```csharp
SecurityQosFailed
```

Validation of RequiredProtectionLevel against negotiated protection level failed.

## NegotiateAuthenticationStatusCode.TargetUnknown field

```csharp
TargetUnknown
```

Validation of the target name failed.

## NegotiateAuthenticationStatusCode.UnknownCredentials field

```csharp
UnknownCredentials
```

The supplied credentials were not valid for context acceptance, or the credential <example-value> did not reference any credentials.

## NegotiateAuthenticationStatusCode.Unsupported field

```csharp
Unsupported
```

Unsupported authentication package was requested.
