import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useState } from 'react';

export default function Alert({ type, message }) {
    const [visible, setVisible] = useState(true);

    // Fungsi untuk menyembunyikan alert
    const dismissAlert = () => {
        setVisible(false);
    };

    // Jika alert tidak terlihat, kembalikan null
    if (!visible) {
        return null;
    }

    // Menentukan kelas sesuai dengan tipe status
    let bgColorClass = '';
    let textColorClass = '';

    switch (type) {
        case 'success':
            bgColorClass = 'bg-green-50';
            textColorClass = 'text-green-800';
            break;
        case 'warning':
            bgColorClass = 'bg-yellow-50';
            textColorClass = 'text-yellow-800';
            break;
        case 'danger':
            bgColorClass = 'bg-red-50';
            textColorClass = 'text-red-800';
            break;
        default:
            // Default kelas jika tipe tidak cocok
            bgColorClass = 'bg-gray-50';
            textColorClass = 'text-gray-800';
    }

    return (
        <div className={`mb-10 rounded-md p-4 ${bgColorClass}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    {type === 'success' ? (
                        <CheckCircleIcon className={clsx(textColorClass, 'h-5 w-5')} aria-hidden="true" />
                    ) : type === 'danger' ? (
                        <XMarkIcon className={clsx(textColorClass, 'h-5 w-5')} aria-hidden="true" />
                    ) : (
                        // Handling other types or default case
                        <div className={clsx(textColorClass, 'h-5 w-5')} />
                    )}
                </div>
                <div className="ml-3">
                    <p className={clsx(textColorClass, 'text-sm font-medium')}>{message}</p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            className={clsx(
                                bgColorClass,
                                textColorClass,
                                'inline-flex rounded-md p-1.5 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50',
                            )}
                            onClick={dismissAlert}
                        >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
