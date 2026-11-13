---
title: "Native interoperability best practices - .NET (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/best-practices.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Native interoperability best practices - .NET (part 3 of 3)

## Prevent delegate collection with `GC.KeepAlive`

When you use `System.Runtime.InteropServices.Marshal.GetFunctionPointerForDelegate*` to convert a delegate to a function pointer, the garbage collector does **not** track the relationship between the returned pointer and the source delegate. If the delegate is eligible for collection before the native code finishes using the pointer, the application will crash.

Use `System.GC.KeepAlive*` to prevent collection:

```csharp
var callback = new MyDelegate((level, msgPtr) =>
{
    string msg = Marshal.PtrToStringUTF8(msgPtr) ?? string.Empty;
    Console.WriteLine($"[{level}] {msg}");
});

IntPtr fnPtr = Marshal.GetFunctionPointerForDelegate(callback);
NativeUsesCallback(fnPtr);
GC.KeepAlive(callback); // Prevent collection — fnPtr does not root the delegate
```

If native code stores the function pointer beyond the call (for example, as a persistent callback), the delegate must be rooted for its entire lifetime — typically by storing it in a `static` field.

## Resolve conflicts between documentation and native headers

When writing P/Invoke signatures, it's possible to encounter discrepancies between online API documentation and the actual native header files. Header files are the authoritative source for function signatures, struct layouts, type sizes, and calling conventions. When in doubt, verify your P/Invoke signatures against the header rather than relying solely on documentation.
