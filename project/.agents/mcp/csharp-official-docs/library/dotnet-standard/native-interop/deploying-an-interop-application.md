---
title: "Deploy an interop application"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/deploying-an-interop-application.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Deploy an interop application

> **Note:**
> This article describes .NET Framework COM interop guidance that uses legacy tools and deployment models, such as Tlbimp.exe, primary interop assemblies, the global assembly cache, and registry-based COM registration. For modern .NET, use COM source generation or the `System.Runtime.InteropServices.ComWrappers` API. For more information, see COM interop.

An interop application typically includes a .NET client assembly, one or more interop assemblies representing distinct COM type libraries, and one or more registered COM components. Visual Studio and the Windows SDK provide tools to import and convert a type library to an interop assembly, as discussed in Import a type library as an assembly. There are two ways to deploy an interop application:

- By using embedded interop types: Instruct the compiler to embed type information from an interop assembly into your executable. The compiler embeds only the type information that your application uses. You do not have to deploy the interop assembly with your application. This is the recommended technique.
- By deploying interop assemblies: Create a standard reference to an interop assembly. In this case, the interop assembly must be deployed with your application. If you employ this technique, and you are not using a private COM component, always reference the primary interop assembly (PIA) published by the author of the COM component you intend to incorporate in your managed code.

 If you use embedded interop types, deployment is simple and straightforward. There is nothing special you need to do. The rest of this article describes the scenarios for deploying interop assemblies with your application.

## Deploying Interop Assemblies

 Assemblies can have strong names. A strong-named assembly includes the publisher's public key, which provides a unique identity. Assemblies that are produced by the Type Library Importer (Tlbimp.exe) can be signed by the publisher by using the **/keyfile** option. You can install signed assemblies into the global assembly cache. Unsigned assemblies must be installed on the user's machine as private assemblies.

### Private Assemblies

 To install an assembly to be used privately, both the application executable and the interop assembly that contains imported COM types must be installed in the same directory structure. The following illustration shows an unsigned interop assembly to be used privately by Client1.exe and Client2.exe, which reside in separate application directories. The interop assembly, which is called LOANLib.dll in this example, is installed twice.

 All COM components associated with the application must be installed in the Windows registry. If Client1.exe and Client2.exe in the illustration are installed on different computers, you must register the COM components on both computers.

### Shared Assemblies

 Assemblies that are shared by multiple applications should be installed in a centralized repository called the global assembly cache. .NET clients can access the same copy of the interop assembly, which is signed and installed in the global assembly cache. For more information about producing and using primary interop assemblies, see Primary Interop Assemblies.

## See also

- Expose COM components to .NET
- Import a type library as an assembly
- Using COM Types in Managed Code
- Compile an interop project
