import axios from 'axios';

export type * from './auth';
export type * from './navigation';
export type * from './ui';


axios.defaults.baseURL = 'http://localhost:8000';
