---
title: "Type Conversion in .NET (part 5 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/type-conversion.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Type Conversion in .NET (part 5 of 6)

### Custom conversions with the ChangeType method

In addition to supporting conversions to each of the base types, the `System.Convert` class can be used to convert a custom type to one or more predefined types. This conversion is performed by the `System.Convert.ChangeType(System.Object,System.Type,System.IFormatProvider)` method, which in turn wraps a call to the `System.IConvertible.ToType*` method of the `value` parameter. This means that the object represented by the `value` parameter must provide an implementation of the `System.IConvertible` interface.

> **Note:**
> Because the `System.Convert.ChangeType(System.Object,System.Type)` and `System.Convert.ChangeType(System.Object,System.Type,System.IFormatProvider)` methods use a `System.Type` object to specify the target type to which `value` is converted, they can be used to perform a dynamic conversion to an object whose type is not known at compile time. However, note that the `System.IConvertible` implementation of `value` must still support this conversion.

 The following example illustrates a possible implementation of the `System.IConvertible` interface that allows a `TemperatureCelsius` object to be converted to a `TemperatureFahrenheit` object and vice versa. The example defines a base class, `Temperature`, that implements the `System.IConvertible` interface and overrides the `System.Object.ToString*` method. The derived `TemperatureCelsius` and `TemperatureFahrenheit` classes each override the `ToType` and the `ToString` methods of the base class.

 ```csharp
using System;

public abstract class Temperature : IConvertible
{
    protected decimal temp;

    public Temperature(decimal temperature)
    {
        this.temp = temperature;
    }

    public decimal Value
    {
        get { return this.temp; }
        set { this.temp = value; }
    }

    public override string ToString()
    {
        return temp.ToString(null as IFormatProvider) + "º";
    }

    // IConvertible implementations.
    public TypeCode GetTypeCode()
    {
        return TypeCode.Object;
    }

    public bool ToBoolean(IFormatProvider provider)
    {
        throw new InvalidCastException(String.Format("Temperature-to-Boolean conversion is not supported."));
    }

    public byte ToByte(IFormatProvider provider)
    {
        if (temp < Byte.MinValue || temp > Byte.MaxValue)
            throw new OverflowException(String.Format("{0} is out of range of the Byte data type.", temp));
        else
            return (byte)temp;
    }

    public char ToChar(IFormatProvider provider)
    {
        throw new InvalidCastException("Temperature-to-Char conversion is not supported.");
    }

    public DateTime ToDateTime(IFormatProvider provider)
    {
        throw new InvalidCastException("Temperature-to-DateTime conversion is not supported.");
    }

    public decimal ToDecimal(IFormatProvider provider)
    {
        return temp;
    }

    public double ToDouble(IFormatProvider provider)
    {
        return (double)temp;
    }

    public short ToInt16(IFormatProvider provider)
    {
        if (temp < Int16.MinValue || temp > Int16.MaxValue)
            throw new OverflowException(String.Format("{0} is out of range of the Int16 data type.", temp));
        else
            return (short)Math.Round(temp);
    }

    public int ToInt32(IFormatProvider provider)
    {
        if (temp < Int32.MinValue || temp > Int32.MaxValue)
            throw new OverflowException(String.Format("{0} is out of range of the Int32 data type.", temp));
        else
            return (int)Math.Round(temp);
    }

    public long ToInt64(IFormatProvider provider)
    {
        if (temp < Int64.MinValue || temp > Int64.MaxValue)
            throw new OverflowException(String.Format("{0} is out of range of the Int64 data type.", temp));
        else
            return (long)Math.Round(temp);
    }

    public sbyte ToSByte(IFormatProvider provider)
    {
        if (temp < SByte.MinValue || temp > SByte.MaxValue)
            throw new OverflowException(String.Format("{0} is out of range of the SByte data type.", temp));
        else
            return (sbyte)temp;
    }

    public float ToSingle(IFormatProvider provider)
    {
        return (float)temp;
    }

    public virtual string ToString(IFormatProvider provider)
    {
        return temp.ToString(provider) + "°";
    }

    // If conversionType is implemented by another IConvertible method, call it.
    public virtual object ToType(Type conversionType, IFormatProvider provider)
    {
        switch (Type.GetTypeCode(conversionType))
        {
            case TypeCode.Boolean:
                return this.ToBoolean(provider);
            case TypeCode.Byte:
                return this.ToByte(provider);
            case TypeCode.Char:
                return this.ToChar(provider);
            case TypeCode.DateTime:
                return this.ToDateTime(provider);
            case TypeCode.Decimal:
                return this.ToDecimal(provider);
            case TypeCode.Double:
                return this.ToDouble(provider);
            case TypeCode.Empty:
                throw new NullReferenceException("The target type is null.");
            case TypeCode.Int16:
                return this.ToInt16(provider);
            case TypeCode.Int32:
                return this.ToInt32(provider);
            case TypeCode.Int64:
                return this.ToInt64(provider);
            case TypeCode.Object:
                // Leave conversion of non-base types to derived classes.
                throw new InvalidCastException(String.Format("Cannot convert from Temperature to {0}.",
                                               conversionType.Name));
            case TypeCode.SByte:
                return this.ToSByte(provider);
            case TypeCode.Single:
                return this.ToSingle(provider);
            case TypeCode.String:
                IConvertible iconv = this;
                return iconv.ToString(provider);
            case TypeCode.UInt16:
                return this.ToUInt16(provider);
            case TypeCode.UInt32:
                return this.ToUInt32(provider);
            case TypeCode.UInt64:
                return this.ToUInt64(provider);
            default:
                throw new InvalidCastException("Conversion not supported.");
        }
    }

    public ushort ToUInt16(IFormatProvider provider)
    {
        if (temp < UInt16.MinValue || temp > UInt16.MaxValue)
            throw new OverflowException(String.Format("{0} is out of range of the UInt16 data type.", temp));
        else
            return (ushort)Math.Round(temp);
    }

    public uint ToUInt32(IFormatProvider provider)
    {
        if (temp < UInt32.MinValue || temp > UInt32.MaxValue)
            throw new OverflowException(String.Format("{0} is out of range of the UInt32 data type.", temp));
        else
            return (uint)Math.Round(temp);
    }

    public ulong ToUInt64(IFormatProvider provider)
    {
        if (temp < UInt64.MinValue || temp > UInt64.MaxValue)
            throw new OverflowException(String.Format("{0} is out of range of the UInt64 data type.", temp));
        else
            return (ulong)Math.Round(temp);
    }
}

public class TemperatureCelsius : Temperature, IConvertible
{
    public TemperatureCelsius(decimal value) : base(value)
    {
    }

    // Override ToString methods.
    public override string ToString()
    {
        return this.ToString(null);
    }

    public override string ToString(IFormatProvider provider)
    {
        return temp.ToString(provider) + "°C";
    }

    // If conversionType is a implemented by another IConvertible method, call it.
    public override object ToType(Type conversionType, IFormatProvider provider)
    {
        // For non-objects, call base method.
        if (Type.GetTypeCode(conversionType) != TypeCode.Object)
        {
            return base.ToType(conversionType, provider);
        }
        else
        {
            if (conversionType.Equals(typeof(TemperatureCelsius)))
                return this;
            else if (conversionType.Equals(typeof(TemperatureFahrenheit)))
                return new TemperatureFahrenheit((decimal)this.temp * 9 / 5 + 32);
            else
                throw new InvalidCastException(String.Format("Cannot convert from Temperature to {0}.",
                                               conversionType.Name));
        }
    }
}

public class TemperatureFahrenheit : Temperature, IConvertible
{
    public TemperatureFahrenheit(decimal value) : base(value)
    {
    }

    // Override ToString methods.
    public override string ToString()
    {
        return this.ToString(null);
    }

    public override string ToString(IFormatProvider provider)
    {
        return temp.ToString(provider) + "°F";
    }

    public override object ToType(Type conversionType, IFormatProvider provider)
    {
        // For non-objects, call base method.
        if (Type.GetTypeCode(conversionType) != TypeCode.Object)
        {
            return base.ToType(conversionType, provider);
        }
        else
        {
            // Handle conversion between derived classes.
            if (conversionType.Equals(typeof(TemperatureFahrenheit)))
                return this;
            else if (conversionType.Equals(typeof(TemperatureCelsius)))
                return new TemperatureCelsius((decimal)(this.temp - 32) * 5 / 9);
            // Unspecified object type: throw an InvalidCastException.
            else
                throw new InvalidCastException(String.Format("Cannot convert from Temperature to {0}.",
                                               conversionType.Name));
        }
    }
}

public class Example4
{
    public static void Main()
    {
        TemperatureCelsius tempC1 = new TemperatureCelsius(0);
        TemperatureFahrenheit tempF1 = (TemperatureFahrenheit)Convert.ChangeType(tempC1, typeof(TemperatureFahrenheit), null);
        Console.WriteLine($"{tempC1} equals {tempF1}.");
        TemperatureCelsius tempC2 = (TemperatureCelsius)Convert.ChangeType(tempC1, typeof(TemperatureCelsius), null);
        Console.WriteLine($"{tempC1} equals {tempC2}.");
        TemperatureFahrenheit tempF2 = new TemperatureFahrenheit(212);
        TemperatureCelsius tempC3 = (TemperatureCelsius)Convert.ChangeType(tempF2, typeof(TemperatureCelsius), null);
        Console.WriteLine($"{tempF2} equals {tempC3}.");
        TemperatureFahrenheit tempF3 = (TemperatureFahrenheit)Convert.ChangeType(tempF2, typeof(TemperatureFahrenheit), null);
        Console.WriteLine($"{tempF2} equals {tempF3}.");
        // The example displays the following output:
        //       0°C equals 32°F.
        //       0°C equals 0°C.
        //       212°F equals 100°C.
        //       212°F equals 212°F.
    }
}
```

 The following example illustrates several calls to these `System.IConvertible` implementations to convert `TemperatureCelsius` objects to `TemperatureFahrenheit` objects and vice versa.
