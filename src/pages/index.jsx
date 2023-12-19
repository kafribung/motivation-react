import Head from 'next/head';
import Image from 'next/image';

import { Card } from '@/components/Card';
import Alert from '@/components/Alert';
import { SimpleLayout } from '@/components/SimpleLayout';
import logoPlanetaria from '@/images/logos/planetaria.svg';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import LoadingCard from '@/components/LoadingCard';
import { getReminders } from '@/lib/getReminder';
import Select from '@/components/Select';

function LinkIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function Index() {
    // Hook
    const { user, loading } = useAuth();

    // Var local
    const [flashMessage, setFlashMessage] = useState('');
    const [limit, setLimit] = useState(10);
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        // Get success_message from local_storage
        const successMessage = localStorage.getItem('successMessage');

        // Set success_message to state
        if (successMessage) {
            setFlashMessage(successMessage);
        }

        // Remove success_message from local_storage
        localStorage.removeItem('successMessage');

        const fetchDataReminders = async () => {
            try {
                const data = await getReminders(limit);
                setReminders(data);
            } catch (error) {}
        };
        fetchDataReminders();
    }, [limit]);

    return (
        <>
            <Head>
                <title>Remindme</title>
                <meta name="description" content="Things I’ve made trying to put my dent in the universe." />
            </Head>

            <SimpleLayout
                title="RemindMe is an intuitive and useful application designed to help users organize and remember events and tasks in everyday life."
                intro="With the ability to set reminders at specific times, this app ensures that no important moment is missed. RemindMe allows users to take notes, plan meetings, and organize schedules easily, providing an efficient and effective user experience"
            >
                {flashMessage && <Alert type="success" message={flashMessage} />}

                {loading && <LoadingCard />}

                <Select
                    placeholder="Select a limit"
                    onChange={(e) => setLimit(e.target.value)}
                    name="limit"
                    id="limit"
                    options={[...Array(10)].map((_, index) => ({
                        value: index + 1,
                        label: `${index + 1} items`,
                    }))}
                />

                {!loading && user && (
                    <>
                        <Button href="/reminder/create" className="mb-10 mt-5">
                            Add Reminder
                        </Button>

                        <ul
                            role="list"
                            className="grid animate-pulse grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {reminders &&
                                reminders.map((reminder, index) => (
                                    <Card as="li" key={index}>
                                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                                            <Image src={logoPlanetaria} alt="" className="h-8 w-8" unoptimized />
                                        </div>
                                        <Card.Cta>{reminder.data.reminders.remind_at}</Card.Cta>
                                        <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                                            <Card.Link href={`reminder/${reminder.data.reminders.id}`}>
                                                {reminder.data.reminders.title}
                                            </Card.Link>
                                        </h2>
                                        <Card.Description>{reminder.data.reminders.description}</Card.Description>
                                        <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                                            <LinkIcon className="h-6 w-6 flex-none" />
                                            <span className="ml-2">
                                                {reminder.data.reminders.user} -
                                                {reminder.data.reminders.sent_email ? 'send' : ''}
                                            </span>
                                        </p>
                                    </Card>
                                ))}
                        </ul>
                    </>
                )}
            </SimpleLayout>
        </>
    );
}
