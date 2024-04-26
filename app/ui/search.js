"use client";

import { useState } from "react";

export default function Search({ placeholder }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [team, setTeam] = useState([]);

	async function handleSearch() {
		console.log("Searching for:", searchTerm);
		const response = await fetch(
			`http://localhost:3000/api/bedrock?pokemon=${searchTerm}`
		);
		setTeam(await response.json());
		console.log("team", team);
	}

	return (
		<div>
			<div className="relative flex flex-1 flex-shrink-0">
				<label htmlFor="search" className="sr-only">
					Search
				</label>
				<input
					className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
					placeholder={placeholder}
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
				/>
				<button
					className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
					onClick={handleSearch}
				>
					Search
				</button>
			</div>
			<div>
				{team?.map((item, index) => (
					<div key={index}>{item}</div>
				))}
			</div>
		</div>
	);
}
