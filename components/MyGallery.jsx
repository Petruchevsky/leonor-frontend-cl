"use client";
import Image from "next/image";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import { useState } from "react";
import "./MyGallery.css";

function MyGallery({ images }) {
	const [index, setIndex] = useState(-1);

	const photos = images?.map(({ attributes }) => ({
		src: attributes.url,
		width: attributes.width,
		height: attributes.height,
	}));

	console.log(photos);

	return (
		<div className="main-div">
			<PhotoAlbum
				photos={photos}
				layout="rows"
				onClick={({ index }) => setIndex(index)}
			/>

			<Lightbox
				slides={photos}
				open={index >= 0}
				index={index}
				close={() => setIndex(-1)}
				// enable optional lightbox plugins
				plugins={[Counter]}
			/>
		</div>
	);
}

export default MyGallery;
