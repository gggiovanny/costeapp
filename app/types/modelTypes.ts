// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncReturnType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

export type OmitMetadata<T> = Omit<T, 'createdAt' | 'updatedAt'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PartialWithRequiredId<T extends { id: any }> = OmitMetadata<
  Partial<T> & { id: T['id'] }
>;
