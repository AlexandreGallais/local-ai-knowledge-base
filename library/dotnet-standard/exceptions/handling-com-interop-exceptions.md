---
title: "Handling COM Interop Exceptions"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/exceptions/handling-com-interop-exceptions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Handling COM Interop Exceptions

Managed and unmanaged code can work together to handle exceptions. If a method throws an exception in managed code, the common language runtime can pass an HRESULT to a COM object. If a method fails in unmanaged code by returning a failure HRESULT, the runtime throws an exception that can be caught by managed code.

 The runtime automatically maps the HRESULT from COM interop to more specific exceptions. For example, E_ACCESSDENIED becomes `System.UnauthorizedAccessException`, E_OUTOFMEMORY becomes `System.OutOfMemoryException`, and so on.

 If the HRESULT is a custom result or if it is unknown to the runtime, the runtime passes a generic `System.Runtime.InteropServices.COMException` to the client. The **ErrorCode** property of the **COMException** contains the HRESULT value.

## Working with IErrorInfo

 When an error is passed from COM to managed code, the runtime populates the exception object with error information. COM objects that support IErrorInfo and return HRESULTS provide this information to managed code exceptions. For example, the runtime maps the Description from the COM error to the exception's `System.Exception.Message` property. If the HRESULT provides no additional error information, the runtime fills many of the exception's properties with default values.

 If a method fails in unmanaged code, an exception can be passed to a managed code segment. The topic HRESULTS and Exceptions contains a table showing how HRESULTS map to runtime exception objects.

## See also

- Exceptions
