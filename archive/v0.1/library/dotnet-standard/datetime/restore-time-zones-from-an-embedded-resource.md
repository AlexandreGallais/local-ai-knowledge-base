---
title: "How to: Restore time zones from an embedded resource"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/restore-time-zones-from-an-embedded-resource.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Restore time zones from an embedded resource

This topic describes how to restore time zones that have been saved in a resource file. For information and instructions about saving time zones, see How to: Save time zones to an embedded resource.

### To deserialize a TimeZoneInfo object from an embedded resource

1. If the time zone to be retrieved is not a custom time zone, try to instantiate it by using the `System.TimeZoneInfo.FindSystemTimeZoneById*` method.

2. Instantiate a `System.Resources.ResourceManager` object by passing the fully qualified name of the embedded resource file and a reference to the assembly that contains the resource file.

   If you cannot determine the fully qualified name of the embedded resource file, use the Ildasm.exe (IL Disassembler) to examine the assembly's manifest. An `.mresource` entry identifies the resource. In the example, the resource's fully qualified name is `SerializeTimeZoneData.SerializedTimeZones`.

   If the resource file is embedded in the same assembly that contains the time zone instantiation code, you can retrieve a reference to it by calling the `static` (`Shared` in Visual Basic) `System.Reflection.Assembly.GetExecutingAssembly*` method.

3. If the call to the `System.TimeZoneInfo.FindSystemTimeZoneById*` method fails, or if a custom time zone is to be instantiated, retrieve a string that contains the serialized time zone by calling the `System.Resources.ResourceManager.GetString*` method.

4. Deserialize the time zone data by calling the `System.TimeZoneInfo.FromSerializedString*` method.

## Example

The following example deserializes a `System.TimeZoneInfo` object stored in an embedded .NET XML resource file.

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

This code illustrates exception handling to ensure that a `System.TimeZoneInfo` object required by the application is present. It first tries to instantiate a `System.TimeZoneInfo` object by retrieving it from the registry using the `System.TimeZoneInfo.FindSystemTimeZoneById*` method. If the time zone cannot be instantiated, the code retrieves it from the embedded resource file.

Because data for custom time zones (time zones instantiated by using the `System.TimeZoneInfo.CreateCustomTimeZone*` method) are not stored in the registry, the code does not call the `System.TimeZoneInfo.FindSystemTimeZoneById*` to instantiate the time zone for Palmer, Antarctica. Instead, it immediately looks to the embedded resource file to retrieve a string that contains the time zone's data before it calls the `System.TimeZoneInfo.FromSerializedString*` method.

## Compiling the code

This example requires:

- That a reference to System.Windows.Forms.dll and System.Core.dll be added to the project.

- That the following namespaces be imported:

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

## See also

- Dates, times, and time zones
- Time zone overview
- How to: Save time zones to an embedded resource
