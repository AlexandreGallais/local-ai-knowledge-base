---
title: "Hash passwords in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/data-protection/consumer-apis/password-hashing.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Hash passwords in ASP.NET Core

This article shows how to call the KeyDerivation.Pbkdf2 method, which allows hashing a password with the PBKDF2 algorithm, as described in RFC 2898, Section 5.2.

The `KeyDerivation.Pbkdf2` API is a low-level cryptographic primitive. The intended use is for integrating apps into an existing protocol or cryptographic system.

> **Warning:**
> `KeyDerivation.Pbkdf2` shouldn't be used in new apps that support password-based sign in and which need to store hashed passwords in a datastore. New apps should use the PasswordHasher class. For more information, see Exploring the ASP.NET Core Identity PasswordHasher.

The data protection code base includes a NuGet package Microsoft.AspNetCore.Cryptography.KeyDerivation that contains cryptographic key <example-value> functions. This package is a standalone component and has no dependencies on the rest of the data protection system. The package can be used independently. The source exists alongside the data protection code base as a convenience.

## Generate key with 'KeyDerivation.Pbkdf2'

The following code shows how to use the `KeyDerivation.Pbkdf2` method to generate a shared secret key.

> **Warning:**
> Don't call the `KeyDerivation.Pbkdf2` method to hash a password for storage in a datastore.

```csharp
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

Console.Write("<example-value>");
string? password = Console.ReadLine();

// Generate a 128-bit salt using a sequence of
// cryptographically strong random bytes.
byte[] salt = RandomNumberGenerator.GetBytes(128 / 8); // divide by 8 to convert bits to bytes
Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");

// derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
    password: <example-value>,
    salt: salt,
    prf: KeyDerivationPrf.HMACSHA256,
    iterationCount: 100000,
    numBytesRequested: 256 / 8));

Console.WriteLine($"Hashed: {hashed}");

/*
 * SAMPLE OUTPUT
 *
 * Enter a password: <example-value>
 * Salt: CGYzqeN4plZekNC88Umm1Q==
 * Hashed: Gt9Yc4AiIvmsC1QQbe2RZsCIqvoYlst2xbz0Fs8aHnw=
 */
```

For a real-world use case of the ASP.NET Core Identity `PasswordHasher` type, see the source code on GitHub.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

## Related content

- Exploring the ASP.NET Core Identity '<example-value>' type
- KeyDerivation.Pbkdf2
