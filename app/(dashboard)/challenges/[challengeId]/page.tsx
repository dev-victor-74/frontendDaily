import { getChallengeById } from "@/utils/actions/getChallengeById";
import SingleChallengeContent from "@/components/dashboard/SingleChallengeContent";
import { getCustomer } from "@/utils/getCustomer";

interface SingleChallengePageProps {
  params: {
    challengeId: string;
  };
}
const SingleChallengePage = async ({ params }: SingleChallengePageProps) => {
  const data = await getChallengeById(params.challengeId);

  const subscription = await getCustomer();
  const { next_payment_date, status, createdAt } = subscription;

  if (!data) return null;

  return (
    <main className="w-full h-full pl-0 md:pl-1 pb-5">
      <SingleChallengeContent
        data={data}
        id={params.challengeId}
        next_payment_date={next_payment_date}
        status={status}
        createdAt={createdAt}
      />
    </main>
  );
};

export default SingleChallengePage;
