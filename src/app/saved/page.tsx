import { SectionHeading } from "@/components/ui";
import { SavedList } from "@/components/saved-list";
import { SavedComparisonsList } from "@/components/saved-comparisons-list";

export default function SavedPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Saved"
        title="Your shortlisted colleges and comparisons."
        description="Saved colleges and comparisons are tied to your browser session or signed-in user."
      />
      <SavedList />
      <SavedComparisonsList />
    </div>
  );
}
