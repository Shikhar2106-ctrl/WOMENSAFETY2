import React from 'react';
import { Phone, Shield, Stethoscope, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Fixed: Added proper type for Icon component instead of 'any'
const EmergencyCard = ({ title, number, icon: Icon }: { 
  title: string; 
  number: string; 
  icon: React.ElementType // Fixed: Proper typing for icon component
}) => (
  <motion.div variants={item}>
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-primary/10 p-3 rounded-full"
          >
            <Icon className="w-6 h-6 text-primary" />
          </motion.div>
          <div>
            <CardTitle className="text-lg mb-1">{title}</CardTitle>
            <a
              href={`tel:${number}`}
              className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors"
            >
              {number}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function EmergencyContacts() {
  const emergencyNumbers = [
    { title: "Women's Helpline", number: "1091", icon: Phone },
    { title: "Police Emergency", number: "112", icon: Shield },
    { title: "Ambulance", number: "102", icon: Stethoscope },
    { title: "Domestic Violence Helpline", number: "181", icon: AlertCircle },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">Emergency Helpline Numbers</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyNumbers.map((contact, index) => (
          <EmergencyCard key={index} {...contact} />
        ))}
      </div>
    </motion.div>
  );
}