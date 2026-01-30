export const parseSuggestionLinks = (markdown, docsURL) => {
  // Parse (text)[/path] format from suggestions code block
  const links = markdown
    .split('\n')
    .map((line) => {
      const match = line.match(/\(([^)]*)\)\[([^\]]*)\]/);
      if (match && match[1] && match[2]) {
        let url = match[2];
        // Convert relative paths to absolute URLs if docsURL is provided
        if (docsURL && url.startsWith('/')) {
          const baseURL = docsURL.endsWith('/') ? docsURL.slice(0, -1) : docsURL;
          url = `${baseURL}${url}`;
        }
        return { text: match[1], url };
      }
      return null;
    })
    .filter(Boolean);
  return links;
};

export const extractSources = (parts) => {
  return parts
    ?.filter(p => p.type === 'tool-invocation' && p.toolInvocation?.toolName === 'search')
    .flatMap(p => p.toolInvocation?.result || [])
    .map(source => ({
      url: source.url || source.path,
      title: source.metadata?.title || source.path,
    })) || [];
};
