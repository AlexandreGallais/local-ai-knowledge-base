---
title: "Resolve compiler errors and warnings related to using directives and namespace declarations (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/using-directive-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to using directives and namespace declarations

This article covers the following compiler errors:

- **CS0101**: *Error: The namespace 'namespace' already contains a definition for 'identifier'*
- **CS0104**: *Error: 'reference' is an ambiguous reference between 'identifier' and 'identifier'.*
- **CS0116**: *Error: A namespace cannot directly contain members such as fields, methods or statements.*
- **CS0138**: *Error: A using namespace directive can only be applied to namespaces; 'type' is a type not a namespace.*
- **CS0430**: *Error: The extern alias 'alias' was not specified in a /reference option.*
- **CS0431**: *Error: Cannot use alias 'identifier' with `::` since the alias references a type. Use `.` instead*.
- **CS0432**: *Error: Alias 'identifier' not found.*
- **CS0434**: *Error: The namespace NamespaceName1 in NamespaceName2 conflicts with the type TypeName1 in NamespaceName3.*
- **CS0438**: *Error: The type 'type' in 'module_1' conflicts with the namespace 'namespace' in 'module_2'.*
- **CS0439**: *Error: An extern alias declaration must precede all other elements defined in the namespace.*
- **CS0518**: *Error: Predefined type 'type' is not defined or imported.*
- **CS0576**: *Error: Namespace 'namespace' contains a definition conflicting with alias 'identifier'.*
- **CS0687**: *Error: The namespace alias qualifier `::` always resolves to a type or namespace so is illegal here. Consider using `.` instead.*
- **CS1022**: *Error: Type or namespace definition, or end-of-file expected.*
- **CS1527**: *Error: Elements defined in a namespace cannot be explicitly declared as private, protected, protected internal, or private protected*
- **CS1529**: *Error: A using clause must precede all other elements defined in the namespace except extern alias declarations.*
- **CS1537**: *Error: The using alias 'alias' appeared previously in this namespace.*
- **CS1671**: *Error: A namespace declaration cannot have modifiers or attributes.*
- **CS1679**: *Error: Invalid extern alias for '/reference'; 'identifier' is not a valid identifier.*
- **CS1680**: *Error: Invalid reference alias option: 'alias=' -- missing filename.*
- **CS1681**: *Error: You cannot redefine the global extern alias.*
- **CS1730**: *Error: Assembly and module attributes must precede all other elements defined in a file except using clauses and extern alias declarations.*
- **CS2034**: *Error: A /reference option that declares an extern alias can only have one filename. To specify multiple aliases or filenames, use multiple /reference options.*
- **CS7000**: *Error: Unexpected use of an aliased name.*
- **CS7007**: *Error: A `using static` directive can only be applied to types. Consider a `using namespace` directive instead.*
- **CS7015**: *Error: 'extern alias' is not valid in this context.*
- **CS7016**: *Error: Alias 'alias' conflicts with symbol-kind definition*
- **CS7021**: *Error: Cannot declare namespace in script code.*
- **CS8083**: *Error: An alias-qualified name is not an expression.*
- **CS8085**: *Error: A 'using static' directive cannot be used to declare an alias.*
- **CS8914**: *Error: A global using directive cannot be used in a namespace declaration.*
- **CS8915**: *Error: A global using directive must precede all non-global using directives.*
- **CS8954**: *Error: Source file can only contain one file-scoped namespace declaration.*
- **CS8955**: *Error: Source file can not contain both file-scoped and normal namespace declarations.*
- **CS8956**: *Error: File-scoped namespace must precede all other members in a file.*
- **CS9130**: *Error: Using alias cannot be a `ref` type.*
- **CS9131**: *Error: Only a using alias can be `unsafe`.*
- **CS9132**: *Error: Using alias cannot be a nullable reference type.*
- **CS9133**: *Error: `static` modifier must precede `unsafe` modifier.*
- **CS9162**: *Type is not valid for 'using static'. Only a class, struct, interface, enum, delegate, or namespace can be used.*
- **CS9348**: *A compilation unit cannot directly contain members such as fields, methods or properties*

And the following compiler warnings:

- **CS0105**: *Warning: The using directive for 'namespace' appeared previously in this namespace.*
- **CS0435**: *Warning: The namespace 'namespace' in 'assembly' conflicts with the imported type 'type' in 'assembly'. Using the namespace defined in 'assembly'.*
- **CS0436**: *Warning: The type 'type' in 'assembly' conflicts with the imported type 'type2' in 'assembly'. Using the type defined in 'assembly'.*
- **CS0437**: *Warning: The type 'type' in 'assembly2' conflicts with the imported namespace 'namespace' in 'assembly1'. Using the type defined in 'assembly'.*
- **CS0440**: *Warning: Defining an alias named `global` is ill-advised since `global::` always references the global namespace and not an alias.*
- **CS8019**: *Info: Unnecessary using directive.*
- **CS8020**: *Info: Unused extern alias.*
- **CS8933**: *Info: The using directive appeared previously as global using.*

These errors and warnings indicate problems with `using` directives, declarations in compilation units and namespaces, or naming conflicts between types and namespaces. The following sections describe these errors and how to correct them.

## Using directive

The following errors relate to `using` directives:

- **CS0105**: *The using directive for 'namespace' appeared previously in this namespace.*
- **CS0430**: *The extern alias 'alias' was not specified in a /reference option.*
- **CS0439**: *An extern alias declaration must precede all other elements defined in the namespace.*
- **CS1529**: *A using clause must precede all other elements defined in the namespace except extern alias declarations.*
- **CS1679**: *Invalid extern alias for '/reference'; 'identifier' is not a valid identifier.*
- **CS1680**: *Invalid reference alias option: 'alias=' -- missing filename.*
- **CS1681**: *You cannot redefine the global extern alias.*
- **CS1730**: *Assembly and module attributes must precede all other elements defined in a file except using clauses and extern alias declarations.*
- **CS2034**: *A /reference option that declares an extern alias can only have one filename. To specify multiple aliases or filenames, use multiple /reference options.*
- **CS7015**: *'extern alias' is not valid in this context.*
- **CS8019**: *Unnecessary using directive.*
- **CS8020**: *Unused extern alias.*
- **CS8933**: *The using directive appeared previously as global using.*

See the using directive and extern alias language reference for the rules that govern these diagnostics. Potential fixes include:

- Move all `using` directives to the top of the file, or to the top of the namespace declaration. The C# language requires `using` directives to come before other elements in a namespace (**CS1529**).
- Move all `extern alias` declarations before any `using` directives. The language requires extern aliases to come before all other elements, including `using` directives (**CS0439**, **CS7015**).
- Move all assembly and module level attributes after `using` clauses and `extern alias` declarations but before any type declarations. Attributes must follow directives but precede types (**CS1730**).
- Ensure that every `extern alias` declaration in your source code has a corresponding alias defined in your project's reference options. The compiler can't resolve an alias that wasn't specified (**CS0430**).
- Use a separate `/reference` option for each extern alias rather than combining multiple aliases in a single option. The compiler requires one alias per reference option (**CS2034**).
- Ensure the alias in your `/reference` option is a valid C# identifier. The alias must follow identifier naming rules (**CS1679**). Include a filename after the `=` sign in your alias reference option. The compiler needs to know which assembly the alias refers to (**CS1680**).
- Don't attempt to redefine the `global` extern alias. `global` is a predefined alias that refers to all unaliased references (**CS1681**).
- Remove duplicate `using` directives. The compiler warns when the same namespace is imported multiple times (**CS0105**, **CS8019**, **CS8933**).
- Remove unused `extern alias` declarations. The compiler issues a diagnostic when an extern alias is declared but never referenced in your code (**CS8020**).

## Using static directive

The following errors relate to `using static` directives:

- **CS0138**: *A using namespace directive can only be applied to namespaces; 'type' is a type not a namespace.*
- **CS7007**: *A `using static` directive can only be applied to types. Consider a `using namespace` directive instead.*
- **CS9133**: *`static` modifier must precede `unsafe` modifier.*
- **CS9162**: *Type is not valid for 'using static'. Only a class, struct, interface, enum, delegate, or namespace can be used.*

See the using static directive language reference for the rules that govern these diagnostics. Potential fixes include:

- Add the `static` modifier when importing a type's members directly, because omitting `static` tells the compiler you're importing a namespace rather than a type (**CS0138**).
- Remove the `static` modifier when importing a namespace, because `using static` can only be applied to types, not namespaces (**CS7007**). Ensure the target of a `using static` directive is a class, struct, interface, enum, or delegate, because other types aren't valid targets for static imports (**CS9162**).
- Place the `static` modifier before the `unsafe` modifier when combining both, because the language requires modifiers in a specific order (**CS9133**).

## Global using directive

The following errors relate to `global using` directives:

- **CS8914**: *A global using directive cannot be used in a namespace declaration.*
- **CS8915**: *A global using directive must precede all non-global using directives.*

See the global using directive language reference for the rules that govern these diagnostics. Potential fixes include:

- Move `global using` directives outside of any namespace declaration to file scope, because global usings apply project-wide and can't be scoped to a namespace (**CS8914**).
- Place all `global using` directives before any non-global `using` directives in the file, because the language requires global directives to precede local ones (**CS8915**).
- A `static global using` directive can't reference a file-local type.

## File-scoped namespace

The following errors relate to file-scoped namespaces:

- **CS8954**: *Source file can only contain one file-scoped namespace declaration.*
- **CS8955**: *Source file can not contain both file-scoped and normal namespace declarations.*
- **CS8956**: *File-scoped namespace must precede all other members in a file.*

See the file-scoped namespace language reference for the rules that govern these diagnostics. Potential fixes include:

- Use only one file-scoped namespace declaration per file, because the language allows only a single file-scoped namespace to set the namespace for all types in a file (**CS8954**).
- Choose either file-scoped or block-scoped namespace declarations within a single file, because the language doesn't allow mixing both styles (**CS8955**).
- Move the file-scoped namespace declaration before any type declarations, because the namespace must be established before types are declared (**CS8956**).

## Alias qualifier

The following errors relate to the alias qualifier:

- **CS0431**: *Cannot use alias 'identifier' with `::` since the alias references a type. Use `.` instead.*
- **CS0432**: *Alias 'identifier' not found.*
- **CS0440**: *Defining an alias named `global` is ill-advised since `global::` always references the global namespace and not an alias.*
- **CS0687**: *The namespace alias qualifier `::` always resolves to a type or namespace so is illegal here. Consider using `.` instead.*
- **CS7000**: *Unexpected use of an aliased name.*
- **CS8083**: *An alias-qualified name is not an expression.*

See the namespace alias qualifier language reference for the rules that govern these diagnostics. Potential fixes include:

- Replace the `::` operator with the `.` operator when you access members of a type alias, because the `::` qualifier is only valid for namespace aliases, not type aliases (**CS0431**, **CS0687**).
- Ensure the alias you're referencing is declared with a `using` directive or `extern alias`, because the compiler can't resolve an undefined alias (**CS0432**).
- Use the alias qualifier only in contexts where a type or namespace name is expected, because alias-qualified names aren't valid as expressions (**CS7000**, **CS8083**).
- Choose a different name for your alias instead of `global`, because `global` is reserved to refer to the global namespace and can't be redefined (**CS0440**).

## Using alias restrictions

The following errors relate to restrictions on using aliases:

- **CS0576**: *Namespace 'namespace' contains a definition conflicting with alias 'identifier'.*
- **CS1537**: *The using alias 'alias' appeared previously in this namespace.*
- **CS7016**: *Alias 'alias' conflicts with symbol-kind definition*
- **CS8085**: *A 'using static' directive cannot be used to declare an alias.*
- **CS9130**: *Using alias cannot be a `ref` type.*
- **CS9131**: *Only a using alias can be `unsafe`.*
- **CS9132**: *Using alias cannot be a nullable reference type.*

See the using alias language reference for the rules that govern these diagnostics. Potential fixes include:

- Choose a unique name for your alias that doesn't conflict with existing type or namespace names in scope, because the compiler can't distinguish between the alias and the existing definition (**CS0576**).
- Use each alias name only once within a namespace, because duplicate alias declarations create ambiguity (**CS1537**).
- In script or submission code, rename the using alias or the conflicting submission member so their names are unique (**CS7016**). The diagnostic identifies the member kind, such as `field` or `type`.
- Remove the `static` modifier when declaring an alias, because aliases and static imports are mutually exclusive - use either `using static` to import members or `using Alias =` to create an alias, but not both together (**CS8085**).

The following restrictions apply to using aliases:

- Don't use `ref`, `in`, or `out` modifiers in a using alias, because these parameter modifiers aren't valid in type alias contexts (**CS9130**).
- Use the `unsafe` modifier only with aliases that reference pointer types or with `using static` directives, because `unsafe` without an alias or static import isn't permitted (**CS9131**).
- Use a non-nullable reference type when creating an alias to a reference type, because nullable reference types can't be aliased directly (**CS9132**).
