import { SectionHeading } from "@/components/ui";
import { PredictorForm } from "@/components/predictor-form";
import { recommendColleges } from "@/lib/utils";

export default function PredictorPage() {
  const initialRecommendations = recommendColleges({
    exam: "JEE Main",
    rank: 12000,
    preferredLocation: "Delhi",
    budget: 250000
  });

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Predictor"
        title="Turn exam rank into a smarter shortlist."
        description="Enter your exam, rank, and budget to get college recommendations that balance affordability and placement strength."
      />
      <PredictorForm initialRecommendations={initialRecommendations} />
    </div>
  );
}
