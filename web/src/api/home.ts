import axios from "axios";
import { getQueryText } from "../utils";
import { SearchResultParam, UserType } from "../types";

import request from "./interceptor";

export const fetchResults = async (params: SearchResultParam) => {
  const { user, option } = params;
  const res = await request.get(`/exam/getResults?${getQueryText(option)}`, {
    headers: { Authorization: `Bearer ${user?.token}` },
  });

  return res.data.data;
};

export const fetchSubjects = async (params: { user: UserType | null }) => {
  const { user } = params;
  const res = await request.get(`/exam/getSubjects`, {
    headers: { Authorization: `Bearer ${user?.token}` },
  });

  return res.data.data;
};

export const fetchGradeDistribution = async (params: SearchResultParam) => {
  const { user, option } = params;
  const res = await request.get(`/exam/getGradeDistribution?${getQueryText(option)}`, {
    headers: { Authorization: `Bearer ${user?.token}` },
  });

  return res.data.data;
};

export const fetchPassedCount = async (params: SearchResultParam) => {
  const { user, option } = params;
  const res = await request.get(`/exam/getPassedCount?${getQueryText(option)}`, {
    headers: { Authorization: `Bearer ${user?.token}` },
  });

  return res.data.data;
};
