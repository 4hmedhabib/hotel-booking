import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticate = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const userExist = await db.users.findUnique({
      where: { clerkId: user.id },
      include: {
        workspaces: {
          where: {
            user: {
              clerkId: user.id
            }
          }
        }
      }
    });
    if (userExist) {
      return { status: 200, user: userExist };
    }

    const newUser = await db.users.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {}
        },
        workspaces: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL"
          }
        }
      },
      include: {
        workspaces: {
          where: {
            user: {
              clerkId: user.id
            }
          }
        }
      }
    });
    if (newUser) {
      return { status: 201, user: newUser };
    }

    return { status: 400 };
  } catch (err) {
    console.error(err);
    return { status: 500 };
  }
};
