export class List<T> {
  public static create<T>(...values: T[]): List<T> {
    return new List(values);
  }
  constructor(readonly values: T[]) {}
  append(list: List<T>): List<T> {
    return List.create(...this.values, ...list.values);
  }
  concat<R extends List<T>>(list: List<R>): List<T> {
    return this.append(list.foldl((l: List<T>, value: R) => l.append(value), List.create()));
  }
  filter(callback: (value: T) => boolean): List<T> {
    let l: List<T> = List.create();
    for (let i = 0; i < this.values.length; i++) {
      if (callback(this.values[i])) {
        l = l.append(List.create(this.values[i]));
      }
    }
    return l; 
  }
  foldl<R>(callback: (acc: R, value: T) => R, initial: R): R {
    let result = initial;
    for (let i = 0; i < this.values.length; i++) {
      result = callback(result, this.values[i]);
    }
    return result;
  }
  foldr<R>(callback: (acc: R, value: T) => R, initial: R): R {
    let result = initial;
    for (let i = this.values.length - 1; i >= 0; i--) {
      result = callback(result, this.values[i]);
    }
    return result; 
  }
  forEach(callback: (value: T) => void): void {
    for (let i = 0; i < this.values.length; i++) {
      callback(this.values[i]);
    }
  }
  length(): number {
    return this.values.length;
  }
  map<R>(callback: (value: T) => R): List<R> {
    let l: List<R> = List.create();
    for (let i = 0; i < this.values.length; i++) {
      l = l.append(List.create(callback(this.values[i])));
    }
    return l; 
  }
  reverse(): List<T> {
    let l: List<T> = List.create();
    for (let i = this.values.length - 1; i >= 0; i--) {
      l = l.append(List.create(this.values[i]));
    }
    return l; 
  }
}
