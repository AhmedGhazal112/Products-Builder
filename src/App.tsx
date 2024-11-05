import "./index.css";
import ProductCard from "./components/ProductCard";
import { Colors, inputList, Products } from "./data";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import { ChangeEvent, useState } from "react";
import { Input } from "./components/ui/Input";
import CircleColor from "./components/ui/CircleColor";
import { IProduct } from "./interfaces";
import Select from "./components/ui/Select";
const App = () => {
  /* ______ Defaults ______ */
  const defaultProduct: IProduct = {
    title: "",
    description: "",
    url: "",
    price: "",
    colors: [],
    category: { name: "", url: "" },
  };

  /* ______ States ______ */
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenToEdit, setIsOpenToEdit] = useState(false);

  const [tempColors, setTempColors] = useState<string[]>([]);
  const [tempColorsToEdit, setTempColorsToEdit] = useState<string[]>([]);

  const [product, setProduct] = useState(defaultProduct);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);

  const [products, setProducts] = useState<IProduct[]>(Products);

  /* ______ Handlers ______ */
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  function openEditForm() {
    setIsOpenToEdit(true);
  }
  function closeEditForm() {
    setIsOpenToEdit(false);
  }

  const addProduct = () => {
    setProducts((prev) => {
      return [
        {
          ...product,
          colors: tempColors,
        },
        ...prev,
      ];
    });
    setProduct(defaultProduct);
    close();
  };
  const editProduct = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productToEdit.id ? productToEdit : p))
    );
    setProductToEdit(defaultProduct);
    closeEditForm();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleChangeToEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
  };
  const handleColorClick = (color: string) => {
    setTempColors((prev) => {
      if (prev.find((el) => el == color))
        return prev.filter((el) => el != color);
      return [...prev, color];
    });
    setProduct((prev) => {
      return { ...prev, colors: tempColors };
    });
  };
  const handleColorClickToEdit = (color: string) => {
    setTempColorsToEdit((prev) => {
      const newColorsToEdit = prev.find((el) => el == color)
        ? prev.filter((el) => el != color)
        : [...prev, color];
      setProductToEdit((prev) => {
        return { ...prev, colors: newColorsToEdit };
      });
      return newColorsToEdit;
    });
  };
  /* ______ Renders ______ */
  const renderProducts = products.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        setProducts={setProducts}
        setProductToEdit={setProductToEdit}
        setTempColorsToEdit={setTempColorsToEdit}
        open={openEditForm}
      />
    );
  });

  const renderInputList = inputList.map((input) => {
    return (
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor={input.id}>{input.label}</label>
        <Input
          type={input.type}
          id={input.id}
          name={input.name}
          value={product[input.name]}
          onChange={handleChange}
        />
      </div>
    );
  });
  const renderInputListToEdit = inputList.map((input) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={input.id}>{input.label}</label>
        <Input
          id={input.id}
          type={input.type}
          name={input.name}
          value={productToEdit[input.name]}
          onChange={handleChangeToEdit}
        ></Input>
      </div>
    );
  });

  const renderAllColors = Colors.map((color) => {
    return (
      <CircleColor onClick={() => handleColorClick(color)} color={color} />
    );
  });
  const renderAllColorsToEdit = Colors.map((color) => {
    return (
      <CircleColor
        onClick={() => handleColorClickToEdit(color)}
        color={color}
      />
    );
  });

  const rendertempColors = (
    <div className="flex space-x-1 mt-2 flex-wrap">
      {tempColors.map((color) => (
        <span
          className="rounded-md p-0.5 mb-1"
          style={{ backgroundColor: color }}
        >
          {color}
        </span>
      ))}
    </div>
  );
  const rendertempColorsToEdit = (
    <div className="flex space-x-1 mt-2 flex-wrap">
      {tempColorsToEdit.map((color) => (
        <span
          className="rounded-md p-0.5 mb-1"
          style={{ backgroundColor: color }}
        >
          {color}
        </span>
      ))}
    </div>
  );

  return (
    <main className="container mx-auto">
      <Button onClick={open} className="bg-indigo-700">
        Add New Product
      </Button>
      <div className="m-2 rounded-md p-4  grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {renderProducts}
      </div>

      {/* Add Product */}
      <Modal title="Add Product" isOpen={isOpen}>
        {renderInputList}
        {rendertempColors}
        <div className="flex space-x-1 mt-2 flex-wrap">{renderAllColors}</div>
        <Select setProduct={setProduct} />
        <div className="flex items-center space-x-3">
          <Button onClick={addProduct} className="bg-indigo-700">
            Submit
          </Button>
          <Button onClick={close} className="bg-red-700">
            Cansel
          </Button>
        </div>
      </Modal>

      {/* Edit Product */}
      <Modal title="Edit Product" isOpen={isOpenToEdit}>
        {renderInputListToEdit}
        {rendertempColorsToEdit}
        <div className="flex space-x-1 mt-2 flex-wrap">
          {renderAllColorsToEdit}
        </div>
        <Select
          category={productToEdit.category}
          setProduct={setProductToEdit}
        />
        <div className="flex items-center space-x-3">
          <Button onClick={editProduct} className="bg-indigo-700">
            Submit
          </Button>
          <Button onClick={closeEditForm} className="bg-red-700">
            Cansel
          </Button>
        </div>
      </Modal>
    </main>
  );
};

export default App;
