import { getChallengeById } from "@/utils/actions/getChallengeById";
import SingleChallengeContent from "@/components/dashboard/SingleChallengeContent";

interface SingleChallengePageProps {
  params: {
    challengeId: string;
  };
}
const SingleChallengePage = async ({ params }: SingleChallengePageProps) => {
  const data = await getChallengeById(params.challengeId);

  if (!data) return null;

  return (
    <main className="w-full h-full pl-0 md:pl-1 pb-5">
      <SingleChallengeContent data={data} id={params.challengeId} />
    </main>
  );
};

export default SingleChallengePage;