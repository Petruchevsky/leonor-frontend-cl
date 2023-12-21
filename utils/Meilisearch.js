"use client";
import { useState, useEffect } from "react";
import { MeiliSearch } from "meilisearch";
import "../components/Header.css";
import Link from "next/link";
import Markdown from "./Markdown";

const client = new MeiliSearch({
	host: "https://meilisearch.up.railway.app",
	apiKey: "pskgmzpkrbax04py8pe7y620em5obp5o",
});

function SearchBar() {

	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [showResults, setShowResults] = useState(false);

	useEffect(() => {
		handleSearch();
	}, [query]);

	const search = async (query) => {
		const index = client.index("blog");
		const response = await index.search(query);
		console.log(response.hits);
		return response.hits;
	};

	const searchSiteRoutes = (query) => {
		var domain = "https://leonor-frontend.vercel.app";

		const siteRoutes = [
			{ title: "Home", path: "/", type: "route" },
			{ title: "Consultations", path: "/consultations", type: "route" },
			{ title: "Fees", path: "/fees", type: "route" },
			{ title: "T&C's", path: "/terms-and-conditions", type: "route" },
			{ title: "Privacy Policy", path: "/privacy-police", type: "route" },
			{ title: "Homeopathy", path: "/homeopathy", type: "route" },
			{ title: "Testimonials", path: "/testimonials", type: "route" },
			{ title: "Gallery", path: "/gallery", type: "route" },
			{ title: "Blog", path: "/blog", type: "route" },
			{ title: "FAQ", path: "/faq", type: "route" },
			{ title: "Contact", path: "/contact", type: "route" },
		];

		return siteRoutes.filter((route) =>
			route.title.toLowerCase().includes(query.toLowerCase())
		);
	};

	const handleSearch = async () => {
		if (query === "") {
			setSearchResults([]);
			return;
		}

		const blogResults = await search(query);

		setSearchResults(blogResults);

		const blogResultsWithPath = blogResults.map((blog) => ({
			...blog,
			path: `/blog/${blog.url}`,
			type: "blog",
		}));

		const routeResults = searchSiteRoutes(query);
		console.log(routeResults);

		setSearchResults([...blogResultsWithPath, ...routeResults]);
		console.log(searchResults);

        if (query === "") {
			setSearchResults([]);
			return;
		}
	};

	const handleFocus = () => {
		setShowResults(true);
	  };
	  
	  const handleBlur = () => {
		// Retraso para permitir la selección de resultados antes de ocultarlos
		setTimeout(() => setShowResults(false), 200);
	  };

    const cleaning = () => {
        setQuery("");
    }

	return (
		<div className="search-container">
			<form action="/search-results" method="get" className="search">
				<input
					type="text"
					size={24}
					id="search"
					name="q"
					placeholder="What are you looking for...?"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				<input type="submit" value="Go" onClick={ ()=>{handleSearch();  }} />
			</form>

            <div className={`search-results ${searchResults.length > 0 && showResults ? 'active' : ''}`}>				{searchResults.map((result) =>
					result.type === "blog" ? (
						<div key={result.id} className="result">
							<p className="title-result">- Blog Entry -</p>
							<Link href={result.path}>{result.title}</Link>
							<Link href={result.path} ><Markdown text={result.post.split(' ').slice(0, 50).join(' ') + ' ...Read more...'} /></Link>
						</div>
					) : (
						<div key={result.id} className="result">
							<p className="title-result">- Site Route -</p>
							<Link href={result.path}>{result.title}</Link>
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default SearchBar;
