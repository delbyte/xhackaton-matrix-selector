import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface RegistrationFormProps {
  teamName: string;
  email: string;
  onTeamNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  teamName,
  email,
  onTeamNameChange,
  onEmailChange,
  onSubmit
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-8 border border-indigo-500/30">
        <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Register Your Team
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-1">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => onTeamNameChange(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter your team name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter your email"
            />
            <p className="mt-2 text-sm text-gray-400">
              You can try up to 3 times, but the last pick is final!
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md font-medium transition-all duration-300 group"
            disabled={!teamName || !email}
          >
            <span>Start Selection</span>
            <Sparkles className="ml-2 w-5 h-5 group-hover:animate-pulse" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default RegistrationForm;