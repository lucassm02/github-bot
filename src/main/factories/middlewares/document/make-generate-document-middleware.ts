import axios from 'axios';

import { HttpGenerateDocument } from '@/data/usecases/http';
import { RequestAdapter } from '@/infra/http/service';
import { GenerateDocumentService } from '@/infra/http/service/document';
import { GenerateDocumentMiddleware } from '@/presentation/middlewares';

import { makeErrorHandler } from '../../usecases';

export const makeGenerateDocumentMiddleware = () => {
  const requestAdapter = new RequestAdapter(axios);

  const generateDocumentService = new GenerateDocumentService(requestAdapter);
  const httpGenerateDocument = new HttpGenerateDocument(
    generateDocumentService
  );

  return new GenerateDocumentMiddleware(
    httpGenerateDocument,
    makeErrorHandler()
  );
};
