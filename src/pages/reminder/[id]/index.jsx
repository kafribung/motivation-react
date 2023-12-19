import Head from 'next/head';

import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import { useEffect, useState } from 'react';
import { deleteReminder, getReminder } from '@/lib/getReminder';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import Alert from '@/components/Alert';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ToolsSection({ children, ...props }) {
    return (
        <Section {...props}>
            <ul role="list" className="space-y-16">
                {children}
            </ul>
        </Section>
    );
}

function Tool({ title, href, children }) {
    return (
        <Card as="li">
            <Card.Title as="h3" href={href}>
                {title}
            </Card.Title>
            <Card.Description>{children}</Card.Description>
        </Card>
    );
}

export default function ReminderShow() {
    // Hook
    const { loading, user } = useAuth();

    // Router
    const router = useRouter();

    // Local var
    const { id } = router.query;
    const [reminder, setReminder] = useState([]);
    const [flashMessage, setFlashMessage] = useState('');
    // End Local Var

    useEffect(() => {
        // Auth
        if (!loading && !user) {
            router.push('/login');
        }
        // End Auth

        // Get success_message from local_storage
        const successMessage = localStorage.getItem('successMessage');

        // Set success_message to state
        if (successMessage) {
            setFlashMessage(successMessage);
        }

        // Remove success_message from local_storage
        localStorage.removeItem('successMessage');

        // Fetch data
        const fetchDataReminder = async () => {
            try {
                const response = await getReminder(id);
                const formatRemindAt = response.reminders.remind_at.split(' ')[0];
                setReminder({ ...response.reminders, remind_at: formatRemindAt });
            } catch (error) {}
        };
        fetchDataReminder();
        // End fetch data
    }, [user, loading, router, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sweetalert
        const MySwal = withReactContent(Swal);

        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this remind!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        // if "Yes"
        if (result.isConfirmed) {
            try {
                await deleteReminder(id);

                //Set alert
                localStorage.setItem('successMessage', 'Reminder deleted successfully!');
                router.push('/');
            } catch (error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while deleting the reminder!',
                });
            }
        }
    };
    return (
        <>
            <Head>
                <title>Remindme-Show</title>
                <meta name="description" content="Software I use, gadgets I love, and other things I recommend." />
            </Head>
            <SimpleLayout
                title="Software I use, gadgets I love, and other things I recommend."
                intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
            >
                {flashMessage && <Alert type="success" message={flashMessage} />}

                <div className="space-y-20">
                    <ToolsSection title="Reminder Me">
                        <Tool title={reminder.title}>{reminder.description}</Tool>
                        <Tool className="text-xs" title={reminder.remind_at}>
                            Author: {reminder.user}
                        </Tool>
                        <Tool className="text-xs" title="Status">
                            Sent: {reminder.sent_email ? 'Yes' : 'No'}
                        </Tool>
                        <Button href={`/reminder/${reminder.id}/edit`} className="m-2">
                            Edit
                        </Button>
                        <Button onClick={handleSubmit} variant="danger">
                            Delete
                        </Button>
                    </ToolsSection>
                </div>
            </SimpleLayout>
        </>
    );
}
