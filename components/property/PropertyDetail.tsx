// components/property/PropertyDetail.tsx

import Image from "next/image";

// 1. IMPORTIAMO I COMPONENTI CHE ABBIAMO GIÀ CREATO
//    (I percorsi relativi potrebbero necessitare di ../../ se 'property' è in una sottocartella)
import BookingForm from "../booking/BookingForm";
import ReviewList from "../reviews/ReviewList";

// 2. Definiamo la "forma" dei dati che ci aspettiamo
//    (Dovrebbe corrispondere a quella in [id].tsx)
interface PropertyDetails {
  id: string;
  title: string;
  price: number | string;
  imageUrl: string;
  description: string;
  // ...altri campi se ci sono
}

// 3. Definiamo le props del componente: si aspetta un oggetto 'property'
interface PropertyDetailProps {
  property: PropertyDetails;
}

// 4. Il componente riceve le props e le usa per il rendering
export default function PropertyDetail({ property }: PropertyDetailProps) {
  
  // Questo JSX è l'intero layout della pagina dei dettagli
  return (
    <div className="container mx-auto p-4">
      
      {/* 1. Dettagli proprietà (dalle props) */}
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
      
      {/* 2. Modulo Prenotazione (componente figlio) */}
      <div className="my-8">
        <BookingForm propertyId={property.id} />
      </div>

      <hr className="my-8" />
      
      {/* 3. Lista Recensioni (componente figlio) */}
      <ReviewList propertyId={property.id} />

    </div>
  );
}