import ChallengeHeading from "@/components/dashboard/challenge-heading";
import PageContent from "@/components/dashboard/page-content";
import { getAllChallenges } from "@/utils/actions/getAllChallenges";

const ChallegePage = async () => {
  const result = await getAllChallenges();

  return (
    <main className="w-full h-full pl-0 md:pl-3">
      <ChallengeHeading />
      <PageContent challenges={result} />
    </main>
  );
};

export default ChallegePage;
