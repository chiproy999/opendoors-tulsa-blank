import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from '@/components/layout/AuthLayout';
import { useAuth } from '@/context/AuthContext';

type UserType = 'seeker' | 'employer' | 'landlord' | 'provider';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('seeker');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const typeFromUrl = searchParams.get('type');
    if (typeFromUrl && ['seeker', 'employer', 'landlord', 'provider'].includes(typeFromUrl)) {
      setUserType(typeFromUrl as UserType);
    }
  }, [searchParams]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert provider to specific role
      const role = userType === 'provider' ? 'employer' : userType;
      
      await register({
        firstName,
        lastName,
        email,
        password,
        role: role as 'seeker' | 'employer' | 'landlord' | 'admin',
      });
      
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was a problem creating your account",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AuthLayout 
      title="Create an Account"
      subtitle="Join Open Doors Tulsa and find new opportunities"
    >
      <div className="mt-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="mt-1"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              I am a:
            </label>
            <RadioGroup 
              value={userType} 
              onValueChange={(val) => setUserType(val as UserType)}
              className="grid grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2 border rounded p-2 cursor-pointer">
                <RadioGroupItem value="seeker" id="seeker" />
                <label htmlFor="seeker" className="text-sm cursor-pointer">Job/Housing Seeker</label>
              </div>
              <div className="flex items-center space-x-2 border rounded p-2 cursor-pointer">
                <RadioGroupItem value="employer" id="employer" />
                <label htmlFor="employer" className="text-sm cursor-pointer">Employer</label>
              </div>
              <div className="flex items-center space-x-2 border rounded p-2 cursor-pointer">
                <RadioGroupItem value="landlord" id="landlord" />
                <label htmlFor="landlord" className="text-sm cursor-pointer">Landlord/Property Manager</label>
              </div>
            </RadioGroup>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
