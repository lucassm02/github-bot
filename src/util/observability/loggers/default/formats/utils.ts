export const sanitizedParams = (params: Record<string, unknown>) => {
  const entries = Object.entries(params);

  const sanitizedEntries = entries.map(([key, value]) => {
    if (typeof value === 'string') {
      const sanitizedValue = value?.replace(/\n|\r|( {4})+/g, '');
      return [key, sanitizedValue];
    }

    return [key, value];
  });

  return Object.fromEntries(sanitizedEntries);
};
