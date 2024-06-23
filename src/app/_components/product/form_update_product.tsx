"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Input, Button, Image } from "@nextui-org/react";
import { api } from "~/trpc/react";
import CameraIcon from "public/icons/CameraIcon";
// import { type NextPage } from "next";
import { supabase } from "~/utils/supabase";
import styles from "./product.module.css";
import { IProduct } from "~/type/iProduct";

interface UpdateProductProps {
  data: IProduct;
}

export const FormUpdateProduct = ({ data }: UpdateProductProps) => {
  const router = useRouter();
  const [name, setName] = useState(data.name);
  const [category, setCategory] = useState(data.category);
  const [description, setDescription] = useState(data.desc);
  const [price, setPrice] = useState(data.price);
  const [stock, setStock] = useState(data.stock);
  const [selectedImage, setSelectedImage] = useState(data.image);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dataId = data.id;

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file ?? new Blob()));
      setSelectedFile(file);
    }
  };

  const createNewProduct = api.product.update.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setCategory("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setSelectedImage("");
      setSelectedFile(undefined);
    },
  });

  const handleSubmit = async () => {
    setUploading(true);
    if (selectedFile) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload("sayur/" + selectedFile.name, selectedFile);
      createNewProduct.mutate({
        id: dataId,
        name: name,
        image: selectedFile.name,
        category: category,
        desc: description,
        price: price,
        stock: stock,
      });
      setUploading(false);
      console.log("berhasil guys");
      console.log("berhasil guys");

      if (data) {
        console.log(data);
      } else if (error) {
        console.log(error);
      }
    }
    setUploading(false);
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2"
      >
        <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
          <div className="flex w-80 flex-col gap-4">
            <label>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  void handleImage(e);
                }}
              />
              <div className="flex aspect-video w-80 cursor-pointer items-center justify-center rounded border-2 border-dashed">
                {selectedImage ? (
                  <Image
                    width={300}
                    height={200}
                    alt="NextUI hero Image with delay"
                    src={selectedImage}
                    ref={imageRef}
                  />
                ) : (
                  <div className="mb-6 flex flex-wrap gap-4 md:mb-0 md:flex-nowrap">
                    <span>Select Image</span>
                    <CameraIcon />
                  </div>
                )}
              </div>
            </label>
           
          </div>
          <div className="flex w-full flex-col gap-4">
            <Input
              value={selectedFile ? selectedFile.name : "Image Kosong"}
              type="text"
              disabled
              variant="flat"
              label="Image"
            />
            
          </div>
        </div>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex w-full flex-col gap-6">
          <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
            <Input
              isRequired
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              variant="flat"
              label="Name"
            />
            <Input
              isRequired
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              variant="flat"
              label="Category"
            />
          </div>
          <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
            <Input
              isRequired
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              variant="flat"
              label="Description"
            />
          </div>
          <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
            <Input
              isRequired
              value={price.toString()} // Convert number to string
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              type="number"
              variant="flat"
              label="Price"
            />
            <Input
              isRequired
              value={stock.toString()} // Convert number to string
              onChange={(e) => setStock(parseInt(e.target.value, 10))}
              type="number"
              variant="flat"
              label="Stock"
            />
          </div>
          <Button
            type="submit"
            color="success"
            disabled={uploading}
            onClick={handleSubmit}
          >
            {uploading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};
