import { useState } from "react";
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Button } from '@/Components/ui/button'
import { Head } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/Components/ui/card'
import { Label } from '@/Components/ui/label'
import { Input } from '@/Components/ui/input'

const index = ({ products }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        category: '',
        image: null,
    });

    const handleFileChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('image', data.image);

        post(route('product.store'), formData, {
            forceFormData: true,  // Make sure Inertia sends FormData correctly
            onSuccess: () => {
                setShowDialog(false);  // Close the dialog on success
                reset();  // Reset the form fields
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Products" />

            <main className='p-5 grid'>
                <div className='flex justify-end p-4'>
                    <Dialog>
                        <DialogTrigger>
                            <Button>
                                <Plus className="mr-2" /> Add Product
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                                <DialogDescription>
                                    Fill in the details below to add a new product.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="grid gap-4 py-4" encType="multipart/form-data">
                                <div className="items-center gap-4">
                                    <Label htmlFor="productName">Product Name</Label>
                                    <Input
                                        id="productName"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter product name"
                                        required
                                    />
                                    {errors.title && <div className="text-red-500">{errors.title}</div>}
                                </div>

                                <div className="items-center gap-4">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="Enter category"
                                        required
                                    />
                                    {errors.category && <div className="text-red-500">{errors.category}</div>}
                                </div>

                                <div className="items-center gap-4">
                                    <Label htmlFor="imageUpload">Product Image</Label>
                                    <Input
                                        id="imageUpload"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required
                                    />
                                    {errors.image && <div className="text-red-500">{errors.image}</div>}
                                </div>

                                <div className="flex justify-end mt-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? "Saving..." : "Save Product"}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    {products.map((product) => (
                        <Card key={product.id} className="w-full max-w-sm rounded-2xl shadow-lg">
                            <CardContent className="p-4">
                                <div className='h-[250px] w-full shadow-md rounded-md overflow-hidden'>
                                    <img
                                        src={product.image ? `/storage/${product.image}` : 'https://via.placeholder.com/400x250'}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t grid">
                                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                    <p className="text-sm text-gray-500">Likes: {product.likes}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

            </main>
        </AuthenticatedLayout>
    )
}

export default index