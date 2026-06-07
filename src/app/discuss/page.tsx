import { SectionHeading } from "@/components/ui";
import { DiscussionBoard } from "@/components/discussion-board";

export default function DiscussPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Q&A"
        title="Questions and answers around college decisions."
        description="Ask about admissions, placements, or college choices and keep the discussion tied to the college discovery experience."
      />
      <DiscussionBoard />
    </div>
  );
}
