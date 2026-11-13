---
title: "Platform Invoke Examples"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/platform-invoke-examples.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Platform Invoke Examples

The following examples demonstrate how to define and call the `MessageBox` function in User32.dll, passing a simple string as an argument. In the examples, the `System.Runtime.InteropServices.DllImportAttribute.CharSet` field is set to `Auto` to let the target platform determine the character width and string marshalling.

 ```csharp
using System;
using System.Runtime.InteropServices;

public class Win32 {
     [DllImport("user32.dll", CharSet=CharSet.Auto)]
     public static extern IntPtr MessageBox(int hWnd, String text,
                     String caption, uint type);
}

public class HelloWorld {
    public static void Main() {
       Win32.MessageBox(0, "Hello World", "Platform Invoke Sample", 0);
    }
}
```

 For additional examples, see Marshalling Data with Platform Invoke.

## See also

- `System.Runtime.InteropServices.DllImportAttribute`
- Creating Prototypes in Managed Code
- Specifying a Character Set
