export const SCENARIOS = [
  {
    id: 'spanish-port-strike',
    name: 'Spanish Port Strike',
    location: 'Port of Cadiz & Algeciras Corridor, Spain',
    severity: 'Critical',
    timeDetected: 'Active Incident • Updated 12m ago',
    vessel: 'M/V Elli F',
    warningHeadline: 'CRITICAL ALERT: Spanish Dockworkers Strike in Effect',
    warningMessage: 'Port of Cadiz and Algeciras terminals have suspended stevedoring operations indefinitely. All vessel berthing clearances are revoked.',
    
    // Financial base values
    rates: {
      demurragePerDay: 24000,
      detentionPerHour: 8500,
      factoryShiftCost: 145000,
      factoryBufferHours: 8.5,
      diversionFuelCost: 42000,
      diversionPortFee: 28000,
      diversionExtraTruckingCost: 35000
    },

    // Tactical Map Nodes
    mapData: {
      center: { lat: 36.3, lng: -5.8 },
      nodes: [
        {
          id: 'node-vessel',
          name: 'M/V Elli F (IMO 9482184)',
          type: 'vessel',
          status: 'Holding Offshore',
          lat: 36.12,
          lng: -6.45,
          x: 22,
          y: 68,
          cargo: '3,200 TEU (High-voltage automotive kits)',
          speed: '0.3 kts (Eco-drift)',
          heading: '264° WSW',
          details: 'Holding 14.2 nautical miles outside Cadiz territorial waters. Anchorage depth 44m. Fuel burn nominal on auxiliary generator.'
        },
        {
          id: 'node-port',
          name: 'Port of Cadiz Container Terminal',
          type: 'port',
          status: 'Stevedores Walkout (Locked)',
          lat: 36.53,
          lng: -6.29,
          x: 42,
          y: 38,
          cargo: 'Terminal capacity: 98% full',
          speed: '0 moves/hr',
          details: 'Union picket lines at Terminal Gate 3 and 4. Cranes locked in upright stowage position. Harbor Master denying incoming pilots.'
        },
        {
          id: 'node-trucks',
          name: 'Highway N-340 Drayage Staging Queue',
          type: 'trucks',
          status: '142 Trucks Stalled at Perimeter',
          lat: 36.48,
          lng: -6.18,
          x: 58,
          y: 46,
          cargo: '142 Contracted Chassis (Primafrio / Carreras)',
          speed: '0 km/h (Idling)',
          details: 'Tractor queue stretches 4.8 km along N-340 access spur. Drivers are burning regulated EU shift hours while waiting for gate clearance.'
        },
        {
          id: 'node-factory',
          name: 'Cadiz EV Assembly Plant',
          type: 'factory',
          status: 'Operating on Safety Stock (8.5h Left)',
          lat: 36.41,
          lng: -5.92,
          x: 82,
          y: 52,
          cargo: 'Lithium battery pack and wiring harness inventory',
          speed: '18 units/hr production',
          details: 'Plant assembly lines operating normally until 19:30 CET. Zero local safety inventory after evening shift begins. Line stoppage imminent without Elli F cargo.'
        }
      ]
    },

    // Column 1: Blast Radius (Impact)
    impactItems: [
      {
        id: 'vessel',
        title: 'Elli F unable to dock',
        subtitle: 'Maritime Logistics',
        highlight: 'Demurrage Risk: €24,000 / day',
        description: 'M/V Elli F is held at Cadiz outer anchorage. Pilot boarding is suspended with 3,200 TEU of critical manufacturing components aboard.',
        metrics: [
          { label: 'Current Position', value: 'Cadiz Outer Anchorage (14nm off coast)' },
          { label: 'Cargo on Board', value: '3,200 TEU (Automotive Parts)' },
          { label: 'Demurrage Clock', value: 'Begins in 4 hours (€24,000/day)' }
        ]
      },
      {
        id: 'trucks',
        title: '3PL Trucks idling',
        subtitle: 'Inland Transportation',
        highlight: 'Detention Bleed: €8,500 / hr',
        description: '142 contract container trucks are idling at terminal entry gates and access roads. Incurring hourly detention fees while drivers exhaust legal shift hours.',
        metrics: [
          { label: 'Idling Fleet', value: '142 Tractor-Trailers' },
          { label: 'Detention Burn', value: '€8,500 per hour' },
          { label: 'Driver Status', value: '74 drivers reaching maximum duty hours' }
        ]
      },
      {
        id: 'factory',
        title: 'Cadiz Factory starved of material',
        subtitle: 'Assembly Plant Operations',
        highlight: '8.5 Hours of Inventory Remaining',
        description: 'The Cadiz automotive manufacturing plant operates on Just-in-Time delivery. Without components on Elli F, the evening assembly shift faces full shutdown.',
        metrics: [
          { label: 'Safety Buffer', value: '8.5 Hours remaining' },
          { label: 'Shift Exposure', value: '€145,000 idle labor cost per shift' },
          { label: 'Shutdown Risk', value: 'Projected today at 19:30 CET' }
        ]
      }
    ],

    // Column 2: Immediate Action Plan (Mitigation)
    mitigationPlan: [
      {
        id: 'hold-vessel',
        step: 1,
        title: 'Instruct Captain to hold vessel offshore (Save port fees)',
        benefit: 'Saves ~€38,000 in early port and pilotage fees',
        summary: 'Direct the Master of M/V Elli F to reduce speed and remain in international waters outside the territorial fee zone to freeze berthing cost clocks.',
        actionLabel: 'Open SatCom Directive',
        systemType: 'SATCOM_TELEX',
        estimatedSavings: 38000,
        completedMessage: 'Order confirmed by Captain. Vessel drifting 15nm offshore. Early port fees avoided.'
      },
      {
        id: 'tonu-protocol',
        step: 2,
        title: 'Execute TONU protocol with 3PL (Cancel trucks to stop OPEX bleed)',
        benefit: 'Halts €8,500/hr detention bleed across 142 haulers',
        summary: 'Transmit Truck Order Not Used (TONU) notices to logistics carriers to formally release idling trucks from terminal gates and stop hourly detention accrual.',
        actionLabel: 'Open EDI 214 Broadcast',
        systemType: 'EDI_214',
        estimatedSavings: 56000,
        completedMessage: 'TONU notices acknowledged by carriers. 142 trucks released. Detention bleed stopped.'
      },
      {
        id: 'maintenance-shift',
        step: 3,
        title: 'Shift Cadiz factory to maintenance schedule (Save labor hours)',
        benefit: 'Preserves 1,200 paid worker hours (€145,000 efficiency)',
        summary: 'Reallocate assembly line workers to bring forward planned tooling maintenance and equipment servicing instead of paying for idle downtime.',
        actionLabel: 'Open SAP ERP Override',
        systemType: 'SAP_ERP',
        estimatedSavings: 145000,
        completedMessage: 'Plant shift reallocated to scheduled robotic maintenance. Zero idle labor loss.'
      }
    ]
  },
  {
    id: 'severe-weather-delay',
    name: 'Severe Weather Delay',
    location: 'Bay of Biscay & North Sea Approach',
    severity: 'Moderate',
    timeDetected: 'Monitoring • Updated 45m ago',
    vessel: 'Atlantic Pioneer',
    warningHeadline: 'WEATHER ADVISORY: Gale Conditions in Bay of Biscay',
    warningMessage: '9-meter swells forcing commercial shipping south of regular sea corridors, adding 36 to 48 hours to ETA.',
    rates: {
      demurragePerDay: 18000,
      detentionPerHour: 4200,
      factoryShiftCost: 95000,
      factoryBufferHours: 24.0,
      diversionFuelCost: 65000,
      diversionPortFee: 22000,
      diversionExtraTruckingCost: 28000
    },
    mapData: {
      center: { lat: 45.2, lng: -4.8 },
      nodes: [
        {
          id: 'node-vessel-weather',
          name: 'Atlantic Pioneer (IMO 9821431)',
          type: 'vessel',
          status: 'Speed Reduced to 8.5 kts',
          x: 25,
          y: 55,
          cargo: '4,100 TEU (180 Active Pharma Reefers)',
          speed: '8.5 kts',
          details: 'Heavy swell (9.2m) heading SW. Hull pitching within tolerance; container lashings secured.'
        },
        {
          id: 'node-port-weather',
          name: 'Port of Rotterdam ECT Terminal',
          type: 'port',
          status: 'Berth Window Missed (Re-queueing)',
          x: 75,
          y: 25,
          cargo: 'Next window: Saturday 06:00',
          speed: 'Slot #41 Forfeited',
          details: 'ECT Terminal congested. Feeder departures to Scandinavia delayed.'
        }
      ]
    },
    impactItems: [
      {
        id: 'weather-vessel',
        title: 'Atlantic Pioneer delayed 40 hours',
        subtitle: 'Maritime Navigation',
        highlight: 'Schedule Drift: +40 Hours',
        description: 'Vessel speed reduced to 8.5 knots to avoid container stack stress in heavy seas.',
        metrics: [
          { label: 'Current Speed', value: '8.5 knots (Normal: 18 kts)' },
          { label: 'Wave Heights', value: '8.5m - 9.2m swell' },
          { label: 'Updated ETA', value: 'Friday 06:00 CET' }
        ]
      },
      {
        id: 'weather-port',
        title: 'Rotterdam terminal window missed',
        subtitle: 'Port Operations',
        highlight: 'Slot Forfeiture',
        description: 'Missed scheduled Wednesday berthing slot. Must re-queue for terminal access upon arrival.',
        metrics: [
          { label: 'Original Berth Slot', value: 'Wednesday 14:00' },
          { label: 'Next Available Window', value: 'Saturday morning' },
          { label: 'Demurrage Risk', value: '€18,000 estimated dwell' }
        ]
      },
      {
        id: 'weather-pharma',
        title: 'Reefer cargo power monitoring',
        subtitle: 'Cold Chain Assurance',
        highlight: '180 Refrigerated Containers',
        description: 'Active cold-chain cargo requires continuous monitoring while extended voyage burns auxiliary fuel.',
        metrics: [
          { label: 'Monitored Units', value: '180 High-Cube Reefers' },
          { label: 'Temp Deviation', value: 'Nominal (+0.1°C)' },
          { label: 'Fuel Reserve', value: 'Safe (6 days remaining)' }
        ]
      }
    ],
    mitigationPlan: [
      {
        id: 'weather-step-1',
        step: 1,
        title: 'Request priority berth window swap at Rotterdam',
        benefit: 'Recovers 24 hours of terminal dwell time',
        summary: 'Coordinate with terminal operations to swap incoming slot with partner alliance vessel arriving later.',
        actionLabel: 'Open Berth Exchange Order',
        systemType: 'BERTH_SWAP',
        estimatedSavings: 42000,
        completedMessage: 'Rotterdam terminal confirmed Friday evening slot swap.'
      },
      {
        id: 'weather-step-2',
        step: 2,
        title: 'Re-align inland rail shuttles to distribution hubs',
        benefit: 'Avoids €20,000 in terminal storage fees',
        summary: 'Reschedule inland container rail connections to align with the revised Friday vessel discharge.',
        actionLabel: 'Open Rail Reschedule Request',
        systemType: 'RAIL_SYNC',
        estimatedSavings: 22000,
        completedMessage: 'Rail departure pushed to Saturday morning. Slot confirmed.'
      },
      {
        id: 'weather-step-3',
        step: 3,
        title: 'Send automated delivery updates to enterprise customers',
        benefit: 'Protects commercial SLA contracts',
        summary: 'Broadcast updated delivery timelines and weather documentation to major commercial shippers.',
        actionLabel: 'Broadcast Customer Advisories',
        systemType: 'CUSTOMER_API',
        estimatedSavings: 15000,
        completedMessage: 'Delay advisories sent to 32 enterprise accounts.'
      }
    ]
  },
  {
    id: 'shipyard-vendor-default',
    name: 'Shipyard Vendor Default',
    location: 'Antwerp Maintenance Facility, Belgium',
    severity: 'Low',
    timeDetected: 'Under Review • Updated 2h ago',
    vessel: 'OEC Discovery',
    warningHeadline: 'CONTRACTOR NOTICE: Drydock Subcontractor Enters Administration',
    warningMessage: 'Precision Propulsion Ltd has halted drydock shaft servicing. Replacement technical team required.',
    rates: {
      demurragePerDay: 9500,
      detentionPerHour: 0,
      factoryShiftCost: 38500,
      factoryBufferHours: 120.0,
      diversionFuelCost: 0,
      diversionPortFee: 15000,
      diversionExtraTruckingCost: 12000
    },
    mapData: {
      center: { lat: 51.2, lng: 4.4 },
      nodes: [
        {
          id: 'node-shipyard',
          name: 'Antwerp Damen Shipyard Slipway 2',
          type: 'port',
          status: 'Shaft Overhaul Halted',
          x: 50,
          y: 50,
          cargo: 'OEC Discovery Drydock Overhaul',
          speed: '0 kts (On Blocks)',
          details: 'Vessel immobilized on drydock blocks. Subcontractor technicians walked off.'
        }
      ]
    },
    impactItems: [
      {
        id: 'shipyard-propulsion',
        title: 'Shaft overhaul work halted on slipway',
        subtitle: 'Fleet Technical Management',
        highlight: 'Slipway Inactive: Day 3',
        description: 'Vessel is on drydock blocks with stern shaft partially disassembled. Technicians walked off site.',
        metrics: [
          { label: 'Drydock Yard', value: 'Antwerp Facility Slipway 2' },
          { label: 'Shaft Assembly', value: '50% Complete' },
          { label: 'Daily Yard Cost', value: '€9,500 / day' }
        ]
      },
      {
        id: 'shipyard-charter',
        title: 'Charter handover date at risk',
        subtitle: 'Commercial Contracts',
        highlight: '€1.2M Charter Commitment',
        description: 'Scheduled delivery date to commercial charterer is in 12 days. Delays risk contract cancellation.',
        metrics: [
          { label: 'Laycan Deadline', value: '12 Days remaining' },
          { label: 'Charter Rate', value: '€38,500 / day' },
          { label: 'Cancellation Risk', value: 'High if delayed past day 14' }
        ]
      },
      {
        id: 'shipyard-parts',
        title: 'Replacement parts locked in warehouse',
        subtitle: 'Procurement & Assets',
        highlight: '€280,000 OEC-Owned Components',
        description: 'Replacement seals and bearings are on-site but locked by insolvency administrators.',
        metrics: [
          { label: 'Components', value: 'Propulsion Bearing Assemblies' },
          { label: 'Proof of Title', value: 'Invoices & BL filed' },
          { label: 'Legal Status', value: 'Emergency release required' }
        ]
      }
    ],
    mitigationPlan: [
      {
        id: 'shipyard-step-1',
        step: 1,
        title: 'File legal emergency release for OEC-owned spare parts',
        benefit: 'Protects €280,000 in critical components',
        summary: 'Provide title verification to Belgian commercial court to secure immediate bailiff release of inventory.',
        actionLabel: 'Open Legal Writ Request',
        systemType: 'LEGAL_WRIT',
        estimatedSavings: 95000,
        completedMessage: 'Court granted release order. Bailiff escort arranged.'
      },
      {
        id: 'shipyard-step-2',
        step: 2,
        title: 'Mobilize OEM technical flying squad to complete repairs',
        benefit: 'Recovers 5 days of downtime',
        summary: 'Contract certified manufacturer engineers to take over propulsion shaft re-assembly on slipway.',
        actionLabel: 'Mobilize OEM Specialists',
        systemType: 'OEM_DISPATCH',
        estimatedSavings: 65000,
        completedMessage: 'OEM engineering team mobilized. On-site tomorrow morning.'
      },
      {
        id: 'shipyard-step-3',
        step: 3,
        title: 'Agree 5-day delivery window extension with charterer',
        benefit: 'Safeguards €1.2M commercial charter contract',
        summary: 'Proactively negotiate a 5-day grace period with the charterer citing drydock force majeure.',
        actionLabel: 'Draft Charterparty Addendum',
        systemType: 'CHARTER_ADDENDUM',
        estimatedSavings: 180000,
        completedMessage: 'Charterer confirmed 5-day delivery extension.'
      }
    ]
  }
];
