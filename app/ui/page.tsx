import Link from "next/link";

function Section({ id, children }: { id: string; children?: React.ReactNode }) {
  return (
    <section id={id} className="mb-8">
      <Link href={`#${id}`} className="text-blue-500 hover:underline">
        <h2 className="text-lg font-semibold mb-4">{id}</h2>
      </Link>
      {children}
    </section>
  );
}

export default function UIPage() {
  return (
    <div className="p-4">
      <Section id="Global Colors">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "background", var: "--background" },
            { name: "foreground", var: "--foreground" },
            { name: "card", var: "--card" },
            { name: "card-foreground", var: "--card-foreground" },
            { name: "popover", var: "--popover" },
            { name: "popover-foreground", var: "--popover-foreground" },
            { name: "primary", var: "--primary" },
            { name: "primary-foreground", var: "--primary-foreground" },
            { name: "secondary", var: "--secondary" },
            { name: "secondary-foreground", var: "--secondary-foreground" },
            { name: "muted", var: "--muted" },
            { name: "muted-foreground", var: "--muted-foreground" },
            { name: "accent", var: "--accent" },
            { name: "accent-foreground", var: "--accent-foreground" },
            { name: "destructive", var: "--destructive" },
            { name: "border", var: "--border" },
            { name: "input", var: "--input" },
            { name: "ring", var: "--ring" },
            { name: "sidebar", var: "--sidebar" },
            { name: "sidebar-foreground", var: "--sidebar-foreground" },
            { name: "sidebar-primary", var: "--sidebar-primary" },
            {
              name: "sidebar-primary-foreground",
              var: "--sidebar-primary-foreground",
            },
            { name: "sidebar-accent", var: "--sidebar-accent" },
            {
              name: "sidebar-accent-foreground",
              var: "--sidebar-accent-foreground",
            },
            { name: "sidebar-border", var: "--sidebar-border" },
            { name: "sidebar-ring", var: "--sidebar-ring" },
            { name: "chart-1", var: "--chart-1" },
            { name: "chart-2", var: "--chart-2" },
            { name: "chart-3", var: "--chart-3" },
            { name: "chart-4", var: "--chart-4" },
            { name: "chart-5", var: "--chart-5" },
            { name: "green", var: "--green" },
            { name: "green-gradient", var: "--green-gradient" },
            { name: "green-light", var: "--green-light" },
            { name: "neutral-light", var: "--neutral-light" },
            { name: "neutral-dark", var: "--neutral-dark" },
          ].map(({ name, var: cssVar }) => (
            <div
              key={name}
              className="flex items-center gap-4 p-2 rounded border border-border bg-card"
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: `var(${cssVar})`,
                  border: "1px solid #2d3a33",
                }}
              />
              <span className="font-mono text-sm">{name}</span>
              <span className="text-xs text-muted-foreground">{cssVar}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="Buttons">
        <button className="button">Click Me</button>
        <button className="btn-green">Green Button</button>
      </Section>
    </div>
  );
}
