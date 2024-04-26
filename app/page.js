import Search from "@/app/ui/search";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>Which would you like to build a team around?</div>
			<div>
				<Search placeholder="mon" />
			</div>
		</main>
	);
}
