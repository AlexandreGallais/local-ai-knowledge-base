---
title: "Breaking change: UTF-7 code paths are obsolete"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/utf-7-code-paths-obsolete.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# UTF-7 code paths are obsolete

The UTF-7 encoding is no longer in wide use among applications, and many specs now forbid its use in interchange. It's also occasionally used as an attack vector in applications that don't anticipate encountering UTF-7-encoded data. Microsoft warns against use of `System.Text.UTF7Encoding` because it doesn't provide error detection.

Consequently, the `System.Text.Encoding.UTF7` property and `System.Text.UTF7Encoding.#ctor*` constructors are now obsolete. Additionally, `System.Text.Encoding.GetEncoding*` and `System.Text.Encoding.GetEncodings*` no longer allow you to specify `UTF-7`.

## Change description

Previously, you could create an instance of the UTF-7 encoding by using the `System.Text.Encoding.GetEncoding*` APIs. For example:

```csharp
Encoding enc1 = Encoding.GetEncoding("utf-7"); // By name.
Encoding enc2 = Encoding.GetEncoding(65000); // By code page.
```

Additionally, an instance that represents the UTF-7 encoding was enumerated by the `System.Text.Encoding.GetEncodings` method, which enumerates all the `System.Text.Encoding` instances registered on the system.

Starting in .NET 5, the `System.Text.Encoding.UTF7` property and `System.Text.UTF7Encoding.#ctor*` constructors are obsolete and produce warning `SYSLIB0001`. However, to reduce the number of warnings that callers receive when using the `System.Text.UTF7Encoding` class, the `System.Text.UTF7Encoding` type itself is not marked obsolete.

```csharp
// The next line generates warning SYSLIB0001.
UTF7Encoding enc = new UTF7Encoding();
// The next line does not generate a warning.
byte[] bytes = enc.GetBytes("Hello world!");
```

Additionally, the `System.Text.Encoding.GetEncoding*` methods treat the encoding name `utf-7` and the code page `65000` as `unknown`. Treating the encoding as `unknown` causes the method to throw an `System.ArgumentException`.

```csharp
// Throws ArgumentException, same as calling Encoding.GetEncoding("unknown").
Encoding enc = Encoding.GetEncoding("utf-7");
```

Finally, the `System.Text.Encoding.GetEncodings` method doesn't include the UTF-7 encoding in the `System.Text.EncodingInfo` array that it returns. The encoding is excluded because it cannot be instantiated.

```csharp
foreach (EncodingInfo encInfo in Encoding.GetEncodings())
{
    // The next line would throw if GetEncodings included UTF-7.
    Encoding enc = Encoding.GetEncoding(encInfo.Name);
}
```

## Reason for change

Many applications call `Encoding.GetEncoding("encoding-name")` with an encoding name value that's provided by an untrusted source. For example, a web client or server might take the `charset` portion of the `Content-Type` header and pass the value directly to `Encoding.GetEncoding` without validating it. This could allow a malicious endpoint to specify `Content-Type: ...; charset=utf-7`, which could cause the receiving application to misbehave.

Additionally, disabling UTF-7 code paths allows optimizing compilers, such as those used by Blazor, to remove these code paths entirely from the resulting application. As a result, the compiled applications run more efficiently and take less disk space.

## Version introduced

5.0

## Recommended action

In most cases, you don't need to take any action. However, for apps that have previously activated UTF-7-related code paths, consider the guidance that follows.

- If your app calls `System.Text.Encoding.GetEncoding*` with unknown encoding names provided by an untrusted source:

  Instead, compare the encoding names against a configurable allow list. The configurable allow list should at minimum include the industry-standard "utf-8". Depending on your clients and regulatory requirements, you may also need to allow region-specific encodings, such as "GB18030".

  If you don't implement an allow list, `System.Text.Encoding.GetEncoding*` will return any `System.Text.Encoding` that's built into the system or that's registered via a custom `System.Text.EncodingProvider`. Audit your service's requirements to validate that this is the desired behavior. UTF-7 continues to be disabled by default unless your application re-enables the compatibility switch mentioned later in this article.

- If you're using `System.Text.Encoding.UTF7` or `System.Text.UTF7Encoding` within your own protocol or file format:

  Switch to using `System.Text.Encoding.UTF8` or `System.Text.UTF8Encoding`. UTF-8 is an industry standard and is widely supported across languages, operating systems, and runtimes. Using UTF-8 eases future maintenance of your code and makes it more interoperable with the rest of the ecosystem.

- If you're comparing an `System.Text.Encoding` instance against `System.Text.Encoding.UTF7`:

  Instead, consider performing a check against the well-known UTF-7 code page, which is `65000`. By comparing against the code page, you avoid the warning and also handle some edge cases, such as if somebody called `new UTF7Encoding()` or subclassed the type.

  ```csharp
  void DoSomething(Encoding enc)
  {
      // Don't perform the check this way.
      // It produces a warning and misses some edge cases.
      if (enc == Encoding.UTF7)
      {
          // Encoding is UTF-7.
      }

      // Instead, perform the check this way.
      if (enc != null && enc.CodePage == 65000)
      {
          // Encoding is UTF-7.
      }
  }
  ```

- If you must use `System.Text.Encoding.UTF7` or `System.Text.UTF7Encoding`:

  You can suppress the `SYSLIB0001` warning in code or within your project's *.csproj* file.

  ```csharp
  #pragma warning disable SYSLIB0001 // Disable the warning.
  Encoding enc = Encoding.UTF7;
  #pragma warning restore SYSLIB0001 // Re-enable the warning.
  ```

  ```xml
  <Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
     <TargetFramework>net5.0</TargetFramework>
     <!-- NoWarn below suppresses SYSLIB0001 project-wide -->
     <NoWarn>$(NoWarn);SYSLIB0001</NoWarn>
    </PropertyGroup>
  </Project>
  ```

  > **Note:**
  > Suppressing `SYSLIB0001` only disables the `System.Text.Encoding.UTF7` and `System.Text.UTF7Encoding` obsoletion warnings. It doesn't disable any other warnings or change the behavior of APIs like `System.Text.Encoding.GetEncoding*`.

- If you must support `Encoding.GetEncoding("utf-7", ...)`:

  You can re-enable support for this via a compatibility switch. This compatibility switch can be specified in the application's *.csproj* file or in a runtime configuration file, as shown in the following examples.

  In the application's *.csproj* file:

  ```xml
  <Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
     <TargetFramework>net5.0</TargetFramework>
     <!-- Re-enable support for UTF-7 -->
     <EnableUnsafeUTF7Encoding>true</EnableUnsafeUTF7Encoding>
    </PropertyGroup>
  </Project>
  ```

  In the application's *runtimeconfig.template.json* file:

  ```json
  {
    "configProperties": {
      "System.Text.Encoding.EnableUnsafeUTF7Encoding": true
    }
  }
  ```

  > **Tip:**
  > If you re-enable support for UTF-7, you should perform a security review of code that calls `System.Text.Encoding.GetEncoding*`.

## Affected APIs

- `System.Text.Encoding.UTF7`
- `System.Text.UTF7Encoding.#ctor`
- `System.Text.UTF7Encoding.#ctor(System.Boolean)`
- `System.Text.Encoding.GetEncoding(System.Int32)`
- `System.Text.Encoding.GetEncoding(System.String)`
- `System.Text.Encoding.GetEncoding(System.Int32,System.Text.EncoderFallback,System.Text.DecoderFallback)`
- `System.Text.Encoding.GetEncoding(System.String,System.Text.EncoderFallback,System.Text.DecoderFallback)`
- `System.Text.Encoding.GetEncodings`
