import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticate = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }
  } catch (err) {
    throw err;
  }
};
