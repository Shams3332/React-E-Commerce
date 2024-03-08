import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import axios from 'axios';
import { useID } from '../user Role/userRole';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import style from './userProfile.module.css'
import user from '../img/user.jpg'
import MydModalWithGrid from './MydModalWithGridProps';

export default function UserProfile() {

  const [modalShow, setModalShow] = useState(false);

  const token = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<any>({});
  const ID = useID();

  async function profileData() {
    if (token && ID) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        let { data } = await axios.get(
          `http://localhost:5000/users/userData/${ID}`,
          //`https://e-commercenodejs.onrender.com/users/userData/${ID}`,
          config
        );
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    } else {
      console.error("No token or user ID found.");
    }
  }

  useEffect(() => {
    profileData();
  }, [ID, token]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Profile</title>
      </Helmet>

      {/* start profile */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 col-lg-6 col-12">
            <div className={`${style.profile} p-4`}>

            <div className={`${style.arrow} btn-button d-flex justify-content-end `} >
                <i className="fa-solid fa-pen-to-square" onClick={() => setModalShow(true)}> Edit</i>
              </div>

      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />



              <div className={`${style.profile_img} m-auto `}>
                <img src={user} />
              </div>

              <div className="contain">
                <div className="row">
                  <div className={`${style.pro_text} `}>
                    <div className={`${style.pro_text}`}>
                      <h3 className={`${style.patients} mb-2 mt-5`}>
                        {" "}
                        Email&nbsp;:&nbsp;
                        <span className="fw-light ">{userData.email}</span>
                      </h3>
                    </div>
                  </div>
                  <div className={`${style.pro_text} `}>
                    <div className={`${style.pro_text}`}>
                      <h3 className={`${style.patients} mb-2 mt-5`}>
                        {" "}
                        User Name&nbsp;:&nbsp;
                        <span className="fw-light ">{userData.userName}</span>
                      </h3>
                    </div>
                  </div>
                  <div className={`${style.pro_text} `}>
                    <div className={`${style.pro_text}`}>
                      <h3 className={`${style.patients} mb-2 mt-5`}>
                        {" "}
                        Age&nbsp;:&nbsp;
                        <span className="fw-light ">{userData.age}</span>
                      </h3>
                    </div>
                  </div>
                  <div className={`${style.pro_text} `}>
                    <div className={`${style.pro_text}`}>
                      <h3 className={`${style.patients} mb-2 mt-5`}>
                        {" "}
                        Mobile&nbsp;:&nbsp;
                        <span className="fw-light ">{userData.phone}</span>
                      </h3>
                    </div>
                  </div>

                  <div className={`${style.pro_text} `}>
                    <div className={`${style.pro_text}`}>
                      <h3 className={`${style.patients} mb-2 mt-5`}>
                        {" "}
                        Address&nbsp;:&nbsp;
                        <span className="fw-light ">{userData.addresses}</span>
                      </h3>
                    </div>
                  </div>

                  <div className={`${style.pro_text} `}>
                    <div className={`${style.pro_text}`}>
                      <h3 className={`${style.patients} mb-2 mt-5`}>
                        {" "}
                        Active Email&nbsp;:&nbsp;
                        <span className={`fw-light ${userData.isActive ? 'text-success' : 'text-danger'}`}>
                      {userData.isActive ? 'Your email is active' : 'Please activate your email'}
                      </span>
                      </h3>
                    </div>
                  </div>

                  <div className={`${style.none} col-12  mt-5`}>
                    <div className={`${style.info}`}>
                      <div className={`${style.about} mb-5 mt-3 `}>
                        <h4 className="mt-3"> Note</h4>
                        <p>
                          You can check the record to determine if it's coming
                          out correctly or not from{" "}
                          <Link to={`/chekhere`}>
                            <span>here</span>
                          </Link>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className={`${style.none_mobile} col-md-6 col-lg-6 col-12 `}>
            <div className={`${style.info}`}>
              <div className={`${style.about} mb-5 w-50`}>
                <h4 className="mt-5">Welcome</h4>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Praesentium, hic.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}