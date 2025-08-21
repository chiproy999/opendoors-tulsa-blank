import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { validatePasswordStrength } from '@/utils/passwordValidator';
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter';
import { useRateLimit } from '@/components/common/RateLimiter';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

type UserRole = 'seeker' | 'employer' | 'landlord' | 'admin';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

interface FormErrors {
  [key: string]: string;
}

const LoginPageEnhanced = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated, isLoading } = useAuth();
  
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'seeker'
  });
  
  const [loginErrors, setLoginErrors] = useState<FormErrors>({});
  const [registerErrors, setRegisterErrors] = useState<FormErrors>({});
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);
  
  const { checkRateLimit: checkAuthRateLimit } = useRateLimit('auth');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkAuthRateLimit()) {
      return;
    }
    
    setIsLoginSubmitting(true);
    setLoginErrors({});

    try {
      await login(loginData.email, loginData.password);
      toast.success('Welcome back!');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message?.includes('Invalid login credentials')) {
        setLoginErrors({ 
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        });
      } else {
        toast.error(error.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkAuthRateLimit()) {
      return;
    }
    
    setIsRegisterSubmitting(true);
    setRegisterErrors({});

    try {
      // Basic validation
      if (!registerData.firstName.trim()) {
        setRegisterErrors({ firstName: 'First name is required' });
        return;
      }
      if (!registerData.lastName.trim()) {
        setRegisterErrors({ lastName: 'Last name is required' });
        return;
      }
      if (!registerData.email.trim()) {
        setRegisterErrors({ email: 'Email is required' });
        return;
      }
      if (!registerData.password.trim()) {
        setRegisterErrors({ password: 'Password is required' });
        return;
      }
      
      // Enhanced password validation
      const passwordValidation = validatePasswordStrength(registerData.password);
      if (passwordValidation.score < 3) {
        setRegisterErrors({ 
          password: 'Password is too weak. Please follow the suggestions below.' 
        });
        return;
      }

      await register(registerData);
      toast.success('Registration successful! Please check your email to verify your account.');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message?.includes('already registered')) {
        setRegisterErrors({ email: 'This email is already registered' });
      } else {
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsRegisterSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-md mx-auto py-20">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-20">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Open Doors Tulsa</CardTitle>
            <CardDescription>
              Join our community to find jobs and housing opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={loginErrors.email ? 'border-red-500' : ''}
                      required
                    />
                    {loginErrors.email && (
                      <p className="text-red-500 text-sm">{loginErrors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={loginErrors.password ? 'border-red-500' : ''}
                      required
                    />
                    {loginErrors.password && (
                      <p className="text-red-500 text-sm">{loginErrors.password}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoginSubmitting}
                  >
                    {isLoginSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        className={registerErrors.firstName ? 'border-red-500' : ''}
                        required
                      />
                      {registerErrors.firstName && (
                        <p className="text-red-500 text-sm">{registerErrors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        className={registerErrors.lastName ? 'border-red-500' : ''}
                        required
                      />
                      {registerErrors.lastName && (
                        <p className="text-red-500 text-sm">{registerErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className={registerErrors.email ? 'border-red-500' : ''}
                      required
                    />
                    {registerErrors.email && (
                      <p className="text-red-500 text-sm">{registerErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">I am a...</Label>
                    <Select
                      value={registerData.role}
                      onValueChange={(value: UserRole) => setRegisterData({ ...registerData, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seeker">Job/Housing Seeker</SelectItem>
                        <SelectItem value="employer">Employer</SelectItem>
                        <SelectItem value="landlord">Landlord</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className={registerErrors.password ? 'border-red-500' : ''}
                      required
                    />
                    <PasswordStrengthMeter password={registerData.password} />
                    {registerErrors.password && (
                      <p className="text-red-500 text-sm">{registerErrors.password}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isRegisterSubmitting}
                  >
                    {isRegisterSubmitting ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPageEnhanced;