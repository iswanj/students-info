import { FC, useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import GradeDonut from "../components/GradeDonut";
import PassingRate from "../components/PassingRate";
import { fetchResults, fetchSubjects, fetchGradeDistribution, fetchPassedCount } from "../api/home";
import { DashboardData, FilterData, Subjects } from "../types";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    results: [],
  });
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [filter, setFilter] = useState<FilterData>({});

  useEffect(() => {
    const init = async () => {
      const [results, gradeData, passedData] = await Promise.all([
        fetchResults({ user, option: filter }),
        fetchGradeDistribution({ user, option: filter }),
        fetchPassedCount({ user, option: filter }),
      ]);

      setDashboardData({ results, gradeData, passedData });
    };

    init();
  }, [user, filter]);

  useEffect(() => {
    const fetch = async () => {
      const subjects = await fetchSubjects({ user });
      setSubjects(subjects);
    };
    fetch();
  }, [user]);

  const handleFilterData = useCallback(
    (name: string, value: string) => {
      setFilter({ ...filter, [name]: value });
    },
    [filter]
  );

  return (
    <main className="flex min-h-screen flex-col w-full">
      <Header>
        <div className="flex flex-row gap-2 items-center">
          <h4 className="text-sky-600"> {user?.name}</h4>
          <button className="btn btn-secondary" onClick={() => logout()}>
            Sign Out
          </button>
        </div>
      </Header>
      <div className="flex flex-row">
        <Sidebar onChangeValues={handleFilterData} subjects={subjects} />
        {dashboardData?.results?.length !== 0 ? (
          <div>
            <div className="p-4 flex flex-row">
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title self-center">Grade Distribution</h2>
                  <div>
                    <GradeDonut data={dashboardData?.gradeData} />
                  </div>
                </div>
              </div>
              <div className="card w-132 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title self-center">Pass Rate</h2>
                  <div>
                    <PassingRate data={dashboardData?.passedData} />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Student Name</th>
                    <th>Exam</th>
                    <th>Year</th>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.results?.map((result, index) => (
                    <tr key={result.id}>
                      <th>{index + 1}</th>
                      <td>{result?.student.name}</td>
                      <td>{result?.Exam.name}</td>
                      <td>{result?.Exam.year}</td>
                      <td>{result.Exam.subject.name}</td>
                      <td>{result.marks}</td>
                      <td>{result.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex p24 w-full justify-center items-center">
            <h4 className="text-3xl">No Data to Display</h4>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
