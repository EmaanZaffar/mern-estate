import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/*top*/}
        <div className='flex flex-col gap-6 py-20 px-3 max-w-6xl mx-auto items-center text-center'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-5xl gap-2 lg:leading-tight'>
              Find your next <span className='text-orange-500 font-semibold '>perfect</span>
            <br />
            place with ease
          </h1>
          <div className='text-gray-500 text-sm sm:text-md font-medium'>
            Emaan Estate will help you find your home fast, easy and comfortable.
            <br />
            We have a wide range of properties for you to choose from.
          </div>
          <Link to={"/search"} className='text-xs sm:text-sm  font-bold'>
            <button className='bg-blue-500 text-white p-3 px-5 rounded-lg hover:opacity-95 transition flex items-center gap-2 group hover:scale-110'>
            Let&apos;s get started
            <div className='group-hover:translate-x-2 transition'> 
              <FaArrowRight />
            </div>
            </button>
            
          </Link>
        </div>

      {/*swiper*/}

      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 && offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}} className='h-[500px]' key={listing._id}></div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      {/*listing results for offer, sale, rent*/}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div className=''>
              <div className='my-3 mb-5'>
                <h2 className='text-2xl font-semibold text-slate-600 mb-2'>Recent offers</h2>
                <Link to={"/search?offer=true"}>
                    <button className='bg-blue-500 text-white p-2 px-4 rounded-lg hover:opacity-95 transition flex items-center gap-2 group hover:scale-110 hover:'>
                      Show more offers
                      <div className='group-hover:translate-x-2 transition'> 
                        <FaArrowRight />
                      </div>
                    </button>
                </Link>
              </div>

              <div className='flex flex-wrap gap-4'>
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }

{
          rentListings && rentListings.length > 0 && (
            <div className=''>
              <div className='my-3 mb-5'>
                <h2 className='text-2xl font-semibold text-slate-600 mb-2'>Recent places for rent</h2>
                <Link to={"/search?type=rent"}>
                    <button className='bg-blue-500 text-white p-2 px-4 rounded-lg hover:opacity-95 transition flex items-center gap-2 group hover:scale-110'>
                      Show more places for rent
                      <div className='group-hover:translate-x-2 transition'> 
                        <FaArrowRight />
                      </div>
                    </button>
                </Link>
              </div>

              <div className='flex flex-wrap gap-4'>
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
        
        {
          saleListings && saleListings.length > 0 && (
            <div className=''>
              <div className='my-3 mb-5'>
                <h2 className='text-2xl font-semibold text-slate-600 mb-2'>Recent places for sale</h2>
                <Link to={"/search?type=sale"}>
                    <button className='bg-blue-500 text-white p-2 px-4 rounded-lg hover:opacity-95 transition flex items-center gap-2 group hover:scale-110 hover:'>
                      Show more places for sale
                      <div className='group-hover:translate-x-2 transition'> 
                        <FaArrowRight />
                      </div>
                    </button>
                </Link>
              </div>

              <div className='flex flex-wrap gap-4'>
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>

    </div>
  )
}
