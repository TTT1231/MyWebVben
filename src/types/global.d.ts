declare type Nullable<T> = T | null;
declare type Recordable<T = any> = Record<string, T>;
/**函数泛型类型 */
declare interface Fn<T = any, R = any> {
   (...args: T[]): R;
}
