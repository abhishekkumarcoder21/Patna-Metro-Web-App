import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  isAdmin: boolean;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// Mock user data for demo purposes
const mockUsers = [
  {
    id: '1',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'password',
    points: 150,
    isAdmin: false
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password',
    points: 350,
    isAdmin: true
  }
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } else {
      throw new Error('Invalid email or password');
    }
    
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user (this is just for demo, in a real app this would be handled by the backend)
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      points: 0,
      isAdmin: false
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};