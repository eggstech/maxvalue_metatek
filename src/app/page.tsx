
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Building, UserCheck } from 'lucide-react';
import * as React from 'react';


export default function LoginPage() {
    const router = useRouter();

    const handleAdminLogin = () => {
        router.push('/dashboard');
    };

    const handleFieldLogin = () => {
        router.push('/field');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center gap-2 justify-center mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 95 40"
                            className="w-10 h-10 text-primary"
                            fill="currentColor"
                        >
                            <defs>
                                <linearGradient id="ring-gradient-login" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
                                <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.5}} />
                                </linearGradient>
                            </defs>
                            <path d="M0 40 L10 40 L25 0 L15 0 Z" />
                            <path d="M28 0 L48 0 L48 8 L36 8 L36 16 L46 16 L46 24 L36 24 L36 32 L48 32 L48 40 L28 40 Z" />
                            <path d="M55 20 a 18 18 0 1 1 36 0 a 18 18 0 1 1 -36 0" />
                            <path d="M57 20 a 16 16 0 1 1 32 0 a 16 16 0 1 1 -32 0" fill="hsl(var(--card))" />
                            <path d="M 50 18 a 22 10 0 1 0 0 4 a 22 10 0 1 0 0 -4" fill="url(#ring-gradient-login)" transform="rotate(-15 72 20)" />
                        </svg>
                        <h1 className="text-3xl font-bold">
                            ConnectFlow
                        </h1>
                    </div>
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>Select your role to sign in.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Button className="w-full h-16 text-lg" onClick={handleAdminLogin}>
                        <Building className="mr-3 h-6 w-6" />
                        Login as Admin
                    </Button>
                     <Button variant="secondary" className="w-full h-16 text-lg" onClick={handleFieldLogin}>
                        <UserCheck className="mr-3 h-6 w-6" />
                        Login as Field User
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
