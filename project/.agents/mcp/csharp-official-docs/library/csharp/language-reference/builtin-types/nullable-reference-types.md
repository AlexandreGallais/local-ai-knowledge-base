---
title: "Nullable reference types (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/builtin-types/nullable-reference-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Nullable reference types (C# reference)

> **Note:**
> This article covers nullable reference types. You can also declare nullable value types.

Use nullable reference types in code that's in a *nullable aware context*. Nullable reference types, the null static analysis warnings, and the null-forgiving operator are optional language features. All are off by default. You control a *nullable context* at the project level by using build settings, or in code by using pragmas.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

> **Important:**
> All project templates enable the *nullable context* for the project. Projects created with earlier templates don't include this element, and these features are off unless you enable them in the project file or use pragmas.

In a nullable aware context:

- You must initialize a variable of a reference type `T` with a non-null value, and you can never assign a value that might be `null`.
- You can initialize a variable of a reference type `T?` with `null` or assign `null`, but you must check it against `null` before dereferencing.
- When you apply the null-forgiving operator to a variable `m` of type `T?`, as in `m!`, the variable is considered to be non-null.

The compiler enforces the distinctions between a non-nullable reference type `T` and a nullable reference type `T?` by using the preceding rules. A variable of type `T` and a variable of type `T?` are the same .NET type. The following example declares a non-nullable string and a nullable string, and then uses the null-forgiving operator to assign a value to a non-nullable string:

```csharp
string notNull = "Hello";
string? nullable = default;
notNull = nullable!; // null forgiveness
```
The variables `notNull` and `nullable` both use the `System.String` type. Because the non-nullable and nullable types both use the same type, you can't use a nullable reference type in several locations. In general, you can't use a nullable reference type as a base class or implemented interface. You can't use a nullable reference type in any object creation or type testing expression. You can't use a nullable reference type as the type of a member access expression. The following examples show these constructs:

```csharp
public MyClass : System.Object? // not allowed
{
}

var nullEmpty = System.String?.Empty; // Not allowed
var maybeObject = new object?(); // Not allowed
try
{
    if (thing is string? nullableString) // not allowed
        Console.WriteLine(nullableString);
} catch (Exception? e) // Not Allowed
{
    Console.WriteLine("error");
}
```

## Nullable references and static analysis

The examples in the previous section illustrate the nature of nullable reference types. Nullable reference types aren't new class types, but rather annotations on existing reference types. The compiler uses those annotations to help you find potential null reference errors in your code. There's no runtime difference between a non-nullable reference type and a nullable reference type. The compiler doesn't add any runtime checking for non-nullable reference types. The benefits are in the compile-time analysis. The compiler generates warnings that help you find and fix potential null errors in your code. You declare your intent, and the compiler warns you when your code violates that intent.

> **Important:**
> Nullable reference annotations don't introduce behavior changes, but other libraries might use reflection to produce different runtime behavior for nullable and non-nullable reference types. Notably, Entity Framework Core reads nullable attributes. It interprets a nullable reference as an optional value, and a non-nullable reference as a required value.

In a nullable enabled context, the compiler performs static analysis on variables of any reference type, both nullable and non-nullable. The compiler tracks the *null-state* of each reference variable as either *not-null* or *maybe-null*. The default state of a non-nullable reference is *not-null*. The default state of a nullable reference is *maybe-null*.

Non-nullable reference types should always be safe to dereference because their *null-state* is *not-null*. To enforce that rule, the compiler issues warnings if a non-nullable reference type isn't initialized to a non-null value. You must assign local variables where you declare them. Every field must be assigned a *not-null* value, in a field initializer or every constructor. The compiler issues warnings when a non-nullable reference is assigned to a reference whose state is *maybe-null*. Generally, a non-nullable reference is *not-null* and no warnings are issued when you dereference those variables.

> **Note:**
> If you assign a *maybe-null* expression to a non-nullable reference type, the compiler generates a warning. The compiler then generates warnings for that variable until it's assigned to a *not-null* expression.

You can initialize or assign `null` to nullable reference types. Therefore, static analysis must determine that a variable is *not-null* before it's dereferenced. If a nullable reference is determined to be *maybe-null*, assigning it to a non-nullable reference variable generates a compiler warning. The following class shows examples of these warnings:

```csharp
public class ProductDescription
{
    private string shortDescription;
    private string? detailedDescription;

    public ProductDescription() // Warning! shortDescription not initialized.
    {
    }

    public ProductDescription(string productDescription) =>
        this.shortDescription = productDescription;

    public void SetDescriptions(string productDescription, string? details=null)
    {
        shortDescription = productDescription;
        detailedDescription = details;
    }

    public string GetDescription()
    {
        if (detailedDescription.Length == 0) // Warning! dereference possible null
        {
            return shortDescription;
        }
        else
        {
            return $"{shortDescription}\n{detailedDescription}";
        }
    }

    public string FullDescription()
    {
        if (detailedDescription == null)
        {
            return shortDescription;
        }
        else if (detailedDescription.Length > 0) // OK, detailedDescription can't be null.
        {
            return $"{shortDescription}\n{detailedDescription}";
        }
        return shortDescription;
    }
}
```
The following snippet shows where the compiler emits warnings when using this class:

```csharp
string shortDescription = default; // Warning! non-nullable set to null;
var product = new ProductDescription(shortDescription); // Warning! static analysis knows shortDescription maybe null.

string description = "widget";
var item = new ProductDescription(description);

item.SetDescriptions(description, "These widgets will do everything.");
```
The preceding examples demonstrate how compiler's static analysis determines the *null-state* of reference variables. The compiler applies language rules for null checks and assignments to inform its analysis. The compiler can't make assumptions about the semantics of methods or properties. If you call methods that perform null checks, the compiler can't know those methods affect a variable's *null-state*. You can add attributes to your APIs to inform the compiler about the semantics of arguments and return values. Many common APIs in the .NET libraries have these attributes. For example, the compiler correctly interprets `System.String.IsNullOrEmpty*` as a null check. For more information about the attributes that apply to *null-state* static analysis, see the article on Nullable attributes.
