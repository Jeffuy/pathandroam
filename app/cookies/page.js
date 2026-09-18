import EditorialPage from "../../components/EditorialPage";
import { createPageMetadata } from "../../lib/seo.js";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: "Cookie information for Path & Roam.",
  pathname: "/cookies",
  noindex: true,
});

export default function CookiesPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Cookie policy"
      intro="This notice explains how cookies and similar browser storage may be used."
    >
      <section>
        <h2>What we store</h2>
        <p>
          We store your cookie choices in first-party local storage under
          pathandroam-consent-v1 for 180 days. This preference is necessary to remember
          your decision. If browser storage is blocked, it lasts only for the current page.
          Hosting infrastructure may also process information needed to deliver the site.
        </p>
        <p>
          Optional Google Analytics, when configured, measures visits and interactions
          with booking links and may set _ga cookies. Optional affiliate booking
          widgets use third-party technology for affiliate attribution
          and displaying booking options. These services load only after you accept
          their respective category. Their providers may process device, referral
          and interaction information under their own privacy policies.
        </p>
        <p>
          Travelpayouts Drive loads automatically on every page through emrld.ltd
          for the site&apos;s affiliate integration. Cookie settings on this site
          control optional analytics and embedded booking widgets; they do not
          prevent Drive from loading or withdraw its operation.
        </p>
        <p>
          Provider information: <a href="https://policies.google.com/privacy">Google privacy policy</a>
          {" "}and <a href="https://www.travelpayouts.com/privacy">Travelpayouts privacy policy</a>.
        </p>
      </section>
      <section>
        <h2>Your controls</h2>
        <p>
          Use Cookie settings at the bottom of any page to accept, reject or change
          each optional category. Reject all withdraws optional consent and reloads
            the page to stop previously loaded optional services. Drive still loads.
            We remove accessible Google
          Analytics cookies when analytics is withdrawn; your browser settings can
          remove any remaining cookies, including those on third-party domains.
        </p>
        <p>
          Guides and ordinary outbound affiliate links work without optional consent.
          Following an external booking link takes you to another website, whose own
          privacy and cookie choices apply. Rejecting tracking here does not change
          choices you previously made on those websites.
        </p>
      </section>
    </EditorialPage>
  );
}
