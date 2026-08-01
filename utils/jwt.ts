import jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error) {
    console.log("Token verification failed:", error);
    return {
      success: false,
    };
  }
};

export const jwtUtils = {
  verifyToken,
};
