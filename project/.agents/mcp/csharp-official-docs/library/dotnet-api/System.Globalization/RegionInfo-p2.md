---
title: "RegionInfo class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/RegionInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegionInfo class (part 2 of 3)

## RegionInfo.ISOCurrencySymbol property

```csharp
public virtual string ISOCurrencySymbol { get; }
```

Gets the three-character ISO 4217 currency symbol associated with the country/region.

Returns: The three-character ISO 4217 currency symbol associated with the country/region.

The following example lists some of the ISO 4217 currency symbols returned by the `ISOCurrencySymbol` property.

> **Note:**
> Currency symbols can change over time. Such changes are typically reflected through updates to the underlying OS or the ICU libraries.

| Country/region                   | Currency name          | ISO 4217 currency symbol |
| -------------------------------- | ---------------------- | ------------------------ |
| Albania                          | Albanian Lek           | ALL                      |
| Algeria                          | Algerian Dinar         | DZD                      |
| Argentina                        | Argentine Peso         | ARS                      |
| Armenia                          | Armenian Dram          | AMD                      |
| Australia                        | Australian Dollar      | AUD                      |
| Austria                          | Euro                   | EUR                      |
| Azerbaijan                       | Azerbaijanian Manat    | AZN                      |
| Bahrain                          | Bahraini Dinar         | BHD                      |
| Belarus                          | Belarussian Ruble      | BYR                      |
| Belgium                          | Euro                   | EUR                      |
| Belize                           | Belize Dollar          | BZD                      |
| Bolivarian Republic of Venezuela | Venezuelan Bolivar     | VEF                      |
| Bolivia                          | Boliviano              | BOB                      |
| Brazil                           | Real                   | BRL                      |
| Brunei                           | Brunei Dollar          | BND                      |
| Bulgaria                         | Euro                   | EUR                      |
| Canada                           | Canadian Dollar        | CAD                      |
| Caribbean                        | US Dollar              | USD                      |
| Chile                            | Chilean Peso           | CLP                      |
| Colombia                         | Colombian Peso         | COP                      |
| Costa Rica                       | Costa Rican Colon      | CRC                      |
| Croatia                          | Croatian Kuna          | HRK                      |
| Czech Republic                   | Czech Koruna           | CZK                      |
| Denmark                          | Danish Krone           | DKK                      |
| Dominican Republic               | Dominican Peso         | DOP                      |
| Ecuador                          | US Dollar              | USD                      |
| Egypt                            | Egyptian Pound         | EGP                      |
| El Salvador                      | U.S. Dollar            | USD                      |
| Estonia                          | Estonian Kroon         | EEK                      |
| Ethiopia                         | Ethiopian Birr         | ETB                      |
| Faroe Islands                    | Danish Krone           | DKK                      |
| Finland                          | Euro                   | EUR                      |
| France                           | Euro                   | EUR                      |
| Georgia                          | Lari                   | GEL                      |
| Germany                          | Euro                   | EUR                      |
| Greece                           | Euro                   | EUR                      |
| Guatemala                        | Guatemalan Quetzal     | GTQ                      |
| Honduras                         | Honduran Lempira       | HNL                      |
| Hong Kong SAR                    | Hong Kong Dollar       | HKD                      |
| Hungary                          | Hungarian Forint       | HUF                      |
| Iceland                          | Icelandic Krona        | ISK                      |
| India                            | Indian Rupee           | INR                      |
| Indonesia                        | Indonesian Rupiah      | IDR                      |
| Iran                             | Iranian Rial           | IRR                      |
| Iraq                             | Iraqi Dinar            | IQD                      |
| Ireland                          | Euro                   | EUR                      |
| Islamic Republic of Pakistan     | Pakistan Rupee         | PKR                      |
| Israel                           | Israeli New Shekel     | ILS                      |
| Italy                            | Euro                   | EUR                      |
| Jamaica                          | Jamaican Dollar        | JMD                      |
| Japan                            | Japanese Yen           | JPY                      |
| Jordan                           | Jordanian Dinar        | JOD                      |
| Kazakhstan                       | Tenge                  | KZT                      |
| Kenya                            | Kenyan Shilling        | KES                      |
| Korea                            | Korean Won             | KRW                      |
| Kuwait                           | Kuwaiti Dinar          | KWD                      |
| Kyrgyzstan                       | som                    | KGS                      |
| Latvia                           | Latvian Lats           | LVL                      |
| Lebanon                          | Lebanese Pound         | LBP                      |
| Libya                            | Libyan Dinar           | LYD                      |
| Liechtenstein                    | Swiss Franc            | CHF                      |
| Lithuania                        | Lithuanian Litas       | LTL                      |
| Luxembourg                       | Euro                   | EUR                      |
| Macao SAR                        | Macao Pataca           | MOP                      |
| North Macedonia                  | Macedonian Denar       | MKD                      |
| Malaysia                         | Malaysian Ringgit      | MYR                      |
| Maldives                         | Rufiyaa                | MVR                      |
| Mexico                           | Mexican Peso           | MXN                      |
| Mongolia                         | Tugrik                 | MNT                      |
| Morocco                          | Moroccan Dirham        | MAD                      |
| Netherlands                      | Euro                   | EUR                      |
| New Zealand                      | New Zealand Dollar     | NZD                      |
| Nicaragua                        | Nicaraguan Cordoba Oro | NIO                      |
| Norway                           | Norwegian Krone        | NOK                      |
| Oman                             | Omani Rial             | OMR                      |
| Panama                           | Panamanian Balboa      | PAB                      |
| Paraguay                         | Paraguay Guarani       | PYG                      |
| People's Republic of China       | PRC Renminbi           | CNY                      |
| Peru                             | Peruvian Nuevo Sol     | PEN                      |
| Philippines                      | Philippine Peso        | PHP                      |
| Poland                           | Polish Zloty           | PLN                      |
| Portugal                         | Euro                   | EUR                      |
| Principality of Monaco           | Euro                   | EUR                      |
| Puerto Rico                      | US Dollar              | USD                      |
| Qatar                            | Qatari Rial            | QAR                      |
| Romania                          | Romanian Leu           | RON                      |
| Russia                           | Russian Ruble          | RUB                      |
| Saudi Arabia                     | Saudi Riyal            | SAR                      |
| Serbia                           | Serbian Dinar          | RSD                      |
| Singapore                        | Singapore Dollar       | SGD                      |
| Slovakia                         | Euro                   | EUR                      |
| Slovenia                         | Euro                   | EUR                      |
| South Africa                     | South African Rand     | ZAR                      |
| Spain                            | Euro                   | EUR                      |
| Sweden                           | Swedish Krona          | SEK                      |
| Switzerland                      | Swiss Franc            | CHF                      |
| Syria                            | Syrian Pound           | SYP                      |
| Taiwan                           | New Taiwan Dollar      | TWD                      |
| Thailand                         | Thai Baht              | THB                      |
| Trinidad and Tobago              | Trinidad Dollar        | TTD                      |
| Tunisia                          | Tunisian Dinar         | TND                      |
| Turkey                           | Turkish Lira           | TRY                      |
| Ukraine                          | Ukrainian Hryvnia      | UAH                      |
| United Arab Emirates             | UAE Dirham             | AED                      |
| United Kingdom                   | UK Pound Sterling      | GBP                      |
| United States                    | US Dollar              | USD                      |
| Uruguay                          | Peso Uruguayo          | UYU                      |
| Uzbekistan                       | Uzbekistan Som         | UZS                      |
| Vietnam                          | Vietnamese Dong        | VND                      |
| Yemen                            | Yemeni Rial            | YER                      |
| Zimbabwe                         | Zimbabwe Dollar        | ZWL                      |

#### Examples

The following code example displays the properties of the `RegionInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencySymbol/regioninfo_properties.cs._

## RegionInfo.Name property

```csharp
public virtual string Name { get; }
```

Gets the name or ISO 3166 two-letter country/region code for the current `RegionInfo` object.

Returns: The value specified by the `name` parameter of the `RegionInfo.#ctor` constructor. The return value is in uppercase.

-or-

The two-letter code defined in ISO 3166 for the country/region specified by the `culture` parameter of the `RegionInfo.#ctor` constructor. The return value is in uppercase.

If the current `RegionInfo` object is created with the `%23ctor` constructor that takes a culture identifier parameter, the `Name` property value is one of the two-letter codes defined in ISO 3166 for the country/region and is formatted in uppercase. For example, the two-letter code for the United States is "US".

If the current `RegionInfo` object is created with the `%23ctor` constructor and is passed a full culture name such as "en-US", the `Name` property value is a full culture name in .NET Framework and just the region name in modern .NET.

#### Examples

The following code example displays the properties of the `RegionInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencySymbol/regioninfo_properties.cs._

## RegionInfo.NativeName property

```csharp
public virtual string NativeName { get; }
```

Gets the name of a country/region formatted in the native language of the country/region.

Returns: The native name of the country/region formatted in the language associated with the ISO 3166 country/region code.

> **Note:**
> The `NativeName` property retrieves a full culture name if the `RegionInfo` object is constructed using a full culture name.

We recommend that you use the culture name–for example, "en-US" for English (United States)–to access the `NativeName` property. The string used for this property depends on the language associated with the country/region. For example, the culture names `en-US` for English (United States) and `es-US` for Spanish (United States) can retrieve different values on Windows. Therefore, creating the `RegionInfo` object with only a country/region name of `US` is not specific enough to distinguish the appropriate string.

#### Examples

The following code example demonstrates the `NativeName` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencyEnglishName/rgn5props.cs._

## RegionInfo.ThreeLetterISORegionName property

```csharp
public virtual string ThreeLetterISORegionName { get; }
```

Gets the three-letter code defined in ISO 3166 for the country/region.

Returns: The three-letter code defined in ISO 3166 for the country/region.

The `ThreeLetterISORegionName` property contains the three-letter code defined in ISO 3166 for this country/region. For example, the three-letter code for United States is "USA".

Case is not significant. However, the `Name`, `TwoLetterISORegionName`, and `ThreeLetterISORegionName` properties return the appropriate code in uppercase.

#### Examples

The following code example displays the properties of the `RegionInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencySymbol/regioninfo_properties.cs._

## RegionInfo.ThreeLetterWindowsRegionName property

```csharp
public virtual string ThreeLetterWindowsRegionName { get; }
```

Gets the three-letter code assigned by Windows to the country/region represented by this `RegionInfo`.

Returns: The three-letter code assigned by Windows to the country/region represented by this `RegionInfo`.

For example, the three-letter code for United States is "USA".

#### Examples

The following code example displays the properties of the `RegionInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/RegionInfo/CurrencySymbol/regioninfo_properties.cs._
