"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MeiliSearch } from "meilisearch";
import Link from "next/link";
import Markdown from "@/utils/Markdown";
import "./search-results.css";

const client = new MeiliSearch({
	host: "https://meilisearch.up.railway.app",
	apiKey: "pskgmzpkrbax04py8pe7y620em5obp5o",
});

function SearchResultsPage() {
	const searchParams = useSearchParams();
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const query = searchParams.get("q");
		if (!query) return;

		async function fetchResults() {
			const index = client.index("blog-es");
			const response = await index.search(query, {
				attributesToHighlight: ["title", "post"],
			});
			setSearchResults(response.hits);
		}

		fetchResults();
	}, [searchParams]);

	return (
		<div className="container-search-results">
			<h1>Resultados de Búsqueda</h1>
			{searchResults.map((result, index) => (
				<div className="results-item">
                    <Link  key={index} href={`/blog/${result.url}`}>
                        <h1
                            dangerouslySetInnerHTML={{ __html: result._formatted.title }}
                        ></h1>
                        <Markdown text={
                                    result._formatted.post.split(" ").slice(0, 150).join(" ") +
                                    " ...Leer Más..." }
                        />
                    </Link>
                </div>
			))}
        <div className="buttons-container">
                <Link href="/blog" className="link-button">Volver al Blog</Link>
                <Link href={`${process.env.SETMORE}`} className="link-button">Reserva tu Hora</Link>
                <Link href="/contact" className="link-button">Contáctame!</Link>
        </div>
		</div>
	);
}

export default SearchResultsPage;
