import { onAuthenticate } from "@/actions";
import { redirect } from "next/navigation";

const Page = async () => {
  const auth = await onAuthenticate();
  if (auth.status === 200 || auth.status === 201) {
    return redirect(
      `/dashboard/${auth.user?.firstname}-${auth.user?.lastname}`
    );
  }

  if (auth.status === 400 || auth.status === 500) {
    return redirect(`/auth/sign-in`);
  }

  return <div>Page</div>;
};

export default Page;
