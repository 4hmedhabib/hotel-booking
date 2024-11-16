import { onAuthenticate } from "@/actions";
import { redirect } from "next/navigation";

const Page = async () => {
  const auth = await onAuthenticate();
  console.log(auth);
  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workspaces[0]?.id}`);
  }

  if (auth.status === 400 || auth.status === 500) {
    return redirect(`/auth/sign-in`);
  }
};

export default Page;
