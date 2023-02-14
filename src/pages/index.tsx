import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <h1 className="text-red-700 text-4xl bg-yellow-400">Wlcome to course</h1>
      {session?.user?.name}
      <img
        src={session?.user?.image!}
        alt="img"
        className="w-32 h-32 rounded-full"
      />
      <span>
        Provider: <b>{session?.user?.provider}</b>
      </span>
      {session ? (
        <button onClick={() => signOut()} className="bg-blue-800">
          signOut
        </button>
      ) : (
        <button onClick={() => signIn()} className="bg-blue-500">
          signIn
        </button>
      )}
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  console.log(session);

  return {
    props: {
      session,
    },
  };
}
