// components/reviews/ReviewList.tsx

import { useState, useEffect } from "react";
import axios from "axios";

// 1. Definiamo la "forma" di una recensione
interface Review {
  id: string;
  author: string;
  rating: number; // Es. 4.5
  comment: string;
}

// 2. Definiamo le "props" che il componente accetta
//    Ci serve solo l'ID della proprietà!
interface ReviewListProps {
  propertyId: string;
}

export default function ReviewList({ propertyId }: ReviewListProps) {
  // 3. Questo componente gestisce i *propri* stati
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 4. useEffect per recuperare i dati, "dipende" solo dal propertyId
  useEffect(() => {
    // Non provare a caricare se non abbiamo un ID
    if (!propertyId) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        // Chiamata API specifica per le recensioni!
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Impossibile caricare le recensioni.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]); // Si attiva solo se/quando propertyId è disponibile

  // 5. Gestione degli stati di caricamento ed errore
  if (loading) {
    return <p>Caricamento recensioni...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p>Nessuna recensione disponibile per questa proprietà.</p>;
  }

  // 6. Mostra l'elenco delle recensioni
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Recensioni</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold">{review.author}</h3>
              <span className="text-yellow-500">⭐️ {review.rating} / 5</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}