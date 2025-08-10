import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import { useMemo } from 'react';

export default function Edit({ mustVerifyEmail, status, auth }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        first_name: auth.user.first_name || '',
        middle_name: auth.user.middle_name || '',
        last_name: auth.user.last_name || '',
        address: auth.user.address || '',
        number: auth.user.number || '',
        birthday: auth.user.birthday || '',
        blood_type: auth.user.blood_type || '',
        email: auth.user.email || '',
    });

    // Compute age reactively based on birthday input
    const computedAge = useMemo(() => {
        if (!data.birthday) return '';
        const today = new Date();
        const birthDate = new Date(data.birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }, [data.birthday]);

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => {
                // Update local form state from latest backend data
                reset({
                    first_name: auth.user.first_name,
                    middle_name: auth.user.middle_name,
                    last_name: auth.user.last_name,
                    address: auth.user.address,
                    number: auth.user.number,
                    birthday: auth.user.birthday,
                    blood_type: auth.user.blood_type,
                    email: auth.user.email,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Profile Information Form */}
                    <div className="bg-white p-6 shadow sm:rounded-lg max-w-3xl mx-auto">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Names */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        autoComplete="given-name"
                                        required
                                    />
                                    {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700">Middle Name (optional)</label>
                                    <input
                                        id="middle_name"
                                        type="text"
                                        value={data.middle_name}
                                        onChange={e => setData('middle_name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Optional"
                                    />
                                    {errors.middle_name && <p className="mt-1 text-sm text-red-600">{errors.middle_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        autoComplete="family-name"
                                        required
                                    />
                                    {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>

                            {/* Number, Birthday, and Age */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        id="number"
                                        type="text"
                                        value={data.number}
                                        onChange={e => setData('number', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.number && <p className="mt-1 text-sm text-red-600">{errors.number}</p>}
                                </div>

                                <div>
                                    <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Birthday</label>
                                    <input
                                        id="birthday"
                                        type="date"
                                        value={data.birthday}
                                        onChange={e => setData('birthday', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.birthday && <p className="mt-1 text-sm text-red-600">{errors.birthday}</p>}
                                </div>

                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                                    <input
                                        id="age"
                                        type="text"
                                        value={computedAge}
                                        readOnly
                                        className="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Blood Type and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="blood_type" className="block text-sm font-medium text-gray-700">Blood Type (optional)</label>
                                    <input
                                        id="blood_type"
                                        type="text"
                                        value={data.blood_type}
                                        onChange={e => setData('blood_type', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g., A+, O-, AB"
                                    />
                                    {errors.blood_type && <p className="mt-1 text-sm text-red-600">{errors.blood_type}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                        autoComplete="username"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Password Update Form */}
                    <div className="bg-white p-6 shadow sm:rounded-lg max-w-3xl mx-auto">
                        <UpdatePasswordForm className="max-w-xl mx-auto" />
                    </div>

                    {/* Delete User Form */}
                    <div className="bg-white p-6 shadow sm:rounded-lg max-w-3xl mx-auto">
                        <DeleteUserForm className="max-w-xl mx-auto" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
