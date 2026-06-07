import { SectionHeading } from "@/components/ui";
import { CompareBuilder } from "@/components/compare-builder";
import { colleges } from "@/lib/data";

export default function ComparePage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Compare"
        title="Line up colleges side-by-side."
        description="Pick up to three colleges and compare the data that usually matters most while deciding: fees, ratings, placements, and location."
      />
      <CompareBuilder colleges={colleges} />
    </div>
  );
}
