---
title: "Common Expression Language in Kubernetes (part 2 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/cel.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Common Expression Language in Kubernetes (part 2 of 4)

## Kubernetes CEL libraries

In additional to the CEL community libraries, Kubernetes includes CEL libraries
that are available everywhere CEL is used in Kubernetes.

### Kubernetes list library

The list library includes `indexOf` and `lastIndexOf`, which work similar to the
strings functions of the same names. These functions either the first or last
positional index of the provided element in the list.

The list library also includes `min`, `max` and `sum`. Sum is supported on all
number types as well as the duration type. Min and max are supported on all
comparable types.

`isSorted` is also provided as a convenience function and is supported on all
comparable types.

Examples:

Examples of CEL expressions using list library functions

   | CEL Expression
   | Purpose

   | <tt>names.isSorted()</tt>
   | Verify that a list of names is kept in alphabetical order

   | <tt>items.map(x, x.weight).sum() == 1.0</tt>
   | Verify that the "weights" of a list of objects sum to 1.0

   | <tt>lowPriorities.map(x, x.priority).max() < highPriorities.map(x, x.priority).min()</tt>
   | Verify that two sets of priorities do not overlap

   | <tt>names.indexOf('should-be-first') == 1</tt>
   | Require that the first name in a list if a specific value

See the Kubernetes List Library
godoc for more information.

### Kubernetes regex library

In addition to the `matches` function provided by the CEL standard library, the
regex library provides `find` and `findAll`, enabling a much wider range of
regex operations.

Examples:

Examples of CEL expressions using regex library functions

   | CEL Expression
   | Purpose

   | <tt>"abc 123".find('[0-9]+')</tt>
   | Find the first number in a string

   | <tt>"1, 2, 3, 4".findAll('[0-9]+').map(x, int(x)).sum() < 100</tt>
   | Verify that the numbers in a string sum to less than 100

See the Kubernetes regex library
godoc for more information.

### Kubernetes URL library

To make it easier and safer to process URLs, the following functions have been added:

- `isURL(string)` checks if a string is a valid URL according to the
  Go's net/url package. The string must be an
  absolute URL.
- `url(string) URL` converts a string to a URL or results in an error if the
  string is not a valid URL.

Once parsed via the `url` function, the resulting URL object has `getScheme`,
`getHost`, `getHostname`, `getPort`, `getEscapedPath` and `getQuery` accessors.

Examples:

Examples of CEL expressions using URL library functions

   | CEL Expression
   | Purpose

   | <tt>url('https://example.com:80/').getHost()</tt>
   | Gets the 'example.com:80' host part of the URL

   | <tt>url('https://example.com/path with spaces/').getEscapedPath()</tt>
   | Returns '/path%20with%20spaces/'

See the Kubernetes URL library
godoc for more information.

### Kubernetes IP address library

To make it easier and safer to process IP addresses, the following functions have been added:

- `isIP(string)` checks if a string is a valid IP address.
- `ip(string) IP` converts a string to an IP address object or results in an error if the string is not a valid IP address.

For both functions, the IP address must be an IPv4 or IPv6 address.
IPv4-mapped IPv6 addresses (e.g. `::ffff:1.2.3.4`) are not allowed.
IP addresses with zones (e.g. `fe80::1%eth0`) are not allowed.
Leading zeros in IPv4 address octets are not allowed.

Once parsed via the `ip` function, the resulting IP object has the
following library of member functions:

Available member functions of an IP address object

   | Member Function
   | CEL Return Value
   | Description

   | <tt>isCanonical()</tt>
   | bool
   |
    Returns true if the IP address is in its canonical form.
    There is exactly one canonical form for every IP address, so fields containing
    IPs in canonical form can just be treated as strings when checking for equality or uniqueness.

   | <tt>family()</tt>
   | int
   | Returns the IP address family, <tt>4</tt> for IPv4 and <tt>6</tt> for IPv6.

   | <tt>isUnspecified()</tt>
   | bool
   |
    Returns true if the IP address is the unspecified address.
    Either the IPv4 address "0.0.0.0" or the IPv6 address "::".

   | <tt>isLoopback()</tt>
   | bool
   |
    Returns true if the IP address is the loopback address.
    Either an IPv4 address with a value of 127.x.x.x or an IPv6 address with a value of ::1.

   | <tt>isLinkLocalMulticast()</tt>
   | bool
   |
    Returns true if the IP address is a link-local multicast address.
    Either an IPv4 address with a value of 224.0.0.x or an IPv6 address in the network ff00::/8.

   | <tt>isLinkLocalUnicast()</tt>
   | bool
   |
    Returns true if the IP address is a link-local unicast address.
    Either an IPv4 address with a value of 169.254.x.x or an IPv6 address in the network fe80::/10.

   | <tt>isGlobalUnicast()</tt>
   | bool
   |
    Returns true if the IP address is a global unicast address.
    Either an IPv4 address that is not zero or 255.255.255.255 or an IPv6 address that is not a link-local unicast, loopback or multicast address.

Examples:

Examples of CEL expressions using IP address library functions

   | CEL Expression
   | Purpose

   | <tt>isIP('127.0.0.1')</tt>
   | Returns true for a valid IP.

   | <tt>ip('2001:db8::abcd').isCanonical()</tt>
   | Returns true for a canonical IPv6.

   | <tt>ip('2001:DB8::ABCD').isCanonical()</tt>
   | Returns false because the canonical form is lowercase.

   | <tt>ip('127.0.0.1').family() == 4</tt>
   | Check the address family of an IP.

   | <tt>ip('::1').isLoopback()</tt>
   | Check if an IP is a loopback address.

   | <tt>ip('192.168.0.1').isGlobalUnicast()</tt>
   | Check if an IP is a global unicast address.

See the Kubernetes IP address library godoc for more information.

### Kubernetes CIDR library

CIDR provides a CEL function library extension of CIDR notation parsing functions.

#### `cidr`

Converts a string in CIDR notation to a network address representation or results in an error if the string is not a valid CIDR notation.
The CIDR must be an IPv4 or IPv6 subnet address with a mask.
Leading zeros in IPv4 address octets are not allowed.
IPv4-mapped IPv6 addresses (e.g. `::ffff:1.2.3.4/24`) are not allowed.

<tt>cidr(<string>) <CIDR></tt>

Examples:

Examples of CEL expressions using the cidr function

   | CEL Expression
   | Purpose

   | <tt>cidr('192.168.0.0/16')</tt>
   | Returns an IPv4 address with a CIDR mask.

   | <tt>cidr('::1/128')</tt>
   | Returns an IPv6 address with a CIDR mask.

   | <tt>cidr('192.168.0.0/33')</tt>
   | Error, because the prefix length exceeds the IPv4 address size.

   | <tt>cidr('::1/129')</tt>
   | Error, because the prefix length exceeds the IPv6 address size.

   | <tt>cidr('192.168.0.1/16')</tt>
   | Error, because there are non-0 bits after the prefix.

#### `isCIDR`

Returns true if a string is a valid CIDR notation representation of a subnet with mask.
The CIDR must be an IPv4 or IPv6 subnet address with a mask.
Leading zeros in IPv4 address octets are not allowed.
IPv4-mapped IPv6 addresses (e.g. `::ffff:1.2.3.4/24`) are not allowed.

<tt>isCIDR(<string>) <bool></tt>

Examples:

Examples of CEL expressions using the isCIDR function

   | CEL Expression
   | Purpose

   | <tt>isCIDR('192.168.0.0/16')</tt>
   | Returns true for a valid IPv4 CIDR.

   | <tt>isCIDR('::1/128')</tt>
   | Returns true for a valid IPv6 CIDR.

   | <tt>isCIDR('192.168.0.0/33')</tt>
   | Returns false, because the prefix length exceeds the IPv4 address size.

   | <tt>isCIDR('::1/129')</tt>
   | Returns false, because the prefix length exceeds the IPv6 address size.

#### `containsIP` / `containsCIDR` / `ip` / `masked` / `prefixLength`

- `containsIP`: Returns true if a the CIDR contains the given IP address.
The IP address must be an IPv4 or IPv6 address.
May take either a string or IP address as an argument.

- `containsCIDR`: Returns true if a the CIDR contains the given CIDR.
The CIDR must be an IPv4 or IPv6 subnet address with a mask.
May take either a string or CIDR as an argument.

- `ip`: Returns the IP address representation of the CIDR.

- `masked`: Returns the CIDR representation of the network address with a masked prefix.
This can be used to return the canonical form of the CIDR network.

- `prefixLength`: Returns the prefix length of the CIDR in bits.
This is the number of bits in the mask.

Examples:

Examples of CEL expressions using CIDR library functions

   | CEL Expression
   | Purpose

   | <tt>cidr('192.168.0.0/24').containsIP(ip('192.168.0.1'))</tt>
   | Checks if a CIDR contains a given IP address (IP object).

   | <tt>cidr('192.168.0.0/24').containsIP(ip('192.168.1.1'))</tt>
   | Checks if a CIDR contains a given IP address (IP object).

   | <tt>cidr('192.168.0.0/24').containsIP('192.168.0.1')</tt>
   | Checks if a CIDR contains a given IP address (string).

   | <tt>cidr('192.168.0.0/24').containsIP('192.168.1.1')</tt>
   | Checks if a CIDR contains a given IP address (string).

   | <tt>cidr('192.168.0.0/16').containsCIDR(cidr('192.168.10.0/24'))</tt>
   | Checks if a CIDR contains another given CIDR (CIDR object).

   | <tt>cidr('192.168.1.0/24').containsCIDR(cidr('192.168.2.0/24'))</tt>
   | Checks if a CIDR contains another given CIDR (CIDR object).

   | <tt>cidr('192.168.0.0/16').containsCIDR('192.168.10.0/24')</tt>
   | Checks if a CIDR contains another given CIDR (string).

   | <tt>cidr('192.168.1.0/24').containsCIDR('192.168.2.0/24')</tt>
   | Checks if a CIDR contains another given CIDR (string).

   | <tt>cidr('192.168.0.1/24').ip()</tt>
   | Returns the IP address part of a CIDR.

   | <tt>cidr('192.168.0.1/24').ip().family()</tt>
   | Returns the family of the IP address part of a CIDR.

   | <tt>cidr('::1/128').ip()</tt>
   | Returns the IP address part of an IPv6 CIDR.

   | <tt>cidr('::1/128').ip().family()</tt>
   | Returns the family of the IP address part of an IPv6 CIDR.

   | <tt>cidr('192.168.0.0/24').masked()</tt>
   | Returns the canonical form of a CIDR network.

   | <tt>cidr('192.168.0.1/24').masked()</tt>
   | Returns the canonical form of a CIDR network, masking non-prefix bits.

   | <tt>cidr('192.168.0.0/24') == cidr('192.168.0.0/24').masked()</tt>
   | Compares a CIDR to its canonical form (already canonical).

   | <tt>cidr('192.168.0.1/24') == cidr('192.168.0.1/24').masked()</tt>
   | Compares a CIDR to its canonical form (not canonical).

   | <tt>cidr('192.168.0.0/16').prefixLength()</tt>
   | Returns the prefix length of an IPv4 CIDR.

   | <tt>cidr('::1/128').prefixLength()</tt>
   | Returns the prefix length of an IPv6 CIDR.

See the Kubernetes CIDR library godoc for more information.

### Kubernetes authorizer library

For CEL expressions in the API where a variable of type `Authorizer` is available,
the authorizer may be used to perform authorization checks for the principal
(authenticated user) of the request.

API resource checks are performed as follows:

1. Specify the group and resource to check: `Authorizer.group(string).resource(string) ResourceCheck`
1. Optionally call any combination of the following builder functions to further narrow the authorization check.
   Note that these functions return the receiver type and can be chained:
   - `ResourceCheck.subresource(string) ResourceCheck`
   - `ResourceCheck.namespace(string) ResourceCheck`
   - `ResourceCheck.name(string) ResourceCheck`
1. Call `ResourceCheck.check(verb string) Decision` to perform the authorization check.
1. Call `allowed() bool` or `reason() string` to inspect the result of the authorization check.

Non-resource authorization performed are used as follows:

1. Specify only a path: `Authorizer.path(string) PathCheck`
1. Call `PathCheck.check(httpVerb string) Decision` to perform the authorization check.
1. Call `allowed() bool` or `reason() string` to inspect the result of the authorization check.

To perform an authorization check for a service account:

- `Authorizer.serviceAccount(namespace string, name string) Authorizer`

Examples of CEL expressions using URL library functions

   | CEL Expression
   | Purpose

   | <tt>authorizer.group('').resource('pods').namespace('default').check('create').allowed()</tt>
   | Returns true if the principal (user or service account) is allowed create pods in the 'default' namespace.

   | <tt>authorizer.path('/healthz').check('get').allowed()</tt>
   | Checks if the principal (user or service account) is authorized to make HTTP GET requests to the /healthz API path.

   | <tt>authorizer.serviceAccount('default', 'myserviceaccount').resource('deployments').check('delete').allowed()<tt>
   | Checks if the service account is authorized to delete deployments.

**Feature state:**

For CEL expressions in the API where a variable of type `Authorizer` is available,
field and label selectors can be included in authorization checks.

Examples of CEL expressions using selector authorization functions

   | CEL Expression
   | Purpose

   | <tt>authorizer.group('').resource('pods').fieldSelector('spec.nodeName=mynode').check('list').allowed()</tt>
   |
    Returns true if the principal (user or service account) is allowed
    to list pods with the field selector <tt>spec.nodeName=mynode</tt>.

   | <tt>authorizer.group('').resource('pods').labelSelector('example.com/mylabel=myvalue').check('list').allowed()</tt>
   |
    Returns true if the principal (user or service account) is allowed
    to list pods with the label selector <tt>example.com/mylabel=myvalue</tt>.

See the Kubernetes Authz library
and Kubernetes AuthzSelectors library
godoc for more information.
