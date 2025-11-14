// pages/property/[id].tsx

// --------- LA RIGA CHIAVE È QUESTA! ---------
// Questo dice al file dove trovare il componente 'PropertyDetail'
import PropertyDetail from "../../components/property/PropertyDetail";
// ---------------------------------------------

import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

// Definiamo la "forma" della proprietà
interface PropertyDetails {
  id: string;
  title: string;
  price: number | string;
  imageUrl: string;
  description: string;
  // Aggiungi altri campi se necessario
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      setLoading(true); 
      setError(null);

      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError("Impossibile caricare la proprietà."); 
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p className="text-center p-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center p-10 text-red-500">{error}</p>
  }

  if (!property) {
    return <p className="text-center p-10">Property not found</p>;
  }

  // Passiamo i dati puliti al componente di visualizzazione
  return <PropertyDetail property={property} />;
}