import {
  LuCar,
  LuBus,
  LuPlane,
  LuWallet,
  LuKey,
  LuTruck,
  LuFuel,
  LuWrench,
  LuShieldCheck,
  LuClock,
  LuTrendingDown,
  LuQrCode,
  LuCheck,
} from 'react-icons/lu'
import { IoCheckmarkCircle } from 'react-icons/io5'

export interface PlatformService {
  slug: string
  label: string
  shortTitle: string
  badge: string
  tagline: string
  heroHeading: string
  heroAccent: string
  dialogBrain: string
  dialogLips: string
  iconName: string
  color: string
  heroImage: string
  secondaryImage: string
  providers: { name: string; tag: string }[]
  painPoints: string[]
  solutions: string[]
  capabilities: { title: string; desc: string }[]
  stats: { label: string; val: string }[]
  faq: {
    title: string
    question: string
    answer: string
    reaction: string
    avatar: string
    color: string
    tint: string
    bubble: string
    reply: string
  }[]
  ctaHeadline: string
  ctaSub: string
  primaryCtaText: string
  primaryCtaHref: string
}

export const PLATFORM_SERVICES: Record<string, PlatformService> = {
  rides: {
    slug: 'rides',
    label: 'Rides',
    shortTitle: 'All-in-One Rides',
    badge: 'Bolt • Uber • LagRide • inDrive',
    tagline: 'Every ride-hailing network in Africa connected to one corporate wallet.',
    heroHeading: 'Compare fares and book rides across all apps with',
    heroAccent: 'zero expense claim wahala.',
    dialogBrain: 'Do our staff have to switch between 4 different ride apps and file claims?',
    dialogLips:
      'Not anymore. Lyncs aggregates Bolt, Uber, LagRide, and inDrive. Staff hail rides directly on company budget with automatic policy limits.',
    iconName: 'LuCar',
    color: 'bg-[#E6F0DC]',
    heroImage: '/images/13.jpg',
    secondaryImage: '/images/overview.jpg',
    providers: [
      { name: 'Bolt', tag: 'Fast dispatch' },
      { name: 'Uber', tag: 'Executive rides' },
      { name: 'LagRide', tag: 'Lagos state fleet' },
      { name: 'inDrive', tag: 'Fair fares' },
    ],
    painPoints: [
      'Staff taking screenshots of receipts and waiting 3 weeks for finance reimbursements',
      'Employees paying 3x surge pricing on one app without checking cheaper alternatives',
      'Off-hour personal trips billed to corporate credit cards without verification',
      'Finance reconciling hundreds of separate card charges at the end of the month',
    ],
    solutions: [
      'Single corporate billing: staff ride without spending their own money upfront',
      'Real-time price comparison across all major ride networks before booking',
      'Strict automated rules: curfew hours (e.g. 7pm–10pm) and geofenced client routes',
      'One consolidated monthly tax invoice with line-by-line employee audit logs',
    ],
    capabilities: [
      {
        title: 'Multi-App Rate Aggregation',
        desc: 'Compare Bolt, Uber, and LagRide fares instantly side-by-side to guarantee the most economical option every trip.',
      },
      {
        title: 'Department Wallet Allowances',
        desc: 'Assign monthly ride balances to sales reps, engineers, and executives with automated reset cycles.',
      },
      {
        title: 'Geofenced & Time-Restricted Policies',
        desc: 'Prevent misuse by restricting company ride hailing to office hours, airport corridors, or client meeting zones.',
      },
      {
        title: 'Instant VAT & Audit Export',
        desc: 'Export tax-compliant CSV receipts directly to QuickBooks, SAP, or Microsoft Dynamics with a single click.',
      },
    ],
    stats: [
      { label: 'Reduction in ride hailing spend', val: '28%' },
      { label: 'Employee reimbursement delay', val: '0 days' },
      { label: 'Integrated ride networks', val: '4 in 1' },
      { label: 'Policy compliance rate', val: '100%' },
    ],
    faq: [
      {
        title: 'Policy Guardrails',
        question: 'Can we stop employees from taking company rides to personal parties?',
        answer: 'Yes! You can configure geofenced destinations, restrict hailing to specific hours (e.g. 7am–9pm), and set hard trip budgets.',
        reaction: 'Ehen! Exactly the financial control our audit board demanded.',
        avatar: '/images/face-1.png',
        color: 'bg-green-950 dark:bg-green-100/10',
        tint: 'text-green-300',
        bubble: 'bg-green-400/15',
        reply: 'bg-green-100 text-green-950',
      },
      {
        title: 'Provider Selection',
        question: 'What if Bolt is surging but Uber has plenty of drivers nearby?',
        answer: 'Lyncs shows live pricing and ETAs for all providers on a single screen so employees always get the fastest, cheapest ride.',
        reaction: 'Sharp. No more toggling back and forth between apps.',
        avatar: '/images/face-three.png',
        color: 'bg-fuchsia-950 dark:bg-fuchsia-100/10',
        tint: 'text-fuchsia-300',
        bubble: 'bg-fuchsia-400/15',
        reply: 'bg-fuchsia-100 text-fuchsia-950',
      },
      {
        title: 'Corporate Invoicing',
        question: 'Can we get a single monthly invoice instead of paying per trip?',
        answer: 'Yes! Qualified businesses can activate 30-day post-paid invoicing or maintain an auto-refilling centralized treasury wallet.',
        reaction: 'One single invoice for the whole month? Perfect.',
        avatar: '/images/24.jpg',
        color: 'bg-purple-950 dark:bg-purple-100/10',
        tint: 'text-purple-300',
        bubble: 'bg-purple-400/15',
        reply: 'bg-purple-100 text-purple-950',
      },
    ],
    ctaHeadline: 'Ready to simplify company rides across your organization?',
    ctaSub: 'Set up your corporate ride portal in 15 minutes. No integration headache.',
    primaryCtaText: 'Book a rides demo',
    primaryCtaHref: '/contact',
  },

  buses: {
    slug: 'buses',
    label: 'Buses',
    shortTitle: 'Staff Shuttles & Buses',
    badge: 'Custom Routes • Live Tracking',
    tagline: 'Reliable staff commute shuttles and intercity executive coach routes.',
    heroHeading: 'Transport your workforce on time, safely & comfortably with',
    heroAccent: 'smart corporate bus shuttles.',
    dialogBrain: 'Can we map custom routes for our 150 staff scattered across Lagos Mainland?',
    dialogLips:
      'Absolutely. We analyze your staff residential clusters, design morning & evening routes, and provide live GPS bus tracking with QR check-in.',
    iconName: 'LuBus',
    color: 'bg-[#DCE5EA]',
    heroImage: '/images/22.jpg',
    secondaryImage: '/images/team-2.jpg',
    providers: [
      { name: 'Express Commute', tag: 'Island ⇄ Mainland' },
      { name: 'Executive Coasters', tag: 'Fully air-conditioned' },
      { name: 'Intercity Charters', tag: 'Lagos, Abuja, PH' },
      { name: 'Vetted Drivers', tag: '100% background checked' },
    ],
    painPoints: [
      'Employees arriving late and exhausted due to chaotic public transport and bus queues',
      'Unmonitored third-party bus charters breaking down with zero backup vehicles',
      'No way to verify whether contracted buses actually picked up staff at assigned stops',
      'Exorbitant monthly vehicle lease costs eating into company operational budgets',
    ],
    solutions: [
      'Cluster-optimized routes that reduce average daily employee commute times by 40 minutes',
      'Guaranteed replacement bus standby network in case of mechanical issues',
      'Real-time passenger QR code boarding scanners with automated attendance logs',
      'Flexible monthly seat subscription model—only pay for the seats your workforce uses',
    ],
    capabilities: [
      {
        title: 'Intelligent Route Cluster Mapping',
        desc: 'Our logistics team maps staff addresses into optimal pick-up hubs, maximizing convenience while avoiding Lagos traffic blackspots.',
      },
      {
        title: 'Live Vehicle GPS Telemetry',
        desc: 'Staff see their shuttle bus approaching on a live map with accurate ETA arrival alerts sent directly to their phones.',
      },
      {
        title: 'Digital QR Boarding Passes',
        desc: 'Contactless check-in prevents unauthorized passengers and gives HR precise daily commute attendance analytics.',
      },
      {
        title: 'Comfort & Safety Guarantee',
        desc: 'All buses are air-conditioned, regularly serviced, and operated by background-checked professional commercial drivers.',
      },
    ],
    stats: [
      { label: 'Commute punctuality rate', val: '98.4%' },
      { label: 'Avg employee time saved daily', val: '45 mins' },
      { label: 'Fleet maintenance compliance', val: '100%' },
      { label: 'Routes operational across Nigeria', val: '65+' },
    ],
    faq: [
      {
        title: 'Bus Route Customization',
        question: 'How quickly can you set up a new shuttle route for our factory or office?',
        answer: 'Within 48 hours. Send us your employee stop locations, and our route optimization algorithms will generate the optimal schedule.',
        reaction: 'Ehen! That takes care of our Mainland staff completely.',
        avatar: '/images/face-1.png',
        color: 'bg-green-950 dark:bg-green-100/10',
        tint: 'text-green-300',
        bubble: 'bg-green-400/15',
        reply: 'bg-green-100 text-green-950',
      },
      {
        title: 'Mechanical Contingency',
        question: 'What happens if a staff bus breaks down on the highway at 6:30 AM?',
        answer: 'Our standby dispatch system deploys a backup vehicle from our partner depot within 20 minutes to complete the route.',
        reaction: 'Wonderful! Staff will never be stranded on the road.',
        avatar: '/images/face-three.png',
        color: 'bg-fuchsia-950 dark:bg-fuchsia-100/10',
        tint: 'text-fuchsia-300',
        bubble: 'bg-fuchsia-400/15',
        reply: 'bg-fuchsia-100 text-fuchsia-950',
      },
      {
        title: 'Attendance Analytics',
        question: 'Can HR view who actually boarded the shuttle each morning?',
        answer: 'Yes! The Lyncs corporate dashboard updates in real time with boarding timestamps and seat occupancy records.',
        reaction: 'Accurate attendance data without manual paper manifests.',
        avatar: '/images/24.jpg',
        color: 'bg-purple-950 dark:bg-purple-100/10',
        tint: 'text-purple-300',
        bubble: 'bg-purple-400/15',
        reply: 'bg-purple-100 text-purple-950',
      },
    ],
    ctaHeadline: 'Ready to launch reliable staff shuttle routes?',
    ctaSub: 'Map your workforce commute and give your staff a stress-free trip to work.',
    primaryCtaText: 'Request shuttle route proposal',
    primaryCtaHref: '/contact',
  },

  flights: {
    slug: 'flights',
    label: 'Flights',
    shortTitle: 'Corporate Flights',
    badge: 'Domestic • Regional Travel',
    tagline: 'Book, manage, and reconcile business air travel in 60 seconds.',
    heroHeading: 'Book domestic and regional executive business flights with',
    heroAccent: 'automated approvals & zero delays.',
    dialogBrain: 'Booking domestic flights for our executives requires 15 back-and-forth emails with travel agents.',
    dialogLips:
      'Skip the middleman. Search, compare, and book domestic and regional airline tickets in 60 seconds with automated manager approval flows.',
    iconName: 'LuPlane',
    color: 'bg-[#ECE8F1]',
    heroImage: '/images/21.jpg',
    secondaryImage: '/images/skyline.jpg',
    providers: [
      { name: 'Air Peace', tag: 'Nationwide network' },
      { name: 'Ibom Air', tag: 'On-time premium' },
      { name: 'ValueJet', tag: 'Fast regional' },
      { name: 'Regional Airlines', tag: 'West Africa routes' },
    ],
    painPoints: [
      'Travel desk agents charging high booking markup fees and slow ticket issuance',
      'Executives booking last-minute flight tickets on personal cards and submitting claims',
      'Lack of policy enforcement: employees booking expensive business class without sign-off',
      'Missed flight changes or cancellations leaving staff stranded at regional airports',
    ],
    solutions: [
      'Direct carrier inventory access with transparent corporate pricing and zero hidden fees',
      'Automated multi-level manager approval triggers before payment is charged',
      'Single consolidated corporate invoice for all airline tickets with full tax compliance',
      'Sync flight itineraries directly with airport protocol car pickups on arrival',
    ],
    capabilities: [
      {
        title: 'Direct Airline API Integrations',
        desc: 'Instant seat confirmation across Air Peace, Ibom Air, ValueJet, and regional West African airlines.',
      },
      {
        title: 'Flexible Approval Hierarchies',
        desc: 'Automatically route flight requests to department heads or finance directors based on ticket price or cabin class.',
      },
      {
        title: 'Flight Itinerary Sync With Ground Rides',
        desc: 'When a flight lands, an airport transfer vehicle is automatically scheduled and waiting at arrivals.',
      },
      {
        title: 'Consolidated Flight Expenditure Ledger',
        desc: 'Track air travel expenditure across business units, projects, and cost centers with automated VAT reporting.',
      },
    ],
    stats: [
      { label: 'Booking time reduction', val: '85%' },
      { label: 'Corporate airfare savings', val: '18%' },
      { label: 'Airlines supported locally & regionally', val: '12+' },
      { label: 'Ticket delivery speed', val: '< 2 mins' },
    ],
    faq: [
      {
        title: 'Approval Hierarchy',
        question: 'Can we require manager approval before any flight ticket is issued?',
        answer: 'Yes! Department heads receive an instant WhatsApp or email approval link. Once approved, the ticket is instantly generated.',
        reaction: 'Ehen! No more unapproved business class bookings.',
        avatar: '/images/face-1.png',
        color: 'bg-green-950 dark:bg-green-100/10',
        tint: 'text-green-300',
        bubble: 'bg-green-400/15',
        reply: 'bg-green-100 text-green-950',
      },
      {
        title: 'Changes & Cancellations',
        question: 'What happens if a client meeting shifts and the flight needs to change?',
        answer: 'Lyncs travel desk handles date changes, cancellations, and credits directly with the airline on your behalf.',
        reaction: 'Huge relief. No more waiting on airline customer care lines.',
        avatar: '/images/face-three.png',
        color: 'bg-fuchsia-950 dark:bg-fuchsia-100/10',
        tint: 'text-fuchsia-300',
        bubble: 'bg-fuchsia-400/15',
        reply: 'bg-fuchsia-100 text-fuchsia-950',
      },
      {
        title: 'Flight Tax Invoices',
        question: 'Can our finance team download proper VAT and tax invoices for each ticket?',
        answer: 'All flight bookings come with itemized corporate tax receipts and flight segment breakdowns ready for tax filing.',
        reaction: 'Audit compliance is completely sorted.',
        avatar: '/images/24.jpg',
        color: 'bg-purple-950 dark:bg-purple-100/10',
        tint: 'text-purple-300',
        bubble: 'bg-purple-400/15',
        reply: 'bg-purple-100 text-purple-950',
      },
    ],
    ctaHeadline: 'Ready to simplify corporate business air travel?',
    ctaSub: 'Experience instant airline booking and consolidated flight reconciliation.',
    primaryCtaText: 'Set up corporate travel desk',
    primaryCtaHref: '/contact',
  },

  'ride-wallets': {
    slug: 'ride-wallets',
    label: 'Fund ride wallets',
    shortTitle: 'Corporate & Personal Ride Wallets',
    badge: 'Automated Budgets • Spend Controls',
    tagline: 'Pre-allocate transport allowances with automated policy guardrails.',
    heroHeading: 'Set transport allowances and department budget limits with',
    heroAccent: 'automated policy-locked wallets.',
    dialogBrain: 'How do we disburse commute allowances to 200 staff without messy bank transfers?',
    dialogLips:
      'Fund one central company treasury. Lyncs instantly allocates digital balances to staff wallets with geofence, curfew, and budget rules.',
    iconName: 'LuWallet',
    color: 'bg-[#F6EEDD]',
    heroImage: '/images/overview.jpg',
    secondaryImage: '/images/13.jpg',
    providers: [
      { name: 'Company Treasury', tag: 'Central billing' },
      { name: 'Role Allowances', tag: 'Executive, Sales, Shift' },
      { name: 'Auto-Refill Rules', tag: 'Monthly or weekly' },
      { name: 'Zero Overspend', tag: 'Hard cap protection' },
    ],
    painPoints: [
      'Disbursing transport stipends to individual bank accounts with zero proof of commute usage',
      'Staff running out of funds mid-month and calling HR for emergency transport cash',
      'Finance manually verifying hundreds of petty cash reimbursement receipts',
      'Inability to recover unspent mobility balances when employees leave or change roles',
    ],
    solutions: [
      'Digital wallets dedicated exclusively to mobility: funds can only be spent on rides and transit',
      'Automated monthly balance resets and auto-rollover rules governed by company policy',
      'Zero manual reimbursements—everything flows straight from the company account',
      'Instant balance clawback: unspent balances stay in your company treasury',
    ],
    capabilities: [
      {
        title: 'Department Tiered Allowances',
        desc: 'Set different monthly limits for interns, field engineers, sales directors, and executive leadership.',
      },
      {
        title: 'Geofenced & Time-Locked Usage',
        desc: 'Restrict wallet spending to official work hours or specific locations such as customer offices or airports.',
      },
      {
        title: 'Bulk Funding via Naira or USD',
        desc: 'Fund your master treasury through corporate bank transfer, card, or direct ACH transfer with instant value credit.',
      },
      {
        title: 'Line-by-Line Spend Telemetry',
        desc: 'Monitor real-time balance consumption across departments to optimize corporate travel budgets each quarter.',
      },
    ],
    stats: [
      { label: 'Unused transport allowance clawback', val: '100%' },
      { label: 'Time saved on allowance disbursement', val: '95%' },
      { label: 'Zero cash leakage guarantee', val: '100%' },
      { label: 'Multi-currency support', val: 'NGN & USD' },
    ],
    faq: [
      {
        title: 'Wallet Restrictions',
        question: 'Can staff withdraw the funds into their personal bank accounts?',
        answer: 'No. Mobility wallet funds are strictly locked to authorized transport providers (Bolt, Uber, LagRide, Shuttles, Fuel) and cannot be cashed out.',
        reaction: 'Ehen! That eliminates stipend misuse completely.',
        avatar: '/images/face-1.png',
        color: 'bg-green-950 dark:bg-green-100/10',
        tint: 'text-green-300',
        bubble: 'bg-green-400/15',
        reply: 'bg-green-100 text-green-950',
      },
      {
        title: 'Rollover Rules',
        question: 'What happens to unspent wallet balances at the end of the month?',
        answer: 'You choose: balances can roll over into next month or automatically return to your central corporate treasury account.',
        reaction: 'Saving company cash on unspent funds? Excellent.',
        avatar: '/images/face-three.png',
        color: 'bg-fuchsia-950 dark:bg-fuchsia-100/10',
        tint: 'text-fuchsia-300',
        bubble: 'bg-fuchsia-400/15',
        reply: 'bg-fuchsia-100 text-fuchsia-950',
      },
      {
        title: 'Individual Accounts',
        question: 'Can individuals also use Lyncs wallets to budget personal commuting?',
        answer: 'Yes! Individuals can top up their personal Lyncs wallet to budget monthly rides and fuel without worrying about bank card failures.',
        reaction: 'Sharp. Budgeting transport has never been easier.',
        avatar: '/images/24.jpg',
        color: 'bg-purple-950 dark:bg-purple-100/10',
        tint: 'text-purple-300',
        bubble: 'bg-purple-400/15',
        reply: 'bg-purple-100 text-purple-950',
      },
    ],
    ctaHeadline: 'Ready to automate employee transport allowances?',
    ctaSub: 'Fund one corporate balance and distribute to hundreds of staff in 60 seconds.',
    primaryCtaText: 'Activate corporate wallets',
    primaryCtaHref: '/contact',
  },

  'car-rentals': {
    slug: 'car-rentals',
    label: 'Car rentals',
    shortTitle: 'Executive Car Rentals',
    badge: 'Chauffeur-Driven • VIP Protocol',
    tagline: 'Premium sedans, executive SUVs, and corporate vehicle rentals on demand.',
    heroHeading: 'Book vetted chauffeur-driven luxury cars & fleet rentals with',
    heroAccent: 'impeccable corporate service.',
    dialogBrain: 'We have foreign investors visiting next Tuesday. Can you arrange 2 Land Cruisers and airport protocol?',
    dialogLips:
      'Consider it done. Uniformed executive chauffeurs, pristine SUVs, and tarmac protocol pickup coordinated with their flight arrival.',
    iconName: 'LuKey',
    color: 'bg-[#E3ECFA]',
    heroImage: '/images/23.jpg',
    secondaryImage: '/images/skyline.jpg',
    providers: [
      { name: 'Prado & Land Cruiser', tag: 'Executive SUVs' },
      { name: 'Mercedes-Benz & Sedans', tag: 'VIP Comfort' },
      { name: 'Toyota HiAce & Coaster', tag: 'Team movement' },
      { name: 'Armored & Escort', tag: 'Special security' },
    ],
    painPoints: [
      'Dealing with untrusted street car hire operators with unmaintained, dirty vehicles',
      'Drivers arriving late at the airport or not knowing business routes in Lagos and Abuja',
      'No insurance coverage or liability clarity during corporate executive trips',
      'Opaque daily rental pricing with surprise fuel charges and driver allowances',
    ],
    solutions: [
      'Pristine, comprehensively insured vehicles inspected before every single deployment',
      'Trained, defensive-driving certified executive chauffeurs with professional etiquette',
      'Transparent flat daily or hourly rates with all driver allowances included upfront',
      'Airport tarmac protocol assistance and seamless flight delay tracking',
    ],
    capabilities: [
      {
        title: 'VIP Airport Meet & Greet',
        desc: 'Dedicated airport protocol officers handle baggage and fast-track terminal exit straight to your waiting chauffeur.',
      },
      {
        title: 'Short-Term & Long-Term Leases',
        desc: 'Rent executive vehicles for a single day, a week-long conference, or multi-month executive assignments.',
      },
      {
        title: 'Interstate Escort & Bulletproof Fleets',
        desc: 'Certified armored B6/B7 luxury SUVs and security escort vehicles available for sensitive interstate travel.',
      },
      {
        title: 'Central Corporate Billing',
        desc: 'All car rental bookings consolidate straight into your master company invoice with zero out-of-pocket cash required.',
      },
    ],
    stats: [
      { label: 'On-time chauffeur arrival', val: '99.8%' },
      { label: 'Comprehensively insured fleet', val: '100%' },
      { label: 'Executive vehicle options', val: '50+ models' },
      { label: 'Corporate protocol support', val: '24/7' },
    ],
    faq: [
      {
        title: 'Driver Quality',
        question: 'Are your chauffeurs trained in executive etiquette and defensive driving?',
        answer: 'Yes! All chauffeurs undergo rigorous background checks, defensive driving certifications, and executive protocol training.',
        reaction: 'Ehen! That gives us total peace of mind for our guests.',
        avatar: '/images/face-1.png',
        color: 'bg-green-950 dark:bg-green-100/10',
        tint: 'text-green-300',
        bubble: 'bg-green-400/15',
        reply: 'bg-green-100 text-green-950',
      },
      {
        title: 'Flight Delay Handling',
        question: 'What happens if our guest’s international flight is delayed by 3 hours?',
        answer: 'Our operations desk tracks live flight telemetry. Your chauffeur will automatically adjust arrival time at zero extra penalty.',
        reaction: 'Wonderful! No need to frantically message the driver.',
        avatar: '/images/face-three.png',
        color: 'bg-fuchsia-950 dark:bg-fuchsia-100/10',
        tint: 'text-fuchsia-300',
        bubble: 'bg-fuchsia-400/15',
        reply: 'bg-fuchsia-100 text-fuchsia-950',
      },
      {
        title: 'Interstate Trips',
        question: 'Can we rent vehicles for trips outside Lagos (e.g. Ibadan, Benin, Abuja)?',
        answer: 'Yes! We provide interstate executive car rentals with experienced highway drivers and full logistics support.',
        reaction: 'Sharp. Interstate movement is completely covered.',
        avatar: '/images/24.jpg',
        color: 'bg-purple-950 dark:bg-purple-100/10',
        tint: 'text-purple-300',
        bubble: 'bg-purple-400/15',
        reply: 'bg-purple-100 text-purple-950',
      },
    ],
    ctaHeadline: 'Need premium executive car rentals for your team?',
    ctaSub: 'Reserve pristine chauffeur-driven vehicles in minutes with verified pricing.',
    primaryCtaText: 'Book executive car rental',
    primaryCtaHref: '/contact',
  },

  'car-tow': {
    slug: 'car-tow',
    label: 'Car tow',
    shortTitle: '24/7 Emergency Towing',
    badge: '15-Min Arrival • Flatbed Fleet',
    tagline: 'Rapid emergency flatbed towing and roadside rescue across Lagos & Nigeria.',
    heroHeading: 'Emergency flatbed roadside towing dispatched in 15 minutes with',
    heroAccent: 'live GPS tracking & zero extortion.',
    dialogBrain: 'My car just broke down on Third Mainland Bridge at 9:00 PM. Who will rescue me?',
    dialogLips:
      'Tap Tow on Lyncs. A vetted hydraulic flatbed truck is dispatched immediately with live GPS tracking and fixed transparent pricing.',
    iconName: 'LuTruck',
    color: 'bg-[#E6F0DC]',
    heroImage: '/images/2.jpg',
    secondaryImage: '/images/23.jpg',
    providers: [
      { name: 'Hydraulic Flatbed', tag: 'Zero vehicle damage' },
      { name: 'Island & Mainland Hubs', tag: '15-min arrival' },
      { name: 'Highway Emergency', tag: 'Expressway corridors' },
      { name: '24/7 Dispatch Desk', tag: 'Always on call' },
    ],
    painPoints: [
      'Stranded at night with arbitrary roadside towing operators demanding ₦150,000 in cash',
      'Primitive chain-towing trucks that scrape bumpers, damage suspensions, and destroy gearboxes',
      'Waiting 3 hours on dangerous highway shoulders without knowing when help will arrive',
      'No insurance backing or liability protection if your car gets damaged during towing',
    ],
    solutions: [
      'Modern hydraulic tilt-tray flatbeds that load your car with zero mechanical or body damage',
      'Average 15-minute response time powered by strategically positioned dispatch hubs across Lagos',
      'Fixed, transparent upfront pricing quoted in the app before dispatch—no haggling or highway extortion',
      'Comprehensive in-transit cargo insurance protecting your vehicle during the entire recovery journey',
    ],
    capabilities: [
      {
        title: 'Modern Hydraulic Flatbed Tow Trucks',
        desc: 'Your vehicle is fully loaded onto a flatbed tray. Perfect for low-clearance sedans, luxury SUVs, and EVs.',
      },
      {
        title: 'Live GPS Truck Tracking',
        desc: 'Watch the tow truck approach your exact location in real time with direct phone communication to the driver.',
      },
      {
        title: 'Safe Delivery to Home or Verified Workshop',
        desc: 'Tow your car directly to your residence, preferred dealership, or a certified Lyncs partner mechanic workshop.',
      },
      {
        title: 'Corporate Fleet Towing Retainer',
        desc: 'Cover your entire company fleet with priority 24/7 emergency towing and monthly consolidated invoicing.',
      },
    ],
    stats: [
      { label: 'Average dispatch arrival time', val: '15 mins' },
      { label: 'Flatbed fleet coverage', val: '100% Flatbeds' },
      { label: 'Service availability', val: '24/7/365' },
      { label: 'In-transit insurance protection', val: 'Included' },
    ],
    faq: [
      {
        title: 'Electric Vehicles & Automatics',
        question: 'Can you safely tow automatic cars and electric vehicles (EVs)?',
        answer: 'Yes! We only operate hydraulic flatbeds where all 4 wheels sit on the tray. We never drag vehicles or risk transmission damage.',
        reaction: 'Ehen! That protects my gearbox and battery completely.',
        avatar: '/images/face-1.png',
        color: 'bg-green-950 dark:bg-green-100/10',
        tint: 'text-green-300',
        bubble: 'bg-green-400/15',
        reply: 'bg-green-100 text-green-950',
      },
      {
        title: 'Night & Highway Rescue',
        question: 'Do you operate on expressways and late at night during police curfews?',
        answer: 'Yes, our emergency fleet operates 24/7 across Lagos with emergency permits, safety lights, and rapid security coordination.',
        reaction: 'Crucial. No more fear of getting stuck after dark.',
        avatar: '/images/face-three.png',
        color: 'bg-fuchsia-950 dark:bg-fuchsia-100/10',
        tint: 'text-fuchsia-300',
        bubble: 'bg-fuchsia-400/15',
        reply: 'bg-fuchsia-100 text-fuchsia-950',
      },
      {
        title: 'Pricing & Cashless Payment',
        question: 'Do I need cash to pay the tow truck driver when he arrives?',
        answer: 'No cash needed. Pay seamlessly with your Lyncs wallet, debit card, or corporate account with fixed upfront pricing.',
        reaction: 'Sharp. No cash extortion in an emergency.',
        avatar: '/images/24.jpg',
        color: 'bg-purple-950 dark:bg-purple-100/10',
        tint: 'text-purple-300',
        bubble: 'bg-purple-400/15',
        reply: 'bg-purple-100 text-purple-950',
      },
    ],
    ctaHeadline: 'Car broken down or need emergency flatbed towing?',
    ctaSub: 'Dispatch certified flatbed rescue to your GPS coordinates in 15 minutes.',
    primaryCtaText: 'Request emergency tow',
    primaryCtaHref: '/contact',
  },

  'fuel-vouchers': {
    slug: 'fuel-vouchers',
    label: 'Fuel & diesel vouchers',
    shortTitle: 'Digital Fuel & Diesel Vouchers',
    badge: 'Station QR Codes • Plate Lock',
    tagline: 'Discounted digital vouchers for vehicle petrol and facility generator diesel.',
    heroHeading: 'Stop petty cash fuel leakages and generator diesel theft with',
    heroAccent: 'digital station-verified vouchers.',
    dialogBrain: 'Drivers keep submitting crumpled petrol receipts with suspicious litre amounts.',
    dialogLips:
      'Kill petty cash fraud. Drivers receive digital QR/SMS vouchers locked to vehicle plate numbers, verified live at partner fuel pumps.',
    iconName: 'LuFuel',
    color: 'bg-[#F6EEDD]',
    heroImage: '/images/overview.jpg',
    secondaryImage: '/images/2.jpg',
    providers: [
      { name: 'TotalEnergies', tag: 'Nationwide network' },
      { name: 'NNPC Retail', tag: 'Guaranteed supply' },
      { name: 'Ardova & Rainoil', tag: 'Fast-track lanes' },
      { name: 'Mobil & Conoil', tag: 'Station partners' },
    ],
    painPoints: [
      'Pool drivers inflating cash fuel requests or pocketing change from petrol allowances',
      'Generator diesel theft at corporate branch offices draining facility budgets',
      'Finance spending days verifying paper receipts that fade or lack VAT numbers',
      'Company vehicles queueing for hours at rogue stations with adulterated fuel',
    ],
    solutions: [
      'Digital vouchers delivered straight to driver phones via QR code or SMS',
      'Vouchers strictly locked to vehicle plate numbers—cannot be diverted to personal cars',
      'Real-time pump authorization with automated litre balance tracking and timestamping',
      'Bulk generator diesel delivery with calibrated meter proof directly to your facility',
    ],
    capabilities: [
      {
        title: 'Vehicle Plate Number Lock',
        desc: 'Pump attendants must verify the digital voucher against the vehicle registration number before dispensing fuel.',
      },
      {
        title: 'Nationwide Station Network',
        desc: 'Redeemable across top tier-1 fuel stations in Lagos, Abuja, Port Harcourt, Kano, and interstate highways.',
      },
      {
        title: 'Automated VAT & Audit Trail',
        desc: 'Every litre pumped generates an instant digital audit entry with station location, pump price, and tax breakdown.',
      },
      {
        title: 'Bulk Facility Generator Diesel Supply',
        desc: 'Order certified high-grade diesel delivered by calibrated bowsers directly to corporate headquarters and branch offices.',
      },
    ],
    stats: [
      { label: 'Reduction in corporate fuel fraud', val: '100%' },
      { label: 'Fuel cost savings per litre', val: '4-7%' },
      { label: 'Verified partner fuel stations', val: '400+' },
      { label: 'Digital receipt accuracy', val: '100%' },
    ],
    faq: [
      {
        title: 'Fraud Prevention',
        question: 'Can a driver sell the voucher or pump fuel into his personal car?',
        answer: 'No. The voucher code is cryptographically locked to the assigned vehicle plate number and driver identity.',
        reaction: 'Ehen! That kills petty fuel theft on our fleet.',
        avatar: '/images/face-1.png',
        color: 'bg-green-950 dark:bg-green-100/10',
        tint: 'text-green-300',
        bubble: 'bg-green-400/15',
        reply: 'bg-green-100 text-green-950',
      },
      {
        title: 'Individual Savings',
        question: 'Can individual car owners also purchase discounted fuel vouchers?',
        answer: 'Yes! Individuals can buy digital vouchers in bulk and save 3% to 7% per litre compared to street pump prices.',
        reaction: 'Saving money on fuel every week is huge.',
        avatar: '/images/face-three.png',
        color: 'bg-fuchsia-950 dark:bg-fuchsia-100/10',
        tint: 'text-fuchsia-300',
        bubble: 'bg-fuchsia-400/15',
        reply: 'bg-fuchsia-100 text-fuchsia-950',
      },
      {
        title: 'Generator Diesel Delivery',
        question: 'Do you deliver bulk diesel for our office estate and factory generators?',
        answer: 'Yes. We deliver tested, water-free diesel in 1,000L to 33,000L tankers with digital calibrated flow meters.',
        reaction: 'Sharp. Generator fuel supply is 100% sorted.',
        avatar: '/images/24.jpg',
        color: 'bg-purple-950 dark:bg-purple-100/10',
        tint: 'text-purple-300',
        bubble: 'bg-purple-400/15',
        reply: 'bg-purple-100 text-purple-950',
      },
    ],
    ctaHeadline: 'Ready to eliminate fuel fraud and save on petrol & diesel?',
    ctaSub: 'Start issuing verified digital fuel vouchers to your fleet in 10 minutes.',
    primaryCtaText: 'Get fuel vouchers for your fleet',
    primaryCtaHref: '/contact',
  },

  mechanic: {
    slug: 'mechanic',
    label: 'On-demand mechanic',
    shortTitle: 'On-Demand Mobile Mechanic',
    badge: 'Mobile Diagnostics • Genuine Parts',
    tagline: 'Vetted master technicians and mobile servicing dispatched directly to your location.',
    heroHeading: 'Certified mechanics dispatched to your home or office with',
    heroAccent: 'upfront pricing & genuine parts.',
    dialogBrain: 'How do I know the roadside mechanic isn’t using counterfeit engine oil and fake parts?',
    dialogLips:
      'Lyncs mechanics are vetted, certified master technicians. Every repair comes with computer diagnostic reports, OEM parts, and a 3-month warranty.',
    iconName: 'LuWrench',
    color: 'bg-[#DCE5EA]',
    heroImage: '/images/2.jpg',
    secondaryImage: '/images/team-4.jpg',
    providers: [
      { name: 'Computer Diagnostics', tag: 'OBD-II live scan' },
      { name: 'Routine Servicing', tag: 'At your home/office' },
      { name: 'Brake & Suspension', tag: 'Genuine OEM parts' },
      { name: 'Electrical & AC', tag: 'Specialist technicians' },
    ],
    painPoints: [
      'Roadside mechanics guessing problems by ear and replacing parts that aren’t even broken',
      'Counterfeit engine oil and substandard brake pads destroying engines and risking lives',
      'Losing your car for 2 weeks at a disorganized workshop with zero status updates',
      'Arbitrary, inflated repair bills with no warranty if the car breaks down the next day',
    ],
    solutions: [
      'Comprehensive computer diagnostics pinpointing the exact fault code before any work begins',
      'Guaranteed genuine OEM parts sourced directly from verified manufacturer distributors',
      'Mobile servicing done right in your office parking lot or driveway—no workshop delays',
      'Itemized upfront quote in the app with an ironclad 3-month / 5,000km repair warranty',
    ],
    capabilities: [
      {
        title: 'On-Site Mobile Diagnostics & Servicing',
        desc: 'Our equipped mobile vans come to your home or corporate parking lot for oil changes, filters, and diagnostics.',
      },
      {
        title: 'Certified Master Technicians',
        desc: 'Every mechanic is rigorously vetted, tested on modern Japanese, German, and American vehicles, and background checked.',
      },
      {
        title: 'Genuine OEM Parts Guarantee',
        desc: 'We reject counterfeit parts. All filters, fluids, spark plugs, and brake pads are verified authentic.',
      },
      {
        title: 'Corporate Fleet Preventative Maintenance',
        desc: 'Automated maintenance scheduling and health logs to prevent costly breakdowns across your company pool cars.',
      },
    ],
    stats: [
      { label: 'Workmanship warranty on repairs', val: '3 Months' },
      { label: 'Genuine parts guarantee', val: '100%' },
      { label: 'Same-day mobile dispatch', val: '94%' },
      { label: 'Diagnostic accuracy', val: '99.5%' },
    ],
    faq: [
      {
        title: 'Mobile Service Locations',
        question: 'Can the mechanic service my car in our office parking lot while I work?',
        answer: 'Yes! Our mobile service van brings all equipment, fluid recovery mats, and parts to service your car without making a mess.',
        reaction: 'Ehen! No need to spend my Saturday waiting at a mechanic workshop.',
        avatar: '/images/face-1.png',
        color: 'bg-green-950 dark:bg-green-100/10',
        tint: 'text-green-300',
        bubble: 'bg-green-400/15',
        reply: 'bg-green-100 text-green-950',
      },
      {
        title: 'Repair Warranty',
        question: 'What happens if the problem comes back after the repair?',
        answer: 'Every Lyncs mechanic repair comes with an ironclad 3-month or 5,000 km warranty. We fix any recurrence completely free.',
        reaction: 'Real warranty on car repairs in Lagos? Amazing.',
        avatar: '/images/face-three.png',
        color: 'bg-fuchsia-950 dark:bg-fuchsia-100/10',
        tint: 'text-fuchsia-300',
        bubble: 'bg-fuchsia-400/15',
        reply: 'bg-fuchsia-100 text-fuchsia-950',
      },
      {
        title: 'Major Engine Work',
        question: 'What if my car requires major engine or transmission overhaul?',
        answer: 'For complex jobs, our flatbed tows your car to our certified master facility with digital daily progress updates and transparent quotes.',
        reaction: 'Sharp. Total visibility from diagnosis to final delivery.',
        avatar: '/images/24.jpg',
        color: 'bg-purple-950 dark:bg-purple-100/10',
        tint: 'text-purple-300',
        bubble: 'bg-purple-400/15',
        reply: 'bg-purple-100 text-purple-950',
      },
    ],
    ctaHeadline: 'Car due for servicing or check engine light on?',
    ctaSub: 'Book a certified mobile mechanic to your location with guaranteed genuine parts.',
    primaryCtaText: 'Book certified mechanic',
    primaryCtaHref: '/contact',
  },
}
