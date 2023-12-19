import { SimpleLayout } from '@/components/SimpleLayout';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { storeMotivation } from '@/lib/getMotivation';

export default function MotivationCreate() {
    // Hook
    const { user, loading } = useAuth();

    // Router
    const router = useRouter();

    // Var local
    const [form, setForm] = useState({
        name: '',
        description: '',
    });

    const [errors, setErrors] = useState([]);
    // End Var local

    // Auth
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);
    // Auth

    // Form
    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // State motivation
        const response = await storeMotivation(form);

        if (response?.errors) setErrors(response.errors);
        else {
            setForm({
                name: '',
                description: '',
            });
            // Flash message
            localStorage.setItem('successMessage', 'Motivation created successfully!');
            router.push('/');
        }
        // End State motivation
    };

    // End form
    return (
        <>
            <Head>
                <title>Motivation - Create</title>
                <meta name="description" content="Things I’ve made trying to put my dent in the universe." />
            </Head>

            <SimpleLayout
                title="Setting and Tracking Goals."
                intro="One key feature of motivational apps is helping users set their goals. By detailing these goals, the app provides clear direction, making the journey towards success feel more organized. Progress tracking features help users monitor their advancements over time, offering a better understanding of the achievements they've made."
            >
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Motivation create</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Complete form below</p>
                            </div>

                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                <div className="sm:col-span-4">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={form.name}
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={form.description}
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                                    <p className="mt-3 text-sm leading-6 text-gray-600">
                                        Write a few motivation about yourself.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </SimpleLayout>
        </>
    );
}
