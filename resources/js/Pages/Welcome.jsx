import React from 'react';
import { Head } from '@inertiajs/react';
import WelcomeLayout from '@/Layouts/WelcomeLayout';

export default function Welcome() {
    return (
        <WelcomeLayout>
            <Head title="Welcome" />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h1 className="display-4 mb-4 fw-bold">
                            <i className="bi bi-house-door me-2"></i>Welcome to Our App!
                        </h1>
                        <p className="lead mb-4">
                            You're now running Laravel with React + Inertia.js + Bootstrap.
                        </p>
                    </div>
                </div>
            </div>
        </WelcomeLayout>
    );
}
