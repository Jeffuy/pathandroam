# Path & Roam analytics

## Installation and deployment

Next.js 16.3 App Router uses `@next/third-parties/google` 16.3.0. The root layout mounts one consent-aware Google Analytics integration. The measurement ID defaults to **G-1R8H9BMBVT**; `NEXT_PUBLIC_GA_ID`, if set, must match it. The old raw GA scripts are removed. Travelpayouts Drive remains independent and unchanged.

Collection requires all of: a Vercel **production** build (`VERCEL_ENV=production`), HTTPS, the current browser origin matching `NEXT_PUBLIC_SITE_URL`, no `navigator.webdriver`, and analytics consent. Localhost, development, preview deployments, automation and missing deployment configuration do not load GA. Do not set VERCEL_ENV manually in previews. Consent withdrawal disables GA immediately and reloads, retaining the existing cookie cleanup.

Only Google owns `page_view`: its initial configuration sends the initial view, and Enhanced Measurement's browser-history option handles Next.js navigation/back/forward. There are **no custom page_view calls or repeated config calls**. Keep history measurement enabled in the GA stream and do not install GTM or another GA tag for this property.

## Event schema

Shared custom content parameters come from published Markdown, never visitor input: `content_type` (`homepage`, `article`, `destination`, `other`), `content_id` (slug), `content_title` (published title), `destination` (city/country slug), `country`. Unavailable fields are omitted. Custom `page_location`, `page_referrer` and `link_url` exclude queries, fragments and credentials. Titles/strings are limited to 100 characters. GA's native page dimensions supply the source page for selection events; selection content parameters describe the selected target.

| Event | Trigger and deduplication | Additional parameters | Example custom payload | Automatic counterpart / purpose |
| --- | --- | --- | --- | --- |
| `affiliate_click` | One delegated click or middle-click on a marked affiliate link or verified Travelpayouts redirect; takes precedence over CTA/content events | `affiliate_network`, `affiliate_type`, `affiliate_provider`, `affiliate_key`, `placement`, `link_domain`, `link_url` | `{content_id:"cliffs-of-moher-tours-from-limerick", affiliate_network:"travelpayouts", affiliate_type:"activity", placement:"article_inline", link_domain:"klook.tpx.lv", link_url:"https://klook.tpx.lv/A9P7tkqw"}` | Native outbound `click` remains; this separate event identifies monetization intent, not a completed sale |
| `select_content` | Meaningful destination, commercial, related, featured and recent-guide card selections; one event per selection | `placement` plus selected content fields | `{content_type:"article", content_id:"ring-of-kerry-tour-from-limerick", destination:"limerick", placement:"home_bookable_guides"}` | Recommended GA event; ordinary navigation links are excluded |
| `cta_click` | Homepage hero's Explore bookable trips and car-free section's Read guide; excludes affiliate/card clicks | `cta_name`, `cta_location`, `target_domain` | `{content_type:"homepage", content_id:"home", cta_name:"explore_bookable_trips", cta_location:"hero"}` | No equivalent automatic event for this editorial intent |
| `content_view` | Once per article/destination visit after consent; back navigation creates a new visit; consent changes don't repeat it | Shared content fields | `{content_type:"destination", content_id:"limerick", destination:"limerick", country:"Ireland"}` | Complements page_view with editorial metadata; never a key event |
| `scroll_depth` | 25%, 50%, 75% of the article reaches the viewport; once per threshold per visit; passive listener and one scheduled frame | `percent_scrolled` | `{content_type:"article", content_id:"shannon-airport-to-limerick", percent_scrolled:50}` | Native 90% `scroll` stays enabled and is not duplicated; this measures article progress, not whole-document progress |
| `affiliate_impression` | A marked affiliate link is at least 50% visible; once per element per visit | `affiliate_network`, `affiliate_type`, `affiliate_provider`, `affiliate_key`, `placement` | `{content_id:"one-day-itinerary", affiliate_provider:"airalo", affiliate_key:"airalo-ireland", affiliate_type:"esim", placement:"article_inline"}` | No native equivalent; compare visible booking options with clicks |
| `affiliate_widget_impression` | Consented widget container is at least 50% visible; once per element per visit | Same as affiliate impression | `{content_id:"shannon-airport-to-limerick", affiliate_network:"travelpayouts", affiliate_provider:"kiwitaxi", placement:"article_inline"}` | Measures visible container only; does not prove successful vendor rendering or a booking |
| `web_vitals` | Next.js `useReportWebVitals` reports LCP, INP or CLS; repeated identical metric ID/value pairs are suppressed | `metric_name`, `metric_value`, `metric_rating`, `metric_id` | `{metric_name:"LCP", metric_value:1850.5, metric_rating:"good", metric_id:"v5-example"}` | No equivalent automatic GA metric. LCP/INP are milliseconds; CLS is a decimal score. Uses original document URL, not the currently displayed SPA route |

Web Vitals can update as a document lives or is restored from back-forward cache. Analyze the latest value per metric ID/name, not their sum. Consent granted late can miss early measurements. Do not register metric_id as a custom dimension.

## Real integrations and limits

- Existing article links use Travelpayouts (Klook, GetTransfer, KKday, Airalo); Kiwitaxi is an embedded Travelpayouts widget. Classification uses actual `tpx.lv`, `tp.media`, `travelpayouts.com`, `tpemd.com` hosts or Klook links with `aff_pid`, never provider names alone. Links and IDs are not changed.
- Drive-generated links are captured if they expose those recognizable URLs in the top document at click time. Links rewritten only after our listener runs may escape classification. Drive loading itself fires no conversion.
- Cross-origin iframe clicks and completed provider bookings cannot be measured from the parent site. No fake conversion is emitted for widget/script loads. Revenue reconciliation requires provider reports or a separately verified server integration.
- No Amazon affiliate links, site search, newsletter, lead/signup forms, or video player exist. No handlers or events are invented for them. The cookie-preference form is not a lead form.
- Consent refusal, blockers, automation, unsafe entry URLs and script-load failures reduce coverage. Custom listeners wait up to 10 seconds for the GA queue; interactions before readiness are not replayed.

## Privacy and URL handling

No custom event reads forms, arbitrary link text, search text, names, emails, phone numbers, account identifiers or precise location. Unknown custom fields and event names are rejected. URL parameters and hashes are never forwarded in custom payloads. The GA bootstrap strips the initial referrer to its origin and disables Google Signals and ad personalization.

GA will not initialize on entry URLs outside the published/static route list, with unknown query parameters, malformed/private paths, or query values outside a restricted campaign/click-ID character set. Permitted keys: `utm_source`, `utm_medium`, `utm_campaign`, `utm_id`, `utm_term`, `utm_content`, `gclid`, `dclid`, `gbraid`, `wbraid`, and Tag Assistant's `gtm_debug`. This preserves ordinary acquisition attribution. **Never place personal information in campaign values or URL paths.** The site has no feature that collects such URL input.

Enhanced Measurement is Google's implementation and can collect full page/outbound URLs separately from our sanitized custom events. Enable GA data redaction for emails and sensitive query keys (`email`, `name`, `phone`, `address`, `message`, `token`, `q`, `s`, `search`, `query`, `keyword`). Keep these fields out of future links/routes, and revisit privacy before adding search/forms. Redaction is a supplementary safeguard, not permission to put PII in URLs. Outbound affiliate attribution parameters remain on navigation URLs but are stripped from our custom payloads.

## GA4 CUSTOM DIMENSIONS TO CREATE

Register these **event-scoped** parameters: `affiliate_network`, `affiliate_type`, `affiliate_provider`, `placement`, `content_type`, `content_id`, `destination`, `country`, `cta_name`, `cta_location`, `metric_name`, `metric_rating`.

`country` here describes the editorial destination; label that custom dimension Destination country to distinguish it from GA's native visitor geography. `content_id` currently has a small editorial vocabulary; review quota/cardinality as the publication grows. Do not add unused `content_category`, metric IDs, raw link URLs, page URLs, titles or every affiliate key as dimensions. Native page/link dimensions and existing `percent_scrolled` suffice. Register `metric_value` as an event-scoped **custom metric** with Standard units; filter by metric_name because CLS and timing values use different scales.

## Owner dashboard checklist

1. **Stream:** confirm web measurement ID G-1R8H9BMBVT, current stream URL and Vercel production `NEXT_PUBLIC_SITE_URL`. Leave `NEXT_PUBLIC_GA_ID` unset to use the default, or set it to that exact ID.
2. **Enhanced Measurement:** enable Page views and its Advanced browser-history option, Scrolls, Outbound clicks and File downloads. Site search/form/video measurement is unnecessary while these features do not exist. Do not add a second Google tag/GTM container or GA “create event” rule that duplicates our events.
3. **Privacy:** enable email/query data redaction as above; keep user-provided data collection/Google Signals off unless separately reviewed and authorized.
4. **Retention:** standard GA4 properties offer up to 14 months of event/user data retention. Choose 14 months only if appropriate to the site's privacy/retention policy; check the reset-on-new-activity setting too.
5. **Internal traffic:** define your office/home IP rules in the web stream's tag settings. Create an Internal Traffic data filter in Testing first, verify, then activate Exclude. Configure a Developer Traffic filter for debug_mode events. Production-origin checks cannot identify the owner's normal browser.
6. **Custom definitions:** register the exact event-scoped dimensions/custom metric above; definitions are not retroactive.
7. **Key events:** consider only `affiliate_click` as a booking-intent key event. It does **not** prove a purchase. Do not mark page_view, content_view, scroll, scroll_depth, impressions or every CTA. No lead/signup key events exist.
8. **DebugView:** use Tag Assistant on the production origin with a consenting internal/developer-filtered browser. Confirm one initial config and one page_view for home → article → destination → back, plus a fresh direct dynamic-page load. Check one affiliate_click and its provider/network; verify ordinary internal navigation produces none. Confirm reject/withdraw stops GA and Drive remains operational. Avoid clicking through to actual purchases.
9. **Realtime:** confirm acquisition, page views and custom events after acceptance. Automated local tests intentionally never contact the real property; they cannot prove ingestion or stream settings.
10. **Reports/funnels:** explore landing page → content selection/view → affiliate impression → affiliate_click, segmented by destination/provider/placement. Pair GA landing-page reports with Search Console for impressions, queries and ranking; GA alone does not supply SEO rankings. Advertising blockers and consent make counts incomplete.
11. **BigQuery:** optionally link later for raw-event/funnel analysis and latest-per-ID Web Vitals calculations. It is not required here.
12. **Domain migration:** update NEXT_PUBLIC_SITE_URL and redeploy, update the GA stream URL, internal traffic/unwanted referrals as applicable, and Search Console. Reuse this measurement ID. Do not enable cross-domain measurement between Vercel and a future custom domain unless both intentionally participate in a journey.

## Validation

Run `node --test tests/analytics.test.mjs`, `npm run check`, then `npm run build`. Local browser testing must show no GA script even after analytics consent; Drive remains present. The production gate and sanitized event dispatch are tested with mocks, not real-property hits. Complete the dashboard DebugView check above to confirm Google's history measurement configuration and received events.

References: [Next.js Google Analytics](https://nextjs.org/docs/app/guides/third-party-libraries#google-analytics), [Google SPA measurement](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications), [GA data redaction](https://support.google.com/analytics/answer/13544947), [GA retention](https://support.google.com/analytics/answer/7667196).
