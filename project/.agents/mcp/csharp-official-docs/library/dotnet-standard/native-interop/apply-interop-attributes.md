---
title: "Applying Interop Attributes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/apply-interop-attributes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Apply interop attributes

The `System.Runtime.InteropServices` namespace provides three categories of interop-specific attributes: those applied by you at design time, those applied by COM interop tools and APIs during the conversion process, and those applied either by you or COM interop.

 If you are unfamiliar with the task of applying attributes to managed code, see Extending Metadata Using Attributes. Like other custom attributes, you can apply interop-specific attributes to types, methods, properties, parameters, fields, and other members.

## Design-Time Attributes

 You can adjust the outcome of the conversion process performed by COM interop tools and APIs by using design-time attributes. The following table describes the attributes that you can apply to your managed source code. COM interop tools, on occasion, might also apply the attributes described in this table.

|Attribute|Description|
|---------------|-----------------|
|`System.Runtime.InteropServices.AutomationProxyAttribute`|Specifies whether the type should be marshalled using the Automation marshaller or a custom proxy and stub.|
|`System.Runtime.InteropServices.ClassInterfaceAttribute`|Controls the type of interface generated for a class.|
|`System.Runtime.InteropServices.CoClassAttribute`|Identifies the CLSID of the original coclass imported from a type library. COM interop tools typically apply this attribute.|
|`System.Runtime.InteropServices.ComImportAttribute`|Indicates that a coclass or interface definition was imported from a COM type library. The runtime uses this flag to know how to activate and marshal the type. This attribute prohibits the type from being exported back to a type library. COM interop tools typically apply this attribute.|
|`System.Runtime.InteropServices.ComRegisterFunctionAttribute`|Indicates that a method should be called when the assembly is registered for use from COM, so that user-written code can be executed during the registration process.|
|`System.Runtime.InteropServices.ComSourceInterfacesAttribute`|Identifies interfaces that are sources of events for the class. COM interop tools can apply this attribute.|
|`System.Runtime.InteropServices.ComUnregisterFunctionAttribute`|Indicates that a method should be called when the assembly is unregistered from COM, so that user-written code can execute during the process.|
|`System.Runtime.InteropServices.ComVisibleAttribute`|Renders types invisible to COM when the attribute value equals **false**. This attribute can be applied to an individual type or to an entire assembly to control COM visibility. By default, all managed, public types are visible; the attribute is not needed to make them visible.|
|`System.Runtime.InteropServices.DispIdAttribute`|Specifies the COM dispatch identifier (DISPID) of a method or field. This attribute contains the DISPID for the method, field, or property it describes. COM interop tools can apply this attribute.|
|`System.Runtime.InteropServices.ComDefaultInterfaceAttribute`|Indicates the default interface for a COM class implemented in .NET. COM interop tools can apply this attribute.|
|`System.Runtime.InteropServices.FieldOffsetAttribute`|Indicates the physical position of each field within a class when used with the **StructLayoutAttribute**, and the **LayoutKind** is set to Explicit.|
|`System.Runtime.InteropServices.GuidAttribute`|Specifies the globally unique identifier (GUID) of a class, interface, or an entire type library. The string passed to the attribute must be a format that is an acceptable constructor argument for the type **System.Guid**. COM interop tools can apply this attribute.|
|`System.Runtime.InteropServices.IDispatchImplAttribute`|Indicates which **IDispatch** interface implementation the common language runtime uses when exposing dual interfaces and dispinterfaces to COM.|
|`System.Runtime.InteropServices.InAttribute`|Indicates that data should be marshalled in to the caller. Can be used to attribute parameters.|
|`System.Runtime.InteropServices.InterfaceTypeAttribute`|Controls how a managed interface is exposed to COM clients (Dual, IUnknown-derived, or IDispatch only). COM interop tools can apply this attribute.|
|`System.Runtime.InteropServices.LCIDConversionAttribute`|Indicates that an unmanaged method signature expects an LCID parameter. COM interop tools can apply this attribute.|
|`System.Runtime.InteropServices.MarshalAsAttribute`|Indicates how the data in fields or parameters should be marshalled between managed and unmanaged code. The attribute is always optional because each data type has default marshalling behavior. COM interop tools can apply this attribute.|
|`System.Runtime.InteropServices.OptionalAttribute`|Indicates that a parameter is optional. COM interop tools can apply this attribute.|
|`System.Runtime.InteropServices.OutAttribute`|Indicates that the data in a field or parameter must be marshalled from a called object back to its caller.|
|`System.Runtime.InteropServices.PreserveSigAttribute`|Suppresses the HRESULT or retval signature transformation that normally takes place during interoperation calls. The attribute affects marshalling as well as type library exporting. COM interop tools can apply this attribute.|
|`System.Runtime.InteropServices.ProgIdAttribute`|Specifies the ProgID of a .NET class. Can be used to attribute classes.|
|`System.Runtime.InteropServices.StructLayoutAttribute`|Controls the physical layout of the fields of a class. For managed fixed-size buffers, see Fixed-size buffers and inline arrays and `System.Runtime.CompilerServices.InlineArrayAttribute`. COM interop tools can apply this attribute.|

## Conversion-Tool Attributes

 The following table describes attributes that COM interop tools apply during the conversion process. You do not apply these attributes at design time.

|Attribute|Description|
|---------------|-----------------|
|`System.Runtime.InteropServices.ComAliasNameAttribute`|Indicates the COM alias for a parameter or field type. Can be used to attribute parameters, fields, or return values.|
|`System.Runtime.InteropServices.ComConversionLossAttribute`|Indicates that information about a class or interface was lost when it was imported from a type library to an assembly.|
|`System.Runtime.InteropServices.ComEventInterfaceAttribute`|Identifies the source interface and the class that implements the methods of the event interface.|
|`System.Runtime.InteropServices.ImportedFromTypeLibAttribute`|Indicates that the assembly was originally imported from a COM type library. This attribute contains the type library definition of the original type library.|
|`System.Runtime.InteropServices.TypeLibFuncAttribute`|Contains the **FUNCFLAGS** that were originally imported for this function from the COM type library.|
|`System.Runtime.InteropServices.TypeLibTypeAttribute`|Contains the **TYPEFLAGS** that were originally imported for this type from the COM type library.|
|`System.Runtime.InteropServices.TypeLibVarAttribute`|Contains the **VARFLAGS** that were originally imported for this variable from the COM type library.|

## See also

- `System.Runtime.InteropServices`
- Exposing .NET Framework Components to COM
- Attributes
- Qualifying .NET Types for Interoperation
- Packaging a .NET Framework Assembly for COM
