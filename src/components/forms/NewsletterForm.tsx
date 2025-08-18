import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Input sanitization function
const sanitizeEmail = (email: string): string => {
  return email
    .toLowerCase()
    .trim()
    .slice(0, 100); // Limit length
};

const newsletterSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  onSuccess?: () => void;
  className?: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ onSuccess, className = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Rate limiting check
    if (submitCount >= 3) {
      toast.error('Too many subscription attempts. Please wait before trying again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitCount(prev => prev + 1);

    try {
      // Sanitize email input
      const sanitizedEmail = sanitizeEmail(data.email);

      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({ email: sanitizedEmail });

      if (error) {
        if (error.code === '23505') { // Duplicate email
          toast.error('This email is already subscribed to our newsletter.');
        } else {
          console.error('Newsletter subscription error:', error);
          toast.error('Failed to subscribe. Please try again.');
        }
        return;
      }

      toast.success('Successfully subscribed to our newsletter!');
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={isSubmitting || submitCount >= 3}
            className="shrink-0"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </Form>
    </div>
  );
};