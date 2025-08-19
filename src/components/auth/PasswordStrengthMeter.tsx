import React from 'react';
import { validatePasswordStrength } from '@/utils/passwordValidator';

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  className = ''
}) => {
  const validation = validatePasswordStrength(password);
  
  if (!password) return null;

  const getStrengthColor = () => {
    if (validation.score >= 4) return 'bg-green-500';
    if (validation.score >= 3) return 'bg-yellow-500';
    if (validation.score >= 2) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStrengthText = () => {
    if (validation.score >= 4) return 'Very Strong';
    if (validation.score >= 3) return 'Strong';
    if (validation.score >= 2) return 'Medium';
    return 'Weak';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Password Strength</span>
        <span className={`text-sm font-medium ${
          validation.score >= 4 ? 'text-green-600' :
          validation.score >= 3 ? 'text-yellow-600' :
          validation.score >= 2 ? 'text-orange-600' :
          'text-red-600'
        }`}>
          {getStrengthText()}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${(validation.score / 5) * 100}%` }}
        />
      </div>
      
      {validation.suggestions.length > 0 && (
        <div className="space-y-1">
          {validation.suggestions.map((suggestion, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              • {suggestion}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};