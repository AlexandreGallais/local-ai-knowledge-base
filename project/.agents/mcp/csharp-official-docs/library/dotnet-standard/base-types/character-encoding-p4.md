---
title: "How to use character encoding classes in .NET (part 4 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/character-encoding.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use character encoding classes in .NET (part 4 of 6)

### Exception Fallback

Instead of providing a best-fit fallback or a replacement string, an encoder can throw an `System.Text.EncoderFallbackException` if it is unable to encode a set of characters, and a decoder can throw a `System.Text.DecoderFallbackException` if it is unable to decode a byte array. To throw an exception in encoding and decoding operations, you supply an `System.Text.EncoderExceptionFallback` object and a `System.Text.DecoderExceptionFallback` object, respectively, to the `System.Text.Encoding.GetEncoding(System.String,System.Text.EncoderFallback,System.Text.DecoderFallback)` method. The following example illustrates exception fallback with the `System.Text.ASCIIEncoding` class.

```csharp
using System;
using System.Text;

public class Example
{
   public static void Main()
   {
      Encoding enc = Encoding.GetEncoding("us-ascii",
                                          new EncoderExceptionFallback(),
                                          new DecoderExceptionFallback());

      string str1 = "\u24C8 \u2075 \u221E";
      Console.WriteLine(str1);
      foreach (var ch in str1)
         Console.Write("{0} ", Convert.ToUInt16(ch).ToString("X4"));

      Console.WriteLine("\n");

      // Encode the original string using the ASCII encoder.
      byte[] bytes = {};
      try {
         bytes = enc.GetBytes(str1);
         Console.Write("Encoded bytes: ");
         foreach (var byt in bytes)
            Console.Write("{0:X2} ", byt);

         Console.WriteLine();
      }
      catch (EncoderFallbackException e) {
         Console.Write("Exception: ");
         if (e.IsUnknownSurrogate())
            Console.WriteLine($"Unable to encode surrogate pair 0x{Convert.ToUInt16(e.CharUnknownHigh):X4} 0x{Convert.ToUInt16(e.CharUnknownLow):X3} at index {e.Index}.");
         else
            Console.WriteLine($"Unable to encode 0x{Convert.ToUInt16(e.CharUnknown):X4} at index {e.Index}.");
         return;
      }
      Console.WriteLine();

      // Decode the ASCII bytes.
      try {
         string str2 = enc.GetString(bytes);
         Console.WriteLine($"Round-trip: {str1.Equals(str2)}");
         if (!str1.Equals(str2)) {
            Console.WriteLine(str2);
            foreach (var ch in str2)
               Console.Write("{0} ", Convert.ToUInt16(ch).ToString("X4"));

            Console.WriteLine();
         }
      }
      catch (DecoderFallbackException e) {
         Console.Write("Unable to decode byte(s) ");
         foreach (byte unknown in e.BytesUnknown)
            Console.Write("0x{0:X2} ");

         Console.WriteLine($"at index {e.Index}");
      }
   }
}
// The example displays the following output:
//       Ⓢ ⁵ ∞
//       24C8 0020 2075 0020 221E
//
//       Exception: Unable to encode 0x24C8 at index 0.
```

> **Note:**
> You can also implement a custom exception handler for an encoding operation. For more information, see the Implementing a Custom Fallback Strategy section.

The `System.Text.EncoderFallbackException` and `System.Text.DecoderFallbackException` objects provide the following information about the condition that caused the exception:

- The `System.Text.EncoderFallbackException` object includes an `System.Text.EncoderFallbackException.IsUnknownSurrogate*` method, which indicates whether the character or characters that cannot be encoded represent an unknown surrogate pair (in which case, the method returns `true`) or an unknown single character (in which case, the method returns `false`). The characters in the surrogate pair are available from the `System.Text.EncoderFallbackException.CharUnknownHigh*` and `System.Text.EncoderFallbackException.CharUnknownLow` properties. The unknown single character is available from the `System.Text.EncoderFallbackException.CharUnknown` property. The `System.Text.EncoderFallbackException.Index` property indicates the position in the string at which the first character that could not be encoded was found.

- The `System.Text.DecoderFallbackException` object includes a `System.Text.DecoderFallbackException.BytesUnknown` property that returns an array of bytes that cannot be decoded. The `System.Text.DecoderFallbackException.Index` property indicates the starting position of the unknown bytes.

Although the `System.Text.EncoderFallbackException` and `System.Text.DecoderFallbackException` objects provide adequate diagnostic information about the exception, they do not provide access to the encoding or decoding buffer. Therefore, they do not allow invalid data to be replaced or corrected within the encoding or decoding method.
