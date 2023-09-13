import React from "react";
import Addproduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

type Product = {
  id: number;
  title: string;
  price: number;
};

async function getProducts() {
  const res = await fetch("http://localhost:5000/products", {
    cache: "no-store",
  });
  return res.json();
}

async function ProductList() {
  const products = (await getProducts()) || [];
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <Addproduct />
      </div>
      <table className="table w-full ">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className="flex gap-1 space-x-8">
                <UpdateProduct {...product} />
                <DeleteProduct {...product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
