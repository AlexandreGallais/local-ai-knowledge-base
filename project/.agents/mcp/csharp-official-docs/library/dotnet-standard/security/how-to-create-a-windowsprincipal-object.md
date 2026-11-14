---
title: "How to: Create a WindowsPrincipal Object"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/how-to-create-a-windowsprincipal-object.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Create a WindowsPrincipal Object

> **Note:**
> This article applies to Windows.
>
> For information about ASP.NET Core, see ASP.NET Core Security.

There are two ways to create a `System.Security.Principal.WindowsPrincipal` object, depending on whether code must repeatedly perform role-based validation or must perform it only once.

If code must repeatedly perform role-based validation, the first of the following procedures produces less overhead. When code needs to make role-based validations only once, you can create a `System.Security.Principal.WindowsPrincipal` object by using the second of the following procedures.

### To create a WindowsPrincipal object for repeated validation

1. Call the `System.AppDomain.SetPrincipalPolicy*` method on the `System.AppDomain` object that is returned by the static `System.AppDomain.CurrentDomain` property, passing the method a `System.Security.Principal.PrincipalPolicy` enumeration value that indicates what the new policy should be. Supported values are `System.Security.Principal.PrincipalPolicy.NoPrincipal`, `System.Security.Principal.PrincipalPolicy.UnauthenticatedPrincipal`, and `System.Security.Principal.PrincipalPolicy.WindowsPrincipal`. The following code demonstrates this method call.

    ```csharp
    AppDomain.CurrentDomain.SetPrincipalPolicy(
        PrincipalPolicy.WindowsPrincipal);
    ```

    ```vb
    AppDomain.CurrentDomain.SetPrincipalPolicy( _
        PrincipalPolicy.WindowsPrincipal)
    ```

2. With the policy set, use the static `System.Threading.Thread.CurrentPrincipal` property to retrieve the principal that encapsulates the current Windows user. Because the property return type is `System.Security.Principal.IPrincipal`, you must cast the result to a `System.Security.Principal.WindowsPrincipal` type. The following code initializes a new `System.Security.Principal.WindowsPrincipal` object to the value of the principal associated with the current thread.

    ```csharp
    WindowsPrincipal myPrincipal =
        (WindowsPrincipal) Thread.CurrentPrincipal;
    ```

    ```vb
    Dim myPrincipal As WindowsPrincipal = _
        CType(Thread.CurrentPrincipal, WindowsPrincipal)
    ```

3. When the principal object has been created, you can use one of several methods to validate it.

### To create a WindowsPrincipal object for a single validation

1. Initialize a new `System.Security.Principal.WindowsIdentity` object by calling the static `System.Security.Principal.WindowsIdentity.GetCurrent*` method, which queries the current Windows account and places information about that account into the newly created identity object. The following code creates a new `System.Security.Principal.WindowsIdentity` object and initializes it to the current authenticated user.

    ```csharp
    WindowsIdentity myIdentity = WindowsIdentity.GetCurrent();
    ```

    ```vb
    Dim myIdentity As WindowsIdentity = WindowsIdentity.GetCurrent()
    ```

2. Create a new `System.Security.Principal.WindowsPrincipal` object and pass it the value of the `System.Security.Principal.WindowsIdentity` object created in the preceding step.

    ```csharp
    WindowsPrincipal myPrincipal = new WindowsPrincipal(myIdentity);
    ```

    ```vb
    Dim myPrincipal As New WindowsPrincipal(myIdentity)
    ```

3. When the principal object has been created, you can use one of several methods to validate it.

## See also

- Principal and Identity Objects
- ASP.NET Core Security
