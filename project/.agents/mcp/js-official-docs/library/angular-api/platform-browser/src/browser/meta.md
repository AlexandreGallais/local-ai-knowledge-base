# platform-browser/src/browser/meta

## MetaDefinition

```ts
export type MetaDefinition
```

Represents the attributes of an HTML `<meta>` element. The element itself is
represented by the internal `HTMLMetaElement`. Event handler attributes, which start with
`on`, are not allowed.

@see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
@see {@link Meta}

@publicApi

## Meta

```ts
export class Meta
```

A service for managing HTML `<meta>` tags.

Properties of the `MetaDefinition` object match the attributes of the
HTML `<meta>` tag. These tags define document metadata that is important for
things like configuring a Content Security Policy, defining browser compatibility
and security settings, setting HTTP Headers, defining rich content for social sharing,
and Search Engine Optimization (SEO).

To identify specific `<meta>` tags in a document, use an attribute selection
string in the format `"tag_attribute='value string'"`.
For example, an `attrSelector` value of `"name='description'"` matches a tag
whose `name` attribute has the value `"description"`.
Selectors are used with the `querySelector()` Document method,
in the format `meta[{attrSelector}]`.

@see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
@see [Document.querySelector()](https://developer.mozilla.org/docs/Web/API/Document/querySelector)


@publicApi

## Meta.addTag

```ts
addTag(tag: MetaDefinition, forceCreation: boolean = false): HTMLMetaElement | null
```

Retrieves or creates a specific `<meta>` tag element in the current HTML document.
In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
values in the provided tag definition, and verifies that all other attribute values are equal.
If an existing element is found, it is returned and is not modified in any way.
@param tag The definition of a `<meta>` element to match or create.
@param forceCreation True to create a new element without checking whether one already exists.
@returns The existing element with the same attributes and values if found,
the new element if no match is found, or `null` if the tag parameter is not defined.

## Meta.addTags

```ts
addTags(tags: MetaDefinition[], forceCreation: boolean = false): HTMLMetaElement[]
```

Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
values in the provided tag definition, and verifies that all other attribute values are equal.
@param tags An array of tag definitions to match or create.
@param forceCreation True to create new elements without checking whether they already exist.
@returns The matching elements if found, or the new elements.

## Meta.getTag

```ts
getTag(attrSelector: string): HTMLMetaElement | null
```

Retrieves a `<meta>` tag element in the current HTML document.
@param attrSelector The tag attribute and value to match against, in the format
`"tag_attribute='value string'"`.
@returns The matching element, if any.

## Meta.getTags

```ts
getTags(attrSelector: string): HTMLMetaElement[]
```

Retrieves a set of `<meta>` tag elements in the current HTML document.
@param attrSelector The tag attribute and value to match against, in the format
`"tag_attribute='value string'"`.
@returns The matching elements, if any.

## Meta.updateTag

```ts
updateTag(tag: MetaDefinition, selector?: string): HTMLMetaElement | null
```

Modifies an existing `<meta>` tag element in the current HTML document.
@param tag The tag description with which to replace the existing tag content.
@param selector A tag attribute and value to match against, to identify
an existing tag. A string in the format `"tag_attribute=`value string`"`.
If not supplied, matches a tag with the same `name` or `property` attribute value as the
replacement tag.
@return The modified element.

## Meta.removeTag

```ts
removeTag(attrSelector: string): void
```

Removes an existing `<meta>` tag element from the current HTML document.
@param attrSelector A tag attribute and value to match against, to identify
an existing tag. A string in the format `"tag_attribute=`value string`"`.

## Meta.removeTagElement

```ts
removeTagElement(meta: HTMLMetaElement): void
```

Removes an existing `<meta>` tag element from the current HTML document.
@param meta The tag definition to match against to identify an existing tag.