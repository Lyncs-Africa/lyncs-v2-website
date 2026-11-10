import type {CollectionConfig} from 'payload'
import {isAdminOrEditor} from '../access'

// Leads captured by the /swap car-valuation tool: both instant owner estimates
// that get "locked in" and fleet enquiries handed to the team.
export const ValuationLeads: CollectionConfig = {
    slug: 'valuation-leads',
    labels: {
        singular: 'Valuation Lead',
        plural: 'Valuation Leads',
    },
    admin: {
        useAsTitle: 'reference',
        defaultColumns: ['reference', 'type', 'contactEmail', 'createdAt'],
        group: 'Leads',
    },
    access: {
        // Submitted by the public via our own validated route handler.
        create: () => true,
        read: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor,
    },
    fields: [
        {
            // A human-friendly label for the admin list view.
            name: 'reference',
            type: 'text',
            admin: {
                readOnly: true,
                description: 'Auto-generated from the submission.',
            },
            hooks: {
                beforeChange: [
                    ({siblingData, value}) => {
                        if (value) return value
                        const name = siblingData?.contactName || siblingData?.contactEmail || 'Lead'
                        const kind = siblingData?.type === 'fleet' ? 'Fleet' : 'Owner'
                        return `${kind} — ${name}`
                    },
                ],
            },
        },
        {
            name: 'type',
            type: 'select',
            required: true,
            options: [
                {label: 'Car owner', value: 'owner'},
                {label: 'Company fleet', value: 'fleet'},
            ],
        },

        // --- Car details (owner) --------------------------------------------
        {
            name: 'car',
            type: 'group',
            admin: {
                condition: (data) => data?.type === 'owner',
            },
            fields: [
                {name: 'make', type: 'text'},
                {name: 'model', type: 'text'},
                {name: 'year', type: 'number'},
                {name: 'mileageKm', type: 'number'},
                {
                    name: 'condition',
                    type: 'select',
                    options: [
                        {label: 'Tokunbo', value: 'Tokunbo'},
                        {label: 'Needs work', value: 'Needs work'},
                    ],
                },
            ],
        },

        // --- Estimate shown to the owner ------------------------------------
        {
            name: 'estimate',
            type: 'group',
            admin: {
                condition: (data) => data?.type === 'owner',
            },
            fields: [
                {name: 'min', type: 'number'},
                {name: 'max', type: 'number'},
            ],
        },

        // --- EV the owner is swapping into (auto-matched or chosen) ----------
        {
            name: 'targetEv',
            type: 'group',
            admin: {
                condition: (data) => data?.type === 'owner',
                description: 'The EV the swap was valued against.',
            },
            fields: [
                {name: 'name', type: 'text'},
                {name: 'price', type: 'number'},
            ],
        },

        // --- Fleet details --------------------------------------------------
        {
            name: 'fleet',
            type: 'group',
            admin: {
                condition: (data) => data?.type === 'fleet',
            },
            fields: [
                {
                    name: 'count',
                    type: 'select',
                    options: ['1–5', '6–20', '21–50', '50+'].map((v) => ({label: v, value: v})),
                },
                {name: 'roughDescription', type: 'textarea'},
                {
                    name: 'fleetList',
                    type: 'upload',
                    relationTo: 'media',
                    admin: {description: 'Uploaded fleet list (.xlsx / .csv).'},
                },
            ],
        },

        // --- Contact --------------------------------------------------------
        {name: 'contactName', type: 'text', label: 'Full name'},
        {name: 'contactCompany', type: 'text', label: 'Company'},
        {name: 'contactRole', type: 'text', label: 'Role'},
        {name: 'contactPhone', type: 'text', label: 'Phone / WhatsApp'},
        {name: 'contactEmail', type: 'email', label: 'Email'},

        // --- Inspection (owner lock-in) -------------------------------------
        // Set by the Lyncs team and communicated to the owner — not collected
        // from the public form.
        {
            name: 'inspectionAddress',
            type: 'text',
            label: 'Inspection location',
            admin: {
                condition: (data) => data?.type === 'owner',
                description: 'Where the inspection will happen — set by the team and shared with the owner.',
            },
        },
    ],
}
