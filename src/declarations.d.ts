// Necessary for scss imports to work
declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg'
