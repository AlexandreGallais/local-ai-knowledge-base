---
title: "Assembly location"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/assembly/location.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Assembly location

An assembly's location determines whether the common language runtime can locate it when referenced, and can also determine whether the assembly can be shared with other assemblies. You can deploy an assembly in the following locations:

- The application's directory or subdirectories.

     This is the most common location for deploying an assembly. The subdirectories of an application's root directory can be based on language or culture. If an assembly has information in the culture attribute, it must be in a subdirectory under the application directory with that culture's name.

- The global assembly cache.

     This is a machine-wide code cache that is installed wherever the common language runtime is installed. In most cases, if you intend to share an assembly with multiple applications, you should deploy it into the global assembly cache.

- On an HTTP server.

     An assembly deployed on an HTTP server must have a strong name; you point to the assembly in the codebase section of the application's configuration file.

## See also

- Create assemblies
- Global assembly cache
- How the runtime locates assemblies
