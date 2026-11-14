---
title: "Breaking change: Default FeedbackSize value for instances created by TripleDES.Create changed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/5.0/tripledes-default-feedback-size-change.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Default FeedbackSize value for instances created by TripleDES.Create changed

The default value for the `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize` property on the `System.Security.Cryptography.TripleDES` instance returned from `System.Security.Cryptography.TripleDES.Create` has changed from 64 to 8 to make migration from .NET Framework easier. This property, unless used directly in caller code, is used only when the `System.Security.Cryptography.SymmetricAlgorithm.Mode` property is `System.Security.Cryptography.CipherMode.CFB`.

Support for the `System.Security.Cryptography.CipherMode.CFB` mode was first added to .NET for the 5.0 RC1 release, so only .NET 5 RC1 and .NET 5 RC2 applications should be impacted by this change.

## Change description

In .NET Core and previous pre-release versions of .NET 5, `TripleDES.Create().FeedbackSize` has a default value of 64. Starting in the RTM version of .NET 5, `TripleDES.Create().FeedbackSize` has a default value of 8.

## Reason for change

In .NET Framework, the `System.Security.Cryptography.TripleDES` base class defaults the value of `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize` to 64, but the `System.Security.Cryptography.TripleDESCryptoServiceProvider` class overwrites the default to 8. When the `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize` property was introduced to .NET Core in version 2.0, this same behavior was preserved. However, in .NET Framework, `System.Security.Cryptography.TripleDES.Create` returns an instance of `System.Security.Cryptography.TripleDESCryptoServiceProvider`, so the default value from the algorithm factory is 8. For .NET Core and .NET 5+, the algorithm factory returns a non-public implementation, which, until now, had a default value of 64.

Changing the `System.Security.Cryptography.TripleDES` implementation class' `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize` value to 8 allows for applications written for .NET Framework that specified the cipher mode as `System.Security.Cryptography.CipherMode.CFB` but didn't explicitly assign the `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize` property, to continue to function on .NET 5.

## Version introduced

5.0

## Recommended action

Applications that encrypt or decrypt data in the RC1 or RC2 versions of .NET 5 do so with CFB64, when the following conditions are met:

- With a `System.Security.Cryptography.TripleDES` instance from `System.Security.Cryptography.TripleDES.Create`.
- Using the default value for `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize`.
- With the `System.Security.Cryptography.SymmetricAlgorithm.Mode` property set to `System.Security.Cryptography.CipherMode.CFB`.

To maintain this behavior, assign the `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize` property to `64`.

Not all `TripleDES` implementations use the same default for `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize`. We recommend that if you use the `System.Security.Cryptography.CipherMode.CFB` cipher mode on `System.Security.Cryptography.TripleDES` instances, you should always explicitly assign the `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize` property value.

```csharp
TripleDES cipher = TripleDES.Create();
cipher.Mode = CipherMode.CFB;
// Explicitly set the FeedbackSize for CFB to control between CFB8 and CFB64.
cipher.FeedbackSize = 8;
```

## Affected APIs

- `System.Security.Cryptography.TripleDES.Create`
- `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize`
