"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

interface GetEncryptProps {
  dataEncrypt: GetEncrypt[];
}

const TableEncrypt = ({ dataEncrypt }: GetEncryptProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isFormData, setIsFormData] = useState({
    full_name: "",
    phone_number: "",
    address: "",
  });

  const [isFormDataUpdate, setIsFormDataUpdate] = useState({
    id: "",
    full_name: "",
    phone_number: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIsFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIsFormDataUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("p_full_name", isFormData.full_name);
      formData.append("p_phone_number", isFormData.phone_number);
      formData.append("p_address", isFormData.address);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/encrypt/add/`, formData);

      if (response.status === 200) {
        setNotification({ type: "success", message: "Encrypt Inputted successfully!" });
        toast.success("Encrypt Inputted Successfully!");
        // Clear the form data
        setIsFormData({
          full_name: "",
          phone_number: "",
          address: "",
        });

        setTimeout(() => router.push("/dashboard/encrypt/"), 2000);
      }
    } catch (error: any) {
      setIsLoading(false);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // **Penambahan handleOpenUpdateDialog untuk dekripsi data**
  const handleOpenUpdateDialog = (encrypt: GetEncrypt) => {
    setIsFormDataUpdate({
      id: encrypt.id,
      full_name: encrypt.full_name, // Dekripsi full_name
      phone_number: encrypt.phone_number, // Dekripsi phone_number
      address: encrypt.address, // Dekripsi address
    });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Start loading state
    setIsLoading(true);

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("p_full_name", isFormDataUpdate.full_name);
      formData.append("p_phone_number", isFormDataUpdate.phone_number);
      formData.append("p_address", isFormDataUpdate.address);

      // Make the axios request
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/encrypt/update/${isFormDataUpdate.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper content type
        },
      });

      if (response.status === 200) {
        setNotification({ type: "success", message: "User updated successfully!" });

        toast.success("Data Successfully Updated!");
        router.refresh();
      }
    } catch (error: any) {
      // Handle error case
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
      console.error(error); // For debugging purposes
    } finally {
      // Always stop the loading state
      setIsLoading(false);

      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/encrypt/delete/?id=${id}`);

      if (response.status === 200) {
        setNotification({ type: "success", message: "Encryption deleted successfully!" });
        toast.success("Encryption deleted successfully!");

        router.refresh();
      }
    } catch (error: any) {
      setIsLoading(false);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-4 bg-white">
        <div className="space-y-2 pb-6">
          <h2 className="font-semibold text-lg leading-7">Encryption Data (Admin Page)</h2>
          <p className="text-sm">Test Encryption</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Encrypt</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Encrypt</DialogTitle>
                <DialogDescription>Make changes to your Encrypt here. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="applicant" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="Pedro Duarte"
                      className="col-span-3"
                      value={isFormData.full_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phonenumber" className="text-right">
                      Phone Number
                    </Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      type="number"
                      placeholder="621234567890"
                      className="col-span-3"
                      value={isFormData.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>

                    <textarea
                      value={isFormData.address}
                      onChange={handleChange}
                      id="address"
                      name="address"
                      autoComplete="address"
                      rows={3}
                      className="col-span-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                      placeholder="Jl. Ceger Raya"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <Table className="border border-zinc-200">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead>Applicant</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataEncrypt.map((request, index) => (
              <TableRow key={index}>
                {/* **Penambahan dekripsi untuk menampilkan data** */}
                <TableCell className="border border-zinc-200">{request.full_name}</TableCell>
                <TableCell className="border border-zinc-200">{request.phone_number}</TableCell>
                <TableCell className="border border-zinc-200">{request.address}</TableCell>
                <TableCell className="border border-zinc-200 space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => handleOpenUpdateDialog(request)}>
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Encrypt</DialogTitle>
                        <DialogDescription>Make changes to your Encrypt here. Click save when you're done.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="full_name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="full_name"
                              name="full_name"
                              type="text"
                              placeholder="John Doe"
                              className="col-span-3"
                              value={isFormDataUpdate.full_name}
                              onChange={handleUpdateChange}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone_number" className="text-right">
                              Phone Number
                            </Label>
                            <Input
                              id="phone_number"
                              name="phone_number"
                              type="number"
                              placeholder="621234567890"
                              className="col-span-3"
                              value={isFormDataUpdate.phone_number}
                              onChange={handleUpdateChange}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                              Address
                            </Label>

                            <textarea
                              value={isFormDataUpdate.address}
                              onChange={handleUpdateChange}
                              id="address"
                              name="address"
                              autoComplete="address"
                              rows={3}
                              className="col-span-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                            focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                              placeholder="Jl. Ceger Raya"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Update</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="destructive" onClick={() => handleDelete(request.id)} className="px-4 py-2">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TableEncrypt;
