import { useState, useEffect } from "react";
import "./App.css";
import Landing from "./Components/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./Components/request";
import Library from "./Components/Library";
import Activity from "./Components/Activity";
import MyLibrary from "./Components/MyLibrary";
import Premium from "./Components/Premium";
import { post, get } from "./Custom/useApi";
import { useDispatch } from "react-redux";
import { setUserData } from "./features/appSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Custom/Loader";

function App() {
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticate = () => {
      let accessToken = localStorage.getItem("accessToken");
      let refreshToken = localStorage.getItem("refreshToken");
      let id = localStorage.getItem("userId");
      const headers = {
        access: accessToken,
        refresh: refreshToken,
      };
      if (!accessToken && !refreshToken) {
        setState(false);
      } else if (!id) {
        setState(false);
      } else {
        post(auth.authenticate, {}, { headers }, id)
          .then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
            setState(true);
          })
          .catch((err) => {
            console.log(err.response.data.message);
            setState(false);
          });
      }
    };
    authenticate();
  }, [state]);

  useEffect(() => {
    if (state) {
      let id = localStorage.getItem("userId");
      setLoading(true);
      get(auth.userDetails, {}, id)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            dispatch(setUserData(res.data));
          } else {
            toast.error(res.response.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }, [state, dispatch]);

  return (
    <div>
      {loading ? (
        <>
          <Loader visible={loading} />
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            theme="light"
          />
        </>
      ) : (
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={state ? <Library /> : <Landing />}
            ></Route>
            <Route
              path="/activity"
              element={state ? <Activity /> : <Landing />}
            ></Route>
            <Route
              path="/mylibrary"
              element={state ? <MyLibrary /> : <Landing />}
            ></Route>
            <Route
              path="/premium"
              element={state ? <Premium /> : <Landing />}
            ></Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
