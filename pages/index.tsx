// pages/index.tsx

import axios from "axios";
import { useEffect, useState } from "react";
// Usiamo il percorso relativo: usciamo da 'pages' (..) ed entriamo in 'components'
import PropertyCard from "../components/property/PropertyCard"; 

// Definiamo la "forma" dei dati per TypeScript
interface Property {
  id: string;
  title: string;
  price: number | string;
  imageUrl: string;
}

export default function Home() {
  // Diciamo a useState che è un array di 'Property'
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}