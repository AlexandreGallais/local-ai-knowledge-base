---
title: "How to: Inspect assembly contents using MetadataLoadContext (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/assembly/inspect-contents-using-metadataloadcontext.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Inspect assembly contents using MetadataLoadContext

The reflection API in .NET by default enables developers to inspect the contents of assemblies loaded into the main execution context. However, sometimes it isn't possible to load an assembly into the execution context, for example, because it was compiled for another platform or processor architecture, or it's a reference assembly. The `System.Reflection.MetadataLoadContext` API allows you to load and inspect such assemblies. Assemblies loaded into the `System.Reflection.MetadataLoadContext` are treated only as metadata, that is, you can examine types in the assembly, but you can't execute any code contained in it. Unlike the main execution context, the `System.Reflection.MetadataLoadContext` doesn't automatically load dependencies from the current directory; instead it uses the custom binding logic provided by the `System.Reflection.MetadataAssemblyResolver` passed to it.

## Prerequisites

To use `System.Reflection.MetadataLoadContext`, install the System.Reflection.MetadataLoadContext NuGet package. It is supported on any .NET Standard 2.0-compliant target framework, for example, .NET Core 2.0 or .NET Framework 4.6.1.

## Create MetadataAssemblyResolver for MetadataLoadContext

Creating the `System.Reflection.MetadataLoadContext` requires providing the instance of the `System.Reflection.MetadataAssemblyResolver`. The simplest way to provide one is to use the `System.Reflection.PathAssemblyResolver`, which resolves assemblies from the given collection of assembly path strings. This collection, besides assemblies you want to inspect directly, should also include all needed dependencies. For example, to read the custom attribute located in an external assembly, you should include that assembly or an exception will be thrown. In most cases, you should include at least the *core assembly*, that is, the assembly containing built-in system types, such as `System.Object`. The following code shows how to create the `System.Reflection.PathAssemblyResolver` using the collection consisting of the inspected assembly and the current runtime's core assembly:

```csharp
﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;

namespace AssemblySnippets
{
    static class MetadataLoadContextSnippets
    {
        public static void SnippetsResolver()
        {
            var resolver = new PathAssemblyResolver(new string[] { "ExampleAssembly.dll", typeof(object).Assembly.Location });
        }

        public static void SnippetsMetadataLoadContext()
        {
            // Get the array of runtime assemblies.
            string[] runtimeAssemblies = Directory.GetFiles(RuntimeEnvironment.GetRuntimeDirectory(), "*.dll");

            // Create the list of assembly paths consisting of runtime assemblies and the inspected assembly.
            var paths = new List<string>(runtimeAssemblies);
            paths.Add("ExampleAssembly.dll");

            // Create PathAssemblyResolver that can resolve assemblies using the created list.
            var resolver = new PathAssemblyResolver(paths);

            var mlc = new MetadataLoadContext(resolver);

            using (mlc)
            {
                // Load assembly into MetadataLoadContext.
                Assembly assembly = mlc.LoadFromAssemblyPath("ExampleAssembly.dll");
                AssemblyName name = assembly.GetName();

                // Print assembly attribute information.
                Console.WriteLine($"{name.Name} has following attributes: ");

                foreach (CustomAttributeData attr in assembly.GetCustomAttributesData())
                {
                    try
                    {
                        Console.WriteLine(attr.AttributeType);
                    }
                    catch (FileNotFoundException ex)
                    {
                        // We are missing the required dependency assembly.
                        Console.WriteLine($"Error while getting attribute type: {ex.Message}");
                    }
                }
            }
        }
        
        public static void SnippetsAssignability()
        {
            var resolver = new PathAssemblyResolver(new string[] { "ExampleAssembly.dll", typeof(object).Assembly.Location});
            var mlc = new MetadataLoadContext(resolver);
            
            using (mlc)
            {
                Assembly assembly = mlc.LoadFromAssemblyPath("ExampleAssembly.dll");
                Type testedType = assembly.GetType("ExampleType")!;
                
                Assembly matchAssembly = mlc.LoadFromAssemblyPath(typeof(MyType).Assembly.Location);
                Type matchType = assembly.GetType(typeof(MyType).FullName!)!;
                
                if (matchType.IsAssignableFrom(testedType))
                {
                    Console.WriteLine($"{nameof(matchType)} is assignable from {nameof(testedType)}");
                }
            }
        }
        
        class MyType{}
    }
}
```

If you need access to all BCL types, you can include all runtime assemblies in the collection. The following code shows how to create the `System.Reflection.PathAssemblyResolver` using the collection consisting of the inspected assembly and all assemblies of the current runtime:

```csharp
﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;

namespace AssemblySnippets
{
    static class MetadataLoadContextSnippets
    {
        public static void SnippetsResolver()
        {
            var resolver = new PathAssemblyResolver(new string[] { "ExampleAssembly.dll", typeof(object).Assembly.Location });
        }

        public static void SnippetsMetadataLoadContext()
        {
            // Get the array of runtime assemblies.
            string[] runtimeAssemblies = Directory.GetFiles(RuntimeEnvironment.GetRuntimeDirectory(), "*.dll");

            // Create the list of assembly paths consisting of runtime assemblies and the inspected assembly.
            var paths = new List<string>(runtimeAssemblies);
            paths.Add("ExampleAssembly.dll");

            // Create PathAssemblyResolver that can resolve assemblies using the created list.
            var resolver = new PathAssemblyResolver(paths);

            var mlc = new MetadataLoadContext(resolver);

            using (mlc)
            {
                // Load assembly into MetadataLoadContext.
                Assembly assembly = mlc.LoadFromAssemblyPath("ExampleAssembly.dll");
                AssemblyName name = assembly.GetName();

                // Print assembly attribute information.
                Console.WriteLine($"{name.Name} has following attributes: ");

                foreach (CustomAttributeData attr in assembly.GetCustomAttributesData())
                {
                    try
                    {
                        Console.WriteLine(attr.AttributeType);
                    }
                    catch (FileNotFoundException ex)
                    {
                        // We are missing the required dependency assembly.
                        Console.WriteLine($"Error while getting attribute type: {ex.Message}");
                    }
                }
            }
        }
        
        public static void SnippetsAssignability()
        {
            var resolver = new PathAssemblyResolver(new string[] { "ExampleAssembly.dll", typeof(object).Assembly.Location});
            var mlc = new MetadataLoadContext(resolver);
            
            using (mlc)
            {
                Assembly assembly = mlc.LoadFromAssemblyPath("ExampleAssembly.dll");
                Type testedType = assembly.GetType("ExampleType")!;
                
                Assembly matchAssembly = mlc.LoadFromAssemblyPath(typeof(MyType).Assembly.Location);
                Type matchType = assembly.GetType(typeof(MyType).FullName!)!;
                
                if (matchType.IsAssignableFrom(testedType))
                {
                    Console.WriteLine($"{nameof(matchType)} is assignable from {nameof(testedType)}");
                }
            }
        }
        
        class MyType{}
    }
}
```
