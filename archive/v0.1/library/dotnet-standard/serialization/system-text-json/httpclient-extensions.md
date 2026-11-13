---
title: "Serialization extension methods on HttpClient"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/httpclient-extensions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Serialization extension methods on HttpClient

Serializing and deserializing JSON payloads from the network are common operations. Extension methods on HttpClient and HttpContent let you do these operations in a single line of code. These extension methods use web defaults for JsonSerializerOptions.

The following example illustrates use of `System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*` and `System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync*`:

```csharp
﻿using System.Net.Http.Json;

namespace HttpClientExtensionMethods
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
    }

    public class Program
    {
        public static async Task Run()
        {
            using HttpClient client = new()
            {
                BaseAddress = new Uri("https://jsonplaceholder.typicode.com")
            };

            // Get the user information.
            User? user = await client.GetFromJsonAsync<User>("users/1");
            Console.WriteLine($"Id: {user?.Id}");
            Console.WriteLine($"Name: {user?.Name}");
            Console.WriteLine($"Username: {user?.Username}");
            Console.WriteLine($"Email: {user?.Email}");

            // Post a new user.
            HttpResponseMessage response = await client.PostAsJsonAsync("users", user);
            Console.WriteLine(
                $"{(response.IsSuccessStatusCode ? "Success" : "Error")} - {response.StatusCode}");
        }
    }
}

// Produces output like the following example but with different names:
//
//Id: 1
//Name: Tyler King
//Username: Tyler
//Email: user@example.com
//Success - Created
```
```vb
﻿Imports System.Net.Http
Imports System.Net.Http.Json

Namespace HttpClientExtensionMethods

    Public Class User
        Public Property Id As Integer
        Public Property Name As String
        Public Property Username As String
        Public Property Email As String
    End Class

    Public Class Program

        Public Shared Async Function Main() As Task
            Using client As New HttpClient With {
                .BaseAddress = New Uri("https://jsonplaceholder.typicode.com")
                }

                ' Get the user information.
                Dim user1 As User = Await client.GetFromJsonAsync(Of User)("users/1")
                Console.WriteLine($"Id: {user1.Id}")
                Console.WriteLine($"Name: {user1.Name}")
                Console.WriteLine($"Username: {user1.Username}")
                Console.WriteLine($"Email: {user1.Email}")

                ' Post a new user.
                Dim response As HttpResponseMessage = Await client.PostAsJsonAsync("users", user1)
                Console.WriteLine(
                $"{(If(response.IsSuccessStatusCode, "Success", "Error"))} - {response.StatusCode}")
            End Using
        End Function

    End Class

End Namespace

' Produces output like the following example but with different names:
'
'Id: 1
'Name: Tyler King
'Username: Tyler
'Email: user@example.com
'Success - Created
```
