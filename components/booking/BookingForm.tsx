// components/booking/BookingForm.tsx

import { useState } from "react";
import axios from "axios";

// Definiamo le "props" che il componente accetta
interface BookingFormProps {
  propertyId: string;
}

export default function BookingForm({ propertyId }: BookingFormProps) {
  // 1. Stati per i campi del modulo
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 2. Stati per gestire il processo di invio
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // 3. Funzione che gestisce l'invio del modulo
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Impedisce alla pagina di ricaricarsi

    if (!startDate || !endDate) {
      setError("Per favore, seleziona sia la data di inizio che quella di fine.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // 4. Ecco la chiamata POST!
      // Inviamo un oggetto con i dati necessari all'endpoint
      const response = await axios.post("/api/bookings", {
        propertyId, // L'ID della proprietà (dalle props)
        startDate,  // La data di inizio (dallo stato)
        endDate     // La data di fine (dallo stato)
      });
      
      // Se va a buon fine...
      setSuccess(true);
      setStartDate(""); // Resettiamo i campi
      setEndDate("");

    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Impossibile creare la prenotazione. Riprova.");
    } finally {
      setSubmitting(false); // Finito
    }
  };

  // Se la prenotazione è andata a buon fine, mostriamo un messaggio
  if (success) {
    return (
      <div className="border p-4 rounded-lg bg-green-100 text-green-800">
        <h3 className="font-bold">Prenotazione confermata!</h3>
        <p>Abbiamo ricevuto la tua richiesta.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-2 text-sm font-bold text-green-900"
        >
          Fai un'altra prenotazione
        </button>
      </div>
    );
  }

  // Altrimenti, mostriamo il modulo
  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow-md space-y-4 bg-white">
      <h3 className="text-xl font-semibold">Prenota questa proprietà</h3>
      
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Check-in
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          Check-out
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      {/* Mostra messaggi di errore se ce ne sono */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting} // Disabilita il pulsante durante l'invio
        className="w-full bg-blue-600 text-white p-2 rounded-md font-bold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {submitting ? "Invio in corso..." : "Prenota ora"}
      </button>
    </form>
  );
}