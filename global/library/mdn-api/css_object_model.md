---
title: "CSS Object Model (CSSOM)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css_object_model/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS Object Model (CSSOM)

The **CSS Object Model** is a set of APIs allowing the manipulation of CSS from JavaScript. It is much like the DOM, but for the CSS rather than the HTML. It allows users to read and modify CSS style dynamically.

The values of CSS are represented untyped, that is using `String` objects.

## Reference

- `AnimationEvent`
- `CaretPosition`
- `CSS`
- `CSSConditionRule`
- `CSSCounterStyleRule`
- `CSSFontFaceDescriptors`
- `CSSFontFaceRule`
- `CSSFontFeatureValuesMap`
- `CSSFontFeatureValuesRule`
- `CSSFunctionDeclarations`
- `CSSFunctionDescriptors`
- `CSSFunctionRule`
- `CSSGroupingRule`
- `CSSImportRule`
- `CSSKeyframeRule`
- `CSSKeyframesRule`
- `CSSMarginRule`
- `CSSMediaRule`
- `CSSNamespaceRule`
- `CSSPageRule`
- `CSSPositionTryRule`
- `CSSPositionTryDescriptors`
- `CSSRule`
- `CSSRuleList`
- `CSSStartingStyleRule`
- `CSSStyleDeclaration`
- `CSSStyleSheet`
- `CSSStyleRule`
- `CSSSupportsRule`
- `CSSNestedDeclarations`
- `FontFace`
- `FontFaceSet`
- `FontFaceSetLoadEvent`
- `MediaList`
- `MediaQueryList`
- `MediaQueryListEvent`
- `Screen`
- `StyleSheet`
- `StyleSheetList`
- `TransitionEvent`
- `VisualViewport`

Several other interfaces are also extended by the CSSOM-related specifications: `Document`, `Window`, `Element`, `HTMLElement`, `HTMLImageElement`, `Range`, `MouseEvent`, and `SVGElement`.

### CSS Typed Object Model

- `CSSImageValue`
- `CSSKeywordValue`
- `CSSMathClamp`
- `CSSMathInvert`
- `CSSMathMax`
- `CSSMathMin`
- `CSSMathNegate`
- `CSSMathProduct`
- `CSSMathSum`
- `CSSMathValue`
- `CSSMatrixComponent`
- `CSSNumericArray`
- `CSSNumericValue`
- `CSSPerspective`
- `CSSPositionValue`
- `CSSRotate`
- `CSSScale`
- `CSSSkew`
- `CSSSkewX`
- `CSSSkewY`
- `CSSStyleValue`
- `CSSTransformComponent`
- `CSSTransformValue`
- `CSSTranslate`
- `CSSUnitValue`
- `CSSUnparsedValue`
- `CSSVariableReferenceValue`
- `StylePropertyMap`
- `StylePropertyMapReadOnly`

### Obsolete CSSOM interfaces (deprecated)

- `CSSPrimitiveValue` (deprecated)
- `CSSValue` (deprecated)
- `CSSValueList` (deprecated)

## Tutorials

- Determining the dimensions of elements
- Managing screen orientation

## Browser compatibility

All these features have been added little by little over the years to the different browsers: it was a quite complex process that can't be summarized in a simple table. Please refer to the specific interfaces for its availability.

## See also

- Document Object Model (DOM)
- Houdini APIs
