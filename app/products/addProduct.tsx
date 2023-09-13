"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Addproduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title, price }),
    });
    setIsMutating(false);
    setTitle("");
    setPrice("");
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
      <button className="btn" onClick={handleChange}>
        {" "}
        Add New
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className={`modal ${modal ? "open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text input w-full input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="text input w-full input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleClose}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
