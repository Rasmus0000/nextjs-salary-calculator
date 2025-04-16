import PalgakalkulaatorLayout from "@/components/PalgakalkulaatorLayout";
import PalgakalkulaatorContextWrapper from "@/components/PalgakalkulaatorContextWrapper";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-start justify-start p-5 lg:p-16">
      <h2 className="font-title text-[2rem] font-normal">Palgakalkulaator</h2>

      <PalgakalkulaatorLayout>
        <PalgakalkulaatorContextWrapper />
      </PalgakalkulaatorLayout>
    </section>
  );
}
