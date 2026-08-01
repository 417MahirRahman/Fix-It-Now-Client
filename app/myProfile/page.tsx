import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserProfile } from "./_actions/profileActions.interface";
import ProfileForm from "./_components/ProfileForm";


export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!result.success) {
    redirect("/login");
  }

  const user: UserProfile = result.data.profile;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full sm:max-w-lg lg:max-w-xl">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
