import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import slide1 from "../../../assets/Banner Image/medicamp1.jpg";
import slide2 from "../../../assets/Banner Image/medicamp-2.jpg";
import slide3 from "../../../assets/Banner Image/medicamp-3.jpg";

const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[700px]"
      >
        {/* Slide 1 */}
        <SwiperSlide
          className="w-full h-[570px] bg-cover bg-center"
          style={{ backgroundImage: `url(${slide1})` }}
        >
          <div className="w-full h-[700px] flex items-center justify-center text-white bg-black bg-opacity-50">
            <div className="text-center space-y-4 w-5/6 mx-auto md:w-full">
              <h1 className="text-3xl md:text-5xl font-extrabold">
                Transforming Lives Through Healthcare
              </h1>
              <p className="text-lg md:text-xl">
                Empowering communities with free medical care and bringing
                smiles to families in need.
              </p>
              <Link to="/availableCamp">
                <button className="bg-[#148980] px-6 py-3 font-bold hover:bg-[#F3C677] hover:text-black rounded-3xl my-5">
                  Join Camp
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide
          className="w-full h-[700px] bg-cover bg-center"
          style={{ backgroundImage: `url(${slide2})` }}
        >
          <div className="w-full h-[700px] flex items-center justify-center text-white bg-black bg-opacity-50">
            <div className="text-center md:w-4/6 mx-auto space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold">
                Success Stories That Inspire
              </h1>
              <p className="text-lg md:text-xl w-5/6 mx-auto md:w-full">
                Witness the joy of families receiving essential health services
                and life-changing support.
              </p>
              <Link to="/availableCamp">
                <button className="bg-[#148980] px-6 py-3 font-bold hover:bg-[#F3C677] hover:text-black rounded-3xl my-5">
                  Join Camp
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide
          className="w-full h-[700px] bg-cover bg-center"
          style={{ backgroundImage: `url(${slide3})` }}
        >
          <div className="w-full h-[700px] flex items-center justify-center text-white bg-black bg-opacity-50">
            <div className="text-center md:w-4/6 mx-auto space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold">
                Building a Healthier Future
              </h1>
              <p className="text-lg md:text-xl w-5/6 mx-auto md:w-full">
                Dedicated to creating long-lasting impacts and fostering hope
                for a better tomorrow.
              </p>
              <Link to="/availableCamp">
                <button className="bg-[#148980] px-6 py-3 font-bold hover:bg-[#F3C677] hover:text-black rounded-3xl my-5">
                  Join Camp
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
