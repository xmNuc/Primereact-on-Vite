export const isEmailValid = (emailAddress?: string) => {
  if (!emailAddress) return false;
  const strictEmailRegex =
    /^[a-zA-Z0-9]([a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return strictEmailRegex.test(emailAddress);
};
