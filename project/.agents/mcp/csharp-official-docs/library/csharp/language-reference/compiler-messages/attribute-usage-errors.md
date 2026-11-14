---
title: "Resolve errors and warnings that involve attribute declaration and attribute use in your code. (part 1 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/attribute-usage-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to attribute declarations or attribute use in your code

This article covers the following compiler errors:

- **CS0036**: *An out parameter cannot have the In attribute*
- **CS0181**: *Attribute constructor parameter 'parameter' has type 'type', which is not a valid attribute parameter type*
- **CS0243**: *The Conditional attribute is not valid on 'method' because it is an override method*
- **CS0404**: *Attribute is not valid on this declaration type.*
- **CS0415**: *The 'attribute' attribute is valid only on an indexer that is not an explicit interface member declaration*
- **CS0416**: *'type parameter': an attribute argument cannot use type parameters*
- **CS0423**: *Since 'class' has the ComImport attribute, 'method' must be extern or abstract*
- **CS0424**: *'type': a class with the ComImport attribute cannot specify a base class*
- **CS0447**: *Attribute cannot be used with type arguments.*
- **CS0577**: *The Conditional attribute is not valid on 'method' because it is a constructor, destructor, operator, lambda expression, or explicit interface implementation*
- **CS0578**: *The Conditional attribute is not valid on 'function' because its return type is not void*
- **CS0579**: *Duplicate 'attribute' attribute*
- **CS0582**: *The Conditional attribute is not valid on interface members*
- **CS0592**: *Attribute 'attribute' is not valid on this declaration type. It is only valid on 'declaration' declarations.*
- **CS0596**: *The Guid attribute must be specified with the ComImport attribute*
- **CS0601**: *The DllImport attribute must be specified on a method marked 'extern' that is either 'static' or an extension member*
- **CS0609**: *Cannot set the attribute on an indexer marked override.*
- **CS0616**: *'Type' is not an attribute class*
- **CS0625**: *'field': instance field in types marked with StructLayout(LayoutKind.Explicit) must have a FieldOffset attribute*
- **CS0626**: *Method, operator, or accessor 'method' is marked external and has no attributes on it. Consider adding a DllImport attribute to specify the external implementation.*
- **CS0629**: *Conditional member 'member' cannot implement interface member 'base class member' in type 'Type Name'*
- **CS0636**: *The FieldOffset attribute can only be placed on members of types marked with the StructLayout(LayoutKind.Explicit)*
- **CS0637**: *The FieldOffset attribute is not allowed on static or const fields*
- **CS0641**: *Attribute 'attribute' is only valid on classes derived from System.Attribute*
- **CS0646**: *Cannot specify the DefaultMember attribute on a type containing an indexer*
- **CS0647**: *Error emitting attribute*
- **CS0653**: *Cannot apply attribute class 'class' because it is abstract*
- **CS0657**: *'Location' is not a valid attribute location for this declaration. Valid attribute locations for this declaration are 'valid locations'. All attributes in this block will be ignored.*
- **CS0658**: *'Location' is not a recognized attribute location. Valid attribute locations for this declaration are 'valid locations'. All attributes in this block will be ignored.*
- **CS0662**: *Cannot specify the Out attribute on a ref parameter without also specifying the In attribute.*
- **CS0668**: *Two indexers have different names; the IndexerName attribute must be used with the same name on every indexer within a type*
- **CS0669**: *A class with the ComImport attribute cannot have a user-defined constructor*
- **CS0684**: *'interface' interface marked with 'CoClassAttribute' not marked with 'ComImportAttribute'*
- **CS0685**: *Conditional member 'member' cannot have an out parameter*
- **CS0735**: *Invalid type specified as an argument for TypeForwardedTo attribute*
- **CS0739**: *'type' duplicate TypeForwardedToAttribute*
- **CS1608**: *The RequiredAttribute attribute is not permitted on C# types*
- **CS1614**: *'name' is ambiguous between 'attribute' and 'other attribute'. Either use '@name' or explicitly include the 'Attribute' suffix.*
- **CS1618**: *Cannot create delegate with 'method' because it or a method it overrides has a Conditional attribute*
- **CS1667**: *Attribute 'attribute' is not valid on property or event accessors. It is only valid on 'declaration' declarations.*
- **CS1689**: *Attribute 'attribute' is only valid on methods or attribute classes*
- **CS7014**: *Attributes are not valid in this context.*
- **CS7042**: *The DllImport attribute cannot be applied to a method that is generic or contained in a generic method or type.*
- **CS7045**: *Parameter not valid for the specified unmanaged type.*
- **CS7046**: *Attribute parameter 'parameter' must be specified.*
- **CS7047**: *Attribute parameter 'parameter1' or 'parameter2' must be specified.*
- **CS7054**: *Unmanaged type 'type' not valid for fields.*
- **CS7055**: *Unmanaged type 'type' is only valid for fields.*
- **CS7067**: *Attribute constructor parameter 'parameter' is optional, but no default parameter value was specified.*
- **CS7080**: *The CallerMemberNameAttribute applied to parameter 'parameter name' will have no effect. It is overridden by the CallerFilePathAttribute.*
- **CS7081**: *The CallerMemberNameAttribute applied to parameter 'parameter name' will have no effect. It is overridden by the CallerLineNumberAttribute.*
- **CS7082**: *The CallerFilePathAttribute applied to parameter 'parameter name' will have no effect. It is overridden by the CallerLineNumberAttribute.*
- **CS8028**: *'type': a class with the ComImport attribute cannot specify field initializers.*
- **CS8335**: *Do not use 'attribute name'. This is reserved for compiler usage.*
- **CS8336**: *The type name 'type' is reserved to be used by the compiler.*
- **CS8355**: *An in parameter cannot have the Out attribute.*
- **CS8423**: *Attribute 'attribute' is not valid on event accessors. It is only valid on 'declaration' declarations.*
- **CS8783**: *Local function 'method' must be 'static' in order to use the Conditional attribute*
- **CS8959**: *CallerArgumentExpressionAttribute cannot be applied because there are no standard conversions from type 'type1' to type 'type2'*
- **CS8960**: *The CallerArgumentExpressionAttribute applied to parameter 'parameter' will have no effect. It is overridden by the CallerLineNumberAttribute.*
- **CS8961**: *The CallerArgumentExpressionAttribute applied to parameter 'parameter' will have no effect. It is overridden by the CallerFilePathAttribute.*
- **CS8962**: *The CallerArgumentExpressionAttribute applied to parameter 'parameter' will have no effect. It is overridden by the CallerMemberNameAttribute.*
- **CS8963**: *The CallerArgumentExpressionAttribute applied to parameter 'parameter' will have no effect. It is applied with an invalid parameter name.*
- **CS8968**: *'type parameter': an attribute type argument cannot use type parameters*
- **CS8970**: *Type 'type' cannot be used in this context because it cannot be represented in metadata.*
- **CS9331**: *'attribute' cannot be applied manually.*
- **CS9351**: *Use of 'StructLayoutAttribute' and 'ExtendedLayoutAttribute' on the same type is not allowed.*

## Attribute arguments and parameters

You see the following errors when you use attribute arguments or parameters incorrectly:

- **CS0181**: *Attribute constructor parameter 'parameter' has type 'type', which is not a valid attribute parameter type*
- **CS0416**: *'type parameter': an attribute argument cannot use type parameters*
- **CS0447**: *Attribute cannot be used with type arguments.*
- **CS0647**: *Error emitting attribute*
- **CS7046**: *Attribute parameter 'parameter' must be specified.*
- **CS7047**: *Attribute parameter 'parameter1' or 'parameter2' must be specified.*
- **CS7067**: *Attribute constructor parameter 'parameter' is optional, but no default parameter value was specified.*
- **CS8968**: *'type parameter': an attribute type argument cannot use type parameters*
- **CS8970**: *Type 'type' cannot be used in this context because it cannot be represented in metadata.*

To correct these errors, follow these rules:

- Attribute constructor parameters must use valid attribute parameter types (**CS0181**). The C# language specification restricts attribute parameter types to primitive types (`bool`, `byte`, `char`, `double`, `float`, `int`, `long`, `sbyte`, `short`, `string`, `uint`, `ulong`, and `ushort`), `object`, `System.Type`, enum types, and single-dimensional arrays of these types. Function pointers aren't valid attribute parameter types.
- Don't use a type parameter in an attribute's `typeof` argument (**CS0416**). Replace it with a type that doesn't depend on a type parameter, such as `typeof(string)` or `typeof(List<>)`.
- You can't apply type arguments to a non-generic attribute (**CS0447**). If an attribute class isn't generic, its usage can't include type arguments in angle brackets.
- All values passed to an attribute constructor must be correctly formatted and within the valid range for each parameter (**CS0647**). For example, a `System.Runtime.InteropServices.GuidAttribute` requires a valid GUID format string.
- Supply the required named arguments for the selected `MarshalAs` representation (**CS7046**, **CS7047**). For `ByValTStr`, specify `SizeConst`; for `CustomMarshaler`, specify `MarshalType` or `MarshalTypeRef`. These requirements aren't expressed by the attribute's constructor signature.
- When you define a custom attribute with optional constructor parameters, specify default values for those parameters (**CS7067**). Use the syntax `parameterType parameterName = defaultValue` in the attribute constructor so callers can omit those arguments.
- Generic attribute type arguments must be concrete types, not type parameters (**CS8968**). The compiler must fully determine generic attribute type arguments at compile time, so open type parameters aren't permitted.
- Generic attribute type arguments can't require additional attributes to represent their types in metadata (**CS8970**). Replace `dynamic` with `object`, remove nullable reference annotations or tuple element names, or use `IntPtr` or `UIntPtr` instead of `nint` or `nuint`.

For more information, see Attributes, Generics, and the C# language specification section on attributes.

> **Note:**
> **CS0404**, **CS0447**, **CS0609**, and **CS0647** are historical diagnostics. The current compiler doesn't emit these errors.

## Attribute class requirements

You see the following errors when you define attribute classes that don't meet the required constraints:

- **CS0404**: *Attribute is not valid on this declaration type.*
- **CS0579**: *Duplicate 'attribute' attribute*
- **CS0616**: *'Type' is not an attribute class*
- **CS0641**: *Attribute 'attribute' is only valid on classes derived from System.Attribute*
- **CS0653**: *Cannot apply attribute class 'class' because it is abstract*
- **CS1614**: *'name' is ambiguous between 'attribute' and 'other attribute'. Either use '@name' or explicitly include the 'Attribute' suffix.*

To correct these errors, follow these rules:

- Apply attributes only to declaration types that the attribute's `System.AttributeUsageAttribute` allows (**CS0404**). Check the `AttributeTargets` value specified in the attribute's `AttributeUsage` to see which targets are valid.
- If you apply the same attribute more than once to a single target, either remove the duplicate or set `AllowMultiple = true` in the attribute's `System.AttributeUsageAttribute` (**CS0579**). By default, attributes can only appear once on each target.
- The type used in attribute syntax must inherit from `System.Attribute` (**CS0616**). Only classes derived from `System.Attribute` can be used as attributes. Other types cause this error even if they have a similar name.
- You can apply `System.AttributeUsageAttribute` only to classes that derive from `Attribute` (**CS0641**). The `AttributeUsage` attribute controls how other attributes are used, and is itself restricted to attribute classes.
- Attribute classes can't be `abstract` because the compiler must instantiate them (**CS0653**). Remove the `abstract` modifier from the attribute class, or derive a concrete class from the abstract base.
- When both `Example` and `ExampleAttribute` attribute classes exist, the compiler can't determine which one `[Example]` refers to (**CS1614**). Disambiguate by using `[@Example]` for the shorter name, or `[ExampleAttribute]` for the longer name.

For more information, see Create custom attributes and the C# language specification section on attributes.
