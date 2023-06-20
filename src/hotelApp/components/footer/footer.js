import React, { useState, useEffect, useRef } from "react";
import "../../css/footer/footer.css";

function Footer(props) {
  const footerLinks = [
    {
      header: "Support",
      links: [
        { name: "Help Centre", href: "/help/home?from=footer" },
        { name: "Safety information", href: "/trust" },
        { name: "Supporting people with disabilities", href: "/accessibility" },
        {
          name: "Cancellation options",
          href:
            "/help/article/2701/extenuating-circumstances-policy-and-the-coronavirus-covid19",
        },
        { name: "Report a concern", href: "/neighbors" },
      ],
    },
    {
      header: "Community",
      links: [
        { name: "Good causes", href: "/refugees" },
        { name: "Combating discrimination", href: "/discrimination" },
      ],
    },
    {
      header: "Hotels",
      links: [
        { name: "Log in", href: "/login" },
        { name: "New accounts", href: "/sales" },
        { name: "Report an issue", href: "/aircoverforhosts" },
        { name: "Explore hotel resources", href: "/hostingresources" },
      ],
    },
    {
      header: "About us",
      links: [
        { name: "Newsroom", href: "/newsroom" },
        { name: "Careers", href: "/careers" },
        { name: "Investors", href: "/investors" },
        { name: "Gift cards", href: "/giftcards" },
      ],
    },
  ];

  const bottomSection = [
    <div class="_1wsqynx">
      <span class="a8jt5op dir dir-ltr">Footer section</span>
      <section>
        <div class="_1udzt2s">
          <div class="_p03egf">
            <div class="_jro6t0">
              <span class="_19c5bku">
                <button type="button" class="_f2hxk3s">
                  <span class="a8jt5op dir dir-ltr">Choose a language</span>
                  <span class="_14tkmhr">
                    <svg
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        display: "block",
                        height: "16px",
                        width: "16px",
                        fill: "currentcolor",
                      }}
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"></path>
                    </svg>
                  </span>
                  <span class="_144l3kj">English (GB)</span>
                </button>
              </span>
              <span class="_19c5bku">
                <button type="button" class="_f2hxk3s">
                  <span class="a8jt5op dir dir-ltr">Choose a currency</span>
                  <span class="_14tkmhr">
                    <span class="_pgfqnw">£</span>
                  </span>
                  <span class="_144l3kj">GBP</span>
                </button>
              </span>
            </div>
          </div>
          <div class="_pd8gea">
            <div class="_wjo0ey">
              <div class="_1br4kkl" dir="ltr">
                © 2022 Airbnb, Inc.
              </div>
              <div class="_opoa3c">
                <span class="_j8ldew">
                  <span class="_15vc6yg" aria-hidden="true">
                    ·
                  </span>
                </span>
                <a href="/terms/privacy_policy" class="_1e6wtwm5">
                  Privacy
                </a>
                <span class="_15vc6yg" aria-hidden="true">
                  ·
                </span>
                <a href="/terms" class="_1e6wtwm5">
                  Terms
                </a>
                <span class="_15vc6yg" aria-hidden="true">
                  ·
                </span>
                <a href="/sitemaps/v2" class="_1e6wtwm5">
                  Sitemap
                </a>
                <span class="_15vc6yg" aria-hidden="true">
                  ·
                </span>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://a0.muscache.com/static/uk-modern-slavery-act-statement.pdf"
                  class="_1e6wtwm5"
                >
                  UK Modern Slavery Act
                </a>
                <span class="_15vc6yg" aria-hidden="true">
                  ·
                </span>
                <a
                  target="_blank"
                  href="/about/company-details"
                  class="_1e6wtwm5"
                >
                  Company details
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="_15m7xnk">
          <div class="_1juxowe">
            <div class="_jro6t0">
              <span class="_19c5bku">
                <button type="button" class="_f2hxk3s">
                  <span class="a8jt5op dir dir-ltr">Choose a language</span>
                  <span class="_14tkmhr">
                    <svg
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        display: "block",
                        height: "16px",
                        width: "16px",
                        fill: "currentcolor",
                      }}
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"></path>
                    </svg>
                  </span>
                  <span class="_144l3kj">English (GB)</span>
                </button>
              </span>
              <span class="_19c5bku">
                <button type="button" class="_f2hxk3s">
                  <span class="a8jt5op dir dir-ltr">Choose a currency</span>
                  <span class="_14tkmhr">
                    <span class="_pgfqnw">£</span>
                  </span>
                  <span class="_144l3kj">GBP</span>
                </button>
              </span>
            </div>
            <div class="_xh0r19">
              <ul class="_115qwnm">
                <li class="_kdkpwk">
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.facebook.com/airbnb"
                    class="_1vwyakty"
                  >
                    <svg
                      viewBox="0 0 32 32"
                      role="img"
                      aria-hidden="false"
                      aria-label="Navigate to Facebook"
                      focusable="false"
                      style={{
                        height: "18px",
                        width: "18px",
                        display: "block",
                        fill: "currentcolor",
                      }}
                    >
                      <path
                        d="m8 14.41v-4.17c0-.42.35-.81.77-.81h2.52v-2.08c0-4.84 2.48-7.31 7.42-7.35 1.65 0 3.22.21 4.69.64.46.14.63.42.6.88l-.56 4.06c-.04.18-.14.35-.32.53-.21.11-.42.18-.63.14-.88-.25-1.78-.35-2.8-.35-1.4 0-1.61.28-1.61 1.73v1.8h4.52c.42 0 .81.42.81.88l-.35 4.17c0 .42-.35.71-.77.71h-4.21v16c0 .42-.35.81-.77.81h-5.21c-.42 0-.8-.39-.8-.81v-16h-2.52a.78.78 0 0 1 -.78-.78"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li class="_kdkpwk">
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://twitter.com/airbnb"
                    class="_1vwyakty"
                  >
                    <svg
                      viewBox="0 0 32 32"
                      role="img"
                      aria-hidden="false"
                      aria-label="Navigate to Twitter"
                      focusable="false"
                      style={{
                        height: "18px",
                        width: "18px",
                        display: "block",
                        fill: "currentcolor",
                      }}
                    >
                      <path
                        d="m31 6.36c-1.16.49-2.32.82-3.55.95 1.29-.76 2.22-1.87 2.72-3.38a13.05 13.05 0 0 1 -3.91 1.51c-1.23-1.28-2.75-1.94-4.51-1.94-3.41 0-6.17 2.73-6.17 6.12 0 .49.07.95.17 1.38-4.94-.23-9.51-2.6-12.66-6.38-.56.95-.86 1.97-.86 3.09 0 2.07 1.03 3.91 2.75 5.06-1-.03-1.92-.3-2.82-.76v.07c0 2.89 2.12 5.42 4.94 5.98-.63.17-1.16.23-1.62.23-.3 0-.7-.03-1.13-.13a6.07 6.07 0 0 0 5.74 4.24c-2.22 1.74-4.78 2.63-7.66 2.63-.56 0-1.06-.03-1.43-.1 2.85 1.84 6 2.76 9.41 2.76 7.29 0 12.83-4.01 15.51-9.3 1.36-2.66 2.02-5.36 2.02-8.09v-.46c-.03-.17-.03-.3-.03-.33a12.66 12.66 0 0 0 3.09-3.16"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li class="_kdkpwk">
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://instagram.com/airbnb"
                    class="_1vwyakty"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      aria-hidden="false"
                      aria-label="Navigate to Instagram"
                      focusable="false"
                      style={{
                        height: "18px",
                        width: "18px",
                        display: "block",
                        fill: "currentcolor",
                      }}
                    >
                      <path
                        d="m23.09.91c-.61-.61-1.33-.91-2.17-.91h-17.84c-.85 0-1.57.3-2.17.91s-.91 1.33-.91 2.17v17.84c0 .85.3 1.57.91 2.17s1.33.91 2.17.91h17.84c.85 0 1.57-.3 2.17-.91s.91-1.33.91-2.17v-17.84c0-.85-.3-1.57-.91-2.17zm-14.48 7.74c.94-.91 2.08-1.37 3.4-1.37 1.33 0 2.47.46 3.41 1.37s1.41 2.01 1.41 3.3-.47 2.39-1.41 3.3-2.08 1.37-3.41 1.37c-1.32 0-2.46-.46-3.4-1.37s-1.41-2.01-1.41-3.3.47-2.39 1.41-3.3zm12.66 11.63c0 .27-.09.5-.28.68a.92.92 0 0 1 -.67.28h-16.7a.93.93 0 0 1 -.68-.28.92.92 0 0 1 -.27-.68v-10.13h2.2a6.74 6.74 0 0 0 -.31 2.05c0 2 .73 3.71 2.19 5.12s3.21 2.12 5.27 2.12a7.5 7.5 0 0 0 3.75-.97 7.29 7.29 0 0 0 2.72-2.63 6.93 6.93 0 0 0 1-3.63c0-.71-.11-1.39-.31-2.05h2.11v10.12zm0-13.95c0 .3-.11.56-.31.77a1.05 1.05 0 0 1 -.77.31h-2.72c-.3 0-.56-.11-.77-.31a1.05 1.05 0 0 1 -.31-.77v-2.58c0-.29.11-.54.31-.76s.47-.32.77-.32h2.72c.3 0 .56.11.77.32s.31.47.31.76z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="_1sv27e6">
            <div class="_pd8gea">
              <div class="_wjo0ey">
                <div class="_1br4kkl" dir="ltr">
                  © 2022 Airbnb, Inc.
                </div>
                <div class="_opoa3c">
                  <span class="_j8ldew">
                    <span class="_15vc6yg" aria-hidden="true">
                      ·
                    </span>
                  </span>
                  <a href="/terms/privacy_policy" class="_1e6wtwm5">
                    Privacy
                  </a>
                  <span class="_15vc6yg" aria-hidden="true">
                    ·
                  </span>
                  <a href="/terms" class="_1e6wtwm5">
                    Terms
                  </a>
                  <span class="_15vc6yg" aria-hidden="true">
                    ·
                  </span>
                  <a href="/sitemaps/v2" class="_1e6wtwm5">
                    Sitemap
                  </a>
                  <span class="_15vc6yg" aria-hidden="true">
                    ·
                  </span>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://a0.muscache.com/static/uk-modern-slavery-act-statement.pdf"
                    class="_1e6wtwm5"
                  >
                    UK Modern Slavery Act
                  </a>
                  <span class="_15vc6yg" aria-hidden="true">
                    ·
                  </span>
                  <a
                    target="_blank"
                    href="/about/company-details"
                    class="_1e6wtwm5"
                  >
                    Company details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="_ar9stc">
          <div class="_pd8gea">
            <div class="_wjo0ey">
              <div class="_1br4kkl" dir="ltr">
                © 2022 Airbnb, Inc.
              </div>
              <div class="_opoa3c">
                <span class="_j8ldew">
                  <span class="_15vc6yg" aria-hidden="true">
                    ·
                  </span>
                </span>
                <a href="/terms/privacy_policy" class="_1e6wtwm5">
                  Privacy
                </a>
                <span class="_15vc6yg" aria-hidden="true">
                  ·
                </span>
                <a href="/terms" class="_1e6wtwm5">
                  Terms
                </a>
                <span class="_15vc6yg" aria-hidden="true">
                  ·
                </span>
                <a href="/sitemaps/v2" class="_1e6wtwm5">
                  Sitemap
                </a>
                <span class="_15vc6yg" aria-hidden="true">
                  ·
                </span>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://a0.muscache.com/static/uk-modern-slavery-act-statement.pdf"
                  class="_1e6wtwm5"
                >
                  UK Modern Slavery Act
                </a>
                <span class="_15vc6yg" aria-hidden="true">
                  ·
                </span>
                <a
                  target="_blank"
                  href="/about/company-details"
                  class="_1e6wtwm5"
                >
                  Company details
                </a>
              </div>
            </div>
          </div>
          <div class="_jro6t0">
            <div class="_jro6t0">
              <span class="_19c5bku">
                <button type="button" class="_f2hxk3s">
                  <span class="a8jt5op dir dir-ltr">Choose a language</span>
                  <span class="_14tkmhr">
                    <svg
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        display: "block",
                        height: "16px",
                        width: "16px",
                        fill: "currentcolor",
                      }}
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"></path>
                    </svg>
                  </span>
                  <span class="_144l3kj">English (GB)</span>
                </button>
              </span>
              <span class="_19c5bku">
                <button type="button" class="_f2hxk3s">
                  <span class="a8jt5op dir dir-ltr">Choose a currency</span>
                  <span class="_14tkmhr">
                    <span class="_pgfqnw">£</span>
                  </span>
                  <span class="_144l3kj">GBP</span>
                </button>
              </span>
            </div>
            <div class="_xh0r19">
              <ul class="_115qwnm">
                <li class="_kdkpwk">
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.facebook.com/airbnb"
                    class="_1vwyakty"
                  >
                    <svg
                      viewBox="0 0 32 32"
                      role="img"
                      aria-hidden="false"
                      aria-label="Navigate to Facebook"
                      focusable="false"
                      style={{
                        height: "18px",
                        width: "18px",
                        display: "block",
                        fill: "currentcolor",
                      }}
                    >
                      <path
                        d="m8 14.41v-4.17c0-.42.35-.81.77-.81h2.52v-2.08c0-4.84 2.48-7.31 7.42-7.35 1.65 0 3.22.21 4.69.64.46.14.63.42.6.88l-.56 4.06c-.04.18-.14.35-.32.53-.21.11-.42.18-.63.14-.88-.25-1.78-.35-2.8-.35-1.4 0-1.61.28-1.61 1.73v1.8h4.52c.42 0 .81.42.81.88l-.35 4.17c0 .42-.35.71-.77.71h-4.21v16c0 .42-.35.81-.77.81h-5.21c-.42 0-.8-.39-.8-.81v-16h-2.52a.78.78 0 0 1 -.78-.78"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li class="_kdkpwk">
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://twitter.com/airbnb"
                    class="_1vwyakty"
                  >
                    <svg
                      viewBox="0 0 32 32"
                      role="img"
                      aria-hidden="false"
                      aria-label="Navigate to Twitter"
                      focusable="false"
                      style={{
                        height: "18px",
                        width: "18px",
                        display: "block",
                        fill: "currentcolor",
                      }}
                    >
                      <path
                        d="m31 6.36c-1.16.49-2.32.82-3.55.95 1.29-.76 2.22-1.87 2.72-3.38a13.05 13.05 0 0 1 -3.91 1.51c-1.23-1.28-2.75-1.94-4.51-1.94-3.41 0-6.17 2.73-6.17 6.12 0 .49.07.95.17 1.38-4.94-.23-9.51-2.6-12.66-6.38-.56.95-.86 1.97-.86 3.09 0 2.07 1.03 3.91 2.75 5.06-1-.03-1.92-.3-2.82-.76v.07c0 2.89 2.12 5.42 4.94 5.98-.63.17-1.16.23-1.62.23-.3 0-.7-.03-1.13-.13a6.07 6.07 0 0 0 5.74 4.24c-2.22 1.74-4.78 2.63-7.66 2.63-.56 0-1.06-.03-1.43-.1 2.85 1.84 6 2.76 9.41 2.76 7.29 0 12.83-4.01 15.51-9.3 1.36-2.66 2.02-5.36 2.02-8.09v-.46c-.03-.17-.03-.3-.03-.33a12.66 12.66 0 0 0 3.09-3.16"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li class="_kdkpwk">
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://instagram.com/airbnb"
                    class="_1vwyakty"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      aria-hidden="false"
                      aria-label="Navigate to Instagram"
                      focusable="false"
                      style={{
                        height: "18px",
                        width: "18px",
                        display: "block",
                        fill: "currentcolor",
                      }}
                    >
                      <path
                        d="m23.09.91c-.61-.61-1.33-.91-2.17-.91h-17.84c-.85 0-1.57.3-2.17.91s-.91 1.33-.91 2.17v17.84c0 .85.3 1.57.91 2.17s1.33.91 2.17.91h17.84c.85 0 1.57-.3 2.17-.91s.91-1.33.91-2.17v-17.84c0-.85-.3-1.57-.91-2.17zm-14.48 7.74c.94-.91 2.08-1.37 3.4-1.37 1.33 0 2.47.46 3.41 1.37s1.41 2.01 1.41 3.3-.47 2.39-1.41 3.3-2.08 1.37-3.41 1.37c-1.32 0-2.46-.46-3.4-1.37s-1.41-2.01-1.41-3.3.47-2.39 1.41-3.3zm12.66 11.63c0 .27-.09.5-.28.68a.92.92 0 0 1 -.67.28h-16.7a.93.93 0 0 1 -.68-.28.92.92 0 0 1 -.27-.68v-10.13h2.2a6.74 6.74 0 0 0 -.31 2.05c0 2 .73 3.71 2.19 5.12s3.21 2.12 5.27 2.12a7.5 7.5 0 0 0 3.75-.97 7.29 7.29 0 0 0 2.72-2.63 6.93 6.93 0 0 0 1-3.63c0-.71-.11-1.39-.31-2.05h2.11v10.12zm0-13.95c0 .3-.11.56-.31.77a1.05 1.05 0 0 1 -.77.31h-2.72c-.3 0-.56-.11-.77-.31a1.05 1.05 0 0 1 -.31-.77v-2.58c0-.29.11-.54.31-.76s.47-.32.77-.32h2.72c.3 0 .56.11.77.32s.31.47.31.76z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>,
  ];

  const footerRender = (linksData) => {
    let footerRender = [];
    for (let i = 0; i < linksData.length; i++) {
      const columnData = linksData[i].links;
      let linksColumn = [];
      for (let j = 0; j < columnData.length; j++) {
        linksColumn.push(
          <li class="footer-wmu">
        {/*  <a href={columnData[j].href} class="_1e6wtwm5"> */}
        <span class="footer-1e6">
              {columnData[j].name}
            </span>
          </li>
        );
      }
      footerRender.push(
        <section class="footer-1l3">
          <div class="footer-x6q">
            <h3 class="footer-otc">{linksData[i].header}</h3>
          </div>
          <ul class="footer-yuo">{linksColumn}</ul>
        </section>
      );
    }
    return footerRender;
  };

if (props.largeView) {
    return (

        <footer class="footer-1fa">
          <div class="footer-1s9">
            <div class="footer-fyx">{footerRender(footerLinks)}</div>
            {/*bottomSection*/}
          </div>
        </footer>

    );
  } else {
    return (


      <footer class="footer-1fa">
      <div class="footer-1s9">
      <div class="footer-fyx">
      {footerRender(footerLinks)}
      </div>

      {/* bottomSection */}

      </div>
      </footer>


    );
  }
}

export default Footer;
