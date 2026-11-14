---
title: "Generating attribution reports (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/attribution_reporting_api/generating_reports/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Generating attribution reports (part 2 of 2)

## Filters

You can define rules for which conversions generate reports using filters. For example, you could choose to only count conversions for a specific product category, and filter out conversions for other categories.

To declare filters:

1. On source registration, add a `filter_data` field to the `Attribution-Reporting-Register-Source` header that defines the filter keys you will use to filter the conversions over on the trigger side. These are completely custom fields. For example, to specify only conversions on particular subdomains, and for particular products:

   ```json
   {
     "filter_data": {
       "conversion_subdomain": [
         "electronics.megastore",
         "electronics2.megastore"
       ],
       "product": ["1234"]
     }
   }
   ```

2. On trigger registration, add a `filters` field to the `Attribution-Reporting-Register-Trigger` header. The following, for example, causes trigger interactions to match the above source registration, as they both contain the `"electronics.megastore"` `"conversion_subdomain"` field. The `"directory"` filter on the other hand is ignored when a match is attempted, because it was not included in the above source registration.

   ```json
   {
     "filters": {
       "conversion_subdomain": ["electronics.megastore"],
       "directory": ["/store/electronics"]
     }
   }
   ```

If the `"filter_data"` and `"filters"` fields contain matching subfields (like `"conversion_subdomain"` in the example above) but none of the subfield's values match, the trigger is ignored, resulting in no match.

### Filtering trigger data

The `event_trigger_data` field in the `Attribution-Reporting-Register-Trigger` header can be extended to do selective filtering to set `trigger_data`, `priority`, or `deduplication_key`, based on `filter_data` defined in the `Attribution-Reporting-Register-Source` header.

For example:

```json
{
  "event_trigger_data": [
    {
      "trigger_data": "2",
      "filters": { "source_type": ["navigation"] }
    },
    {
      "trigger_data": "1",
      "filters": { "source_type": ["event"] }
    }
  ]
}
```

> **Note:**
> `"source_type"` is an automatically populated field available on the source's `"filter_data"`.

> **Note:**
> `not_filters`, which filters with negation, is also supported.

In this context, `filters` can be an object or an array of objects. When a list is specified, only one dictionary has to match for the trigger to be considered.

```json
{
  "event_trigger_data": [
    {
      "trigger_data": "2",
      "filters": [
        {
          "product": ["1234"],
          "conversion_subdomain": ["electronics.megastore"]
        },
        {
          "product": ["4321"],
          "conversion_subdomain": ["electronics4.megastore"]
        }
      ]
    }
  ]
}
```

If the filters do not match for any of the event triggers, no event-level report will be created. If the filters match for multiple event triggers, the first matching event trigger is used.

## Debug reports

You can enable debug reports to return troubleshooting information about your attribution reports. These can, for example, be used to check that your setup is working properly and understand gaps in measurement results between your old cookie-based implementation and your new Attribution Reporting implementation. Debug reports are sent immediately; they are not subject to the same scheduling as event-level and summary reports.

There are two different types of debug report:

- **Success debug reports** track successful generation of a specific attribution report. Success debug reports are generated and sent as soon as the corresponding trigger is registered.
- **Verbose debug reports** give you more visibility into the attribution source and attribution trigger events associated with an attribution report. They enable you to ensure that sources were registered successfully, or track missing reports and determine why they're missing (for example due to failure in source or trigger event registration or failure when sending or generating the report). Verbose debug reports are sent immediately upon source or trigger registration.

> **Note:**
> To use debug reports, the reporting origin needs to set a cookie. If the origin configured to receive reports is a third party, this cookie will be a third-party cookie, which means that debug reports will not be available in browsers where third-party cookies are disabled/not available.

### Using debug reports

To use debug reports, you need to:

1. Set the `ar_debug` cookie on your reporting origin. This needs to be present during both source and trigger registration:

   ```http
   Set-Cookie: ar_debug=1; SameSite=None; Secure; Path=/; HttpOnly
   ```

2. Set the `debug_key` field in any `Attribution-Reporting-Register-Source` and `Attribution-Reporting-Register-Trigger` response headers related to attribution reports that you want to expose debugging information for. Each `debug_key` value must be a 64-bit unsigned integer formatted as a base-10 string. Make each debug key a unique ID — you could for example set each one as Cookie ID + source/trigger timestamp (and capture that same timestamp in your older cookie-based system if you want to compare the two).

   ```json
   {
     "debug_key": "647775351539539"
   }
   ```

   > **Note:**
   > Make the source-side debug key <example-value> from the `source_event_id`, so that you can differentiate individual reports that have the same source event ID.

3. Optionally, set the `debug_reporting` field to `true`, in both the `Attribution-Reporting-Register-Source` and `Attribution-Reporting-Register-Trigger` headers. If you do this, a verbose debug report will be generated. If you don't do this, a success debug report will be generated that mirrors the type of attribution report you are generating (event-level or aggregatable).

   ```json
   {
     "debug_key": "647775351539539",
     "debug_reporting": true
   }
   ```

4. Set up appropriate endpoints to receive the debug reports you want to generate. Debug reports are sent to three separate endpoints in the reporting origin:
   - Endpoint for event-level success debug reports: `<reporting-origin>/.well-known/attribution-reporting/debug/report-event-attribution`
   - Endpoint for aggregatable success debug reports: `<reporting-origin>/.well-known/attribution-reporting/debug/report-aggregate-attribution`
   - Endpoint for verbose debug reports: `<reporting-origin>/.well-known/attribution-reporting/debug/verbose`

Generated success debug reports are identical to attribution reports, and contain the source-side and the trigger-side debug keys, in the `"source_debug_key"` and `"trigger_debug_key"` fields respectively.

For further information and examples, see:

- Introduction to debug reports on privacysandbox.google.com (2023)
- Set up debug reports on privacysandbox.google.com (2023)
- Debugging cookbook on privacysandbox.google.com (2023)
