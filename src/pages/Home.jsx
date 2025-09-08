import { useEffect, useState } from "react";
import HeroCarousel from "./Home/HeroCarousel";
import CollectionsSlider from "./Home/CollectionsSlider";
import ScatterBoard from "./Home/ScatterBoard";
import BestSellers from "./Home/BestSellers";
import InstagramSection from "./Home/InstagramSection";
import Footer from "./Home/Footer";
import { BASE_URL } from "../API"; // <-- Centralized base URL

function Home() {
  const [heros, setHeros] = useState([]);
  const [collections, setCollections] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch hero images
        const heroRes = await fetch(`${BASE_URL}/api/heros/getall`);
        const heroData = await heroRes.json();
        setHeros(heroData || []);

        // Fetch landing data (collections + best sellers)
        const landingRes = await fetch(`${BASE_URL}/api/landing`);
        const landingData = await landingRes.json();
        setCollections(landingData.collections || []);
        setBestSellers(landingData.bestSellers || []);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-indigo-500 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <HeroCarousel
        images={heros.map((hero) => ({
          id: hero._id,
          image: `${BASE_URL}${hero.image}`,
        }))}
      />
      <CollectionsSlider
        collections={collections.map((c) => ({
          name: c.name,
          image: `${BASE_URL}${c.image}`,
        }))}
      />
      <ScatterBoard
        imageUrl={heros.length > 0 ? `${BASE_URL}${heros[0].image}` : "/default.jpg"}
      />
      <BestSellers
        products={bestSellers.map((p) => ({
          name: p.name,
          price: p.price,
          image: `${BASE_URL}${p.heroImage}`,
        }))}
      />
      <InstagramSection />
      <Footer />
    </div>
  );
}

export default Home;
