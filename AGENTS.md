# Path & Roam Project Rules

1. JavaScript only. Never TypeScript.
2. App Router.
3. Server Components unless interactivity requires client code.
4. Public editorial content must render as HTML without depending on client-side fetching.
5. No database at launch.
6. No CMS at launch.
7. No authentication at launch.
8. Keep dependencies minimal.
9. Reuse existing components/helpers before creating new ones.
10. No unnecessary abstractions.
11. No unnecessary animations.
12. No heavy component/icon libraries.
13. Use `next/image` for editorial images.
14. Mobile-first and accessible.
15. All important navigation must use crawlable links.
16. Never fabricate personal travel experience.
17. Mara Vale is an editorial pen name, not a real traveler persona.
18. Never claim Mara visited, stayed, tested or personally experienced something unless explicitly supplied as factual.
19. AI-generated imagery is illustrative and must not be presented as documentary evidence.
20. Affiliate links must be centralized, never hardcoded in article content.
21. Affiliate links use `rel="sponsored nofollow noopener"`.
22. Draft content must never be indexable.
23. Staging must remain noindex until explicitly enabled.
24. Planned domain is pathandroam.com but never hardcode it where site configuration should be used.
25. Do not mass-generate content.

## Token Efficiency Rules

1. Read AGENTS.md once at task start.
2. Do not summarize AGENTS.md.
3. Do not restate the request.
4. Do not explain the plan unless blocked.
5. Do not explain routine code.
6. Do not show code unless requested.
7. Do not print full files.
8. Do not print diffs unless requested.
9. Do not list unchanged files.
10. Inspect only files relevant to the task.
11. Never inspect node_modules, .next, generated build output or binary assets.
12. Prefer targeted searches and targeted reads.
13. Read only necessary sections of large files.
14. Modify existing implementations instead of creating duplicates.
15. Batch related edits.
16. Avoid repeated lint/build runs while editing.
17. Run only the minimum relevant validation after each task.
18. Full production build only at major checkpoints or when requested.
19. If one validation includes another, do not run both redundantly.
20. Fix straightforward errors directly.
21. Do not ask for placeholder values.
22. Do not browse/search externally unless current information is required.
23. Do not generate alternative implementations unless requested.
24. Prefer the simplest correct production implementation.
25. Keep responses extremely short.

## Response Format

Success:

DONE
changed: <max 5 short items>
checks: <one short line>

Failure:

BLOCKED
reason: <one line>
need: <one line>

No additional explanation.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
