import ChallengeHeading from "@/components/dashboard/challenge-heading";
import PageContent from "@/components/dashboard/page-content";
import { getAllChallenges } from "@/utils/actions/getAllChallenges";

interface ChallegePageProps {
  searchParams:
    | {
        filter: string | undefined;
      }
    | undefined;
}

const ChallegePage = async ({ searchParams }: ChallegePageProps) => {
  const data = await getAllChallenges(searchParams?.filter);

  return (
    <main className="w-full h-full pl-0 md:pl-3">
      <ChallengeHeading />
      <PageContent challenges={data} />
    </main>
  );
};

export default ChallegePage;
