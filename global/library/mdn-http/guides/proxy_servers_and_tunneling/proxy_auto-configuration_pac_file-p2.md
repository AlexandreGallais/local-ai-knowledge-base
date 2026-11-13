---
title: "Proxy Auto-Configuration (PAC) file (part 2 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/proxy_servers_and_tunneling/proxy_auto-configuration_pac_file/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Proxy Auto-Configuration (PAC) file (part 2 of 3)

## Predefined functions and environment

These functions can be used in building the PAC file:

- Hostname based conditions
  - `isPlainHostName()`
  - `dnsDomainIs()`
  - `localHostOrDomainIs()`
  - `isResolvable()`
  - `isInNet()`

- Related utility functions
  - `dnsResolve()`
  - `convert_addr()`
  - `myIpAddress()`
  - `dnsDomainLevels()`

- URL/hostname based conditions
  - `shExpMatch()`

- Time based conditions
  - `weekdayRange()`
  - `dateRange()`
  - `timeRange()`

- Logging utility
  - `alert()`

- There was one associative array (object) already defined, because at the time JavaScript code was unable to define it by itself:
  - `ProxyConfig.bindings` (deprecated)

> **Note:**
> pactester (part of the pacparser package) was used to test the following syntax examples.
>
> - The PAC file is named `proxy.pac`
> - Command line: `pactester -p ~/pacparser-master/tests/proxy.pac -u https://www.mozilla.org` (passes the `host` parameter `www.mozilla.org` and the `url` parameter `https://www.mozilla.org`)

### isPlainHostName()

#### Syntax

```js
isPlainHostName(host)
```

#### Parameters

- host
    The hostname from the URL (excluding port number).

#### Description

True if and only if there is no domain name in the hostname (no dots).

#### Examples

```js
isPlainHostName("www.mozilla.org"); // false
isPlainHostName("www"); // true
```

### `dnsDomainIs()`

#### Syntax

```js
dnsDomainIs(host, domain)
```

#### Parameters

- host
    Is the hostname from the URL.
- domain
    Is the domain name to test the hostname against.

#### Description

Returns true if and only if the domain of hostname matches.

#### Examples

```js
dnsDomainIs("www.mozilla.org", ".mozilla.org") // true
dnsDomainIs("www", ".mozilla.org") // false
```

### localHostOrDomainIs()

#### Syntax

```js
localHostOrDomainIs(host, hostDom)
```

#### Parameters

- host
    The hostname from the URL.
- hostDom
    Fully qualified hostname to match against.

#### Description

Is true if the hostname matches _exactly_ the specified hostname, or if there is no domain name part in the hostname, but the unqualified hostname matches.

#### Examples

```js
localHostOrDomainIs("www.mozilla.org", "www.mozilla.org") // true (exact match)
localHostOrDomainIs("www", "www.mozilla.org") // true (hostname match, domain not specified)
localHostOrDomainIs("www.google.com", "www.mozilla.org") // false (domain name mismatch)
localHostOrDomainIs("home.mozilla.org", "www.mozilla.org") // false (hostname mismatch)
```

### isResolvable()

#### Syntax

```js
isResolvable(host)
```

#### Parameters

- host
    is the hostname from the URL.

Tries to resolve the hostname. Returns true if succeeds.

#### Examples

```js
isResolvable("www.mozilla.org") // true
```

### isInNet()

#### Syntax

```js
isInNet(host, pattern, mask)
```

#### Parameters

- host
    a DNS hostname, or IP address. If a hostname is passed, it will be resolved into an IP address by this function.
- pattern
    an IP address pattern in the dot-separated format.
- mask
    mask for the IP address pattern informing which parts of the IP address should be matched against. 0 means ignore, 255 means match.

True if and only if the IP address of the host matches the specified IP address pattern.

Pattern and mask specification is done the same way as for SOCKS configuration.

#### Examples

```js
function FindProxyForURL(url, host) {
  alert(isInNet(host, "192.0.2.172", "255.255.255.255"));
  // "PAC-alert: true"
}
```

### dnsResolve()

```js
dnsResolve(host)
```

#### Parameters

- host
    hostname to resolve.

Resolves the given DNS hostname into an IP address, and returns it in the dot-separated format as a string.

#### Example

```js
dnsResolve("www.mozilla.org"); // returns the string "104.16.41.2"
```

### convert_addr()

#### Syntax

```js
convert_addr(ipaddr)
```

#### Parameters

- ipaddr
    Any dotted address such as an IP address or mask.

Concatenates the four dot-separated bytes into one 4-byte word and converts it to decimal.

#### Example

```js
convert_addr("192.0.2.172"); // returns the decimal number 1745889538
```

### myIpAddress()

#### Syntax

```js
myIpAddress()
```

#### Parameters

(none)

#### Return value

Returns the server IP address of the machine Firefox is running on, as a string in the dot-separated integer format. In order to be more helpful, it will try several alternatives before falling back to the loopback address (like `127.0.0.1`).

#### Example

```js
myIpAddress()
```

### dnsDomainLevels()

#### Syntax

```js
dnsDomainLevels(host)
```

#### Parameters

- host
    is the hostname from the URL.

Returns the number (integer) of DNS domain levels (number of dots) in the hostname.

#### Examples

```js
dnsDomainLevels("www") // 0
dnsDomainLevels("mozilla.org") // 1
dnsDomainLevels("www.mozilla.org"); // 2
```

### shExpMatch()

#### Syntax

```js
shExpMatch(str, shExp)
```

#### Parameters

- str
    is any string to compare (e.g., the URL, or the hostname).
- shExp
    is a shell expression to compare against.

Returns `true` if the string matches the specified shell glob expression.

Support for particular glob expression syntax varies across browsers:
`*` (match any number of characters) and `?` (match one character) are always supported,
while `[characters]` and `[^characters]` are additionally supported by some implementations (including Firefox).

> **Note:**
> If supported by the client, JavaScript regular expressions typically provide a more powerful and consistent way to pattern-match URLs (and other strings).

#### Examples

```js
shExpMatch("http://home.netscape.com/people/ari/index.html", "*/ari/*"); // returns true
shExpMatch("http://home.netscape.com/people/montulli/index.html", "*/ari/*"); // returns false
```

### weekdayRange()

#### Syntax

```js
weekdayRange(wd1, wd2)
weekdayRange(wd1, wd2, gmt)
```

> **Note:**
> (Before Firefox 49) wd1 must be less than wd2 if you want the function to evaluate these parameters as a range. See the warning below.

#### Parameters

- wd1 and wd2
    One of the ordered weekday strings: `"SUN"`, `"MON"`, `"TUE"`, `"WED"`, `"THU"`, `"FRI"`, `"SAT"`
- gmt
    Is either the string "GMT" or is left out.

Only the first parameter is mandatory. Either the second, the third, or both may be left out.

If only one parameter is present, the function returns a value of true on the weekday that the parameter represents. If the string "GMT" is specified as a second parameter, times are taken to be in GMT. Otherwise, they are assumed to be in the local timezone.

If both **wd1** and **wd2** are defined, the condition is true if the current weekday is in between those two _ordered_ weekdays. Bounds are inclusive, _but the bounds are ordered_. If the "GMT" parameter is specified, times are taken to be in GMT. Otherwise, the local timezone is used.

> **Warning:**
> _The order of the days matters_.
> Before Firefox 49, `weekdayRange("SUN", "SAT")` will always evaluate to `true`.
> Now `weekdayRange("WED", "SUN")` will only evaluate to `true`
> if the current day is Wednesday or Sunday.

#### Examples

```js
weekdayRange("MON", "FRI") // returns true Monday through Friday (local timezone)
weekdayRange("MON", "FRI", "GMT") // returns true Monday through Friday (GMT timezone)
weekdayRange("SAT") // returns true on Saturdays local time
weekdayRange("SAT", "GMT") // returns true on Saturdays GMT time
weekdayRange("FRI", "MON") // returns true Friday and Monday only (note, the order does matter!)
```

### dateRange()

#### Syntax

```js
dateRange(dayOrMonthOrYear)
dateRange(dayOrMonthOrYear, gmt)  // ambiguity is resolved by assuming year is greater than 31
dateRange(day1, day2)
dateRange(day1, day2, gmt)
dateRange(month1, month2)
dateRange(month1, month2, gmt)
dateRange(year1, year2)
dateRange(year1, year2, gmt)
dateRange(day1, month1, day2, month2)
dateRange(day1, month1, day2, month2, gmt)
dateRange(month1, year1, month2, year2)
dateRange(month1, year1, month2, year2, gmt)
dateRange(day1, month1, year1, day2, month2, year2)
dateRange(day1, month1, year1, day2, month2, year2, gmt)
```

> **Note:**
> (Before Firefox 49) day1 must be less than day2, month1 must be less than month2, and year1 must be less than year2 if you want the function to evaluate these parameters as a range. See the warning below.

#### Parameters

- day
    Is the ordered day of the month between 1 and 31 (as an integer).
- month
    Is one of the ordered month strings: `"JAN"`, `"FEB"`, `"MAR"`, `"APR"`, `"MAY"`, `"JUN"`, `"JUL"`, `"AUG"`, `"SEP"`, `"OCT"`, `"NOV"`, `"DEC"`.
- year
    Is the ordered full year integer number. For example, 2016 (**not** 16).
- gmt
    Is either the string "GMT", which makes time comparison occur in GMT timezone, or is left out. If left unspecified, times are taken to be in the local timezone.

If only a single value is specified (from each category: day, month, year), the function returns a true value only on days that match that specification. If both values are specified, the result is true between those times, including bounds, _but the bounds are ordered_.

> **Warning:**
> **The order of the days, months, and years matter**. Before Firefox 49, `dateRange("JAN", "DEC")` will always evaluate to `true`. Now `dateRange("DEC", "JAN")` will only evaluate true if the current month is December or January.

#### Examples

```js
dateRange(1) // returns true on the first day of each month, local timezone
dateRange(1, "GMT") // returns true on the first day of each month, GMT timezone
dateRange(1, 15) // returns true on the first half of each month
dateRange(24, "DEC");// returns true on 24th of December each year
dateRange("JAN", "MAR"); // returns true on the first quarter of the year

dateRange(1, "JUN", 15, "AUG");
// returns true from June 1st until August 15th, each year
// (including June 1st and August 15th)

dateRange(1, "JUN", 1995, 15, "AUG", 1995);
// returns true from June 1st, 1995, until August 15th, same year

dateRange("OCT", 1995, "MAR", 1996);
// returns true from October 1995 until March 1996
// (including the entire month of October 1995 and March 1996)

dateRange(1995);
// returns true during the entire year of 1995

dateRange(1995, 1997);
// returns true from beginning of year 1995 until the end of year 1997
```

### timeRange()

#### Syntax

```js
// The full range of expansions is analogous to dateRange.
timeRange(hour1, min1, sec1, hour2, min2, sec2)
timeRange(hour1, min1, sec1, hour2, min2, sec2, gmt)
```

> **Note:**
> (Before Firefox 49) the category hour1, min1, sec1 must be less than the category hour2, min2, sec2 if you want the function to evaluate these parameters as a range. See the warning below.

#### Parameters

- hour
    Is the hour from 0 to 23. (0 is midnight, 23 is 11 pm.)
- min
    Minutes from 0 to 59.
- sec
    Seconds from 0 to 59.
- gmt
    Either the string "GMT" for GMT timezone, or not specified, for local timezone.

If only a single value is specified (from each category: hour, minute, second), the function returns a true value only at times that match that specification. If both values are specified, the result is true between those times, including bounds, _but the bounds are ordered_.

> **Warning:**
> **The order of the hour, minute, second matter**. Before Firefox 49, `timeRange(0, 23)` will always evaluate to true. Now `timeRange(23, 0)` will only evaluate true if the current hour is 23:00 or midnight.

#### Examples

```js
timeRange(12); // returns true from noon to 1pm
timeRange(12, 13) // returns true from noon to 1pm
timeRange(12, "GMT") // returns true from noon to 1pm, in the GMT timezone
timeRange(9, 17) // returns true from 9am to 5pm
timeRange(8, 30, 17, 0) // returns true from 8:30am to 5:00pm
timeRange(0, 0, 0, 0, 0, 30) // returns true between midnight and 30 seconds past midnight
```

### alert()

#### Syntax

```js
alert(message)
```

#### Parameters

- message
    The string to log

Logs the message in the browser console.

#### Examples

```js
alert(`${host} = ${dnsResolve(host)}`) // logs the host name and its IP address
alert("Error: shouldn't reach this clause.") // log a message
```

## Example 1

### Use proxy for everything except local hosts

> **Note:**
> Since all of the examples that follow are very specific, they have not been tested.

All hosts which aren't fully qualified, or the ones that are in local domain, will be connected to directly. Everything else will go through `w3proxy.mozilla.org:8080`. If the proxy goes down, connections become direct automatically:

```js
function FindProxyForURL(url, host) {
  if (isPlainHostName(host) || dnsDomainIs(host, ".mozilla.org")) {
    return "DIRECT";
  }
  return "PROXY w3proxy.mozilla.org:8080; DIRECT";
}
```

> **Note:**
> This is the simplest and most efficient autoconfig file for cases where there's only one proxy.

## Example 2

### As above, but use proxy for local servers which are outside the firewall

If there are hosts (such as the main Web server) that belong to the local domain but are outside the firewall and are only reachable through the proxy server, those exceptions can be handled using the `localHostOrDomainIs()` function:

```js
function FindProxyForURL(url, host) {
  if (
    (isPlainHostName(host) || dnsDomainIs(host, ".mozilla.org")) &&
    !localHostOrDomainIs(host, "www.mozilla.org") &&
    !localHostOrDomainIs(host, "merchant.mozilla.org")
  ) {
    return "DIRECT";
  }
  return "PROXY w3proxy.mozilla.org:8080; DIRECT";
}
```

The above example will use the proxy for everything except local hosts in the mozilla.org domain, with the further exception that hosts `www.mozilla.org` and `merchant.mozilla.org` will go through the proxy.

> **Note:**
> The order of the above exceptions for efficiency: `localHostOrDomainIs()` functions only get executed for URLs that are in local domain, not for every URL. Be careful to note the parentheses around the _or_ expression before the _and_ expression to achieve the above-mentioned efficient behavior.

## Example 3

### Use proxy only if cannot resolve host

This example will work in an environment where the internal DNS server is set up so that it can only resolve internal host names, and the goal is to use a proxy only for hosts that aren't resolvable:

```js
function FindProxyForURL(url, host) {
  if (isResolvable(host)) {
    return "DIRECT";
  }
  return "PROXY proxy.example.com:8080";
}
```

The above requires consulting the DNS every time; it can be grouped intelligently with other rules so that DNS is consulted only if other rules do not yield a result:

```js
function FindProxyForURL(url, host) {
  if (
    isPlainHostName(host) ||
    dnsDomainIs(host, ".example.com") ||
    isResolvable(host)
  ) {
    return "DIRECT";
  }
  return "PROXY proxy.example.com:8080";
}
```
