import React from 'react'

export type BrandIconName =
  | 'accident'
  | 'appeal'
  | 'area'
  | 'assistance'
  | 'bpc'
  | 'briefcase'
  | 'calendar'
  | 'checklist'
  | 'clock'
  | 'contract'
  | 'document'
  | 'edit'
  | 'email'
  | 'hearing'
  | 'impugnation'
  | 'location'
  | 'pension'
  | 'phone'
  | 'protection'
  | 'review'
  | 'search'
  | 'work'

type BrandIconProps = {
  className?: string
  name: BrandIconName
}

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 1.55,
} as const

function PeopleIcon() {
  return (
    <>
      <path {...common} d="M13.5 35v-3.5c0-4.1 3.3-7.4 7.4-7.4h6.2c4.1 0 7.4 3.3 7.4 7.4V35" />
      <path {...common} d="M20 16.2a6 6 0 1 0 12 0 6 6 0 0 0-12 0Z" />
      <path {...common} d="M5.5 35v-2.7a6.2 6.2 0 0 1 6.2-6.2" />
      <path {...common} d="M9.2 17.8a4.8 4.8 0 1 0 6.5-4.5" />
      <path {...common} d="M42.5 35v-2.7a6.2 6.2 0 0 0-6.2-6.2" />
      <path {...common} d="M38.8 17.8a4.8 4.8 0 1 1-6.5-4.5" />
    </>
  )
}

function BpcIcon() {
  return (
    <>
      <path {...common} d="M12 29.5c4 5.2 8.8 8.1 14 8.1s10-2.9 14-8.1" />
      <path {...common} d="M11.3 28.5 6.8 22c-1.1-1.6-.8-3.7.7-4.8 1.5-1 3.4-.7 4.6.6l7.5 8.6" />
      <path {...common} d="m40.7 28.5 4.5-6.5c1.1-1.6.8-3.7-.7-4.8-1.5-1-3.4-.7-4.6.6l-7.5 8.6" />
      <path {...common} d="M26 23.3a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
      <path {...common} d="M20.5 30.5v-1.8a5.5 5.5 0 0 1 11 0v1.8" />
      <path {...common} d="M34 20h3.6" />
      <path {...common} d="M35.8 18.2v3.6" />
    </>
  )
}

function BriefcaseIcon() {
  return (
    <>
      <path {...common} d="M8 19.5h36v20H8z" />
      <path {...common} d="M18 19.5V15c0-1.7 1.3-3 3-3h10c1.7 0 3 1.3 3 3v4.5" />
      <path {...common} d="M8 25.5h36" />
      <path {...common} d="M23 25.5v3.8h6v-3.8" />
    </>
  )
}

function ContractIcon() {
  return (
    <>
      <path {...common} d="M13 8.5h18l8 8v27H13z" />
      <path {...common} d="M31 8.5v8h8" />
      <path {...common} d="M18.5 21h14" />
      <path {...common} d="M18.5 27h15" />
      <path {...common} d="M18.5 33h8.5" />
      <path {...common} d="M18.5 39c3.8-5.4 6.4-5.7 7.5-1 1-2.1 2.2-2.7 3.6-1.7" />
      <path {...common} d="m35.5 36 2.4 2.5 5-5" />
    </>
  )
}

function DocumentIcon() {
  return (
    <>
      <path {...common} d="M14 7.5h18l6 6v31H14z" />
      <path {...common} d="M32 7.5v6h6" />
      <path {...common} d="M19 21h14" />
      <path {...common} d="M19 27h14" />
      <path {...common} d="M19 33h9" />
    </>
  )
}

function ChecklistIcon() {
  return (
    <>
      <path {...common} d="M13 9h26v34H13z" />
      <path {...common} d="m18 19 2 2 4-5" />
      <path {...common} d="M28 19h6" />
      <path {...common} d="m18 30 2 2 4-5" />
      <path {...common} d="M28 30h6" />
    </>
  )
}

function SearchIcon() {
  return (
    <>
      <path {...common} d="M22.5 32a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z" />
      <path {...common} d="m29.5 29.5 9 9" />
    </>
  )
}

function CalendarIcon() {
  return (
    <>
      <path {...common} d="M12 14h28v26H12z" />
      <path {...common} d="M17 10v8" />
      <path {...common} d="M35 10v8" />
      <path {...common} d="M12 22h28" />
      <path {...common} d="m21 31 3 3 7-8" />
    </>
  )
}

function EmailIcon() {
  return (
    <>
      <path {...common} d="M8 15h36v24H8z" />
      <path {...common} d="m9 16 17 14 17-14" />
    </>
  )
}

function ClockIcon() {
  return (
    <>
      <path {...common} d="M26 42a16 16 0 1 0 0-32 16 16 0 0 0 0 32Z" />
      <path {...common} d="M26 17v10l7 4" />
    </>
  )
}

function LocationIcon() {
  return (
    <>
      <path {...common} d="M26 44s13-12.2 13-23a13 13 0 0 0-26 0c0 10.8 13 23 13 23Z" />
      <path {...common} d="M26 25a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
    </>
  )
}

function EditIcon() {
  return (
    <>
      <path {...common} d="M12 39h28" />
      <path {...common} d="M16 33.5 34.5 15l4.5 4.5L20.5 38H16z" />
      <path {...common} d="m31.5 18 4.5 4.5" />
    </>
  )
}

function SimpleLineIcon({ type }: { type: BrandIconName }) {
  const variants: Record<string, React.ReactNode> = {
    accident: (
      <>
        <path {...common} d="M13 36h26" />
        <path {...common} d="M18 36V18l8-5 8 5v18" />
        <path {...common} d="M22 25h8" />
        <path {...common} d="M26 21v8" />
      </>
    ),
    appeal: (
      <>
        <path {...common} d="M16 11h20v30H16z" />
        <path {...common} d="M21 18h10" />
        <path {...common} d="M21 24h10" />
        <path {...common} d="m19 36 16-16" />
        <path {...common} d="M31 32h7v7" />
      </>
    ),
    hearing: (
      <>
        <path {...common} d="M20 12h12" />
        <path {...common} d="M22 16h8" />
        <path {...common} d="M26 20v16" />
        <path {...common} d="M15 36h22" />
        <path {...common} d="m16 22-6 10h12z" />
        <path {...common} d="m36 22-6 10h12z" />
      </>
    ),
    impugnation: (
      <>
        <path {...common} d="M13 10h20l6 6v27H13z" />
        <path {...common} d="M33 10v6h6" />
        <path {...common} d="M19 23h14" />
        <path {...common} d="m20 36 12-12" />
        <path {...common} d="m32 36-12-12" />
      </>
    ),
    pension: <PeopleIcon />,
    phone: (
      <>
        <path {...common} d="M18 11h16l2 26-2 4H18l-2-4 2-26Z" />
        <path {...common} d="M23 36h6" />
      </>
    ),
    review: (
      <>
        <path {...common} d="M15 9h18l6 6v28H15z" />
        <path {...common} d="M33 9v6h6" />
        <path {...common} d="M21 24h9" />
        <path {...common} d="M21 30h6" />
        <path {...common} d="M34 38a7 7 0 1 0-7-7 7 7 0 0 0 7 7Z" />
        <path {...common} d="m39 36 5 5" />
      </>
    ),
    work: <BriefcaseIcon />,
  }

  return variants[type] || <DocumentIcon />
}

export function BrandIcon({ className = '', name }: BrandIconProps) {
  const icons: Partial<Record<BrandIconName, React.ReactNode>> = {
    area: <PeopleIcon />,
    assistance: <BpcIcon />,
    bpc: <BpcIcon />,
    briefcase: <BriefcaseIcon />,
    calendar: <CalendarIcon />,
    checklist: <ChecklistIcon />,
    clock: <ClockIcon />,
    contract: <ContractIcon />,
    document: <DocumentIcon />,
    edit: <EditIcon />,
    email: <EmailIcon />,
    location: <LocationIcon />,
    search: <SearchIcon />,
    protection: <PeopleIcon />,
  }

  return (
    <svg
      aria-hidden="true"
      className={`brand-icon ${className}`.trim()}
      focusable="false"
      viewBox="0 0 52 52"
    >
      {icons[name] || <SimpleLineIcon type={name} />}
    </svg>
  )
}
