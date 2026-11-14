---
title: "LocalDataStoreSlot class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/LocalDataStoreSlot.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LocalDataStoreSlot class

Namespace: `System`

```csharp
public sealed class LocalDataStoreSlot
```

Encapsulates a memory slot to store local data. This class cannot be inherited.

#### Remarks

.NET provides two mechanisms for using thread local storage (TLS): thread-relative static fields, and data slots.

- Thread-relative static fields are `static` fields (`Shared` fields in Visual Basic) that are marked with the `ThreadStaticAttribute` attribute. They provide better performance than data slots, and enable compile-time type checking.
- Data slots are slower and more awkward to use than thread-relative static fields. Also, data is stored as type `Object`, so you must cast it to the correct type before using it. However, you can use data slots when you have insufficient information at compile time to allocate static fields.

For more information about using TLS, see Thread Local Storage: Thread-Relative Static Fields and Data Slots.

Similarly, .NET provides two mechanisms for using context local storage: context-relative static fields and data slots. Context-relative static fields are static fields that are marked with the `ContextStaticAttribute` attribute. The trade-offs between using these two mechanisms are similar to the tradeoffs between using thread-relative static fields and data slots.

The `LocalDataStoreSlot` structure serves as a local store memory mechanism that threads and contexts can use to store thread-specific and context-specific data, respectively. The common language runtime allocates a multi-slot data store array to each process when it is created. The thread or context calls various functions to allocate a data slot in the data store, to store and retrieve a data value in the slot, and to free a data slot for reuse after the thread or context object expires.

The data slots are unique per thread or context; their values are not shared between the thread or context objects. Data slots can be allocated by a name or by an index number.

For more information about storing local data, see `Thread`. The `LocalDataStoreSlot` class is used with methods such as `Thread.AllocateNamedDataSlot` and `Thread.GetData`. It doesn't have any methods of its own that you need to use.

## LocalDataStoreSlot.Finalize() method

```csharp
~LocalDataStoreSlot ();
```

Ensures that resources are freed and other cleanup operations are performed when the garbage collector reclaims the `LocalDataStoreSlot` object.

#### Remarks
The garbage collector calls `LocalDataStoreSlot.Finalize` when the current object is ready to be finalized.
