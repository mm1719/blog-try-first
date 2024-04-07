import Posts from "@/src/app/components/Posts"
import CreateButton from "@/src/app/components/Button_Create";

export default function Home() {
  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">Daniel</span>.
        </span>
      </p>
      <div className="mx-auto max-w-2xl dark:text-white flex justify-between items-end">
          <h2 className="text-4xl font-bold">My Posts</h2>
          <p style={{marginBottom: "25px"}}><CreateButton /></p>
      </div>
      <Posts />
    </main>
  );
}
