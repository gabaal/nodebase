'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'



const registerSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string()
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
    const router = useRouter()

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
    })

    const onSubmit = async (values: RegisterFormValues) => {
        await authClient.signUp.email({
            name: values.email.split('@')[0],
            email: values.email,
            password: values.password,
            callbackURL: '/'
        },
            {
                onSuccess: () => {
                    router.push('/')
                    toast.success('Account created successfully')
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        )
    }

    const isPending = form.formState.isSubmitting

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Get Started
                    </CardTitle>
                    <CardDescription>
                        Create an account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" className='w-full' type="button" disabled={isPending}>
                                        <Image alt='github logo' width={20} height={20} src='/logos/github.svg' />
                                        Continue with GitHub</Button>
                                    <Button variant="outline" className='w-full' type="button" disabled={isPending}>
                                        <Image alt='google logo' width={20} height={20} src='/logos/google.svg' />
                                        Continue with Google</Button>
                                </div>
                                <div className='grid gap-6'>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='email'
                                                        placeholder='m@example.com'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        placeholder='******'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='confirmPassword'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        placeholder='******'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button className='w-full' disabled={isPending} type='submit'>Sign up</Button>
                                </div>
                                <div className="text-center text-sm">Already have an account? <Link className='underline underline-offset-4' href="/login">Login</Link></div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}