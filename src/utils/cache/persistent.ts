class Persistence {
   private session_storage: Window['sessionStorage'];
   //持久化存储
   private local_storage: Window['localStorage'];
   constructor() {
      this.session_storage = window.sessionStorage;
      this.local_storage = window.localStorage;
   }
   getSessionOfKey(key: string): string | null {
      const data = this.session_storage.getItem(key);
      return data ? JSON.parse(data) : null;
   }
   setSession(key: string, value: any): void {
      this.session_storage.setItem(key, JSON.stringify(value));
   }
   cleanSessionOfKey(key: string): void {
      this.session_storage.removeItem(key);
   }
   cleanSessionAll(): void {
      this.session_storage.clear();
   }

   getLocalOfKey(key: string): string | null {
      return this.local_storage.getItem(key);
   }
   setLocalOfKey(key: string, value: any): void {
      this.local_storage.setItem(key, JSON.stringify(value));
   }
   cleanLocalOfKey(key: string): void {
      this.local_storage.removeItem(key);
   }
   cleanLocalAll(key: string): void {
      this.local_storage.clear();
   }
}
export const persistent = new Persistence();
