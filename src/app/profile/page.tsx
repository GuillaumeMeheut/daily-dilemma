import CustomRadarChart from "@/components/RadarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getUser,
  getUserProfile,
  getUserResponses,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";

export default async function Profile() {
  const supabase = createClient();

  const { user } = await getUser(supabase);

  if (!user) {
    return <p>You must be sign in</p>;
  }

  const responses = await getUserResponses(supabase, user.id);

  // if (responses && responses?.length < 5) {
  //   //TODO: Must return a preview but locked/blurred
  //   return (
  //     <p>
  //       You need to answer {5 - responses.length} more dilemma to get access to
  //       your psychological profile.
  //     </p>
  //   );
  // }
  const profile = await getUserProfile(supabase, user.id);

  const stats = {
    openness: 20,
    conscientiousness: 8,
    extraversion: -6,
    agreeableness: 33,
    neuroticism: 15,
  };

  // const aiRes = await fetch("http://localhost:3000/api/openai", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(stats),
  // });

  // const res = await aiRes.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Psychological profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CustomRadarChart stats={stats} />
        <h3 className="text-xl font-bold mb-2">Who are you ?</h3>
        <p>
          {/* {res.description} */}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </CardContent>
    </Card>
  );
}
