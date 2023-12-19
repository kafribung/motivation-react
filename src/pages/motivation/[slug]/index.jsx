import Head from 'next/head';

import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import Alert from '@/components/Alert';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deleteMotivation, getMotivation } from '@/lib/getMotivation';

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

export default function MotivationShow() {
    // Hook
    const { loading, user } = useAuth();

    // Router
    const router = useRouter();

    // Local var
    const { slug } = router.query;
    const [motivation, setMotivation] = useState({});
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

            // Remove success_message from local_storage
            localStorage.removeItem('successMessage');
        }

        // Fetch data
        const fetchDataMotivation = async () => {
            try {
                const data = await getMotivation(slug);
                setMotivation(data);
            } catch (error) {}
        };
        fetchDataMotivation();
        // End fetch data
    }, [user, loading, router, slug]);

    const isSuperAdmin = user?.roles.some((role) => role.name === 'super_admin');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sweetalert
        const MySwal = withReactContent(Swal);

        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this motivation!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        // if "Yes"
        if (result.isConfirmed) {
            try {
                await deleteMotivation(slug);

                //Set alert
                localStorage.setItem('successMessage', 'Motivation deleted successfully!');
                router.push('/');
            } catch (error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while deleting the motivation!',
                });
            }
        }
    };

    return (
        <>
            <Head>
                <title>Motivation - Show</title>
                <meta name="description" content="Software I use, gadgets I love, and other things I recommend." />
            </Head>
            <SimpleLayout
                title="Community Support and Positive Notifications."
                intro="Motivational apps create a space for collaboration and social support. Through community features, users can share their journeys, inspire one another, and celebrate achievements together. Positive notifications set by users help maintain high motivation levels, reminding them of the steps that need to be taken.."
            >
                {flashMessage && <Alert type="success" message={flashMessage} />}

                {motivation && (
                    <div className="space-y-20">
                        <ToolsSection title="Motivation">
                            <Tool title={motivation.name}>{motivation.description}</Tool>
                            <Tool className="text-xs" title={motivation.created_at}>
                                Author: {motivation.user}
                            </Tool>
                            <Button href={`/motivation/${motivation.slug}/edit`} className="m-2">
                                Edit
                            </Button>
                            {isSuperAdmin && (
                                <Button onClick={handleSubmit} variant="danger">
                                    Delete
                                </Button>
                            )}
                        </ToolsSection>
                    </div>
                )}
            </SimpleLayout>
        </>
    );
}
