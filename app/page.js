import Search from "@/app/ui/search";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Which pokemon would you like to learn about?</div>
      <div>
        <Search placeholder="mon" />
      </div>
    </main>
  );
}
