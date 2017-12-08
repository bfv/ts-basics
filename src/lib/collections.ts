
export interface Comparable<T> {
    // -1: this is smaller, 0: they are equal, 1: this is bigger
    Compare(otherItem: T): number;
}
