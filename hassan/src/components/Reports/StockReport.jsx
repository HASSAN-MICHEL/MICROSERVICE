// // import React, { useContext } from 'react';
// // import { AppContext } from '../../context/AppContext.jsx';
// // import { FaPrint } from 'react-icons/fa';


// // const handlePrint = () => {
// //     console.log('impression en cours')
// //     window.print();
// //     };

// // const StockReport = () => {
// //   const { products, loading, error } = useContext(AppContext);

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <div>
// //       <h1>Rapport Stock</h1>
// //       <button className='btn btn-primary mb-3 ' onClick={handlePrint} ><FaPrint/> Imprimer </button>
// //       <table className="table">
// //         <thead>
// //           <tr>
// //             <th>Produit</th>
// //             <th>Categories</th>
// //             <th>Prix </th>
// //             <th>Stock</th>
// //             <th>Unité</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {products.map((product) => (
// //             <tr key={product.id}>
// //               <td>{product.name}</td>
// //               <td>{product.category}</td>
// //               <td>{product.price}</td>
// //               <td>{product.stock}</td>
// //               <td>{product.unit}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default StockReport;

// import React, { useContext , useRef , useState } from 'react';
// import { AppContext } from '../../context/AppContext.jsx';
// import { FaPrint, FaFileExport, FaSearch } from 'react-icons/fa';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const StockReport = () => {
//   const { products, loading, error } = useContext(AppContext);
//   const reportRef = useRef();
//   const [searchTerm, setSearchTerm] = useState('');

//   const generatePDF = () => {
//     const input = reportRef.current;
//     html2canvas(input, {
//       scale: 2,
//       useCORS: true,
//       logging: true,
//       backgroundColor: '#ffffff'
//     }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgWidth = 210;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save(`rapport_stock_${new Date().toISOString().split('T')[0]}.pdf`);
//     });
//   };

//   const handlePrint = () => {
//     generatePDF();
//   };

//   const filteredProducts = products.filter(product => 
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
//       <p className="font-bold">Erreur</p>
//       <p>{error}</p>
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div ref={reportRef} className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">Rapport de Stock</h1>
//               <p className="text-gray-600">État actuel des produits en stock</p>
//             </div>
            
//             <div className="flex flex-col sm:flex-row gap-3">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaSearch className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Rechercher un produit..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
              
//               <button 
//                 onClick={handlePrint}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//               >
//                 <FaFileExport /> Exporter PDF
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Produit
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Catégorie
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Prix
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Unité
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredProducts.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {product.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {product.category}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         product.stock < 5 ? 'bg-red-100 text-red-800' : 
//                         product.stock < 10 ? 'bg-yellow-100 text-yellow-800' : 
//                         'bg-green-100 text-green-800'
//                       }`}>
//                         {product.stock}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {product.unit}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-4 text-sm text-gray-500">
//             Total: {filteredProducts.length} produits
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockReport;

import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { FaPrint, FaFileExport, FaSearch } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const StockReport = () => {
  const { products, loading, error } = useContext(AppContext);
  const reportRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');

  const generatePDF = async () => {
    const input = reportRef.current;
    
    // Créer un clone pour manipuler les styles
    const clone = input.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    // Convertir les couleurs problématiques
    convertProblematicColors(clone);

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        ignoreElements: (el) => el.tagName === 'BUTTON'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`rapport_stock_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    } finally {
      document.body.removeChild(clone);
    }
  };

  const convertProblematicColors = (element) => {
    // Remplacer les couleurs oklch() par des équivalents hex
    const elements = element.querySelectorAll('*');
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      
      // Couleur de texte
      if (styles.color.includes('oklch')) {
        el.style.color = '#000000'; // Noir par défaut
      }
      
      // Couleur de fond
      if (styles.backgroundColor.includes('oklch')) {
        if (el.classList.contains('bg-red-100')) {
          el.style.backgroundColor = '#fee2e2';
        } else if (el.classList.contains('bg-yellow-100')) {
          el.style.backgroundColor = '#fef9c3';
        } else if (el.classList.contains('bg-green-100')) {
          el.style.backgroundColor = '#dcfce7';
        } else {
          el.style.backgroundColor = '#ffffff';
        }
      }
    });
  };

  const handlePrint = () => {
    generatePDF();
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p className="font-bold">Erreur</p>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div ref={reportRef} className="bg-white rounded-xl shadow-md overflow-hidden print:shadow-none">
        <div className="p-6 print:p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 print:flex-col print:items-start">
            <div className="print:text-center print:w-full">
              <h1 className="text-2xl font-bold text-gray-800 print:text-xl">Rapport de Stock</h1>
              <p className="text-gray-600 print:text-sm">Généré le: {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 print:hidden">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button 
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaFileExport /> Exporter PDF
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                    Produit
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                    Catégorie
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                    Prix
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                    Unité
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                      {product.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                      {product.category}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                      {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm border border-gray-200">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.stock < 5 ? 'bg-red-100 text-red-800' : 
                        product.stock < 10 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                      {product.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-500 print:text-xs">
            Total: {filteredProducts.length} produits
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockReport;