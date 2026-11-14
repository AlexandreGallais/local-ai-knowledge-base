---
title: "requiredFeatures (part 1 of 5)"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/requiredfeatures/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# requiredFeatures

The **`requiredFeatures`** attribute takes a list of feature strings, with the individual strings separated by white space. It determines whether or not all of the named features are supported by the browser; if all of them are supported, the attribute evaluates to `true` end the element is rendered; otherwise, the attribute evaluates to `false` and the current element and its children are skipped and thus will not be rendered. This provides a way to design SVG that gracefully falls back when features aren't available.

If the attribute is not present, then its implicit evaluated value is `true`. If a null string or empty string value is given to attribute `requiredFeatures`, the attribute is evaluate to `false`.

`requiredFeatures` is often used in conjunction with the `<switch>` element. If `requiredFeatures` is used in other situations, it represents a simple switch on the given element whether to render the element or not.

You can use this attribute with the following SVG elements:

- ``
- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<circle>`
- `<clipPath>`
- `<defs>`
- `<ellipse>`
- `<foreignObject>`
- ``
- `<image>`
- `<line>`
- `<mask>`
- ``
- `<pattern>`
- `<polygon>`
- `<polyline>`
- `<rect>`
- `<set>`
- ``
- `<switch>`
- `<text>`
- `<textPath>`
- `<tspan>`
- `<use>`

## Example

```css
html,
body,
svg {
  height: 100%;
}

text {
  fill: white;
}
```

```html
<svg viewBox="0 0 250 45" xmlns="http://www.w3.org/2000/svg">
  <g>
    <rect fill="forestgreen" x="10" y="10" height="25" width="230" />
    <text x="20" y="27">requiredFeatures supported</text>
  </g>
  <g requiredFeatures="">
    <rect fill="crimson" x="10" y="10" height="25" width="230" />
    <text x="20" y="27">requiredFeatures not supported</text>
  </g>
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;list-of-features></code
        >

       | Default value
       |
        `true` if not defined, `false` if null or empty
        string as value

       | Animatable
       | No

- `<list-of-features>`
    This is a list of feature strings, separated using white space. Determines whether all of the named _features_ are supported by the browser. See Feature strings below for a list of allowed values.

## Feature strings

The following are the feature strings for the `requiredFeatures` attribute. These same feature strings apply to the `hasFeature` method call that is part of the SVG DOM's support for the `DOMImplementation` interface. In some cases the feature strings map directly to a set of attributes, properties or elements, in others they represent some functionality of the browser. Note that the format and naming for feature strings changed from SVG 1.0 to SVG 1.1. The SVG 1.0 feature strings are not listed here; some browser support SVG 1.0 feature strings for compatibility reasons. However, the SVG 1.0 feature strings are considered deprecated.

- `http://www.w3.org/TR/SVG11/feature#SVG`
    At least one of the following feature is supported:
    - `http://www.w3.org/TR/SVG11/feature#SVG-static`
    - `http://www.w3.org/TR/SVG11/feature#SVG-animation`
    - `http://www.w3.org/TR/SVG11/feature#SVG-dynamic`
    - `http://www.w3.org/TR/SVG11/feature#SVGDOM`

- `http://www.w3.org/TR/SVG11/feature#SVGDOM`
    At least one of the following feature is supported:
    - `http://www.w3.org/TR/SVG11/feature#SVGDOM-static`
    - `http://www.w3.org/TR/SVG11/feature#SVGDOM-animation`
    - `http://www.w3.org/TR/SVG11/feature#SVGDOM-dynamic`

- `http://www.w3.org/TR/SVG11/feature#SVG-static`
    The browser supports all the following features:
    - `http://www.w3.org/TR/SVG11/feature#CoreAttribute`
    - `http://www.w3.org/TR/SVG11/feature#Structure`
    - `http://www.w3.org/TR/SVG11/feature#ContainerAttribute`
    - `http://www.w3.org/TR/SVG11/feature#ConditionalProcessing`
    - `http://www.w3.org/TR/SVG11/feature#Image`
    - `http://www.w3.org/TR/SVG11/feature#Style`
    - `http://www.w3.org/TR/SVG11/feature#ViewportAttribute`
    - `http://www.w3.org/TR/SVG11/feature#Shape`
    - `http://www.w3.org/TR/SVG11/feature#Text`
    - `http://www.w3.org/TR/SVG11/feature#PaintAttribute`
    - `http://www.w3.org/TR/SVG11/feature#OpacityAttribute`
    - `http://www.w3.org/TR/SVG11/feature#GraphicsAttribute`
    - `http://www.w3.org/TR/SVG11/feature#Marker`
    - `http://www.w3.org/TR/SVG11/feature#ColorProfile`
    - `http://www.w3.org/TR/SVG11/feature#Gradient`
    - `http://www.w3.org/TR/SVG11/feature#Pattern`
    - `http://www.w3.org/TR/SVG11/feature#Clip`
    - `http://www.w3.org/TR/SVG11/feature#Mask`
    - `http://www.w3.org/TR/SVG11/feature#Filter`
    - `http://www.w3.org/TR/SVG11/feature#XlinkAttribute`
    - `http://www.w3.org/TR/SVG11/feature#Font`
    - `http://www.w3.org/TR/SVG11/feature#Extensibility`

- `http://www.w3.org/TR/SVG11/feature#SVGDOM-static`
    The browser supports all DOM interfaces and methods to the language features for `http://www.w3.org/TR/SVG11/feature#SVG-static`.
- `http://www.w3.org/TR/SVG11/feature#SVG-animation`
    The browser supports all of the language features from `http://www.w3.org/TR/SVG11/feature#SVG-static` plus the feature `http://www.w3.org/TR/SVG11/feature#Animation`.
- `http://www.w3.org/TR/SVG11/feature#SVGDOM-animation`
    The browser supports all DOM interfaces and methods corresponding to the language features for `http://www.w3.org/TR/SVG11/feature#SVG-animation`.
- `http://www.w3.org/TR/SVG11/feature#SVG-dynamic`
    The browser supports all of the language features from `http://www.w3.org/TR/SVG11/feature#SVG-animation` plus the following features:
    - `http://www.w3.org/TR/SVG11/feature#Hyperlinking`
    - `http://www.w3.org/TR/SVG11/feature#Scripting`
    - `http://www.w3.org/TR/SVG11/feature#View`
    - `http://www.w3.org/TR/SVG11/feature#Cursor`
    - `http://www.w3.org/TR/SVG11/feature#GraphicalEventsAttribute`
    - `http://www.w3.org/TR/SVG11/feature#DocumentEventsAttribute`
    - `http://www.w3.org/TR/SVG11/feature#AnimationEventsAttribute`

- `http://www.w3.org/TR/SVG11/feature#SVGDOM-dynamic`
    The browser supports all DOM interfaces and methods to the language features for `http://www.w3.org/TR/SVG11/feature#SVG-dynamic`.
- `http://www.w3.org/TR/SVG11/feature#CoreAttribute`
    The browser supports the `id`, `xml:lang` and `xml:space` attributes
- `http://www.w3.org/TR/SVG11/feature#Structure`
    The browser supports ``, ``, `<defs>`, `<desc>`, `<title>`, `<metadata>`, `<symbol>` and `<use>` elements.
- `http://www.w3.org/TR/SVG11/feature#BasicStructure`
    The browser supports ``, ``, `<defs>`, `<desc>`, `<title>`, `<metadata>` and `<use>` elements.
- `http://www.w3.org/TR/SVG11/feature#ContainerAttribute`
    The browser supports the `enable-background` attribute
- `http://www.w3.org/TR/SVG11/feature#ConditionalProcessing`
    The browser supports the `<switch>` element, and the `requiredFeatures`, `requiredExtensions`, `systemLanguage` attributes
- `http://www.w3.org/TR/SVG11/feature#Image`
    The browser supports the `<image>` element.
- `http://www.w3.org/TR/SVG11/feature#Style`
    The browser supports the `<style>` element.
- `http://www.w3.org/TR/SVG11/feature#ViewportAttribute`
    The browser supports the `clip` and `overflow` attributes.
- `http://www.w3.org/TR/SVG11/feature#Shape`
    The browser supports the `<rect>`, `<circle>`, `<line>`, `<polyline>`, `<polygon>`, `<ellipse>` and `` elements.
- `http://www.w3.org/TR/SVG11/feature#Text`
    The browser supports the `<text>`, `<tspan>`, `<tref>`, `<textPath>`, and `<glyphRef>` elements.
- `http://www.w3.org/TR/SVG11/feature#BasicText`
    The browser supports the `<text>` element
- `http://www.w3.org/TR/SVG11/feature#PaintAttribute`
    The browser supports the `color`, `fill`, `fill-rule`, `stroke`, `stroke-dasharray`, `stroke-dashoffset`, `stroke-linecap`, `stroke-linejoin`, `stroke-miterlimit`, `stroke-width`, `color-interpolation` and `color-rendering` attributes
- `http://www.w3.org/TR/SVG11/feature#BasicPaintAttribute`
    The browser supports the `color`, `fill`, `fill-rule`, `stroke`, `stroke-dasharray`, `stroke-dashoffset`, `stroke-linecap`, `stroke-linejoin`, `stroke-miterlimit`, `stroke-width` and `color-rendering` attributes
- `http://www.w3.org/TR/SVG11/feature#OpacityAttribute`
    The browser supports the `opacity`, `stroke-opacity` and `fill-opacity` attributes
- `http://www.w3.org/TR/SVG11/feature#GraphicsAttribute`
    The browser supports the `display`, `image-rendering`, `pointer-events`, `shape-rendering`, `text-rendering` and `visibility` attributes
- `http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute`
    The browser supports the `display` and `visibility` attributes
- `http://www.w3.org/TR/SVG11/feature#Marker`
    The browser supports the `<marker>` element
- `http://www.w3.org/TR/SVG11/feature#Gradient`
    The browser supports the `<linearGradient>`, `<radialGradient>` and `<stop>` elements
- `http://www.w3.org/TR/SVG11/feature#Pattern`
    The browser supports the `<pattern>` element
- `http://www.w3.org/TR/SVG11/feature#Clip`
    The browser supports the `<clipPath>` element and the `clip-path`, `clip-rule` attributes
- `http://www.w3.org/TR/SVG11/feature#BasicClip`
    The browser supports the `<clipPath>` element and the `clip-path` attribute
- `http://www.w3.org/TR/SVG11/feature#Mask`
    The browser supports the `<mask>` element
- `http://www.w3.org/TR/SVG11/feature#Filter`
    The browser supports the `<filter>`, `<feBlend>`, `<feColorMatrix>`, `<feComponentTransfer>`, `<feComposite>`, `<feConvolveMatrix>`, `<feDiffuseLighting>`, `<feDisplacementMap>`, `<feFlood>`, `<feGaussianBlur>`, `<feImage>`, `<feMerge>`, `<feMergeNode>`, `<feMorphology>`, `<feOffset>`, `<feSpecularLighting>`, `<feTile>`, `<feDistantLight>`, `<fePointLight>`, `<feSpotLight>`, `<feFuncR>`, `<feFuncG>`, `<feFuncB>` and `<feFuncA>` elements
- `http://www.w3.org/TR/SVG11/feature#BasicFilter`
    The browser supports the `<filter>`, `<feBlend>`, `<feColorMatrix>`, `<feComponentTransfer>`, `<feComposite>`, `<feFlood>`, `<feGaussianBlur>`, `<feImage>`, `<feMerge>`, `<feMergeNode>`, `<feOffset>`, `<feTile>`, `<feFuncR>`, `<feFuncG>`, `<feFuncB>` and `<feFuncA>` elements
- `http://www.w3.org/TR/SVG11/feature#DocumentEventsAttribute`
    The browser supports the `onunload`, `onabort`, `onerror`, `onresize`, `onscroll` and `onzoom` event attributes
- `http://www.w3.org/TR/SVG11/feature#GraphicalEventsAttribute`
    The browser supports the `onfocusin`, `onfocusout`, `onactivate`, `onclick`, `onmousedown`, `onmouseup`, `onmouseover`, `onmousemove`, `onmouseout` and `onload` event attributes
- `http://www.w3.org/TR/SVG11/feature#AnimationEventsAttribute`
    The browser supports the `onbegin`, `onend`, `onrepeat` and `onload` event attributes
- `http://www.w3.org/TR/SVG11/feature#Cursor`
    The browser supports the `<cursor>` element
- `http://www.w3.org/TR/SVG11/feature#Hyperlinking`
    The browser supports the `` element
- `http://www.w3.org/TR/SVG11/feature#XlinkAttribute`
    The browser supports the `xlink:type`, `xlink:href`, `xlink:role`, `xlink:arcrole`, `xlink:title`, `xlink:show` and `xlink:actuate` attributes
- `http://www.w3.org/TR/SVG11/feature#View`
    The browser supports the `<view>` element
- `http://www.w3.org/TR/SVG11/feature#Script`
    The browser supports the `<script>` element
- `http://www.w3.org/TR/SVG11/feature#Animation`
    The browser supports the `<animate>`, `<set>`, `<animateMotion>`, `<animateTransform>`, and `<mpath>` elements
- `http://www.w3.org/TR/SVG11/feature#Font`
    The browser supports the ``, ``, `<glyph>`, `<missing-glyph>`, `<hkern>`, `<vkern>`, ``, ``, `` and `` elements
- `http://www.w3.org/TR/SVG11/feature#BasicFont`
    The browser supports the ``, ``, `<glyph>`, `<missing-glyph>`, `<hkern>`, `` and `` elements
- `http://www.w3.org/TR/SVG11/feature#Extensibility`
    The browser supports the `<foreignObject>` element
