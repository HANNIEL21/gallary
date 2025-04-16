import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Button } from '@/Components/ui/button'
import { Head } from '@inertiajs/react'
import React from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'

const index = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Products" />

            <main className='p-5 grid'>
                <div className='flex justify-end p-4'>
                    <Button>
                        <Plus className="mr-2" /> Add Product
                    </Button>
                </div>
                <div className='grid grid-cols-4'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                </div>
            </main>
        </AuthenticatedLayout>
    )
}

export default index