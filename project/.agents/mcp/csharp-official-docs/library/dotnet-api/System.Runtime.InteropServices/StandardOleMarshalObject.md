---
title: "StandardOleMarshalObject class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/StandardOleMarshalObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StandardOleMarshalObject class

Namespace: `System.Runtime.InteropServices`

```csharp
public class StandardOleMarshalObject : MarshalByRefObject
```

Replaces the standard common language runtime (CLR) free-threaded marshaler with the standard OLE STA marshaler.

#### Remarks
The `StandardOleMarshalObject` class prevents calls made into a hosting object by OLE from entering threads other than the UI thread.

You should derive your class from the `StandardOleMarshalObject` class to gain this functionality.

## StandardOleMarshalObject.StandardOleMarshalObject() constructor

```csharp
protected StandardOleMarshalObject ();
```

Initializes a new instance of the `StandardOleMarshalObject` class.

#### Remarks
You should derive your class from the `StandardOleMarshalObject` class-.
