import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      Check out the UI page <Link href="/ui">here</Link>.
    </div>
  );
}

