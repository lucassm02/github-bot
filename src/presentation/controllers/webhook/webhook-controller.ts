import { Controller } from '@/presentation/protocols';
import { ok } from '@/presentation/utils';
import { DICTIONARY, template } from '@/util';

export class WebhookController implements Controller {
  async handle(): Controller.Result {
    return ok(
      template(DICTIONARY.RESPONSE.MESSAGE.OK, 'Mensagem recebida'),
      {}
    );
  }
}
