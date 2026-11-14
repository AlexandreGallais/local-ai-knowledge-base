---
title: "Default Marshalling for Objects (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/default-marshalling-for-objects.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Default Marshalling for Objects (part 2 of 2)

## Marshalling ByRef Variants

Although variants themselves can be passed by value or by reference, the `VT_BYREF` flag can also be used with any variant type to indicate that the contents of the variant are being passed by reference instead of by value. The difference between marshalling variants by reference and marshalling a variant with the `VT_BYREF` flag set can be confusing. The following illustration clarifies the differences:

Variants passed by value and by reference

**Default behavior for marshalling objects and variants by value**

- When passing objects from managed code to COM, the contents of the object are copied into a new variant created by the marshaller, using the rules defined in Marshalling Object to Variant. Changes made to the variant on the unmanaged side are not propagated back to the original object on return from the call.

- When passing variants from COM to managed code, the contents of the variant are copied to a newly created object, using the rules defined in Marshalling Variant to Object. Changes made to the object on the managed side are not propagated back to the original variant on return from the call.

**Default behavior for marshalling objects and variants by reference**

To propagate changes back to the caller, the parameters must be passed by reference. For example, you can use the `ref` keyword in C# (or `ByRef` in Visual Basic <example-value> code) to pass <example-value> by reference. In COM, reference parameters are passed using a pointer such as a **variant \***.

- When passing an object to COM by reference, the marshaller creates a new variant and copies the contents of the object reference into the variant before the call is made. The variant is passed to the unmanaged function where the user is free to change the contents of the variant. On return from the call, any changes made to the variant on the unmanaged side are propagated back to the original object. If the type of the variant differs from the type of the variant passed to the call, then the changes are propagated back to an object of a different type. That is, the type of the object passed into the call can differ from the type of the object returned from the call.

- When passing a variant to managed code by reference, the marshaller creates a new object and copies the contents of the variant into the object before making the call. A reference to the object is passed to the managed function, where the user is free to change the object. On return from the call, any changes made to the referenced object are propagated back to the original variant. If the type of the object differs from the type of the object passed in to the call, the type of the original variant is changed and the value is propagated back into the variant. Again, the type of the variant passed into the call can differ from the type of the variant returned from the call.

 **Default behavior for marshalling a variant with the VT_BYREF flag set**

- A variant being passed to managed code by value can have the `VT_BYREF` flag set to indicate that the variant contains a reference instead of a value. In this case, the variant is still marshalled to an object because the variant is being passed by value. The marshaller automatically dereferences the contents of the variant and copies it into a newly created object before making the call. The object is then passed into the managed function; however, on return from the call, the object is not propagated back into the original variant. Changes made to the managed object are lost.

  > **Caution:**
  > There is no way to change the value of a variant passed by value, even if the variant has the `VT_BYREF` flag set.

- A variant being passed to managed code by reference can also have the `VT_BYREF` flag set to indicate that the variant contains another reference. If it does, the variant is marshalled to a `ref` object because the variant is being passed by reference. The marshaller automatically dereferences the contents of the variant and copies it into a newly created object before making the call. On return from the call, the value of the object is propagated back to the reference within the original variant only if the object is the same type as the object passed in. That is, propagation does not change the type of a variant with the `VT_BYREF` flag set. If the type of the object is changed during the call, an `System.InvalidCastException` occurs on return from the call.

The following table summarizes the propagation rules for variants and objects.

|From|To|Changes propagated back|
|----------|--------|-----------------------------|
|**Variant**  *v*|**Object**  *o*|Never|
|**Object**  *o*|**Variant**  *v*|Never|
|**Variant**   ***\****  *pv*|**Ref Object**  *o*|Always|
|**Ref object**  *o*|**Variant**   ***\****  *pv*|Always|
|**Variant**  *v* **(VT_BYREF** *&#124;* **VT_\*)**|**Object**  *o*|Never|
|**Variant**  *v* **(VT_BYREF** *&#124;* **VT_)**|**Ref Object**  *o*|Only if the type has not changed.|

## See also

- Default Marshalling Behavior
- Blittable and Non-Blittable Types
- Directional Attributes
- Copying and Pinning
