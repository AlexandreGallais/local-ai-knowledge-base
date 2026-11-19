---
name: api-documentation
description: "Documents an HTTP API with OpenAPI and request and response examples that were actually run. Use when adding or changing an endpoint, writing or updating an openapi.yaml, or when consumers ask how to call the API."
metadata:
  id: WRT-05
  stars: "2"
  nature: template
  mode: A
  wave: V3
  load: auto
---

# API documentation

**Core rule:** the OpenAPI file matches the running API, and every example was produced by a real call.

## Procedure

1. Find the source of truth: an OpenAPI file in the repository, or one generated from code annotations.
   - Check: you know which one to edit.
2. Describe each endpoint with the template: summary, parameters, request body schema, responses with codes, errors.
   - Check: every status code the code can return is listed.
3. Add examples from a real call against a local instance (`curl -sS -X POST localhost:<port>/<path> -d @body.json`).
   - Check: the example response matches the schema.
4. Validate the file with the project's tool if any (lint or generator).
   - Check: no validation error.

## Endpoint template

```yaml
/items/{id}:
  get:
    summary: Get one item
    parameters:
      - name: id
        in: path
        required: true
        schema: { type: string }
    responses:
      "200":
        description: The item
        content:
          application/json:
            schema: { $ref: "#/components/schemas/Item" }
            example: { id: "a1", name: "Valve" }
      "404":
        description: No item with this id
```

## Stop and ask the human if

- The API's behaviour and its current docs disagree: ask which one is right.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Write examples by hand." | Invented examples drift from reality. Capture real calls. |
| "Document only 200." | Consumers need the error codes most. |

## Definition of done

- [ ] Endpoints described with all codes; examples from real calls; file validated.
