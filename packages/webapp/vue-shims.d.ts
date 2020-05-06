declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.jpg' {
  const url: string;
  export default url;
}

declare module '*.svg' {
  const url: string;
  export default url;
}

declare module '*.svg?data' {
  const base64: string;
  export default base64;
}

declare module '*.svg?inline' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.svg?raw' {
  const html: string;
  export default html;
}

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
