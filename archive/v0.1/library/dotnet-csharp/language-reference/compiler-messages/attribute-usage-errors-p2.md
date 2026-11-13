---
title: "Resolve errors and warnings that involve attribute declaration and attribute use in your code. (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/attribute-usage-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings that involve attribute declaration and attribute use in your code. (part 2 of 3)

## Attribute location context

The following errors occur when you apply attributes in invalid locations or use incorrect target specifiers:

- **CS0592**: *Attribute 'attribute' is not valid on this declaration type. It is only valid on 'declaration' declarations.*
- **CS0657**: *'Location' is not a valid attribute location for this declaration. Valid attribute locations for this declaration are 'valid locations'. All attributes in this block will be ignored.*
- **CS0658**: *'Location' is not a recognized attribute location. Valid attribute locations for this declaration are 'valid locations'. All attributes in this block will be ignored.*
- **CS1667**: *Attribute 'attribute' is not valid on property or event accessors. It is only valid on 'declaration' declarations.*
- **CS7014**: *Attributes are not valid in this context.*
- **CS8423**: *Attribute 'attribute' is not valid on event accessors. It is only valid on 'declaration' declarations.*

To correct these errors, follow these rules. For more information, see Attribute Targets and the C# language specification section on attribute specification.

- Each attribute's `System.AttributeUsageAttribute` specifies which declaration types it targets. You must apply the attribute only to those types (**CS0592**). For example, you can't apply an attribute defined with `AttributeTargets.Interface` to a class.
- When you use an attribute target specifier such as `method:` or `property:`, the specifier must be valid for the declaration where it appears (**CS0657**). Check the error message to see which target specifiers are allowed for the specific declaration.
- The attribute target specifier you used isn't a recognized specifier (**CS0658**). Valid specifiers include `assembly:`, `module:`, `type:`, `method:`, `property:`, `field:`, `event:`, `param:`, and `return:`.
- Some attributes, such as `System.Diagnostics.ConditionalAttribute` and `System.CLSCompliantAttribute`, aren't valid on property or event accessors (**CS1667**). Remove `Conditional` from the accessor, or move `CLSCompliant` to the property or event declaration itself.
- Attributes can only appear on program elements that support them (**CS7014**). If you're applying assembly-level or module-level attributes, use the `assembly:` or `module:` target specifiers and place them at the top of the file.
- Attributes such as `System.ObsoleteAttribute` aren't valid on event `add` and `remove` accessors (**CS8423**). Move the attribute to the event declaration. Other attributes can be valid on event accessors.

## Predefined attributes

The following errors occur when you use specific predefined .NET attributes incorrectly:

- **CS0415**: *The 'attribute' attribute is valid only on an indexer that is not an explicit interface member declaration*
- **CS0609**: *Cannot set the attribute on an indexer marked override.*
- **CS0625**: *'field': instance field in types marked with StructLayout(LayoutKind.Explicit) must have a FieldOffset attribute*
- **CS0636**: *The FieldOffset attribute can only be placed on members of types marked with the StructLayout(LayoutKind.Explicit)*
- **CS0637**: *The FieldOffset attribute is not allowed on static or const fields*
- **CS0646**: *Cannot specify the DefaultMember attribute on a type containing an indexer*
- **CS0668**: *Two indexers have different names; the IndexerName attribute must be used with the same name on every indexer within a type*
- **CS0735**: *Invalid type specified as an argument for TypeForwardedTo attribute*
- **CS0739**: *'type' duplicate TypeForwardedToAttribute*
- **CS1608**: *The RequiredAttribute attribute is not permitted on C# types*
- **CS9331**: *'attribute' cannot be applied manually.*
- **CS9351**: *Use of 'StructLayoutAttribute' and 'ExtendedLayoutAttribute' on the same type is not allowed.*

To correct these errors, follow these rules. For more information, see Indexers, Structure types, `System.Runtime.CompilerServices.TypeForwardedToAttribute`, Unsafe code and pointers, and Platform Invoke (P/Invoke).

- You can apply `System.Runtime.CompilerServices.IndexerNameAttribute` only to indexers that aren't explicit interface member declarations (**CS0415**). Remove the attribute from explicit interface indexers, because the interface already defines the indexer name.
- You can't apply `IndexerName` to indexers marked with `override` because override indexers inherit their name from the base class (**CS0609**). Remove the `IndexerName` attribute from the override indexer.
- Every instance field in a type marked with `StructLayout(LayoutKind.Explicit)` must have a `System.Runtime.InteropServices.FieldOffsetAttribute` (**CS0625**). Explicit layout requires that you specify the byte offset for each instance field.
- You can place the `System.Runtime.InteropServices.FieldOffsetAttribute` only on members of types that have `System.Runtime.InteropServices.StructLayoutAttribute` set to `LayoutKind.Explicit` (**CS0636**). Add the `StructLayout` attribute to the containing type declaration.
- The `FieldOffset` attribute isn't allowed on `static` or `const` fields because explicit layout applies only to instance fields (**CS0637**). Remove the `FieldOffset` attribute from the static or const field.
- You can't apply `System.Reflection.DefaultMemberAttribute` to a type that already contains an indexer because the compiler automatically defines the default member for types with indexers (**CS0646**). Remove the `DefaultMember` attribute.
- All `System.Runtime.CompilerServices.IndexerNameAttribute` attributes within a type must specify the same name (**CS0668**). Change the names to match, because the runtime uses a single name for all indexers on a type.
- Specify a top-level named type from another assembly as the argument for `System.Runtime.CompilerServices.TypeForwardedToAttribute` (**CS0735**). Don't pass `null`, an array type, or a pointer type. Generic type definitions such as `typeof(List<>)` are valid forwarding targets.
- An assembly can have only one `System.Runtime.CompilerServices.TypeForwardedToAttribute` for each external type (**CS0739**). Locate and remove the duplicate `TypeForwardedTo` declaration.
- You can't use the `System.Runtime.CompilerServices.RequiredAttributeAttribute` on types defined in C# (**CS1608**). This attribute is reserved for other languages that need to force compilers to require a particular feature.
- Remove a manually applied `MetadataUpdateDeletedAttribute` (**CS9331**). This attribute is reserved for compiler-generated metadata and has no equivalent source-level attribute application.
- Don't apply both `System.Runtime.InteropServices.StructLayoutAttribute` and `ExtendedLayoutAttribute` to the same type (**CS9351**). These two layout attributes represent mutually exclusive layout strategies under the updated memory safety model: explicit layout requires a `FieldOffset` on every instance field, while extended layout lets the runtime choose field offsets while still requiring each field to be marked `safe` or `unsafe`. Remove one of the two attributes from the type declaration.

## Compiler-reserved attributes and types

The following errors occur when source code explicitly declares or applies names or attributes reserved for compiler-generated metadata:

- **CS8335**: *Do not use 'attribute name'. This is reserved for compiler usage.*
- **CS8336**: *The type name 'type' is reserved to be used by the compiler.*

Remove the explicit declaration or attribute application. Use the corresponding C# language feature instead, and let the compiler generate the required metadata.

## Conditional attribute usage

You see the following errors when you apply the `System.Diagnostics.ConditionalAttribute` in ways that violate its usage restrictions:

- **CS0243**: *The Conditional attribute is not valid on 'method' because it is an override method*
- **CS0577**: *The Conditional attribute is not valid on 'method' because it is a constructor, destructor, operator, lambda expression, or explicit interface implementation*
- **CS0578**: *The Conditional attribute is not valid on 'function' because its return type is not void*
- **CS0582**: *The Conditional attribute is not valid on interface members*
- **CS0629**: *Conditional member 'member' cannot implement interface member 'base class member' in type 'Type Name'*
- **CS0685**: *Conditional member 'member' cannot have an out parameter*
- **CS1618**: *Cannot create delegate with 'method' because it or a method it overrides has a Conditional attribute*
- **CS1689**: *Attribute 'attribute' is only valid on methods or attribute classes*
- **CS8783**: *Local function 'method' must be 'static' in order to use the Conditional attribute*

To correct these errors, follow these rules. For more information, see `System.Diagnostics.ConditionalAttribute`, Conditional methods, and Attributes.

- The compiler binds calls to the base method declaration, not the override, so you can't apply the `Conditional` attribute to override methods (**CS0243**). Remove the `Conditional` attribute from the override method, or remove the `override` keyword.
- The `Conditional` attribute isn't valid on constructors, finalizers, operators, lambda expressions, or explicit interface implementations (**CS0577**). These member types can't be conditionally omitted because they have required roles in the type's lifecycle or contract.
- Conditional methods must return `void` because the compiler might omit the call entirely, and no return value would be available to the caller (**CS0578**). Change the method's return type to `void`, or remove the `Conditional` attribute.
- Interface members can't be conditional, even when they have a default implementation (**CS0582**). Remove the `Conditional` attribute from the interface member declaration.
- Methods that implement interface members can't be conditional (**CS0629**). Remove the `Conditional` attribute from the implementing method; calls through an interface aren't conditionally omitted.
- Conditional methods can't have `out` parameters because the `out` variable value would be undefined when the compiler omits the method call (**CS0685**). Remove the `out` parameters from the method, or remove the `Conditional` attribute.
- You can't create a delegate that references a conditional method (**CS1618**). The compiler conditionally omits direct calls, not the method declaration; a delegate invocation wouldn't preserve that behavior. Remove the `Conditional` attribute from the method, or don't use it as a delegate target.
- The `Conditional` attribute is only valid on methods and attribute classes (**CS1689**). It isn't valid on other declaration types such as non-attribute classes, structs, or interfaces.
- A local function must be declared `static` to use the `Conditional` attribute, even if it doesn't capture state from the enclosing method (**CS8783**). Add the `static` modifier to the local function, or remove the `[Conditional]` attribute.

## Caller-information attribute precedence

- **CS7080**: *The CallerMemberNameAttribute applied to parameter 'parameter name' will have no effect. It is overridden by the CallerFilePathAttribute.*
- **CS7081**: *The CallerMemberNameAttribute applied to parameter 'parameter name' will have no effect. It is overridden by the CallerLineNumberAttribute.*
- **CS7082**: *The CallerFilePathAttribute applied to parameter 'parameter name' will have no effect. It is overridden by the CallerLineNumberAttribute.*

To select the value supplied for an omitted argument, keep only the intended caller-information attribute on the parameter. `CallerLineNumber` overrides `CallerFilePath` (**CS7082**) and `CallerMemberName` (**CS7081**); `CallerFilePath` overrides `CallerMemberName` (**CS7080**), regardless of attribute order. Remove the overridden attribute, or remove the higher-precedence attributes if you want a different caller-information value.

For more information, see Caller information attributes and Caller-info attributes in the C# language specification.

## CallerArgumentExpression attribute usage

The following errors occur when you apply `System.Runtime.CompilerServices.CallerArgumentExpressionAttribute` incorrectly or in conflict with other caller info attributes:

- **CS8959**: *CallerArgumentExpressionAttribute cannot be applied because there are no standard conversions from type 'type1' to type 'type2'*
- **CS8960**: *The CallerArgumentExpressionAttribute applied to parameter 'parameter' will have no effect. It is overridden by the CallerLineNumberAttribute.*
- **CS8961**: *The CallerArgumentExpressionAttribute applied to parameter 'parameter' will have no effect. It is overridden by the CallerFilePathAttribute.*
- **CS8962**: *The CallerArgumentExpressionAttribute applied to parameter 'parameter' will have no effect. It is overridden by the CallerMemberNameAttribute.*
- **CS8963**: *The CallerArgumentExpressionAttribute applied to parameter 'parameter' will have no effect. It is applied with an invalid parameter name.*

To correct these errors, follow these rules. For more information, see Caller information attributes and `System.Runtime.CompilerServices.CallerArgumentExpressionAttribute`.

- The parameter decorated with `CallerArgumentExpression` must have type `string` or a type with a standard conversion from `string`, because the attribute injects a `string` representation of the caller's argument expression (**CS8959**). Change the parameter type to `string` or a compatible type.
- The `CallerArgumentExpression` attribute has no effect on a parameter that also has `System.Runtime.CompilerServices.CallerLineNumberAttribute`, `System.Runtime.CompilerServices.CallerFilePathAttribute`, or `System.Runtime.CompilerServices.CallerMemberNameAttribute` (**CS8960**, **CS8961**, **CS8962**). Those caller info attributes take precedence, so remove the `CallerArgumentExpression` attribute from the parameter.
- The string argument passed to the `CallerArgumentExpression` constructor must match the name of another parameter in the same method signature (**CS8963**). If the parameter name is misspelled or refers to a nonexistent parameter, the attribute has no effect.
