---
title: "How to: Save time zones to an embedded resource (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/save-time-zones-to-an-embedded-resource.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Save time zones to an embedded resource

A time zone-aware application often requires the presence of a particular time zone. However, because the availability of individual `System.TimeZoneInfo` objects depends on information stored in the local system's registry, even customarily available time zones may be absent. In addition, information about custom time zones instantiated by using the `System.TimeZoneInfo.CreateCustomTimeZone*` method is not stored with other time zone information in the registry. To ensure that these time zones are available when they are needed, you can save them by serializing them, and later restore them by deserializing them.

Typically, serializing a `System.TimeZoneInfo` object occurs apart from the time zone-aware application. Depending on the data store used to hold serialized `System.TimeZoneInfo` objects, time zone data may be serialized as part of a setup or installation routine (for example, when the data is stored in an application key of the registry), or as part of a utility routine that runs before the final application is compiled (for example, when the serialized data is stored in a .NET XML resource (.resx) file).

In addition to a resource file that is compiled with the application, several other data stores can be used for time zone information. These include the following:

- The registry. Note that an application should use the subkeys of its own application key to store custom time zone data rather than using the subkeys of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones.

- Configuration files.

- Other system files.

### To save a time zone by serializing it to a .resx file

1. Retrieve an existing time zone or create a new time zone.

   To retrieve an existing time zone, see How to: Access the predefined UTC and local time zone objects and How to: Instantiate a TimeZoneInfo object.

   To create a new time zone, call one of the overloads of the `System.TimeZoneInfo.CreateCustomTimeZone*` method. For more information, see How to: Create time zones without adjustment rules and How to: Create time zones with adjustment rules.

2. Call the `System.TimeZoneInfo.ToSerializedString*` method to create a string that contains the time zone's data.

3. Instantiate a `System.IO.StreamWriter` object by providing the name and optionally the path of the .resx file to the `System.IO.StreamWriter` class constructor.

4. Instantiate a `System.Resources.ResXResourceWriter` object by passing the `System.IO.StreamWriter` object to the `System.Resources.ResXResourceWriter` class constructor.

5. Pass the time zone's serialized string to the `System.Resources.ResXResourceWriter.AddResource*` method.

6. Call the `System.Resources.ResXResourceWriter.Generate*` method.

7. Call the `System.Resources.ResXResourceWriter.Close*` method.

8. Close the `System.IO.StreamWriter` object by calling its `System.IO.StreamWriter.Close*` method.

9. Add the generated .resx file to the application's Visual Studio project.

10. Using the **Properties** window in Visual Studio, make sure that the .resx file's **Build Action** property is set to **Embedded Resource**.

## Example

The following example serializes a `System.TimeZoneInfo` object that represents Central Standard Time and a `System.TimeZoneInfo` object that represents the Palmer Station, Antarctica time to a .NET XML resource file that is named SerializedTimeZones.resx. Central Standard Time is typically defined in the registry; Palmer Station, Antarctica is a custom time zone.

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Resources;
using System.Windows.Forms;

[assembly:CLSCompliant(true)]
class TimeZoneSerialization
{
   private const string resxName = "SerializedTimeZones.resx";

   static void Main()
   {
      TimeZoneSerialization tzSerialization = new TimeZoneSerialization();
      tzSerialization.DeserializeTimeZones();
   }

   TimeZoneSerialization()
   {
      TextWriter writeStream;
      Dictionary<string, string> resources = new Dictionary<string, string>();
      // Determine if .resx file exists
      if (File.Exists(resxName))
      {
         // Open reader
         TextReader readStream = new StreamReader(resxName);
         ResXResourceReader resReader = new ResXResourceReader(readStream);
         foreach (DictionaryEntry item in resReader)
         {
            if (!(((string) item.Key) == "CentralStandardTime" ||
                   ((string) item.Key) == "PalmerStandardTime" ))
               resources.Add((string)item.Key, (string) item.Value);
         }
         readStream.Close();
         // Delete file, since write method creates duplicate xml headers
         File.Delete(resxName);
      }

      // Open stream to write to .resx file
      try
      {
         writeStream = new StreamWriter(resxName, true);
      }
      catch (FileNotFoundException e)
      {
         // Handle failure to find file
         Console.WriteLine($"{e.GetType().Name}: The file {resxName} could not be found.");
         return;
      }

      // Get resource writer
      ResXResourceWriter resWriter = new ResXResourceWriter(writeStream);

      // Add resources from existing file
      foreach (KeyValuePair<string, string> item in resources)
      {
         resWriter.AddResource(item.Key, item.Value);
      }

      // Serialize Central Standard Time
      try
      {
         TimeZoneInfo cst = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");
         resWriter.AddResource(cst.Id.Replace(" ", string.Empty), cst.ToSerializedString());
      }
      catch (TimeZoneNotFoundException)
      {
         Console.WriteLine("The Central Standard Time zone could not be found.");
      }

      // Create time zone for Palmer, Antarctica
      //
      // Define transition times to/from DST
      TimeZoneInfo.TransitionTime startTransition = TimeZoneInfo.TransitionTime.CreateFloatingDateRule(new DateTime(1, 1, 1, 4, 0, 0),
                                                                                                 10, 2, DayOfWeek.Sunday);
      TimeZoneInfo.TransitionTime endTransition = TimeZoneInfo.TransitionTime.CreateFloatingDateRule(new DateTime(1, 1, 1, 3, 0, 0),
                                                                                               3, 2, DayOfWeek.Sunday);
      // Define adjustment rule
      TimeSpan delta = new TimeSpan(1, 0, 0);
      TimeZoneInfo.AdjustmentRule adjustment = TimeZoneInfo.AdjustmentRule.CreateAdjustmentRule(new DateTime(1999, 10, 1),
                                            DateTime.MaxValue.Date, delta, startTransition, endTransition);
      // Create array for adjustment rules
      TimeZoneInfo.AdjustmentRule[] adjustments = {adjustment};
      // Define other custom time zone arguments
      string DisplayName = "(GMT-04:00) Antarctica/Palmer Time";
      string standardName = "Palmer Standard Time";
      string daylightName = "Palmer Daylight Time";
      TimeSpan offset = new TimeSpan(-4, 0, 0);
      TimeZoneInfo palmer = TimeZoneInfo.CreateCustomTimeZone(standardName, offset, DisplayName, standardName, daylightName, adjustments);
      resWriter.AddResource(palmer.Id.Replace(" ", String.Empty), palmer.ToSerializedString());

      // Save changes to .resx file
      resWriter.Generate();
      resWriter.Close();
      writeStream.Close();
   }

   private void DeserializeTimeZones()
   {
      TimeZoneInfo cst, palmer;
      string timeZoneString;
      ResourceManager resMgr = new ResourceManager("SerializeTimeZoneData.SerializedTimeZones", this.GetType().Assembly);

      // Attempt to retrieve time zone from system
      try
      {
         cst = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");
      }
      catch (TimeZoneNotFoundException)
      {
         // Time zone not in system; retrieve from resource
         timeZoneString = resMgr.GetString("CentralStandardTime");
         if (!String.IsNullOrEmpty(timeZoneString))
         {
            cst = TimeZoneInfo.FromSerializedString(timeZoneString);
         }
         else
         {
            MessageBox.Show("Unable to create Central Standard Time Zone. Application must exit.", "Application Error");
            return;
         }
      }
      // Retrieve custom time zone
      try
      {
         timeZoneString = resMgr.GetString("PalmerStandardTime");
         palmer = TimeZoneInfo.FromSerializedString(timeZoneString);
      }
      catch (MissingManifestResourceException)
      {
         MessageBox.Show("Unable to retrieve the Palmer Standard Time Zone from the resource file. Application must exit.");
         return;
      }
   }
}
```

This example serializes `System.TimeZoneInfo` objects so that they are available in a resource file at compile time.

Because the `System.Resources.ResXResourceWriter.Generate*` method adds complete header information to a .NET XML resource file, it cannot be used to add resources to an existing file. The example handles this by checking for the SerializedTimeZones.resx file and, if it exists, storing all of its resources other than the two serialized time zones to a generic `System.Collections.Generic.Dictionary`2` object. The existing file is then deleted and the existing resources are added to a new SerializedTimeZones.resx file. The serialized time zone data is also added to this file.

The key (or **Name**) fields of resources should not contain embedded spaces. The `System.String.Replace(System.String,System.String)` method is called to remove all embedded spaces in the time zone identifiers before they are assigned to the resource file.
