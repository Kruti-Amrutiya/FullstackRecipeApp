import React, { useEffect, useRef, useState } from "react";
import styles from "../../auth/auth.module.scss";
import LoginForm from "../../auth/loginForm";
import RegisterForm from "../../auth/registerForm";
import useAuthentication from "../../auth/hook/useAuthentication";
import { Button } from ".";

const Navbar = () => {
  const authRef = useRef();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [{}, { handleLoginUser, handleRegisterUser, handleLogout }] =
    useAuthentication({
      onClose: () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
      },
      setUser,
    });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>🍽️ Recipe App</h1>

      <div className={styles.navbarButtons}>
        {user ? (
          <>
            <span className={styles.userEmail}>👤 {user.email}</span>
            <Button
              className={`${styles.navButton} ${styles.navLogout}`}
              onClick={handleLogout}
              buttonText="Logout"
            />
          </>
        ) : (
          <>
            <Button
              className={`${styles.navButton} ${styles.navLogin}`}
              onClick={() => setIsLoginOpen(true)}
              buttonText="Login"
            />
            <Button
              className={`${styles.navButton} ${styles.navRegister}`}
              onClick={() => setIsRegisterOpen(true)}
              buttonText="Register"
            />
          </>
        )}
      </div>
      {isLoginOpen && (
        <LoginForm
          onClose={() => setIsLoginOpen(false)}
          handleLoginUser={handleLoginUser}
          authRef={authRef}
        />
      )}
      {isRegisterOpen && (
        <RegisterForm
          onClose={() => setIsRegisterOpen(false)}
          authRef={authRef}
          handleRegisterUser={handleRegisterUser}
        />
      )}
    </nav>
  );
};

export default Navbar;
