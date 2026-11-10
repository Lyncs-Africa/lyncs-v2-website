export type QA = {q: string; a: string}
export type Group = {category: string; items: QA[]}

// Single source of truth for the FAQ — used by the homepage preview
// (first two per category) and the full /faq page.
export const FAQ_GROUPS: Group[] = [
    {
        category: 'The swap',
        items: [
            {
                q: 'How does the fleet swap work?',
                a: 'We value your current cars and count that value toward your 20% upfront payment. The rest is spread over 18 to 24 months through our partner banks. Financing is subject to the bank’s approval.',
            },
            {
                q: 'How soon can we get the cars?',
                a: 'Right away for what’s in stock. For larger orders we’ll confirm lead times with you up front.',
            },
            {
                q: 'Are the cars new or used?',
                a: 'Both. You can pick new EVs, used EVs, or a mix across your fleet.',
            },
            {
                q: 'Do the cars come with a warranty?',
                a: 'It depends on the car. New and used EVs carry different cover, and we’ll show you exactly what applies before you buy.',
            },
            {
                q: 'Do the cars come with insurance?',
                a: 'No. You’ll need to insure the cars yourself, the same way you would with any fleet vehicle.',
            },
        ],
    },
    {
        category: 'Charging & servicing',
        items: [
            {
                q: 'Where do we charge?',
                a: 'At your office, with chargers we install for you — free as your fleet grows. Around Lagos, the Lyncs app shows over 20 charging points and counting.',
            },
            {
                q: 'What happens when there’s no power?',
                a: 'We plan each office setup around your power situation. Ask us about solar and backup options for your site and we’ll scope what fits.',
            },
            {
                q: 'How long do EV batteries last?',
                a: 'It depends on the model. We’ll share the expected range and how battery degradation is handled for any car you’re considering.',
            },
            {
                q: 'Who services the cars?',
                a: 'Our network of over 10 repair partners across Lagos. Larger fleets get their first year of routine servicing free. Accident damage and major repairs aren’t covered.',
            },
            {
                q: 'What if a car breaks down?',
                a: 'Request help from the app, and your staff get Lyncs ride credits so they still get to work while the car is being fixed.',
            },
        ],
    },
    {
        category: 'Payments',
        items: [
            {
                q: 'What happens if we miss a payment?',
                a: 'This follows the financing agreement with our partner bank. We’ll walk you through the terms, including what happens if a payment is missed, before you sign.',
            },
        ],
    },
    {
        category: 'Everyone else',
        items: [
            {
                q: 'Can our staff get EVs too?',
                a: 'Yes. Your HR team can set it up for staff through Lyncs.',
            },
            {
                q: 'I drive for Bolt or inDrive. Can I get one?',
                a: 'Yes. Put 20% down or swap the car you drive now, and spread the rest over time. Our partner bank will check if you qualify.',
            },
            {
                q: 'Do we have to buy EVs to use Lyncs?',
                a: 'No. You can put your staff on a Lyncs plan for rides, buses and flights without changing your fleet.',
            },
            {
                q: 'What can management see on the dashboard?',
                a: 'Every trip, who took it and why, which department paid, whether it was approved, and who went over policy.',
            },
        ],
    },
]
