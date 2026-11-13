---
title: "Resolve errors for incorrect or missing assembly references"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/assembly-references.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to assembly references

- **CS0012**: *The type 'type' is defined in an assembly that is not referenced. You must add a reference to assembly 'assembly'.*
- **CS0234**: *The type or namespace name does not exist in the namespace (are you missing an assembly reference?)*
- **CS0246**: *The type or namespace name could not be found (are you missing a using directive or an assembly reference?)*
- **CS0400**: *The type or namespace name could not be found in the global namespace (are you missing an assembly reference?)*
- **CS1068**: *The type name could not be found in the global namespace. This type has been forwarded to another assembly. Consider adding a reference to that assembly.*
- **CS1069**: *The type name could not be found in the namespace. This type has been forwarded to another assembly. Consider adding a reference to that assembly.*
- **CS1070**: *The type name could not be found. This type has been forwarded to another assembly. Consider adding a reference to that assembly.*
- **CS1704**: *An assembly with the same simple name has already been imported. Try removing one of the references or sign them to enable side-by-side.*
- **CS1714**: *The base class or interface of this type could not be resolved or is invalid.*
- **CS1760**: *Multiple assemblies refer to the same metadata but only one is a linked reference (specified using /link option); consider removing one of the references.*
- **CS7008**: *The assembly name is reserved and cannot be used as a reference in an interactive session.*
- **CS7068**: *Reference to type claims it is defined in this assembly, but it is not defined in source or any added modules.*
- **CS7069**: *Reference to type claims it is defined in another assembly, but it could not be found.*
- **CS7071**: *Assembly reference is invalid and cannot be resolved.*
- **CS7079**: *The type is defined in a module that has not been added. You must add the module.*
- **CS8090**: *There is an error in a referenced assembly.*
- **CS8203**: *Invalid assembly name.*
- **CS8206**: *Module 'module name' in assembly 'assembly name' is forwarding the type 'type name' to multiple assemblies: 'first assembly name' and 'second assembly name'.*
- **CS8356**: *Predefined type 'type name' is declared in multiple referenced assemblies: 'first assembly name' and 'second assembly name'*
- **CS9286**: *Type does not contain a definition and no accessible extension member for receiver type could be found (are you missing a using directive or an assembly reference?)*

In addition, this article covers the following warnings:

- **CS1683**: *Reference to type 'Type Name' claims it is defined in this assembly, but it is not defined in source or any added modules.*

## Missing references

The following errors and warnings indicate that you're missing an assembly reference:

- **CS0012**: *The type 'type' is defined in an assembly that is not referenced. You must add a reference to assembly 'assembly'.*
- **CS0234**: *The type or namespace name does not exist in the namespace (are you missing an assembly reference?)*
- **CS0246**: *The type or namespace name could not be found (are you missing a using directive or an assembly reference?)*
- **CS1714**: *The base class or interface of this type could not be resolved or is invalid.*
- **CS9286**: *Type does not contain a definition and no accessible extension member for receiver type could be found (are you missing a using directive or an assembly reference?)*

These compiler errors indicate one of these problems in your code:

- The project doesn't reference the required assembly. To fix this error, add a reference to the required assembly.
- You misspelled the name of a type. Check the name of the type.
- You used a variable name where the name of a `System.Type` was expected, such as in the `typeof` operator or the `is` operator.
- You used the global scope operator, (`::`) when the type isn't in the global namespace.
- You're accessing an extension member and either the namespace isn't specified in a `using` directive, or you're not referencing the assembly that contains the extension.

### When the assembly appears to be referenced

If the assembly appears to be referenced in your project but you still receive CS0012, try these troubleshooting steps:

- Restore packages: Run `dotnet restore` to ensure all package references are properly resolved, especially after installing or uninstalling NuGet packages.

- Clear the NuGet package cache and restore:

   ```console
   dotnet nuget locals all --clear
   dotnet restore
   ```

- Check for version conflicts: Verify that all referenced assemblies use compatible versions. Look for binding redirect warnings in the build output.

- Clean the solution and rebuild to ensure no stale references remain:

   ```console
   dotnet clean
   dotnet build
   ```

- Verify package integrity: If the error occurred after package operations, ensure the package was installed correctly by removing and reinstalling it:

   ```console
   dotnet remove package [PackageName]
   dotnet add package [PackageName]
   ```

## Type forwarding

- **CS1068**: *The type name could not be found in the global namespace. This type has been forwarded to another assembly. Consider adding a reference to that assembly.*
- **CS1069**: *The type name could not be found in the namespace. This type has been forwarded to another assembly. Consider adding a reference to that assembly.*
- **CS1070**: *The type name could not be found. This type has been forwarded to another assembly. Consider adding a reference to that assembly.*
- **CS8206**: *Module 'module name' in assembly 'assembly name' is forwarding the type 'type name' to multiple assemblies: 'first assembly name' and 'second assembly name'.*

CS1068, CS1069, and CS1070 indicate an error referencing a type forwarded to a different assembly. Add a reference to the assembly indicated in the error message.

CS8206 indicates conflicting type-forwarder metadata in a referenced assembly or module. The same type is forwarded to more than one destination assembly. Use corrected or rebuilt dependencies that forward the type to one destination. Ensure package and assembly versions are consistent, or remove the reference that introduces the conflicting metadata. Source aliases or unrelated changes to local type declarations don't correct the referenced metadata.

## Duplicate references

The following errors indicate a duplicate assembly reference:

- **CS1704**: *An assembly with the same simple name has already been imported. Try removing one of the references or sign them to enable side-by-side.*
- **CS1760**: *Multiple assemblies refer to the same metadata but only one is a linked reference (specified using /link option); consider removing one of the references.*
- **CS8356**: *Predefined type 'type name' is declared in multiple referenced assemblies: 'first assembly name' and 'second assembly name'*

To fix these errors, remove one of the references or resolve the duplication. Causes for duplication include:

- Multiple unsigned assemblies with the same name.
- Your project references multiple versions of the same assembly.

For CS8356, remove or replace the duplicate or incompatible reference that defines the same predefined runtime type. Ensure the project targets one coherent framework and reference-assembly set. Don't add another source definition of the predefined type.

## Invalid assembly reference

The following errors indicate that an assembly reference is invalid:

- **CS7008**: *The assembly name is reserved and cannot be used as a reference in an interactive session.*
- **CS7068**: *Reference to type claims it is defined in this assembly, but it is not defined in source or any added modules.*
- **CS7069**: *Reference to type claims it is defined in another assembly, but it could not be found.*
- **CS7071**: *Assembly reference is invalid and cannot be resolved.*
- **CS7079**: *The type is defined in a module that has not been added. You must add the module.*
- **CS8090**: *There is an error in a referenced assembly.*
- **CS8203**: *Invalid assembly name.*

The following warning also indicates an invalid reference assembly:

- **CS1683**: *Reference to type 'Type Name' claims it is defined in this assembly, but it is not defined in source or any added modules*

Check that you spelled the assembly name correctly. The referenced assembly file might be invalid.
