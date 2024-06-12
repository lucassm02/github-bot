import { FormatDiscussion as Protocol } from '@/domain/usecases/discussion';

export class FormatDiscussion implements Protocol {
  format(body: string): string {
    const header = '### Dados da GMUD';

    if (body.includes(header)) {
      return body;
    }

    const lines = body
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    let newString = `${header}\n\n`;

    let currentKey = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('###')) {
        currentKey = line.replace('### ', '');
        if (
          lines[i + 1] &&
          !lines[i + 1].startsWith('###') &&
          !lines[i + 1].startsWith('>')
        ) {
          newString += `**${currentKey}:** `;
          continue;
        }
        if (lines[i + 1] && lines[i + 1].startsWith('>')) {
          newString += `## ${currentKey}\n`;
          continue;
        }
      }

      if (line.startsWith('>')) {
        newString += `${line}\n`;
        continue;
      }

      if (currentKey) {
        newString += `${line}\n`;
        currentKey = '';
      }
    }

    return newString;
  }
}
