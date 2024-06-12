import axios from 'axios';

import { API } from '@/util/constants';

export const httpGithub = axios.create({
  baseURL: API.GITHUB
});
