import React from "react";
import BestSallersProduct from "./ProductCard";
import { Product } from "../types/product";

interface ProductGridProps {
  products: Product[] | undefined;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  console.log(products);

  return <div className="mx-4 grid  gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">{products?.map((product) => <BestSallersProduct key={product.id} product={product} />)}</div>;
};

export default ProductGrid;
