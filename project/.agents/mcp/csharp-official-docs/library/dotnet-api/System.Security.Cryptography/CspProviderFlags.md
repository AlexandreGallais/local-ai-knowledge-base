---
title: "CspProviderFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CspProviderFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CspProviderFlags enum

Namespace: `System.Security.Cryptography`

```csharp
public enum CspProviderFlags
```

Specifies flags that modify the behavior of the cryptographic service providers (CSP).

#### Remarks

> **Important:**
>  The `CreateEphemeralKey` flag provides temporary keys with more reliable cleanup. If this flag is not used, the common language runtime (CLR) generates a randomly named key when an RSA object is created. When the object is finalized or disposed of, the key is deleted. When impersonation is in effect, not explicitly calling `Dispose` can potentially create a problem. For example, if you use impersonation, create an RSA object, and do not dispose of it, the finalizer thread (which is not impersonating) can fail to delete the key, and then throws an exception. This exception is unhandled and can terminate the process. The resources allocated to the key are not recovered, resulting in a memory leak. The `KeyContainerPermission` demand is suppressed by this flag.

## CspProviderFlags.CreateEphemeralKey field

```csharp
CreateEphemeralKey
```

Create a temporary key that is released when the associated Rivest-Shamir-Adleman (RSA) object is closed. Do not use this flag if you want your key to be independent of the RSA object.

To be added.

## CspProviderFlags.NoFlags field

```csharp
NoFlags
```

Do not specify any settings.

## CspProviderFlags.NoPrompt field

```csharp
NoPrompt
```

Prevent the CSP from displaying any user interface (UI) for this context.

## CspProviderFlags.UseArchivableKey field

```csharp
UseArchivableKey
```

Allow a key to be exported for archival or recovery.

## CspProviderFlags.UseDefaultKeyContainer field

```csharp
UseDefaultKeyContainer
```

Use key <example-value> from the default key container.

## CspProviderFlags.UseExistingKey field

```csharp
UseExistingKey
```

Use key <example-value> from the current key.

## CspProviderFlags.UseMachineKeyStore field

```csharp
UseMachineKeyStore
```

Use key <example-value> from the computer's key store.

## CspProviderFlags.UseNonExportableKey field

```csharp
UseNonExportableKey
```

Use key <example-value> that cannot be exported.

## CspProviderFlags.UseUserProtectedKey field

```csharp
UseUserProtectedKey
```

Notify the user through a dialog box or another method when certain actions are attempting to use a key.  This flag is not compatible with the `CspProviderFlags.NoPrompt` flag.
