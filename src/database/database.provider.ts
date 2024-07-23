import mongoose from 'mongoose';
import { ProviderConstants } from 'src/provider-constants';

export const DatabaseProviders = [
  {
    provide: ProviderConstants.DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> => {
      mongoose.connection.on('connected', () => {
        console.log('Succesfully connected to the database');
      });

      mongoose.connection.on('error', (error) => {
        console.log('Connection failed, error:', error);
      });

      return await mongoose.connect(process.env.MONGO_URL);
    },
  },
];
