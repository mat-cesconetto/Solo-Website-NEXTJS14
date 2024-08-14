'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';
import { useState, useContext } from 'react';
import AuthContext from '@/app/login/auth-context'

const LoginForm = () => {

    const [error, setError] = useState<string | null>(null);

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            email: formData.get("email"), // Atualizado para 'email'
            password: formData.get("senha"),
        };

        try {
            const response = await fetch('http://3.19.188.117:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Enviando os dados corretos
            });

            const result = await response.json();
            
            console.log(result); // Log para depuração

            if (response.ok) {
                // Armazenar o token no localStorage ou cookies
                localStorage.setItem('token', result.token);
                
                // Redirecionar para o dashboard
                window.location.href = "/dashboard/empresas";
            } else {
                setError(typeof result.error === 'string' ? result.error : 'Login failed');
            }
        } catch (error) {
            setError('An unexpected error occurred');
        }
    };

    return (
        <form onSubmit={login} className="space-y-4">
            <Input className="h-12" placeholder="Insira seu email" required type="text" name="email"/> {/* Atualizado para 'email' */}
            <Input className="h-12" placeholder="Insira sua senha" required type="password" name="senha"/>
            {error && <p className="text-red-600">{error}</p>}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">Lembrar de mim</Label>
                </div>
                <Link href='/esqueceu-a-senha'>
                    <span className="text-blue-600 font-semibold hover:underline text-sm mt-2">Esqueceu sua senha?</span>
                </Link>
            </div>
            <div className="flex flex-col space-y-4">
                <Button className="w-full text-white" type="submit" variant="solo">
                    Entrar
                </Button>
                
                <span className="text-sm">
                    Não possui uma conta?
                    <Link href='/'>
                        <span className="text-blue-600 font-semibold hover:underline px-1">
                            Entre em contato.
                        </span>
                    </Link>
                </span>
            </div>
        </form>
    );
}

export default LoginForm;
