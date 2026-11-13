---
title: "Copying and Pinning"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/copying-and-pinning.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Copying and Pinning

When marshalling data, the interop marshaller can copy or pin the data being marshalled. Copying the data places a copy of data from one memory location in another memory location. The following illustration shows the differences between copying a value type and copying a type passed by reference from managed to unmanaged memory.

Method arguments passed by value are marshalled to unmanaged code as values on the stack. The copying process is direct. Arguments passed by reference are passed as pointers on the stack. Reference types are also passed by value and by reference. As the following illustration shows, reference types passed by value are either copied or pinned:

Pinning temporarily locks the data in its current memory location, thus keeping it from being relocated by the common language runtime's garbage collector. The marshaller pins data to reduce the overhead of copying and enhance performance. The type of the data determines whether it is copied or pinned during the marshalling process. Pinning is automatically performed during marshalling for objects such as `System.String`. However you can also manually pin memory using the `System.Runtime.InteropServices.GCHandle` class. For examples of manual pinning with `GCHandle`, see Keeping managed objects alive in the native interoperability best practices article.

## Formatted Blittable Classes

Formatted blittable classes have fixed layout (formatted) and common data representation in both managed and unmanaged memory. When these types require marshalling, a pointer to the object in the heap is passed to the callee directly. The callee can change the contents of the memory location being referenced by the pointer.

> **Note:**
> The callee can change the memory contents if the parameter is marked Out or In/Out. In contrast, the callee should avoid changing the contents when the parameter is set to marshal as In, which is the default for formatted blittable types. Modifying an In object generates problems when the same class is exported to a type library and used to make cross-apartment calls.

## Formatted Non-Blittable Classes

Formatted non-blittable classes have fixed layout (formatted) but the data representation is different in managed and unmanaged memory. The data can require transformation under the following conditions:

- If a non-blittable class is marshalled by value, the callee receives a pointer to a copy of the data structure.

- If a non-blittable class is marshalled by reference, the callee receives a pointer to a pointer to a copy of the data structure.

- If the `System.Runtime.InteropServices.InAttribute` attribute is set, this copy is always initialized with the instance's state, marshalling as necessary.

- If the `System.Runtime.InteropServices.OutAttribute` attribute is set, the state is always copied back to the instance on return, marshalling as necessary.

- If both `InAttribute` and `OutAttribute` are set, both copies are required. If either attribute is omitted, the marshaller can optimize by eliminating either copy.

## Reference Types

Reference types can be passed by value or by reference. When they are passed by value, a pointer to the type is passed on the stack. When passed by reference, a pointer to a pointer to the type is passed on the stack.

Reference types have the following conditional behavior:

- If a reference type is passed by value and it has members of non-blittable types, the types are converted twice:

  - When an argument is passed to the unmanaged side.

  - On return from the call.

  To avoid unnecessarily copying and conversion, these types are marshalled as In parameters. You must explicitly apply the `InAttribute` and `OutAttribute` attributes to an argument for the caller to see changes made by the callee.

- If a reference type is passed by value and it has only members of blittable types, it can be pinned during marshalling and any changes made to the members of the type by the callee are seen by the caller. Apply `InAttribute` and `OutAttribute` explicitly if you want this behavior. Without these directional attributes, the interop marshaller does not export directional information to the type library (it exports as In, which is the default) and this can cause problems with COM cross-apartment marshalling.

- If a reference type is passed by reference, it will be marshalled as In/Out by default.

## System.String and System.Text.StringBuilder

When data is marshalled to unmanaged code by value or by reference, the marshaller typically copies the data to a secondary buffer (possibly converting character sets during the copy) and passes a reference to the buffer to the callee. Unless the reference is a `BSTR` allocated with **SysAllocString**, the reference is always allocated with **CoTaskMemAlloc**.

As an optimization when either `System.String` or `System.Text.StringBuilder` is marshalled by value (such as a Unicode character string), the marshaller passes the callee a direct pointer to managed strings in the internal Unicode buffer instead of copying it to a new buffer.

> **Caution:**
> When a string is passed by value, the callee must never alter the reference passed by the marshaller. Doing so can corrupt the managed heap.

When a `System.String` is passed by reference, the marshaller copies the contents of the string to a secondary buffer before making the call. It then copies the contents of the buffer into a new string on return from the call. This technique ensures that the immutable managed string remains unaltered.

When a `System.Text.StringBuilder` is passed by value, the marshaller passes a reference to a temporary copy of the internal buffer of the `StringBuilder` to the caller. The caller and callee must agree on the size of the buffer. The caller is responsible for creating a `StringBuilder` of adequate length. The callee must take the necessary precautions to ensure that the buffer is not overrun. `StringBuilder` is an exception to the rule that reference types passed by value are passed as `In` parameters by default. `StringBuilder` is always passed as `In`/`Out`.

## See also

- Default Marshalling Behavior
- Directional Attributes
- Interop Marshaling
- Native interoperability best practices
- `fixed` statement (C# reference)
