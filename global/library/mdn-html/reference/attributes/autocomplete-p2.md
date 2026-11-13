---
title: "`autocomplete` HTML attribute (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/autocomplete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `autocomplete` HTML attribute (part 2 of 2)

## Accessibility

Using appropriate `autocomplete` values helps users with cognitive disabilities, motor impairments, and other conditions fill out forms more quickly and accurately by reducing the need to type and remember information. When the browser can identify the purpose of a form field through its `autocomplete` value, it can offer stored data such as names, addresses, and payment details, which benefits all users but is especially important for those who find manual data entry difficult.

Providing valid autocomplete tokens also satisfies WCAG 2.2 Success Criterion 1.3.5: Identify Input Purpose (Level AA), which requires that the purpose of input fields collecting user information can be programmatically determined. This enables user agents and assistive technologies to apply personalized presentations, such as displaying familiar icons next to fields, to help users understand and complete forms.

### Avoid disabling autocomplete

Setting `autocomplete="<example-value>"` prevents the browser from offering stored data for a field. While developers sometimes use this to prevent autofill for security reasons (such as one-time codes), it removes a feature that many users depend on. Users with cognitive disabilities may rely on autocomplete to recall personal information, and users with motor impairments benefit from reduced typing. Browsers may also ignore `autocomplete="<example-value>"` on login fields to support password managers.

### Avoid invalid autocomplete values

Using invalid or non-standard values (such as made-up strings to circumvent autofill) has a similar effect: the browser cannot match the field to any known purpose, so it cannot offer relevant suggestions. This also fails the WCAG requirement above, since the input purpose is no longer programmatically determinable. If you need to disable autofill for a specific field, consider using `autocomplete="<example-value>"` only where genuinely necessary (such as for CAPTCHA or one-time token <example-value>) rather than applying it broadly across a form.

## Examples

```html
<div>
  <label for="cc-number">Enter your credit card number</label>
  <input name="cc-number" id="cc-number" autocomplete="off" />
</div>
```

### Administrative levels in addresses

The four administrative level fields (`address-level1` through `address-level4`) describe the address in terms of increasing levels of precision within the country in which the address is located. Each country has its own system of administrative levels, and may arrange the levels in different orders when addresses are written.

`address-level1` always represents the broadest administrative division; it is the least-specific portion of the address short of the country name.

### Form layout flexibility

Given that different countries write their address in different ways, with each field in different places within the address, and even different sets and numbers of fields entirely, it can be helpful if, when possible, your site is able to switch to the layout expected by your users when presenting an address entry form, given the country the address is located within.

### Variations

The way each administrative level is used will vary from country to country. Below are some examples; this is not meant to be an exhaustive list.

#### United States

A typical home address within the United States looks like this:

432 Anywhere St
Exampleville CA 95555

In the United States, the least-specific portion of the address is the state, in this case "CA" (the official US Postal Service shorthand for "California"). Thus `address-level1` is the state, or "CA" in this case.

The second-least specific portion of the address is the city or town name, so `address-level2` is "Exampleville" in this example address.

United States addresses do not use levels 3 and up.

#### United Kingdom

Address input forms in the UK should contain one or two address levels and one, two or three address lines, depending on the address. A complete address would look like so:

103 Frogmarch Street
Upper-Wapping
Winchelsea
Whereshire
TN99 8ZZ

The address levels are:

- `address-level1`: The county — "Whereshire" in this case.
- `address-level2`: The post town — "Winchelsea" in this case.
- `address-line2`: The locality — "Upper-Wapping" in this case.
- `address-line1`: The house/street particulars — "103 Frogmarch Street".

The postcode is separate. Note that you can actually use just the postcode and `address-line1` to successfully deliver mail in the UK, so they should be the only mandatory items, but usually people tend to provide more details.

#### China

China can use as many as three administrative levels: the province, the city, and the district.

The 6 digit postal code is not always needed but when supplied it is placed separately with a label for clarity. For example:

北京市东城区建国门北大街 8 号华润大厦 17 层 1708 单元
邮编：100005

#### Japan

An address in Japan is typically **written in one line**, in an order from the least-specific to more-specific portions (in **reverse order to the United States**). There are two or three administrative levels in an address. Additional line can be used to show building names and room numbers. The postal code is separate. For example:

〒 381-0000
長野県長野市某町 123

"〒" and following seven digits shows the postal code.

`address-level1` is used for prefectures or the Tokyo Metropolis; "長野県" (Nagano Prefecture) is in this case. `address-level2` is typically used for cities, counties, towns and villages; "長野市" (Nagano City) in this case. "某町 123" is `address-line1` which consists of an area name and a lot number.

## See also

- The `` element
- The `<select>` element
- The `<textarea>` element
- The `<form>` element
- HTML forms
- All global attributes
