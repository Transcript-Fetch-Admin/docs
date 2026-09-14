# TranscriptFetch Mintlify trial

Isolated evaluation at https://transcript-fetch.mintlify.site/docs.
The hyphen is significant: transcriptfetch.mintlify.site is a different starter site.
This repository is public and must contain only public documentation and assets.

## Boundaries

- No changes to transcriptfetch.com DNS, reverse proxy, or existing /docs routes.
- Existing application docs and source files remain intact.
- No API credentials, customer data, infrastructure instructions, or private code.
- Noindex is configured for the trial. This is not access control.
- API playground is in simple/code-example mode, with no live request execution.
- Starter files are preserved under drafts/starter and excluded from publishing.

## Sources

Snapshot taken 2026-09-14:
- Guides and SDK prose copied from the backend documentation source
  (work/backend at 9c285dae), with product placeholders resolved.
- Public OpenAPI: https://transcriptfetch.com/api/v2/openapi.json
- Favicon copied from the existing public brand asset.
- Header logo rendered at 4x resolution directly from the existing TfLogo component.
- Switzer headings use the existing public font; brand.css adapts native Mintlify
  elements to the existing cream, amber, teal, and neutral design tokens.
- Quickstart and introduction adapted for this trial.

## Coverage

The trial includes all 13 static public `/docs` routes, all 33 public error
detail pages, and the version-specific v1 quickstart, output, errors and endpoint
reference. Both OpenAPI snapshots expose all eight public operations. The
published custom-doc inventory contained zero rows at export time.

`migration-coverage.json` records source routes, versions, and trial destinations.
Generated response examples and the supported-source table are included, not
left as placeholder blocks. Original section anchors are retained for deep links.
Standalone authentication and API-key pages remain retired; quickstart contains
their essential instructions.

The interactive request builder is linked to the canonical application rather
than reproduced. API playground requests remain disabled in this trial. The MCP
guide's blanket one-credit sentence was corrected in the trial to distinguish
duration-billed transcription; the original application was not edited.

This is a snapshot, not automatic synchronization. Review against current docs
before relying on it as a maintained reference. The canonical site remains
https://transcriptfetch.com/docs.

## Validate

Run `node scripts/check-coverage.mjs`, `npx mint validate`, and `npx mint broken-links`.
Pushes to main trigger only this Mintlify trial. Do not connect the application
repository or configure the production hostname during the trial.
