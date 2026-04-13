/* eslint-disable @typescript-eslint/no-explicit-any */
// @/components/shared/PhotonAutocomplete.tsx
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface PhotonAutocompleteProps {
	placeholder: string;
	onSelect: (cityName: string) => void;
}

export const PhotonAutocomplete = ({
	placeholder,
	onSelect,
}: PhotonAutocompleteProps) => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const fetchCities = async () => {
			if (query.length < 3) {
				setResults([]);
				return;
			}
			// q=search term, limit=5, filter by India and cities/towns
			const url = `https://photon.komoot.io/api/?q=${query}&limit=5&osm_tag=place:city&osm_tag=place:town`;
			const res = await fetch(url);
			const data = await res.json();
			setResults(data.features || []);
		};

		const timer = setTimeout(fetchCities, 300); // Debounce to save their server
		return () => clearTimeout(timer);
	}, [query]);

	return (
		<div className="relative w-full">
			<Input
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					setIsOpen(true);
				}}
				placeholder={placeholder}
				className="h-14 rounded-xl"
			/>
			{isOpen && results.length > 0 && (
				<ul className="absolute z-50 w-full mt-2 bg-white border rounded-xl shadow-lg max-h-60 overflow-auto">
					{results.map((r, i) => (
						<li
							key={i}
							className="px-4 py-3 hover:bg-indigo-50 cursor-pointer text-sm border-b last:border-none"
							onClick={() => {
								const cityName = `${r.properties.name}${r.properties.state ? `, ${r.properties.state}` : ""}`;
								setQuery(cityName);
								onSelect(cityName);
								setIsOpen(false);
							}}>
							<span className="font-bold">{r.properties.name}</span>
							<span className="text-muted-foreground text-xs ml-2">
								{r.properties.state}, {r.properties.country}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
