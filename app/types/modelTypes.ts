// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncReturnType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitMetadata<T extends { createdAt: any; updatedAt: any }> = Omit<
  T,
  'createdAt' | 'updatedAt'
>;
