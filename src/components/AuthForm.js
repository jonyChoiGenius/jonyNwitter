import { useState } from "react";
import { authService } from "fbase";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    //email과 password 모두에 적용되는 리렌더링 함수
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault(); // 새로고침 방지
    try {
      let data;
      if (newAccount) {
        //가입하기
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        //로그인 하기
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        {/* Auth로 보낼 밸류값(해당 밸류값에 따라 create와 log in 함수 실행이 달라짐) */}
        <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "기존 계정으로 로그인 하기" : "새 계정 만들기"}
      </span>
    </>
  );
}

export default AuthForm;
