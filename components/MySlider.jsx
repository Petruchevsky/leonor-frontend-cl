"use client";
import Slider from "react-slick";
import "./MySlider.css"

function MySlider({ data }) {

	var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true, 
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    pauseOnHover: true,
  };

	return (
		<div>
			<Slider {...settings}>
				{data.map((testi) => (
					<div key={testi.id}>
            <h2 className="h2-t">What people Say</h2>
            {/* <hr className="hr-t"/> */}
            <br />
						<p className="p-t">{testi?.attributes?.testimonial}</p>
						<h1 id="h1-t">{testi?.attributes?.name}</h1>
					</div>
				))}
			</Slider>
		</div>
	);
}

export default MySlider;
