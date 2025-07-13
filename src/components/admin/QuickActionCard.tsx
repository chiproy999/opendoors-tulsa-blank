import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface QuickActionCardProps {
  to: string;
  icon: ReactNode;
  label: string;
}

const QuickActionCard = ({ to, icon, label }: QuickActionCardProps) => {
  return (
    <Link to={to}>
      <Card className="hover:bg-red-50 dark:hover:bg-gray-800 transition-colors cursor-pointer h-full flex flex-col justify-center items-center p-4">
        {icon}
        <p className="text-sm font-medium">{label}</p>
      </Card>
    </Link>
  );
};

export default QuickActionCard;