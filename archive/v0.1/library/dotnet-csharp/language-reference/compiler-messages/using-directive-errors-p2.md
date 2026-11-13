---
title: "Resolve compiler errors and warnings related to using directives and namespace declarations (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/using-directive-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve compiler errors and warnings related to using directives and namespace declarations (part 2 of 2)

## Compilation unit and namespace declarations

The following errors relate to declarations in compilation units and namespaces:

- **CS0116**: *A namespace cannot directly contain members such as fields, methods, or statements.*
- **CS1022**: *Type or namespace definition, or end-of-file expected.*
- **CS1527**: *Elements defined in a namespace cannot be explicitly declared as private, protected, protected internal, or private protected.*
- **CS1671**: *A namespace declaration cannot have modifiers or attributes.*
- **CS7021**: *Cannot declare namespace in script code.*
- **CS9348**: *A compilation unit cannot directly contain members such as fields, methods, or properties.*

See the namespace keyword and General Structure of a C# Program language reference for the rules that govern these diagnostics. Potential fixes include:

- Ensure all methods, fields, and properties are declared inside a type (class, struct, record, or interface) rather than directly inside a namespace, because namespaces can only contain type declarations, nested namespaces, and `using` directives (**CS0116**).
- Move fields, properties, events, indexers, operators, and member methods into a class, struct, record, or interface (**CS9348**). At compilation-unit scope, executable code can be a top-level statement in the global namespace, and a method-shaped declaration is a local function rather than a member method.
- Check for mismatched braces in your source file, because an extra closing brace after a namespace or type definition produces an error when the compiler encounters unexpected content at the end of the file (**CS1022**).
- Change a namespace-level type's accessibility to `public` or `internal`, or omit the access modifier to use the default `internal` accessibility (**CS1527**). Types declared without an explicit namespace are members of the global namespace, so the same restriction applies.
- Remove any access modifiers or attributes from namespace declarations, because namespaces don't support modifiers like `public` or `private`, and attributes can't be applied to them (**CS1671**).
- Move namespace declarations out of C# script files (`.csx`) and into regular source files (`.cs`), because script code evaluates in a single execution context that doesn't support namespace declarations (**CS7021**).

## Namespace and type naming conflicts

The following errors and warnings relate to naming conflicts between namespaces and types:

- **CS0101**: *The namespace 'namespace' already contains a definition for 'identifier'*
- **CS0104**: *'reference' is an ambiguous reference between 'identifier' and 'identifier'.*
- **CS0434**: *The namespace NamespaceName1 in NamespaceName2 conflicts with the type TypeName1 in NamespaceName3.*
- **CS0435**: *The namespace 'namespace' in 'assembly' conflicts with the imported type 'type' in 'assembly'. Using the namespace defined in 'assembly'.*
- **CS0436**: *The type 'type' in 'assembly' conflicts with the imported type 'type2' in 'assembly'. Using the type defined in 'assembly'.*
- **CS0437**: *The type 'type' in 'assembly2' conflicts with the imported namespace 'namespace' in 'assembly1'. Using the type defined in 'assembly'.*
- **CS0438**: *The type 'type' in 'module_1' conflicts with the namespace 'namespace' in 'module_2'.*

See the using directive, extern alias, and namespace alias qualifier language reference for the rules that govern these diagnostics. Potential fixes include:

- Use a fully qualified name or a namespace alias when your code references a name that exists in multiple imported namespaces.
- The compiler can't determine which type you intend to use when the same name appears in two or more namespaces imported by `using` directives (**CS0104**).
- Rename or remove a duplicate namespace member (**CS0101**). A namespace and a type also can't have the same fully qualified name, so rename either declaration when a type name conflicts with a nested namespace name.
- Rename either the type or the namespace when an imported type and an imported nested namespace share the same fully qualified name. The compiler can't distinguish between them when the name is referenced (**CS0434**, **CS0438**).

To resolve the naming conflict warnings, rename one of the conflicting declarations, use a different namespace, remove the unnecessary assembly reference, or use an extern alias to disambiguate between the two definitions. The compiler resolves these conflicts automatically - using the locally defined namespace over the imported type (**CS0435**), the locally defined type over the imported type (**CS0436**), or the locally defined type over the imported namespace (**CS0437**) - but the warnings indicate a potential source of confusion that you should address.

## Predefined type imports

The following error relates to missing predefined type definitions:

- **CS0518**: *Predefined type 'type' is not defined or imported.*

> **Note:**
> This warning is only reported during explicit **Build** or **Rebuild** operations. It does not appear during typing in the IDE as part of IntelliSense diagnostics. This means that if you fix the warning by using the field or removing it, the warning might persist in the error list until you build or rebuild the project again.

See the NoStandardLib compiler option language reference for the rules that govern this diagnostic.

Verify that your project targets the correct .NET runtime. Predefined types like `System.Int32` and `System.String` come from the runtime library. An incorrect or missing `<TargetFramework>` specification prevents the compiler from finding these types (**CS0518**). Ensure the `<TargetFramework>` property in your `.csproj` file specifies the intended runtime (for example, `net10.0`). Don't specify the **NoStandardLib** compiler option unless you intend to define your own `System` namespace. This option prevents importing the standard library that defines all predefined types (**CS0518**). If the error persists, try reloading the project in Visual Studio, deleting the `obj` and `bin` folders and rebuilding the project, or reinstalling the .NET runtime (**CS0518**).
