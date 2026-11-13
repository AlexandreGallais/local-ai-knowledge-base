---
title: "How to: Inspect assembly contents using MetadataLoadContext (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/assembly/inspect-contents-using-metadataloadcontext.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Inspect assembly contents using MetadataLoadContext (part 2 of 2)

## Create MetadataLoadContext

To create the `System.Reflection.MetadataLoadContext`, invoke its constructor `System.Reflection.MetadataLoadContext.#ctor(System.Reflection.MetadataAssemblyResolver,System.String)`, passing the previously created `System.Reflection.MetadataAssemblyResolver` as the first parameter and the core assembly name as the second parameter. You can omit the core assembly name, in which case the constructor will attempt to use default names: "mscorlib", "System.Runtime", or "netstandard".

After you've created the context, you can load assemblies into it using methods such as `System.Reflection.MetadataLoadContext.LoadFromAssemblyPath*`. You can use all reflection APIs on loaded assemblies except ones that involve code execution. The `System.Reflection.MemberInfo.GetCustomAttributes*` method does involve the execution of constructors, so use the `System.Reflection.MemberInfo.GetCustomAttributesData*` method instead when you need to examine custom attributes in the `System.Reflection.MetadataLoadContext`.

The following code sample creates `System.Reflection.MetadataLoadContext`, loads the assembly into it, and outputs assembly attributes into the console:

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

If you need to test types in `System.Reflection.MetadataLoadContext` for equality or assignability, only use type objects loaded into that context. Mixing `System.Reflection.MetadataLoadContext` types with runtime types is not supported. For example, consider a type `testedType` in `System.Reflection.MetadataLoadContext`. If you need to test whether another type is assignable from it, don't use code like `typeof(MyType).IsAssignableFrom(testedType)`. Use code like this instead:

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

## Example

For a complete code example, see the Inspect assembly contents using MetadataLoadContext sample.

## See also

- Reflection in .NET
