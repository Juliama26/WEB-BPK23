import React from "react";
import Layout from "../Layout";
import StrukturEdit from "../../Components/DataCB/StrukturEdit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../Features/AuthSlice";
import { useEffect } from "react";

export default function PageStrukturEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <div>
      <Layout>
        <StrukturEdit />
      </Layout>
    </div>
  );
}
