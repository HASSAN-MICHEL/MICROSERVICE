import { useContext } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { ListChecks } from 'lucide-react';

const StockReport = () => {
  const { products, loading, error } = useContext(AppContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className=' !text-persimmon uppercase py-4 !font-bold flex items-center gap-2 !text-4xl'><ListChecks />  Rapport Stock</h1>
      <table className="table bg-white rounded-md !h-70 sbadow-md">
        <thead >
          <tr  >
            <th className='!bg-persimmon !text-black  rounded-ss-md'>Produit</th>
            <th className='!bg-persimmon !text-black '>Categories</th>
            <th className='!bg-persimmon !text-black '>Prix </th>
            <th className='!bg-persimmon !text-black '>Stock</th>
            <th className='!bg-persimmon !text-black rounded-se-md'>Unité</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockReport;