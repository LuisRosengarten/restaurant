type SendEmailVerificationTokenResponseType = {
  status: 200 | 401 | 500;
};

const SendEmailVerificationToken = async (
  email: string,
): Promise<SendEmailVerificationTokenResponseType> => {
  return {
    status: 200,
  };
};
