import { useEffect, useRef, useState } from "react";
import "./SignUpPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createUser } from "../../store/signUpSlice";
import { fetchUser } from "../../store/userSlice";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [passwordVisible, setPasswordvisible] = useState("password");
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const isSignedUp = useSelector((state) => state.signUpSlice.isSignedUp);
  const error = useSelector((state) => state.signUpSlice.error);
  //   const error = useSelector((state) => state.userSlice.error);

  //  const loading = useSelector((state) => state.userSlice.loading);
  //   const loading = useSelector((state) => state.signUpSlice.loading);
  //   const isSignedUp = useSelector((state) => state.signUpSlice.isSignedUp);

  const user = useSelector((state) => state.userSlice.user);

  const navigate = useNavigate();

  const handleFinish = async (e) => {
    e.preventDefault();
    //console.log(email.indexOf("@") !== -1);
    if (email === "") {
      return;
    }

    setPassword(passwordRef.current.value);
    const username = email.substring(0, email.indexOf("@")) || email;
    try {
      dispatch(
        createUser({ email, password: passwordRef.current.value, username })
      )
        // .then(() => {
        //   dispatch(fetchUser({ email, password: passwordRef.current.value }));
        // })
        .catch((error) => {
          console.log("Error creating user:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSignedUp) {
      //console.log("In useEffect Email:", email, " Password: ", password);
      dispatch(fetchUser({ email, password }));
      // navigate("/");
    }
  }, [isSignedUp]);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else if (error) {
      //console.log("Error: ", error);
    }
  }, [navigate, user, error]);

  const handleStart = () => {
    setEmail(emailRef.current.value);
    //console.log(emailRef.current.value, " In handleStart");
  };
  return (
    <div className="signUp">
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
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              <MarkEmailReadIcon />
            </button>
          </div>
        ) : (
          <form className="input">
            {/* {console.log(email)} */}
            <input
              type={passwordVisible}
              placeholder="password"
              ref={passwordRef}
            />
            <VisibilityOffIcon
              className={
                passwordVisible === "password" ? "icon" : "icon-hidden"
              }
              onClick={() => setPasswordvisible("text")}
            />
            <VisibilityIcon
              className={passwordVisible === "text" ? "icon" : "icon-hidden"}
              onClick={() => setPasswordvisible("password")}
            />
            <button
              className="signUpButton"
              onClick={handleFinish}
              //   disabled={loading}
            >
              <CheckCircleIcon />
            </button>
          </form>
        )}
        <div className="signin">
          <span>
            Already have an account?{" "}
            <Link className="link link-signin" to="/signin">
              Sign in here!
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
