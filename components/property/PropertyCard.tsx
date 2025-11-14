// components/property/PropertyCard.tsx

import Image from "next/image";
import Link from "next/link"; // 1. Importa il componente Link

interface Property {
  id: string; // Assicurati che l'ID sia incluso!
  title: string;
  price: number | string;
  imageUrl: string;
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    // 2. Avvolgi l'intera card con il Link
    //    href punta alla pagina dinamica che CREEREMO tra poco
    <Link href={`/properties/${property.id}`}>
      <div className="border rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
        <Image src={property.imageUrl} alt={property.title} width={400} height={250} />
        <div className="p-4">
          <h3 className="font-bold text-lg">{property.title}</h3>
          <p className="text-gray-600">{property.price} / notte</p>
        </div>
      </div>
    </Link>
  );
}