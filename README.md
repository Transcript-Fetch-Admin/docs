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

This is a snapshot, not automatic synchronization. Review against current docs
before relying on it as a maintained reference. The canonical site remains
https://transcriptfetch.com/docs.

## Validate

Run `npx mint validate` and `npx mint broken-links`.
Pushes to main trigger only this Mintlify trial. Do not connect the application
repository or configure the production hostname during the trial.
