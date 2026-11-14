---
title: "Register .NET Framework assemblies with COM"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/registering-assemblies-with-com.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Register .NET Framework assemblies with COM

> **Note:**
> This article describes .NET Framework COM interop guidance that uses the legacy Assembly Registration Tool (Regasm.exe), the global assembly cache, and registry-based COM registration. For modern .NET, use COM source generation or the `System.Runtime.InteropServices.ComWrappers` API. For more information, see COM interop.

You can run a command-line tool called the Assembly Registration Tool (Regasm.exe) to register or unregister a .NET Framework assembly for use with COM. Regasm.exe adds information about the class to the system registry so COM clients can use the .NET Framework class transparently. The `System.Runtime.InteropServices.RegistrationServices` class provides the equivalent functionality.

 For .NET Framework, a managed component must be registered in the Windows registry before it can be activated from a COM client. The following table shows the keys that Regasm.exe typically adds to the Windows registry. (000000 indicates the actual GUID value.)

|GUID|Description|Registry key|
|----------|-----------------|------------------|
|CLSID|Class identifier|HKEY_CLASSES_ROOT\CLSID\\{000…000}|
|IID|Interface identifier|HKEY_CLASSES_ROOT\Interface\\{000…000}|
|LIBID|Library identifier|HKEY_CLASSES_ROOT\TypeLib\\{000…000}|
|ProgID|Programmatic identifier|HKEY_CLASSES_ROOT\000…000|

 Under the HKCR\CLSID\\{0000…0000} key, the default value is set to the ProgID of the class, and two new named values, Class and Assembly, are added. The runtime reads the Assembly value from the registry and passes it on to the runtime assembly resolver. The assembly resolver attempts to locate the assembly, based on assembly information such as the name and version number. For the assembly resolver to locate an assembly, the assembly has to be in one of the following locations:

- The global assembly cache (must be a strong-named assembly).

- In the application directory. Assemblies loaded from the application path are only accessible from that application.

- Along an file path specified with the **/codebase** option to Regasm.exe.

 Regasm.exe also creates the InProcServer32 key under the HKCR\CLSID\\{0000…0000} key. The default value for the key is set to the name of the DLL that initializes the common language runtime (Mscoree.dll).

## Examine registry entries

 COM interop in .NET Framework provides a standard class factory implementation to create an instance of any .NET Framework class. Clients can call `DllGetClassObject` on the managed DLL to get a class factory and create objects, just as they would with any other COM component.

 For the `InprocServer32` subkey, a reference to Mscoree.dll appears in place of a traditional COM type library to indicate that the common language runtime creates the managed object.

## See also

- Expose .NET components to COM
- Reference .NET types from COM
- Calling a .NET Object
- Deploying an Application for COM Access
