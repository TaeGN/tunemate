import { Storage } from "@/utils/storage";
import Link from "next/link";
import styles from "@/styles/LoginPage.module.css";
import Image from "next/image";
import { TUNEMATE_API_BASE_URL } from "@/constants/url";
import { Cookie } from "@/utils/cookie";
import { TokenResponse } from "@/types/user";
import { useRouter } from "next/router";
import { getUserInfo } from "@/api/user";
import { useEffect } from "react";
import useChat from "@/hooks/useChat";

const LoginPage = () => {
  const router = useRouter();
  const { connect } = useChat();

  useEffect(() => {
    Storage.clear();
    const tokenResponse: TokenResponse = Cookie.getTokenResponse();
    Storage.setTokenResponse(tokenResponse);
    const userId = Storage.getUserId();
    if (userId) {
      getUserInfo(userId).then(() => {
        connect();
        router.push("/main");
      });
    }
  }, [router, connect]);

  const setCookie = () => {
    const userId = "ab1b4b7f-abb2-4bf1-920f-b437233b4f47";
    const accessToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhYjFiNGI3Zi1hYmIyLTRiZjEtOTIwZi1iNDM3MjMzYjRmNDciLCJleHAiOjE2OTk1MTYyMTAsImlzcyI6IlR1bmVtYXRlIn0.ckxGPwGpJIezvqsrQ3WYZ2SbzZyfb59AbWs37pCjzBCOZosB8a7Cegg5P18SZ9nE";
    const refreshToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJSZWZyZXNoIFRva2VuIiwidXNlcklkIjoiYWIxYjRiN2YtYWJiMi00YmYxLTkyMGYtYjQzNzIzM2I0ZjQ3IiwiZXhwIjoxNzAwNzE4NjEwLCJpc3MiOiJUdW5lbWF0ZSJ9._5kctKS5FJJE4djqMSZOwXqRxBmBTbyjinB8tqMsSseQxNUDXR6w76Ma8aeneauY";
    Cookie.setTokenResponse({ userId, accessToken, refreshToken });
    location.reload();
  };

  return (
    <div className={styles["login-page"]}>
      <Image src="/TuneMate.png" alt="TuneMate Logo" width={250} height={40} />

      <p className={styles["login-page__title"]}></p>
      <br />
      <a
        href={`${TUNEMATE_API_BASE_URL}/user-service/oauth2/authorization/spotify`}
      >
        login
      </a>
      <br />
      <Link href={"/main"}>메인 페이지 이동</Link>
      <br />
      <button onClick={setCookie}>쿠키 넣기!!!!!</button>
    </div>
  );
};

export default LoginPage;
