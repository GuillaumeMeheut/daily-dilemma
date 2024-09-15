import CustomRadarChart from "@/components/RadarChart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAIResponse } from "@/lib/api";
import {
  getUser,
  getNumbersOfUserResponses,
  getUserStatsById,
  getLastDescriptionDilemmaCount,
  updateUserDescription,
  getUserDescription,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";

export default async function Profile() {
  const supabase = createClient();

  const { user } = await getUser(supabase);

  if (!user) {
    return <p>You must be sign in</p>;
  }

  const responses = await getNumbersOfUserResponses(supabase, user.id);

  if (!responses) return;
  if (responses && responses < 5) {
    return (
      <p>
        You need to answer {5 - responses} more dilemma to get access to your
        psychological profile.
      </p>
    );
  }
  const lastDescriptionDilemmaCount = await getLastDescriptionDilemmaCount(
    supabase,
    user.id
  );

  if (lastDescriptionDilemmaCount === null) return;

  const stats = await getUserStatsById(supabase, user.id);

  if (!stats) return;

  let description: string | null;

  if (responses % 5 === 0 && responses > lastDescriptionDilemmaCount) {
    const newDescription = await fetchAIResponse(stats, responses);
    if (!newDescription) return;
    await updateUserDescription(supabase, user.id, newDescription, responses);
    description = newDescription;
  } else {
    description = await getUserDescription(supabase, user.id);
  }

  const dilemmaBeforeNewDesc = 5 - (responses % 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Psychological profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CustomRadarChart stats={stats} />
        <h3 className="text-xl font-bold mb-2">
          Whats your dilemma answers tell about you ?
        </h3>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <p className="italic text-sm">
          Answer {dilemmaBeforeNewDesc} more dilemma
          {dilemmaBeforeNewDesc > 1 && "s"} to get a new description
        </p>
      </CardFooter>
    </Card>
  );
}
