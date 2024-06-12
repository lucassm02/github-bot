import {
  HttpClient,
  UpdateGithubDiscussionService as Protocol
} from '@/data/protocols/http';
import { GITHUB_TOKEN } from '@/util/constants';

export class UpdateGithubDiscussionService implements Protocol {
  constructor(private readonly httpClient: HttpClient) {}

  async updateDiscussion({
    body,
    discussionId
  }: Protocol.Params): Protocol.Result {
    const mutation = `mutation ($discussionId: ID!, $body: String!) {
      updateDiscussion(input: {
        discussionId: $discussionId,
        body: $body
      }) {
        discussion {
          id
          title
          body
          updatedAt
        }
      }
    }
`;

    const variables = {
      discussionId,
      body
    };

    const response = await this.httpClient.request({
      url: `/graphql`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: { query: mutation, variables }
    });

    return response.body.errors === undefined;
  }
}
