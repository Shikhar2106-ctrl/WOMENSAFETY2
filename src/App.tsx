import React from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Chatbot from './components/Chatbot';
import EmergencyContacts from './components/EmergencyContacts';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary text-primary-foreground shadow-lg"
      >
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2"
          >
            <Shield className="w-8 h-8" />
            <h1 className="text-3xl font-bold">SafeSpace India</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-primary-foreground/80"
          >
            Your trusted companion for safety and support
          </motion.p>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Talk to SafeSpace AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Share your concerns confidentially with our AI companion. We're here to listen and support you.
                </p>
                <Chatbot />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <EmergencyContacts />
            
            <Card>
              <CardHeader>
                <CardTitle>Safety Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-primary/5">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-primary mb-2">Safety Tips</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        • Share your live location with trusted contacts
                      </li>
                      <li className="flex items-center gap-2">
                        • Keep emergency numbers on speed dial
                      </li>
                      <li className="flex items-center gap-2">
                        • Learn basic self-defense techniques
                      </li>
                      <li className="flex items-center gap-2">
                        • Stay aware of your surroundings
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-primary mb-2">Legal Rights</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        • Right to file Zero FIR
                      </li>
                      <li className="flex items-center gap-2">
                        • Protection under Domestic Violence Act
                      </li>
                      <li className="flex items-center gap-2">
                        • Workplace harassment laws
                      </li>
                      <li className="flex items-center gap-2">
                        • Right to privacy and dignity
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-muted mt-12"
      >
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-muted-foreground">
            SafeSpace India © {new Date().getFullYear()} | In case of emergency, always dial 112
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;