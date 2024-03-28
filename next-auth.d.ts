import 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in User model from NextAuth.js
   */
  interface User {
    isWriter?: boolean;
    username?: string;
    avatarUrl?: string;
  }

  interface Session {
    user?: User & {
      isWriter?: boolean;
      username?: string;
      avatarUrl?: string;
    };
  }

  interface Profile {
    login: string;
  }
}
