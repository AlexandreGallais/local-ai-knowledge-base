---
title: "Package and deploy resources in .NET apps (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/package-and-deploy-resources.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Package and deploy resources in .NET apps (part 2 of 3)

## The resource fallback process

The hub and spoke model for packaging and deploying resources uses a fallback process to locate appropriate resources. If an application requests a localized resource that's unavailable, the common language runtime searches the hierarchy of cultures for an appropriate fallback resource that most closely matches the user's application's request, and throws an exception only as a last resort. At each level of the hierarchy, if an appropriate resource is found, the runtime uses it. If the resource is not found, the search continues at the next level.

To improve lookup performance, apply the `System.Resources.NeutralResourcesLanguageAttribute` attribute to your main assembly, and pass it the name of the neutral language that will work with your main assembly.

### .NET Framework resource fallback process

The .NET Framework resource fallback process involves the following steps:

> **Tip:**
> You may be able to use the \<relativeBindForResources> configuration element to optimize the resource fallback process and the process by which the runtime probes for resource assemblies. For more information, see Optimizing the resource fallback process.

1. The runtime first checks the global assembly cache for an assembly that matches the requested culture for your application.

     The global assembly cache can store resource assemblies that are shared by many applications. This frees you from having to include specific sets of resources in the directory structure of every application you create. If the runtime finds a reference to the assembly, it searches the assembly for the requested resource. If it finds the entry in the assembly, it uses the requested resource. If it doesn't find the entry, it continues the search.

2. The runtime next checks the directory of the currently executing assembly for a subdirectory that matches the requested culture. If it finds the subdirectory, it searches that subdirectory for a valid satellite assembly for the requested culture. The runtime then searches the satellite assembly for the requested resource. If it finds the resource in the assembly, it uses it. If it doesn't find the resource, it continues the search.

3. The runtime next queries the Windows Installer to determine whether the satellite assembly is to be installed on demand. If so, it handles the installation, loads the assembly, and searches it or the requested resource. If it finds the resource in the assembly, it uses it. If it doesn't find the resource, it continues the search.

4. The runtime raises the `System.AppDomain.AssemblyResolve` event to indicate that it is unable to find the satellite assembly. If you choose to handle the event, your event handler can return a reference to the satellite assembly whose resources will be used for the lookup. Otherwise, the event handler returns `null` and the search continues.

5. The runtime next searches the global assembly cache again, this time for the parent assembly of the requested culture. If the parent assembly exists in the global assembly cache, the runtime searches the assembly for the requested resource.

     The parent culture is defined as the appropriate fallback culture. Consider parents as fallback candidates, because providing any resource is preferable to throwing an exception. This process also allows you to reuse resources. You should include a particular resource at the parent level only if the child culture doesn't need to localize the requested resource. For example, if you supply satellite assemblies for `en` (neutral English), `en-GB` (English as spoken in the United Kingdom), and `en-US` (English as spoken in the United States), the `en` satellite would contain the common terminology, and the `en-GB` and `en-US` satellites could provide overrides for only those terms that differ.

6. The runtime next checks the directory of the currently executing assembly to see if it contains a parent directory. If a parent directory exists, the runtime searches the directory for a valid satellite assembly for the parent culture. If it finds the assembly, the runtime searches the assembly for the requested resource. If it finds the resource, it uses it. If it doesn't find the resource, it continues the search.

7. The runtime next queries the Windows Installer to determine whether the parent satellite assembly is to be installed on demand. If so, it handles the installation, loads the assembly, and searches it or the requested resource. If it finds the resource in the assembly, it uses it. If it doesn't find the resource, it continues the search.

8. The runtime raises the `System.AppDomain.AssemblyResolve` event to indicate that it is unable to find an appropriate fallback resource. If you choose to handle the event, your event handler can return a reference to the satellite assembly whose resources will be used for the lookup. Otherwise, the event handler returns `null` and the search continues.

9. The runtime next searches parent assemblies, as in the previous three steps, through many potential levels. Each culture has only one parent, which is defined by the `System.Globalization.CultureInfo.Parent` property, but a parent might have its own parent. The search for parent cultures stops when a culture's `System.Globalization.CultureInfo.Parent` property returns `System.Globalization.CultureInfo.InvariantCulture`; for resource fallback, the invariant culture is not considered a parent culture or a culture that can have resources.

10. If the culture that was originally specified and all parents have been searched and the resource is still not found, the resource for the default (fallback) culture is used. Typically, the resources for the default culture are included in the main application assembly. However, you can specify a value of `System.Resources.UltimateResourceFallbackLocation.Satellite` for the `System.Resources.NeutralResourcesLanguageAttribute.Location` property of the `System.Resources.NeutralResourcesLanguageAttribute` attribute to indicate that the ultimate fallback location for resources is a satellite assembly, rather than the main assembly.

    > **Note:**
    > The default resource is the only resource that can be compiled with the main assembly. Unless you specify a satellite assembly by using the `System.Resources.NeutralResourcesLanguageAttribute` attribute, it is the ultimate fallback (final parent). Therefore, we recommend that you always include a default set of resources in your main assembly. This helps prevent exceptions from being thrown. By including a default resource, file you provide a fallback for all resources and ensure that at least one resource is always present for the user, even if it is not culturally specific.

11. Finally, if the runtime doesn't find a resource for a default (fallback) culture, a `System.Resources.MissingManifestResourceException` or `System.Resources.MissingSatelliteAssemblyException` exception is thrown to indicate that the resource could not be found.

For example, suppose the application requests a resource localized for Spanish (Mexico) (the `es-MX` culture). The runtime first searches the global assembly cache for the assembly that matches `es-MX`, but doesn't find it. The runtime then searches the directory of the currently executing assembly for an `es-MX` directory. Failing that, the runtime searches the global assembly cache again for a parent assembly that reflects the appropriate fallback culture — in this case, `es` (Spanish). If the parent assembly is not found, the runtime searches all potential levels of parent assemblies for the `es-MX` culture until it finds a corresponding resource. If a resource isn't found, the runtime uses the resource for the default culture.

#### Optimize the .NET Framework resource fallback process

Under the following conditions, you can optimize the process by which the runtime searches for resources in satellite assemblies:

- Satellite assemblies are deployed in the same location as the code assembly. If the code assembly is installed in the Global Assembly Cache, satellite assemblies are also installed in the global assembly cache. If the code assembly is installed in a directory, satellite assemblies are installed in culture-specific folders of that directory.

- Satellite assemblies are not installed on demand.

- Application code does not handle the `System.AppDomain.AssemblyResolve` event.

You optimize the probe for satellite assemblies by including the \<relativeBindForResources> element and setting its `enabled` attribute to `true` in the application configuration file, as shown in the following example.

```xml
<configuration>
   <runtime>
      <relativeBindForResources enabled="true" />
   </runtime>
</configuration>
```

The optimized probe for satellite assemblies is an opt-in feature. That is, the runtime follows the steps documented in The resource fallback process unless the \<relativeBindForResources> element is present in the application's configuration file and its `enabled` attribute is set to `true`. If this is the case, the process of probing for a satellite assembly is modified as follows:

- The runtime uses the location of the parent code assembly to probe for the satellite assembly. If the parent assembly is installed in the global assembly cache, the runtime probes in the cache but not in the application's directory. If the parent assembly is installed in an application directory, the runtime probes in the application directory but not in the global assembly cache.

- The runtime doesn't query the Windows Installer for on-demand installation of satellite assemblies.

- If the probe for a particular resource assembly fails, the runtime does not raise the `System.AppDomain.AssemblyResolve` event.

### .NET Core resource fallback process

The .NET Core resource fallback process involves the following steps:

1. The runtime attempts to load a satellite assembly for the requested culture.
     - Checks the directory of the currently executing assembly for a subdirectory that matches the requested culture. If it finds the subdirectory, it searches that subdirectory for a valid satellite assembly for the requested culture and loads it.

       > **Note:**
       > On operating systems with case-sensitive file systems (that is, Linux and macOS), the culture name subdirectory search is case-sensitive. The subdirectory name must exactly match the case of the `System.Globalization.CultureInfo.Name` (for example, `es` or `es-MX`).

       > **Note:**
       > If the programmer has derived a custom assembly load context from `System.Runtime.Loader.AssemblyLoadContext`, the situation is complicated. If the executing assembly was loaded into the custom context, the runtime loads the satellite assembly into the custom context. The details are out of scope for this document. See  `System.Runtime.Loader.AssemblyLoadContext`.

     - If a satellite assemble has not been found, the `System.Runtime.Loader.AssemblyLoadContext` raises the `System.Runtime.Loader.AssemblyLoadContext.Resolving` event to indicate that it is unable to find the satellite assembly. If you choose to handle the event, your event handler can load and return a reference to the satellite assembly.
     - If a satellite assembly still has not been found, the AssemblyLoadContext causes the AppDomain to trigger an `System.AppDomain.AssemblyResolve` event to indicate that it is unable to find the satellite assembly. If you choose to handle the event, your event handler can load and return a reference to the satellite assembly.

2. If a satellite assembly is found, the runtime searches it for the requested resource. If it finds the resource in the assembly, it uses it. If it doesn't find the resource, it continues the search.

     > **Note:**
     > To find a resource within the satellite assembly, the runtime searches for the resource file requested by the `System.Resources.ResourceManager` for the current `System.Globalization.CultureInfo.Name`. Within the resource file it searches for the requested resource name. If either is not found, the resource is treated as not found.

3. The runtime next searches the parent culture assemblies through many potential levels, each time repeating steps 1 & 2.

     The parent culture is defined as an appropriate fallback culture. Consider parents as fallback candidates, because providing any resource is preferable to throwing an exception. This process also allows you to reuse resources. You should include a particular resource at the parent level only if the child culture doesn't need to localize the requested resource. For example, if you supply satellite assemblies for `en` (neutral English), `en-GB` (English as spoken in the United Kingdom), and `en-US` (English as spoken in the United States), the `en` satellite contains the common terminology, and the `en-GB` and `en-US` satellites provides overrides for only those terms that differ.

     Each culture has only one parent, which is defined by the `System.Globalization.CultureInfo.Parent` property, but a parent might have its own parent. The search for parent cultures stops when a culture's `System.Globalization.CultureInfo.Parent` property returns `System.Globalization.CultureInfo.InvariantCulture`. For resource fallback, the invariant culture is not considered a parent culture or a culture that can have resources.

4. If the culture that was originally specified and all parents have been searched and the resource is still not found, the resource for the default (fallback) culture is used. Typically, the resources for the default culture are included in the main application assembly. However, you can specify a value of `System.Resources.UltimateResourceFallbackLocation.Satellite` for the `System.Resources.NeutralResourcesLanguageAttribute.Location` property to indicate that the ultimate fallback location for resources is a satellite assembly rather than the main assembly.

    > **Note:**
    > The default resource is the only resource that can be compiled with the main assembly. Unless you specify a satellite assembly by using the `System.Resources.NeutralResourcesLanguageAttribute` attribute, it is the ultimate fallback (final parent). Therefore, we recommend that you always include a default set of resources in your main assembly. This helps prevent exceptions from being thrown. By including a default resource file, you provide a fallback for all resources and ensure that at least one resource is always present for the user, even if it is not culturally specific.

5. Finally, if the runtime doesn't find a resource file for a default (fallback) culture, a `System.Resources.MissingManifestResourceException` or `System.Resources.MissingSatelliteAssemblyException` exception is thrown to indicate that the resource could not be found. If the resource file is found but the requested resource is not present the request returns `null`.
