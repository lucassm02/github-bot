import { ExtractJsonFromDiscussion as Protocol } from '@/domain/usecases/discussion';

export class ExtractJsonFromDiscussion implements Protocol {
  extract(rawString: string) {
    const lines = rawString.split('\n');

    const simpleKeyRegex = /\*\*(.+?):\*\*/;
    const h2Regex = /##\s(.+)/g;
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
    const obj: Record<string, unknown> = {};

    let addToAGroup = false;

    for (const line of lines) {
      if (line.toLowerCase().includes('## dados da gmud')) {
        continue;
      }

      if (simpleKeyRegex.test(line)) {
        addToAGroup = false;
        const [key, value] = line
          .replace('**', '')
          .split(`:**`)
          .map((value) => value.trim());

        const parseToNumber = !Number.isNaN(+value);

        obj[key.toLowerCase()] = parseToNumber ? +value : value;
        continue;
      }

      if (linkRegex.test(line)) {
        const [key, value] = line
          .toLowerCase()
          .substring(1, line.length - 1)
          .split('](');

        obj[key] = value;

        continue;
      }

      if (h2Regex.test(line)) {
        const groupKey = line.toLowerCase().replace('##', '').trim();
        obj[groupKey] = null;
        addToAGroup = true;
        continue;
      }

      if (!addToAGroup) continue;

      if (addToAGroup && Object.keys(obj).length > 0) {
        const target = <string>Object.keys(obj).at(-1);

        if (obj[target] === null) {
          obj[target] = '';
        }

        obj[target] += line;
        continue;
      }
    }

    return obj;
  }
}
