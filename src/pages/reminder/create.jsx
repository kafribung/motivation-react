import { SimpleLayout } from '@/components/SimpleLayout';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { storeReminders } from '@/lib/getReminder';

export default function ReminderCreate() {
    // Hook
    const { user, loading } = useAuth();

    // Router
    const router = useRouter();

    // Var local
    const [form, setForm] = useState({
        title: '',
        description: '',
        remind_at: '',
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
        // State reminders
        const response = await storeReminders(form);

        if (response.response?.data.errors) setErrors(response.response.data.errors);
        else {
            setForm({
                title: '',
                escription: '',
                remind_at: '',
            });
            // Flash message
            localStorage.setItem('successMessage', 'Reminder created successfully!');
            router.push('/');
        }
        // End State reminders
    };

    // End form
    return (
        <>
            <Head>
                <title>Remindme-Create</title>
                <meta name="description" content="Things I’ve made trying to put my dent in the universe." />
            </Head>
            <SimpleLayout
                title="Write down anything that worries you."
                intro="With user-friendly features and the ability to customize reminder settings, RemindMe makes an ideal partner to help users stay organized and connected to their agenda"
            >
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Reminder create</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Complete form below</p>
                            </div>

                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            autoComplete="title"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={form.title}
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
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
                                        Write a few sentences about yourself.
                                    </p>
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="remind-at"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Remind date
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="remind_at"
                                            id="remind-at"
                                            autoComplete="remind-at"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={form.remind_at}
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                    {errors.remind_at && <p className="text-sm text-red-600">{errors.remind_at}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </SimpleLayout>
        </>
    );
}
