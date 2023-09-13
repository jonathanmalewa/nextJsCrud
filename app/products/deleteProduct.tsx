"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function DeleteProduct(product: Product) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  async function handleDeleted(productId: number) {
    setIsMutating(true);

    await fetch(`http://localhost:5000/products/${productId}`, {
      method: "DELETE",
    });
    setIsMutating(false);
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  function handleClose() {
    setModal(false);
  }

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        {" "}
        Deleted
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className={`modal ${modal ? "open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {product.title} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleClose}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDeleted(product.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Delete...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
