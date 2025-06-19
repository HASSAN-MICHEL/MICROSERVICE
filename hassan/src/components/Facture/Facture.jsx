import React from 'react';

const Facture = () => {
  return (
    <div className="p-6 bg-white text-black w-[800px] mx-auto">
      {/* Entête entreprise */}
      <div className="flex justify-between mb-4 border-b pb-4">
        <div>
          <h1 className="text-xl font-bold">BOISSONS DU PAYS</h1>
          <p>Localisation : Cameroun , Douala BONABERIE</p>
          <p>Tél : +225 07 00 00 00</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Facture N°: <span className="font-semibold">FCT000123</span></p>
          <p>Date : 04/06/2025</p>
          <p>Heure : 11:34</p>
        </div>
      </div>

      {/* Infos client */}
      <div className="mb-4">
        <p><span className="font-semibold">Client :</span> Kouassi Jean</p>
      </div>

      {/* Tableau produits */}
      <table className="w-full border border-gray-300 mb-4 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Produit</th>
            <th className="border px-2 py-1">Qté</th>
            <th className="border px-2 py-1">P.U</th>
            <th className="border px-2 py-1">Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Coca-Cola 50cl</td>
            <td className="border px-2 py-1 text-center">12</td>
            <td className="border px-2 py-1 text-right">500</td>
            <td className="border px-2 py-1 text-right">6 000</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Bière Castel</td>
            <td className="border px-2 py-1 text-center">24</td>
            <td className="border px-2 py-1 text-right">600</td>
            <td className="border px-2 py-1 text-right">14 400</td>
          </tr>
        </tbody>
      </table>

      {/* Sous-table colis */}
      <div className="mb-2 text-sm">
        <p className="font-semibold">Détails des colis :</p>
        <ul className="ml-4 list-disc">
          <li>Total Casier : 3</li>
          <li>Total Palette : 1</li>
          <li>Total Boîte : 5</li>
        </ul>
      </div>

      {/* Table emballage */}
      <div className="mb-2 text-sm">
        <p className="font-semibold">Emballage :</p>
        <p>Nombre de casiers : 3</p>
        <p>Prix emballage (3 × 3 500 FCFA) : <span className="font-bold">10 500 FCFA</span></p>
      </div>

      {/* Frais d'enlèvement */}
      <div className="mb-2 text-sm">
        <p className="font-semibold">Frais d'enlèvement :</p>
        <p>Casier 12 : 2 × 600 FCFA = 1 200 FCFA</p>
        <p>Casier 24 : 1 × 1 200 FCFA = 1 200 FCFA</p>
        <p>Total frais : <span className="font-bold">2 400 FCFA</span></p>
      </div>

      {/* Totaux */}
      <div className="mt-4 border-t pt-2 text-sm">
        <p>Total produits : <span className="font-bold">20 400 FCFA</span></p>
        <p>Prix emballage : <span className="font-bold">10 500 FCFA</span></p>
        <p>Frais d'enlèvement : <span className="font-bold">2 400 FCFA</span></p>
        <p className="text-lg font-bold mt-2">
          Prix Total TTC : <span className="text-green-600">33 300 FCFA</span>
        </p>
      </div>
    </div>
  );
};

export default Facture;