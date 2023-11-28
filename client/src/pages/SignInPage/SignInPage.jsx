import { useContext, useEffect, useState } from "react";
import "./SignInPage.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUser, setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //   const { loading, dispatch, user, error } = useContext(store);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const error = useSelector((state) => state.userSlice.error);
  const loading = useSelector((state) => state.userSlice.loading);

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        dispatch(fetchUser({ email, password }));
        //dispatch(setUser(user));
        //navigate(redirect);
      } else {
        console.log("Please enter a valid email or password");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      // navigate("/");
      navigate(redirect);
    } else if (error) {
      console.log("Error: ", error);
    }
  }, [navigate, redirect, user, error]);

  return (
    <div className="signIn">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="signInButton"
            // onClick={handleSubmit}
            disabled={loading}
          >
            Sign In
          </button>
          <span>
            New to Netflix?{" "}
            <Link className="link link-signup" to="/signup">
              Sign up now.
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </small>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
