"use client";

import Link from "next/link";
import Editor from "@/components/Editor/Editor";
import React, { useState } from "react";

function Section({ id, children }: { id: string; children?: React.ReactNode }) {
  return (
    <section id={id} className="mb-8">
      <Link href={`#${id}`}>
        <h2 className="text-lg font-semibold mb-4 text-gray-400 hover:text-gray-300">
          {id}
        </h2>
      </Link>
      {children}
    </section>
  );
}
export default function UIPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const languages = [
    "C++",
    "C",
    "C#",
    "Java",
    "Python3",
    "PHP",
    "Rust",
    "Racket",
    "Ruby",
  ];

  return (
    <div className="p-4">
      <Section id="Typography">
        <div className="space-y-4">
          <div>Inter is the default font</div>
          <div className="font-inter">
            Inter can also be applied with <code>font-inter</code> class
          </div>
          <div className="font-roboto">
            Roboto can be applied with <code>font-roboto</code> class
          </div>
          <div className="font-nulshock">
            Nulshock can be applied with <code>font-nulshock</code> class
          </div>
          <div className="font-bruno-ace">
            Bruno Ace can be applied with <code>font-bruno-ace</code> class
          </div>
        </div>
      </Section>

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

      <Section id="Editor">
        <Editor
          languages={languages}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          round="round 1"
          timer="69:69:69"
        />
      </Section>
    </div>
  );
}
