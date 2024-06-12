import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  login: Yup.string().required(),
  id: Yup.number().required(),
  node_id: Yup.string().required(),
  avatar_url: Yup.string().url().required(),
  gravatar_id: Yup.string().nullable(),
  url: Yup.string().url().required(),
  html_url: Yup.string().url().required(),
  followers_url: Yup.string().url().required(),
  following_url: Yup.string().required(),
  gists_url: Yup.string().required(),
  starred_url: Yup.string().required(),
  subscriptions_url: Yup.string().url().required(),
  organizations_url: Yup.string().url().required(),
  repos_url: Yup.string().url().required(),
  events_url: Yup.string().required(),
  received_events_url: Yup.string().url().required(),
  type: Yup.string().required(),
  site_admin: Yup.boolean().required()
});

const categorySchema = Yup.object().shape({
  id: Yup.number().required(),
  node_id: Yup.string().required(),
  repository_id: Yup.number().required(),
  emoji: Yup.string().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required(),
  slug: Yup.string().required(),
  is_answerable: Yup.boolean().required()
});

const discussionSchema = Yup.object().shape({
  repository_url: Yup.string().url().required(),
  category: categorySchema.required(),
  answer_html_url: Yup.string().nullable(),
  answer_chosen_at: Yup.string().nullable(),
  answer_chosen_by: Yup.string().nullable(),
  html_url: Yup.string().url().required(),
  id: Yup.number().required(),
  node_id: Yup.string().required(),
  number: Yup.number().required(),
  title: Yup.string().required(),
  user: userSchema.required(),
  state: Yup.string().required(),
  state_reason: Yup.string().nullable(),
  locked: Yup.boolean().required(),
  comments: Yup.number().required(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required(),
  body: Yup.string().required()
});

export const discussionWebhookSchema = Yup.object().shape({
  action: Yup.string().required(),
  discussion: discussionSchema.required()
});
