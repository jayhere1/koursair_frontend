interface Props {
  overviewHtml: string;
  inclusions: string[];
  exclusions: string[];
}

export default function KenyaOverviewSection({
  overviewHtml,
  inclusions,
  exclusions,
}: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-primary border-b-4 border-primary pb-3">
        Trip Overview
      </h2>

      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: overviewHtml }}
      />

      <div className="bg-[#F4EFE7]/50 p-6 rounded-2xl border border-primary">
        <h3 className="font-bold text-xl mb-4 text-primary">
          What&apos;s Included
        </h3>

        <ul className="grid sm:grid-cols-2 gap-2 text-sm">
          {inclusions.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4 className="font-bold text-primary mt-6 mb-2">
          Cost Exclusions
        </h4>

        <ul className="grid sm:grid-cols-2 gap-2 text-sm">
          {exclusions.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
