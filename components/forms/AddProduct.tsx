import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Typography, InputNumber, message } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
 import {Button as Button2} from "@/components/ui/button";
import { ProductFormData, productSchema } from "@/lib/validations/prouduct";

interface AddProductFormProps {
  userId: string;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ userId }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
      userId, // إضافة userId هنا
    },
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const onDrop = async (acceptedFiles: File[]) => {
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    // Convert files to base64 strings
    const base64Images = await Promise.all(
      acceptedFiles.map((file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
      )
    );
    setValue("images", base64Images);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const response = await axios.post("/api/products/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      message.success(response.data.message);
    } catch (error) {
      message.error("Failed to add product");
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Typography.Title level={2}>Add Product</Typography.Title>

      <Form.Item
        label="Name"
        validateStatus={errors.name ? "error" : ""}
        help={errors.name?.message}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Price"
        validateStatus={errors.price ? "error" : ""}
        help={errors.price?.message}>
        <Controller
          name="price"
          control={control}
          render={({ field }) => <InputNumber {...field} className="w-full" />}
        />
      </Form.Item>

      <Form.Item label="Condition" validateStatus={errors.condition ? "error" : ""} help={errors.condition?.message}>
  <Controller
    name="condition"
    control={control}
    render={({ field }) => (
        <Select name={field.name} disabled={field.disabled}  onValueChange={field.onChange}   defaultValue={field.value}>
        <SelectTrigger className=" account-form_input">
          <SelectValue className="flex flex-row gap-5" placeholder="Select condition" />
        </SelectTrigger>
        <SelectContent className="account-form_input">
          <SelectGroup>
            <SelectLabel>Select condition</SelectLabel>
       
            <SelectItem   value={"new"}>
            New
              </SelectItem>
            <SelectItem   value={"used"}>
            Used
              </SelectItem>
            
          </SelectGroup>
        </SelectContent>
      </Select>

    )}
  />
</Form.Item>

      <Form.Item label="Description">
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Images"
        validateStatus={errors.images ? "error" : ""}
        help={errors.images?.message}>
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{
            border: "1px dashed #d9d9d9",
            padding: "20px",
            textAlign: "center",
          }}>
          <input {...getInputProps()} />
          <Button icon={<UploadOutlined />}>Upload Images</Button>
        </div>
      </Form.Item>

      <Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "10px",
            flexWrap: "wrap",
          }}>
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ))}
        </div>
      </Form.Item>

      <Form.Item>
        <Button2  className="bg-primary-500 hover:bg-primary-500/80 w-full" type="submit">
          Add Product
        </Button2>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
