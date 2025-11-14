// pages/properties/[id].tsx

// Usiamo '..' due volte: 
// 1. per uscire da [id]
// 2. per uscire da 'properties' e arrivare a 'pages'
// Poi entriamo in 'components'
import BookingForm from "../../components/booking/BookingForm";
import ReviewList from "../../components/reviews/ReviewList";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

// Definiamo la "forma" della proprietà
interface PropertyDetails {
  id: string;
  title: string;
  price: number | string;
  imageUrl: string;
  description: string;
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query; 

  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Impossibile caricare i dettagli della proprietà.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  
  // Stati di rendering
  if (loading) {
    return <p className="text-center p-10">Caricamento in corso...</p>;
  }

  if (error) {
    return <p className="text-center p-10 text-red-500">{error}</p>;
  }

  if (!property) {
    return <p className="text-center p-10">Proprietà non trovata.</p>;
  }

  // Blocco 'return' pulito e corretto
  return (
    <div className="container mx-auto p-4">
      
      {/* 1. Dettagli proprietà */}
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <div className="relative w-full h-96 mb-4">
        <Image 
          src={property.imageUrl} 
          alt={property.title} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-lg"
        />
      </div>
      <p className="text-xl font-semibold mb-2">{property.price} / notte</p>
      <p className="text-gray-700">{property.description}</p>
      
      {/* 2. Modulo Prenotazione */}
      <div className="my-8">
        <BookingForm propertyId={property.id} />
      </div>

      <hr className="my-8" />
      
      {/* 3. Lista Recensioni */}
      <ReviewList propertyId={property.id} />

    </div> // Questa è l'UNICA chiusura del div contenitore
  );
}