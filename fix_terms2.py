import re

with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

terms_content_start = content.find('{activeModal === "terms" ? (')
terms_content_end = content.find(') : (')

if terms_content_start != -1 and terms_content_end != -1:
    old_terms_content = content[terms_content_start:terms_content_end]
    new_terms_content = '''{activeModal === "terms" ? (
                  <>
                    <p className="font-bold">Last updated: 24 JULY 2026</p>
                    <p>
                      These Terms and Conditions (“Terms”) govern the use of
                      https://casachitic.ro/ (the “Website”) and the
                      services provided by CCB HOTELS SRL at Casa Chitic, Str. Johann Gott 7, Brașov). Accessing the Website, making a
                      reservation or using our services constitutes full and
                      unconditional acceptance of these Terms.
                    </p>
                    <p>
                      <strong>Operator:</strong> CCB HOTELS SRL, Address: Comuna
                      Cristian, Sat Cristian, Nicolae Iorga 32, Brașov County, VAT
                      RO39174576, Trade Registry: J2018000815087 (new format),
                      e-mail:{" "}
                      <a
                        href="mailto:office@casachitic.ro"
                        className="text-hotel-gold hover:underline"
                      >
                        office@casachitic.ro
                      </a>
                      , phone: +40 731 002 138.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Definitions
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-hotel-charcoal/80">
                      <li><strong>Operator/We</strong> – CCB HOTELS SRL.</li>
                      <li><strong>Client/Guest</strong> – any natural/legal person using the Website, making reservations or benefiting from services (accommodation, restaurant, events).</li>
                      <li><strong>Services</strong> – accommodation, F&B (restaurant/bar), events and related services (Wi-Fi, luggage storage etc.).</li>
                      <li><strong>Reservation</strong> – firm intention to purchase Services for specified dates/conditions.</li>
                      <li><strong>PMS/booking engine</strong> – system managing reservations and payments.</li>
                    </ul>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Scope
                    </h3>
                    <p>
                      These Terms apply to legal relationships regarding: Website use; reservations (Website, phone/e-mail, front desk, OTAs); accommodation/restaurant services; events.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Website use
                    </h3>
                    <p>
                      The Website is provided “as is”. Display errors or delayed updates may occur; we reserve the right to change content, rates and availability without notice, without affecting already-confirmed reservations. Unlawful use is prohibited (incl. unauthorized access, mass scraping, code injection). Website content is protected by IP laws.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Reservations. Contract formation
                    </h3>
                    <p>
                      Reservations may be made via Website; phone/e-mail; front desk; third-party platforms (OTAs). The contract is concluded upon confirmation (automatic or manual). Some rates may require guarantee (card pre-authorization/deposit) or full prepayment. The Client must check reservation details (name, stay dates, room type, persons, cancellation). For OTA bookings, the platform’s commercial terms may complement these Terms; in case of discrepancy, the conditions in the stay confirmation prevail.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Rates, taxes & payments
                    </h3>
                    <p>
                      Rates are shown in the indicated currency and include VAT as per law; other specific charges (e.g., local tourist tax) may be payable at the front desk. Accepted payment methods are indicated on the Website/confirmation. Card data are processed by authorized processors in line with PCI DSS; the Operator does not store full card data. In case of non-payment, the Operator may withhold/offset guaranteed amounts and refuse services until settlement.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Cancellation, modification, no-show
                    </h3>
                    <p>Each offer/rate has its own rules (deadline, penalties).</p>
                    <ul className="list-disc pl-5 space-y-1 text-hotel-charcoal/80">
                      <li><strong>Non-refundable:</strong> advance payments are not returned, except as provided.</li>
                      <li><strong>No-show:</strong> penalty per rate (usually first night or full stay, as applicable).</li>
                      <li><strong>Groups/events:</strong> special conditions may apply (deposit, milestones, extended deadlines).</li>
                    </ul>
                    <p className="mt-2 text-xs text-hotel-charcoal/60 italic">
                      Consumer note: the right of withdrawal under GEO 34/2014 does not apply to accommodation, transport, car rental, catering or leisure services for a specific date/period (Art. 16 lit. l).
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Check-in/Check-out. House rules
                    </h3>
                    <p>
                      Check-in/out during communicated hours; early/late subject to availability (possible fees). A valid ID must be presented at check-in; data are processed per hospitality rules. Proper conduct is required: no damage, disturbance (noise), smoking in non-smoking rooms, or illegal substances. We may evict guests breaching rules, without refund for consumed services.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-hotel-charcoal/80">
                      <li><strong>Smoking:</strong> only in designated areas; smoking in rooms may incur cleaning fees.</li>
                      <li><strong>Pets:</strong> subject to the unit’s policy published on the Website/confirmation; restrictions/fees may apply.</li>
                      <li><strong>Damages:</strong> the Client is liable; the Operator may charge the guarantee/pre-authorization for proven damages.</li>
                      <li><strong>Lost & found:</strong> items kept for a reasonable period; return at Client’s expense.</li>
                      <li><strong>Parking (if available):</strong> limited spots; may be unsecured/unattended; the Operator is not liable for items left in vehicles.</li>
                    </ul>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Restaurant. Allergens
                    </h3>
                    <p>
                      Table reservations are confirmed subject to availability; delays may lead to reallocation. For groups/events, a deposit and preset menu may be required. The Client must inform staff of any allergies before ordering; reasonable efforts are made, but cross-contamination risk cannot be fully excluded in shared kitchen environments.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Events (rooms, catering)
                    </h3>
                    <p>
                      Specific conditions (room setup, AV, schedule, catering, noise limits, special permits) are agreed by dedicated offer/contract. Cancellation/modification follows offer clauses (milestones, penalties). The Client ensures compliance with safety/fire rules and obtains any permits required by the nature of the event.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Guest Wi-Fi – acceptable use
                    </h3>
                    <p>
                      Wi-Fi access may be conditioned by accepting captive-portal terms. Unlawful use is prohibited (copyright violations, malware distribution, unauthorized access). For security/audit, technical metadata (MAC, assigned IP, session time) may be collected per the Privacy Policy.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      CCTV
                    </h3>
                    <p>
                      Common areas may be monitored for security (legitimate interest). Areas are signposted; retention/access limits follow the Privacy Policy.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Force majeure. Overbooking/Relocation
                    </h3>
                    <p>
                      No party is liable for non-performance caused by force majeure. In exceptional overbooking or unforeseen unavailability, we may offer relocation to a similar category property or refund amounts for unprovided services, as per law.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Liability
                    </h3>
                    <p>
                      We act in good faith to perform obligations. To the extent permitted by law, liability for foreseeable and proven damages is limited to the value of services reserved for the stay/event concerned (excluding bodily injury, willful misconduct or gross negligence). We are not liable for: (i) interruptions/errors in third-party services (utilities, payments, OTAs); (ii) indirect losses (loss of work, opportunity, profit).
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Data protection
                    </h3>
                    <p>
                      Processing takes place under the Privacy Policy. Data subject rights (access, rectification, erasure, restriction, portability, objection) may be exercised at office@casachitic.ro.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Intellectual property
                    </h3>
                    <p>
                      Website materials (texts, photos, logos, visual elements) are owned by the Operator or partners and protected by law. A limited, non-exclusive, revocable license is granted for personal, non-commercial access. Any reproduction/distribution requires written consent.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Third-party links
                    </h3>
                    <p>
                      The Website may contain links to third parties (OTAs, maps, video, social media). We do not control their content or policies; access at your own risk.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Complaints. ADR/ODR
                    </h3>
                    <p>
                      Service-related complaints may be submitted at the front desk or in writing to office@casachitic.ro; we respond within legal deadlines. For consumer disputes, ADR/ODR mechanisms may be used (EU Online Dispute Resolution platform) without affecting access to courts.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Governing law & jurisdiction
                    </h3>
                    <p>
                      These Terms are governed by Romanian law. Disputes are settled amicably; failing that, by competent Romanian courts, as provided by law.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Changes to the Terms
                    </h3>
                    <p>
                      We may update the Terms for legal/technical/operational reasons. The updated version is published on the Website and applies from publication. Already-confirmed reservations remain governed by conditions applicable at confirmation unless otherwise agreed.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Final provisions
                    </h3>
                    <p>
                      Invalidity of any clause does not affect the validity of the rest; the invalid clause is replaced by the applicable legal provision. Formal communications use the contact details provided. The Client must keep their details up to date.
                    </p>

                    <h3 className="font-serif text-xl mt-6 mb-3 text-hotel-gold">
                      Contact
                    </h3>
                    <p>
                      CCB HOTELS SRL • Comuna Cristian, Sat Cristian, Nicolae Iorga 32, Brașov County<br />
                      E-mail: office@casachitic.ro | Tel.: +40 720 331 144
                    </p>
                  </>
                '''

    content = content.replace(old_terms_content, new_terms_content)

    with open('src/components/Footer.tsx', 'w') as f:
        f.write(content)
else:
    print("Could not find terms content")
