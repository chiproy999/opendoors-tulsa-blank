import React from 'react';
import { validatePasswordStrength, getPasswordStrengthColor, getPasswordStrengthText } from '@/utils/passwordValidator';

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
          {getPasswordStrengthText(validation.score)}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(validation.score)}`}
          style={{ width: `${(validation.score / 5) * 100}%` }}
        />
      </div>
      
      {validation.feedback.length > 0 && (
        <div className="space-y-1">
          {validation.feedback.map((suggestion, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              • {suggestion}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};