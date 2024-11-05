import { IProduct } from "../interfaces/index";
import { textSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";

type TSetProduct = (updater: (prev: IProduct[]) => IProduct[]) => void;
interface IProps {
  product: IProduct;
  open: () => void;
  setProductToEdit: (product: IProduct) => void;
  setTempColorsToEdit: (colors: string[]) => void;
  setProducts: TSetProduct;
}
const ProductCard = ({
  setProducts,
  setTempColorsToEdit,
  setProductToEdit,
  open,
  product,
}: IProps) => {
  /* ______ Handlers ______ */
  const handleEditClick = () => {
    setTempColorsToEdit(product.colors);
    setProductToEdit(product);
    open();
  };
  const handleRemove = () => {
    setProducts((prev) => prev.filter((el) => el.id !== product.id));
  };
  return (
    <>
      <div className="max-w-sm md:max-w-lg md:mx-0 border rounded-md p-2 flex flex-col">
        <div>
          <Image
            url={product.url}
            alt="Product's Image"
            className="rounded-md w-full h-full"
          />
        </div>
        <h3>{product.title}</h3>
        <p>{textSlicer(product.description)}</p>
        <div className="flex gap-0.5 items-center my-3 space-x-1">
          {product.colors.map((color) => {
            return <CircleColor color={color} />;
          })}
        </div>
        <div className="flex items-center justify-between">
          <span>{product.price}</span>
          <div className="flex items-center gap-1">
            <div>
              <img
                className="rounded-full w-10 h-10"
                src={product.category.url}
                alt="Category's Image"
              />
            </div>
            <span>{product.category.name}</span>
          </div>
        </div>
        <div className="flex justify-between gap-1">
          <Button onClick={handleEditClick} className="bg-indigo-700">
            Edit
          </Button>
          <Button onClick={handleRemove} className="bg-red-700">
            Remove
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
