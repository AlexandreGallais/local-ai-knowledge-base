---
title: "CultureInfo class (part 9 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureInfo class (part 9 of 10)

## CultureInfo.GetConsoleFallbackUICulture() method

```csharp
public System.Globalization.CultureInfo GetConsoleFallbackUICulture ();
```

Gets an alternate user interface culture suitable for console applications when the default graphic user interface culture is unsuitable.

Returns: An alternate culture that is used to read and display text on the console.

#### Remarks
Languages such as Arabic, Hebrew, Urdu, and Syriac are based on bidirectional text. Windows applications, which have a graphical user interface, support bidirectional languages. However, console applications, which employ the text user interface of the operating system console, do not provide bidirectional support. Therefore, if you localize a console application to Arabic or Hebrew, your application displays unreadable text on the console screen.

The user interface culture specifies the resources an application needs to support user input and output, and by default is the same as the operating system culture. For example, the `CurrentUICulture` property returns an Arabic culture for an Arabic operating system. Use the `CultureInfo.GetConsoleFallbackUICulture` method to retrieve a culture suitable for a console application user interface. After your application retrieves the fallback user interface culture, it should assign the culture to the current user interface culture of the current thread. For more information, see the "Explicitly Setting the Current UI Culture" section of the `CurrentUICulture` property.

The following are predefined cultures that have a different fallback user-interface culture name from the predefined culture name.

| Predefined culture          | Culture name | Fallback user-interface culture name |
|-----------------------------|--------------|--------------------------------------|
| Amharic                     | am           | en-US                                |
| Amharic (Ethiopia)          | am-ET        | en-US                                |
| (neutral Arabic)            | ar           | en-US                                |
| Arabic (U.A.E.)             | ar-AE        | en-US                                |
| Arabic (Bahrain)            | ar-BH        | en-US                                |
| Arabic (Algeria)            | ar-DZ        | fr-FR                                |
| Arabic (Egypt)              | ar-EG        | en-US                                |
| Arabic (Iraq)               | ar-IQ        | en-US                                |
| Arabic (Jordan)             | ar-JO        | en-US                                |
| Arabic (Kuwait)             | ar-KW        | en-US                                |
| Arabic (Lebanon)            | ar-LB        | en-US                                |
| Arabic (Libya)              | ar-LY        | en-US                                |
| Arabic (Morocco)            | ar-MA        | fr-FR                                |
| Arabic (Oman)               | ar-OM        | en-US                                |
| Arabic (Qatar)              | ar-QA        | en-US                                |
| Arabic (Saudi Arabia)       | ar-SA        | en-US                                |
| Arabic (Syria)              | ar-SY        | en-US                                |
| Arabic (Tunisia)            | ar-TN        | fr-FR                                |
| Arabic (Yemen)              | ar-YE        | en-US                                |
| Assamese                    | as           | en-US                                |
| Assamese (India)            | as-IN        | en-US                                |
| Bangla                      | bn           | en-US                                |
| Bangla (Bangladesh)         | bn-BD        | en-US                                |
| Bangla (India)              | bn-IN        | en-US                                |
| Tibetan                     | bo           | en-US                                |
| Tibetan (PRC)               | bo-CN        | en-US                                |
| Divehi                      | dv           | en-US                                |
| Divehi (India)              | dv-MV        | en-US                                |
| Persian                     | fa           | en-US                                |
| Persian (Iran)              | fa-IR        | en-US                                |
| Gujarati                    | gu           | en-US                                |
| Gujarati (India)            | gu-IN        | en-US                                |
| Hebrew                      | he           | en-US                                |
| Hebrew (Israel)             | he-IL        | en-US                                |
| Hindi                       | hi           | en-US                                |
| Hindi (India)               | hi-IN        | en-US                                |
| Yi                          | ii           | en-US                                |
| Yi (PRC)                    | ii-CN        | en-US                                |
| Inukitut Syllabics          | iu-Cans      | en-US                                |
| Inukitut Syllabics (Canada) | iu-Cans-CA   | en-US                                |
| Khmer                       | km           | en-US                                |
| Khmer (Cambodia)            | km-KH        | en-US                                |
| Kannada                     | kn           | en-US                                |
| Kannada (India)             | kn-IN        | en-US                                |
| Konkani                     | kok          | en-US                                |
| Konkani (India)             | kok-IN       | en-US                                |
| Lao                         | lo           | en-US                                |
| Lao (Lao P.D.R.)            | lo-LA        | en-US                                |
| Malayalam                   | ml           | en-US                                |
| Malayalam (India)           | ml-IN        | en-US                                |
| Mohawk                      | moh          | en-US                                |
| Mohawk (Canada)             | moh-CA       | en-US                                |
| Marathi                     | mr           | en-US                                |
| Marathi (India)             | mr-IN        | en-US                                |
| Nepali                      | ne           | en-US                                |
| Nepali (Nepal)              | ne-NP        | en-US                                |
| Norwegian                   | no           | nb-NO                                |
| Odiya                       | or           | en-US                                |
| Odiya (India)               | or-IN        | en-US                                |
| Punjabi                     | pa           | en-US                                |
| Punjabi (India)             | pa-IN        | en-US                                |
| Dari                        | prs          | en-US                                |
| Dari (Afghanistan)          | prs-AF       | en-US                                |
| Pashto                      | ps           | en-US                                |
| Pashto (Afghanistan)        | ps-AF        | en-US                                |
| Sanskrit                    | sa           | en-US                                |
| Sanskrit (India)            | sa-IN        | en-US                                |
| Sinhala                     | si           | en-US                                |
| Sinhala (Sri Lanka)         | si-LK        | en-US                                |
| Syriac                      | syr          | en-US                                |
| Syriac (Syria)              | syr-SY       | en-US                                |
| Tamil                       | ta           | en-US                                |
| Tamil (India)               | ta-IN        | en-US                                |
| Telugu                      | te           | en-US                                |
| Telugu (India)              | te-IN        | en-US                                |
| Thai                        | th           | en-US                                |
| Thai (Thailand)             | th-Th        | en-US                                |
| Uighur                      | ug           | en-US                                |
| Uighur (PRC)                | ug-CN        | en-US                                |
| Urdu                        | ur           | en-US                                |
| Urdu (Pakistan)             | ur-PK        | en-US                                |
| Vietnamese                  | vi           | en-US                                |
| Vietnamese (Vietnam)        | vi-VN        | en-US                                |

Your application can use `CultureAndRegionInfoBuilder` to create a replacement for a culture, and that culture can have a console fallback culture of your choosing.

#### Examples
The following code example displays the fallback user interface culture associated with a culture object.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/GetConsoleFallbackUICulture/cfuic.cs._

## CultureInfo.GetCultureInfo(Int32) method

```csharp
public static System.Globalization.CultureInfo GetCultureInfo (int culture);
```

Retrieves a cached, read-only instance of a culture by using the specified culture identifier.

Parameters:

- `culture`: A locale identifier (LCID).

Returns: A read-only `CultureInfo` object.

Exceptions:

- `ArgumentOutOfRangeException`: `culture` is less than zero.
- `CultureNotFoundException`: `culture` specifies a culture that is not supported. See the Notes to Caller section for more information.

#### Remarks
We recommend that you use the string overload of this method (`GetCultureInfo`), because locale names should be used instead of LCIDs. For custom locales, the locale name is required.

If `culture` is the locale identifier of the current culture, the returned `CultureInfo` object does not reflect any user overrides.

> **Note:**
> LCIDs are being deprecated, and implementers are strongly encouraged to use newer versions of APIs that support BCP 47 locale names instead. Each LCID can be represented by a BCP 47 locale name, but the reverse is not true. The LCID range is restricted and unable to uniquely identify all the possible combinations of language and region.

## CultureInfo.GetCultureInfo(String) method

```csharp
public static System.Globalization.CultureInfo GetCultureInfo (string name);
```

Retrieves a cached, read-only instance of a culture using the specified culture name.

Parameters:

- `name`: The name of a culture. `name` is not case-sensitive.

Returns: A read-only `CultureInfo` object.

Exceptions:

- `ArgumentNullException`: `name` is null.
- `CultureNotFoundException`: `name` specifies a culture that is not supported. See the Notes to Callers section for more information.

#### Remarks

For a list of predefined culture names on Windows systems, see the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47. In addition, starting with Windows 10, `name` can be any valid BCP-47 language tag.

The `CultureInfo.GetCultureInfo` method retrieves a cached, read-only `CultureInfo` object. It offers better performance than a corresponding call to the `%23ctor` constructor.

If `name` is the name of the current culture, the returned `CultureInfo` object does not reflect any user overrides. This makes the method suitable for server applications or tools that do not have a real user account on the system and that need to load multiple cultures efficiently.

If `name` is `Empty`, the method returns the invariant culture. This is equivalent to retrieving the value of the `InvariantCulture` property.

## CultureInfo.GetCultureInfo(String, Boolean) method

```csharp
public static System.Globalization.CultureInfo GetCultureInfo (string name, bool predefinedOnly);
```

Retrieves a cached, read-only instance of a culture.

Parameters:

- `name`: The name of a culture. It is not case-sensitive.
- `predefinedOnly`: `true` if requesting to create an instance of a culture that is known by the platform. `false` if it is ok to retreive a made-up culture even if the platform does not carry data for it.

Returns: A read-only instance of a culture.

#### Remarks

By default, when trying to create any culture and the underlying platform (Windows NLS or ICU) does not carry specific data for this culture, the platform will try constructing a culture with data from other cultures or some constant values.

Setting `predefinedOnly` to `true` will ensure a culture is created only if the platform has real data for that culture.

## CultureInfo.GetCultureInfo(String, String) method

```csharp
public static System.Globalization.CultureInfo GetCultureInfo (string name, string altName);
```

Retrieves a cached, read-only instance of a culture. Parameters specify a culture that is initialized with the `TextInfo` and `CompareInfo` objects specified by another culture.

Parameters:

- `name`: The name of a culture. `name` is not case-sensitive.
- `altName`: The name of a culture that supplies the `TextInfo` and `CompareInfo` objects used to initialize `name`. `altName` is not case-sensitive.

Returns: A read-only `CultureInfo` object.

Exceptions:

- `ArgumentNullException`: `name` or `altName` is null.
- `CultureNotFoundException`: `name` or `altName` specifies a culture that is not supported. See the Notes to Callers section for more information.

#### Remarks
For a list of predefined culture names on Windows systems, see the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47. In addition, starting with Windows 10, `name` can be any valid BCP-47 language tag.

The `CultureInfo.GetCultureInfo` method obtains a cached, read-only `CultureInfo` object. It offers better performance than a corresponding call to a `CultureInfo.%23ctor` constructor. The method is used to create a culture similar to that specified by the `name` parameter, but with different sorting and casing rules.

If `name` or `altName` is the name of the current culture, the returned objects do not reflect any user overrides. If `name` is `Empty`, the method returns the invariant culture. This is equivalent to retrieving the value of the `InvariantCulture` property. If `altName` is `Empty`, the method uses the writing system and comparison rules specified by the invariant culture.
