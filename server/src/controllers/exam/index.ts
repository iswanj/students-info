import { Request, Response } from "express";

import db from "../../db";
import { handleError } from "../../utils";
import { ERROR_CODES } from "../../constants";
import { Subject } from "@prisma/client";

export async function getExamResults(req: Request, res: Response) {
  try {
    const { year, subjectId } = req.query;

    let whereCondition = {};

    if (year && !isNaN(parseInt(year as string, 10))) {
      whereCondition = { ...whereCondition, year: parseInt(year as string, 10) };
    }

    if (subjectId && !isNaN(parseInt(subjectId as string, 10))) {
      whereCondition = { ...whereCondition, subjectId: parseInt(subjectId as string, 10) };
    }

    const examResults = await db.exam.findMany({
      where: whereCondition,
      include: {
        subject: true,
        Result: {
          include: {
            // @ts-ignore
            student: true,
            GradeRange: true,
          },
        },
      },
    });

    return res.status(200).send({ error: false, data: examResults });
  } catch (error) {
    return handleError(res, { code: ERROR_CODES.common, message: "Data Fetching error" });
  }
}

export async function getResults(req: Request, res: Response) {
  try {
    const { year, subjectId } = req.query;

    let whereCondition = {};

    if (year && year !== "0" && !isNaN(parseInt(year as string, 10))) {
      whereCondition = { ...whereCondition, year: parseInt(year as string, 10) };
    }

    if (subjectId && subjectId !== "0" && !isNaN(parseInt(subjectId as string, 10))) {
      whereCondition = { ...whereCondition, subjectId: parseInt(subjectId as string, 10) };
    }

    const results = await db.result.findMany({
      orderBy: {
        student: {
          name: "asc",
        },
      },
      include: {
        student: true,
        GradeRange: true,
        Exam: {
          include: {
            subject: true,
          },
        },
      },
      where: {
        Exam: whereCondition,
      },
    });

    return res.status(200).send({ error: false, data: results });
  } catch (error) {
    return handleError(res, { code: ERROR_CODES.common, message: "Data Fetching error" });
  }
}

export async function getSubjects(req: Request, res: Response) {
  try {
    const results = await db.subject.findMany();
    return res.status(200).send({ error: false, data: results });
  } catch (error) {
    return handleError(res, { code: ERROR_CODES.common, message: "Data Fetching error" });
  }
}

export async function getGradeDistribution(req: Request, res: Response) {
  try {
    const { year, subjectId } = req.query;

    let whereCondition = {};

    if (year && year !== "0" && !isNaN(parseInt(year as string, 10))) {
      whereCondition = { ...whereCondition, year: parseInt(year as string, 10) };
    }

    if (subjectId && subjectId !== "0" && !isNaN(parseInt(subjectId as string, 10))) {
      whereCondition = { ...whereCondition, subjectId: parseInt(subjectId as string, 10) };
    }

    const results = await db.result.groupBy({
      by: ["grade"],
      where: {
        Exam: whereCondition,
      },
      _count: {
        grade: true,
      },
    });
    const mapResult = results.reduce((obj, g) => {
      return { ...obj, [g.grade]: g._count.grade };
    }, {});
    return res.status(200).send({ error: false, data: mapResult });
  } catch (error) {
    return handleError(res, { code: ERROR_CODES.common, message: "Data Fetching error" });
  }
}

export async function getPassedCount(req: Request, res: Response) {
  try {
    const { year } = req.query;

    let whereCondition = {};

    if (year && year !== "0" && !isNaN(parseInt(year as string, 10))) {
      whereCondition = { ...whereCondition, year: parseInt(year as string, 10) };
    }

    const subjects: Subject[] = await db.subject.findMany();

    const results = await Promise.all(
      subjects.map(async (subject) => {
        const subjectId = subject.id;
        const subjectName = subject.name;

        const passedStudentsCount = await db.result.count({
          where: {
            Exam: whereCondition,
            marks: {
              gte: 35,
            },
          },
        });

        return {
          subjectName,
          passedStudentsCount,
        };
      })
    );

    return res.status(200).send({ error: false, data: results });
  } catch (error) {
    return handleError(res, { code: ERROR_CODES.common, message: "Data Fetching error" });
  }
}
