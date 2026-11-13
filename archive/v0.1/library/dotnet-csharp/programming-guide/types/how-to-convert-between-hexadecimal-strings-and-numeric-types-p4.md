---
title: "How to convert between hexadecimal strings and numeric types (part 4 of 7)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/types/how-to-convert-between-hexadecimal-strings-and-numeric-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to convert between hexadecimal strings and numeric types (part 4 of 7)

```csharp
using System;
using System.Collections.Generic;

namespace CsProgGuideTypes
{
    //-------------------------------------------------------------------------
    class BoxingAndUnboxing
    {
        static void Main()
        {
            int i = 123;
            // The following line boxes i.
            object o = i;

            o = 123;
            i = (int)o;  // unboxing

            // String.Concat example.
            // String.Concat has many versions. Rest the mouse pointer on
            // Concat in the following statement to verify that the version
            // that is used here takes three object arguments. Both 42 and
            // true must be boxed.
            Console.WriteLine(String.Concat("Answer", 42, true));

            // List example.
            // Create a list of objects to hold a heterogeneous collection
            // of elements.
            List<object> mixedList = [];

            // Add a string element to the list.
            mixedList.Add("First Group:");

            // Add some integers to the list.
            for (int j = 1; j < 5; j++)
            {
                // Rest the mouse pointer over j to verify that you are adding
                // an int to a list of objects. Each element j is boxed when
                // you add j to mixedList.
                mixedList.Add(j);
            }

            // Add another string and more integers.
            mixedList.Add("Second Group:");
            for (int j = 5; j < 10; j++)
            {
                mixedList.Add(j);
            }

            // Display the elements in the list. Declare the loop variable by
            // using var, so that the compiler assigns its type.
            foreach (var item in mixedList)
            {
                // Rest the mouse pointer over item to verify that the elements
                // of mixedList are objects.
                Console.WriteLine(item);
            }

            // The following loop sums the squares of the first group of boxed
            // integers in mixedList. The list elements are objects, and cannot
            // be multiplied or added to the sum until they are unboxed. The
            // unboxing must be done explicitly.
            var sum = 0;
            for (var j = 1; j < 5; j++)
            {
                // The following statement causes a compiler error: Operator
                // '*' cannot be applied to operands of type 'object' and
                // 'object'.
                //sum += mixedList[j] * mixedList[j];

                // After the list elements are unboxed, the computation does
                // not cause a compiler error.
                sum += (int)mixedList[j] * (int)mixedList[j];
            }

            Console.WriteLine($"Sum: {sum}");

            // Output:
            // Answer42True
            // First Group:
            // 1
            // 2
            // 3
            // 4
            // Second Group:
            // 5
            // 6
            // 7
            // 8
            // 9
            // Sum: 30
        }

        static void Wrap()
        {
            int i = 123;      // a value type
            object o = i;     // boxing
            int j = (int)o;   // unboxing
        }
    }

    
    //-------------------------------------------------------------------------
    class BoxingValueCopy
    {
        static void Main()
        {
            // Create an int variable
            int i = 123;
            
            // Box the value type into an object reference
            object o = i;  // boxing
            
            // Display the initial values
            Console.WriteLine($"Value of i: {i}");
            Console.WriteLine($"Value of boxed object o: {o}");
            
            // Modify the original value type
            i = 456;
            
            // Display the values after modification
            Console.WriteLine("\nAfter changing i to 456:");
            Console.WriteLine($"Value of i: {i}");
            Console.WriteLine($"Value of boxed object o: {o}");
            
    		// Output:
    		// Value of i: 123
    		// Value of boxed object o: 123
    
    		// After changing i to 456:
    		// Value of i: 456
    		// Value of boxed object o: 123
        }
    }

    //-------------------------------------------------------------------------
    class TestBoxing
    {
        static void Main()
        {
            int i = 123;

            // Boxing copies the value of i into object o.
            object o = i;
        }
    }

    //-------------------------------------------------------------------------
    class WrapExplicitBoxing
    {
        static void Main()
        {
            int i = 123;
            object o = (object)i;  // explicit boxing
        }
    }

    //-------------------------------------------------------------------------
    class TestUnboxing
    {
        static void Main()
        {
            int i = 123;
            object o = i;  // implicit boxing

            try
            {
                int j = (short)o;  // attempt to unbox

                Console.WriteLine("Unboxing OK.");
            }
            catch (InvalidCastException e)
            {
                Console.WriteLine($"{e.Message} Error: Incorrect unboxing.");
            }
        }
    }

    //-------------------------------------------------------------------------
    public class ConvertByteArrayExample
    {
        static void Main(string[] args)
        {
            byte[] bytes = [0, 0, 0, 25];

            // If the system architecture is little-endian (that is, little end first),
            // reverse the byte array.
            if (BitConverter.IsLittleEndian)
                Array.Reverse(bytes);

            int i = BitConverter.ToInt32(bytes, 0);
            Console.WriteLine($"int: {i}");
            // Output: int: 25
        }
    }

    //-------------------------------------------------------------------------
    public class ConvertByteArrayExample2
    {
        static void Main(string[] args)
        {
            byte[] bytes = BitConverter.GetBytes(201805978);
            Console.WriteLine($"byte array: {BitConverter.ToString(bytes)}");
            // Output: byte array: 9A-50-07-0C
        }
    }

    //-------------------------------------------------------------------------
    public class ConvertHexadecimalStrings
    {
        static void Main(string[] args)
        {
            string input = "Hello World!";
            char[] values = input.ToCharArray();
            foreach (char letter in values)
            {
                // Get the integral value of the character.
                int value = Convert.ToInt32(letter);
                // Convert the integer value to a hexadecimal value in string form.
                Console.WriteLine($"Hexadecimal value of {letter} is {value:X}");
            }
            /* Output:
                Hexadecimal value of H is 48
                Hexadecimal value of e is 65
                Hexadecimal value of l is 6C
                Hexadecimal value of l is 6C
                Hexadecimal value of o is 6F
                Hexadecimal value of   is 20
                Hexadecimal value of W is 57
                Hexadecimal value of o is 6F
                Hexadecimal value of r is 72
                Hexadecimal value of l is 6C
                Hexadecimal value of d is 64
                Hexadecimal value of ! is 21
             */

            string hexValues = "48 65 6C 6C 6F 20 57 6F 72 6C 64 21";
            string[] hexValuesSplit = hexValues.Split(' ');
            foreach (string hex in hexValuesSplit)
            {
                // Convert the number expressed in base-16 to an integer.
                int value = Convert.ToInt32(hex, 16);
                // Get the character corresponding to the integral value.
                string stringValue = char.ConvertFromUtf32(value);
                char charValue = (char)value;
                Console.WriteLine("hexadecimal value = {0}, int value = {1}, char value = {2} or {3}",
                                    hex, value, stringValue, charValue);
            }
            /* Output:
                hexadecimal value = 48, int value = 72, char value = H or H
                hexadecimal value = 65, int value = 101, char value = e or e
                hexadecimal value = 6C, int value = 108, char value = l or l
                hexadecimal value = 6C, int value = 108, char value = l or l
                hexadecimal value = 6F, int value = 111, char value = o or o
                hexadecimal value = 20, int value = 32, char value =   or
                hexadecimal value = 57, int value = 87, char value = W or W
                hexadecimal value = 6F, int value = 111, char value = o or o
                hexadecimal value = 72, int value = 114, char value = r or r
                hexadecimal value = 6C, int value = 108, char value = l or l
                hexadecimal value = 64, int value = 100, char value = d or d
                hexadecimal value = 21, int value = 33, char value = ! or !
            */

            string hexString = "8E2";
            int num = int.Parse(hexString, System.Globalization.NumberStyles.HexNumber);
            Console.WriteLine(num);
            //Output: 2274

            //see also snippet38 below
        }
    }

    class ConvertHexStrings2
    {
        static void Main()
        {
            byte[] vals = [0x01, 0xAA, 0xB1, 0xDC, 0x10, 0xDD];

            string str = BitConverter.ToString(vals);
            Console.WriteLine(str);

            str = BitConverter.ToString(vals).Replace("-", "");
            Console.WriteLine(str);

            /*Output:
              01-AA-B1-DC-10-DD
              01AAB1DC10DD
             */

            string hexString = "43480170";
            uint num = uint.Parse(hexString, System.Globalization.NumberStyles.AllowHexSpecifier);

            byte[] floatVals = BitConverter.GetBytes(num);
            float f = BitConverter.ToSingle(floatVals, 0);
            Console.WriteLine($"float convert = {f}");

            // Output: 200.0056

            byte[] array = [0x64, 0x6f, 0x74, 0x63, 0x65, 0x74];

            string hexValue = Convert.ToHexString(array);
            Console.WriteLine(hexValue);

            /*Output:
              646F74636574
             */
            // Keep the console window open in debug mode.
            System.Console.WriteLine("Press any key to exit.");
            System.Console.ReadKey();
        }
    }
}
```

 The following example shows how to convert a hexadecimal `string` to a float by using the `System.BitConverter` class and the `System.UInt32.Parse*` method.
