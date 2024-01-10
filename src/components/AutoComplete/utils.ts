export const pickObjectKey = <T extends object, K extends keyof T>(
  prop: T,
  arr: K[]
) => {
  const requiredInputProps = {} as Pick<T, K>;

  for (const key of arr) {
    if (key in prop) {
      requiredInputProps[key] = prop[key];
    }
  }
  return requiredInputProps;
};
