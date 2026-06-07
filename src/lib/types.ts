export type College = {
  slug: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  overview: string;
  type: string;
  established: number;
  campus: string;
  website?: string;
  courses: string[];
  placements: {
    medianPackage: string;
    highestPackage: string;
    recruiters: string[];
    placementRate: number;
  };
  reviews: Array<{
    author: string;
    program: string;
    rating: number;
    summary: string;
  }>;
  stats: {
    nirfRank: number;
    studentStrength: string;
    hostelAvailability: boolean;
    examAccepted: string[];
  };
};

export type CollegeFilters = {
  q?: string;
  location?: string;
  exam?: string;
  maxFees?: number;
  minRating?: number;
  page?: number;
  pageSize?: number;
  sort?: "rating" | "fees-asc" | "fees-desc" | "name";
};

export type PredictorInput = {
  exam: string;
  rank: number;
  preferredLocation?: string;
  budget?: number;
};
