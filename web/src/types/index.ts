export interface LoginForm {
  username: string;
  password: string;
}

export interface QueryObject {
  [key: string]: string | number;
}

export interface SearchResultParam {
  user: {
    name: string;
    token: string;
  } | null;
  option: {
    year?: string;
    subjectId?: string;
  };
}

export interface UserType {
  name: string;
  token: string;
}

enum Grade {
  A = "A",
  B = "B",
  C = "C",
  S = "S",
  F = "F",
}

export interface Student {
  id: number;
  name: string;
  age: number;
  createdAt: string;
  updatedAt: string;
}

export interface GradeRange {
  id: number;
  Grade: string;
  minMarks: number;
  maxMarks: number;
}

export interface Result {
  id: number;
  examId: number;
  marks: number;
  grade: string;
  studentId: number;
  gradeRangeId: number;
  student: Student;
  GradeRange: GradeRange;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Exam {
  id: number;
  name: string;
  year: number;
  subjectId: number;
  subject: Subject;
}

export interface SearchResultItem extends Result {
  Exam: Exam;
}

export interface FilterData {
  year?: string;
  subjectId?: string;
}

export interface Subjects {
  id: number;
  name: string;
}

export interface GradeData {
  A?: number;
  B?: number;
  C?: number;
  S?: number;
  F?: number;
}

export interface PassedData {
  subjectName: string;
  passedStudentsCount: number;
}

export interface DashboardData {
  results?: SearchResultItem[];
  gradeData?: GradeData;
  passedData?: PassedData[];
}
