import { colleges } from "@/lib/data";
import { College, CollegeFilters, PredictorInput } from "@/lib/types";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

export function matchesSearch(college: College, query: string) {
  const normalized = normalizeText(query);
  if (!normalized) return true;

  const haystack = [
    college.name,
    college.location,
    college.type,
    college.overview,
    college.courses.join(" "),
    college.stats.examAccepted.join(" ")
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}

export function filterColleges(filters: CollegeFilters) {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(20, Math.max(1, filters.pageSize ?? 6));

  let results = colleges.filter((college) => {
    if (filters.q && !matchesSearch(college, filters.q)) return false;
    if (filters.location && !college.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.exam && !college.stats.examAccepted.some((exam) => exam.toLowerCase().includes(filters.exam!.toLowerCase()))) return false;
    if (typeof filters.maxFees === "number" && college.fees > filters.maxFees) return false;
    if (typeof filters.minRating === "number" && college.rating < filters.minRating) return false;
    return true;
  });

  if (filters.sort === "rating") results = [...results].sort((a, b) => b.rating - a.rating);
  if (filters.sort === "fees-asc") results = [...results].sort((a, b) => a.fees - b.fees);
  if (filters.sort === "fees-desc") results = [...results].sort((a, b) => b.fees - a.fees);
  if (filters.sort === "name") results = [...results].sort((a, b) => a.name.localeCompare(b.name));

  const total = results.length;
  const start = (page - 1) * pageSize;
  const items = results.slice(start, start + pageSize);

  return {
    items,
    total,
    page,
    pageSize,
    hasMore: start + pageSize < total
  };
}

export function compareColleges(slugs: string[]) {
  return colleges.filter((college) => slugs.includes(college.slug)).slice(0, 3);
}

export function scoreCollegeForPredictor(college: College, input: PredictorInput) {
  const examMatch = college.stats.examAccepted.some((exam) =>
    normalizeText(exam).includes(normalizeText(input.exam))
  );
  const rankBand =
    input.rank <= 5000 ? 3 : input.rank <= 20000 ? 2 : input.rank <= 50000 ? 1 : 0;
  const affordability = typeof input.budget === "number" ? (college.fees <= input.budget ? 2 : 0) : 1;
  const locationBoost = input.preferredLocation
    ? college.location.toLowerCase().includes(input.preferredLocation.toLowerCase())
      ? 1
      : 0
    : 0;

  const base = college.rating * 20;
  const examBoost = examMatch ? 18 : 0;
  const selectivity = college.stats.nirfRank <= 20 ? 8 : college.stats.nirfRank <= 50 ? 5 : 2;

  return base + examBoost + rankBand * 10 + affordability * 6 + locationBoost * 8 + selectivity;
}

export function recommendColleges(input: PredictorInput) {
  return colleges
    .map((college) => ({
      college,
      score: scoreCollegeForPredictor(college, input)
    }))
    .filter(({ college }) =>
      college.stats.examAccepted.some((exam) =>
        normalizeText(exam).includes(normalizeText(input.exam))
      )
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}
