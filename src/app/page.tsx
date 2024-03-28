import Posts from "@/src/app/components/Posts"
import LoginName from "@/src/app/components/LoginName";
export default function Home() {
  return (
    <main>
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">Daniel</span>.
        </span>
      </p>
      <Posts />
    </main>
  );
}
