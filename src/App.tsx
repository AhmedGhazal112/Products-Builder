import ProductCard from "./components/ProductCard";
import "./index.css";

interface IProps {}

const App = ({}) => {
  return (
    <>
      <div className="bg-slate-500 m-2 rounded-md p-4 gap-4 border-red-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
};

export default App;
