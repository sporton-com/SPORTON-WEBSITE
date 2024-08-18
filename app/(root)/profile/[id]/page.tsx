// app/profile/[id]/page.tsx
import { fetchUser, UserData } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import Profile from "./profile";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Profile params={params} />
    </>
  );
};

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const userId = params.id;

  // Fetch user data
  const user = await fetchUser(userId);

  return {
    title: (user as UserData)?.name || "User Profile",
    description: `${(user as UserData)?.phone} \n ${(user as UserData)?.bio} ` || "User profile page",
    openGraph: {
      title: (user as UserData)?.name || "User Profile",
      description: `${(user as UserData)?.phone} \n ${(user as UserData)?.bio} ` || "User profile page",
      images: [
        {
          url: (user as UserData)?.image || "https://www.sporton.website/logo.png",
          width: 800,
          height: 600,
          alt: (user as UserData)?.name || "User Profile Picture",
        },
      ],
      url: `https://${process.env.NEXT_PUBLIC_SITE_URL}/profile/${(user as UserData)?._id}`,
    },
  };
}

export default Page;
