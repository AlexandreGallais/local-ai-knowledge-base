---
title: "Example COM Class"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/advanced-topics/interop/example-com-class.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Example COM Class

The following code is an example of a class that you would expose as a COM object. After you place this code in a .cs file added to your project, set the **Register for COM Interop** property to **True**. For more information, see How to: Register a Component for COM Interop.

Exposing C# objects to COM requires declaring a class interface, an "events interface" if necessary, and the class itself. Class members must follow these rules to be visible to COM:

- The class must be public.
- Properties, methods, and events must be public.
- Properties and methods must be declared on the class interface.
- Events must be declared in the event interface.

Other public members in the class that you don't declare in these interfaces aren't visible to COM, but they're visible to other .NET objects. To expose properties and methods to COM, you must declare them on the class interface and mark them with a `DispId` attribute, and implement them in the class. The order in which you declare the members in the interface is the order used for the COM vtable. To expose events from your class, you must declare them on the events interface and mark them with a `DispId` attribute. The class shouldn't implement this interface.

The class implements the class interface; it can implement more than one interface, but the first implementation is the default class interface. Implement the methods and properties exposed to COM here. They must be public and must match the declarations in the class interface. Also, declare the events raised by the class here. They must be public and must match the declarations in the events interface.

## Example

```csharp
﻿using System.Runtime.InteropServices;

namespace project_name
{
    [Guid("EAA4976A-45C3-4BC5-BC0B-E474F4C3C83F")]
    public interface ComClass1Interface
    {
    }

    [Guid("7BD20046-DF8C-44A6-8F6B-687FAA26FA71"),
        InterfaceType(ComInterfaceType.InterfaceIsIDispatch)]
    public interface ComClass1Events
    {
    }

    [Guid("0D53A3E8-E51A-49C7-944E-E72A2064F938"),
        ClassInterface(ClassInterfaceType.None),
        ComSourceInterfaces(typeof(ComClass1Events))]
    public class ComClass1 : ComClass1Interface
    {
    }
}
```
## See also

- Interoperability
- Build Page, Project Designer (C#)
