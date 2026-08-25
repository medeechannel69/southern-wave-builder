# Audit notes — 2026-08-25

## Repository and build
- Repository is now accessible at `https://github.com/medeechannel69/southern-wave-builder.git`.
- Project is TypeScript + React + TanStack Start/Vite with Supabase integration and Cloudflare/Nitro build.
- `npm install` completed and `npm run build` passed.
- Dev server runs on port 8080 (Vite ignored the requested 5173 default in this project).

## Homepage browser test
- Homepage loads at `http://127.0.0.1:8080/`.
- Header navigation links are real routes.
- Homepage hero buttons `ดูแพ็กเกจ` and `ดูเว็บตัวอย่าง` are rendered as plain Buttons without navigation handlers.
- Service-card `ดูรายละเอียด` buttons are plain Buttons without navigation handlers.
- Portfolio `ดูหน้าเว็บทั้งหมด` button is a plain Button without navigation handler.
- Portfolio preview currently swaps static images and device width only; thumbnails are not clickable.
- Existing public CTA `/quote` is a real link.
- Main homepage already has a Supabase stats read and FAQ widget.

## Main scope risks found in source
- `src/routes/quote.tsx` currently inserts the lead and sends notification emails, but does not calculate or display an automatic quote, delivery date, or quote document.
- `src/components/demo/MiniSite.tsx` has local tab switching, but its generic contact form has no state/submit handler and social links use `href="#"`.
- `src/routes/demo.$slug.tsx` supplies placeholder phone/address/email values for demo websites.
- Hotel demo has booking/reservation UI that is local-only according to source audit and needs real handlers.

## Demo browser test
- `/demo` loads and all 8 cards link to the correct `/demo/{slug}` routes.
- `/demo/restaurant` loads with demo toolbar, internal tabs, CTA `/order?type=restaurant`, and tel link.
- Restaurant hero `จองโต๊ะ` is a plain button; clicking it produces no visible action.
- The generic demo has placeholder contact values and a contact form that does not submit.
- Demo footer social buttons are placeholder `href="#"` links.

## Implementation checkpoint
- Added shared automatic quote calculator at `src/lib/quote.ts`: Starter starts at 5,000 THB, delivery is 3 business days for the base package, add-ons have explicit prices and turnaround impact.
- Added client-side Thai PDF quotation generator at `src/lib/pdf/generateQuote.ts`.
- Added Supabase migration for `quote_number`, `total_amount`, `delivery_days`, `estimated_delivery_date`, and `breakdown`.
- Updated public quote page, customer email template, admin quote list/detail, generic demo site contact form, homepage CTA links, and HotelDemo booking/reservation interactions.
- `npm run build` passes after changes.
- Repository-wide `npm run lint` currently fails with 2,956 existing formatting/type-style errors across the project; this is separate from the production build and should not be used as the acceptance gate until the existing baseline is cleaned up.

## Automatic quote browser verification
- `/quote` now renders the automatic quotation panel next to the form.
- Default selection shows Starter 5,000 บาท and delivery within 3 business days; the estimated date is calculated from the current date and skips weekends.
- Selecting Business immediately changes the preview to 9,000 บาท and 7 business days.
- The public form exposes add-on prices and a post-submit PDF download action.

## Demo interaction verification
- `/demo/realestate` hero CTA `ค้นหาทรัพย์` now switches to the `ทรัพย์ทั้งหมด` page.
- The property demo now shows type, location, and budget filters with a real filtered result count and listing refresh.
- Demo footer links now point to real MedeeWeb Facebook/LINE URLs instead of `#`.

## Insurance demo verification
- `/demo/insurance` loads with working business-specific navigation.
- The `คำนวณเบี้ย` tab now opens a calculator with insurance type, insured value, and age fields; it returns an estimated annual premium and explains that the final premium requires staff confirmation.

## Hotel demo verification
- `/demo/hotel` now exposes real date inputs, guest count selection, validation, and a follow-up `Send Inquiry` action after availability criteria are valid.
- The reservation page now validates dates and inserts the request into `leads`, with a success state and real telephone/email links.

- Hotel booking widget was tested with 1–3 September 2026; after validation it changed from `CHECK AVAILABILITY` to `SEND INQUIRY`, and clicking it opened the full Reserve form.

- Hotel Gallery was verified: image tiles are clickable and open a full-screen lightbox with close, previous, and next controls.

## Final consistency and reliability fixes
The main contact form now persists the customer's email inside the lead message and sends an admin notification. Generic demo contact submissions and Andaman Sands reservation requests also send lead notifications. The public quote form first attempts to save the new automatic-quote fields and automatically falls back to the legacy quote schema when the migration has not yet been applied, so the form remains usable during deployment rollout. FAQ, structured-data FAQ, package FAQ, and demo copy now consistently describe Starter/Business/Pro delivery as 3/7/14 business days.
