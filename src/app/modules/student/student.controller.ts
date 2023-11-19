import { Request, Response, response } from "express";
import { StudentServices } from "./student.service";
// import Joi from 'joi';
// import studentValidationSchema from "./student.joi.validation";
// import { z } from 'zod';
import StudentValidationSchema, { StudentZodSchema } from "./student.zod.validation";

const createStudent = async (req: Request, res: Response) => {
    try {








        const { student: studentData } = req.body;
        //data validation using joi
        // const { error, value } = studentValidationSchema.validate(studentData);

        //data validation using zod
        const zodParsedData = StudentValidationSchema.parse(studentData);


        const result = await StudentServices.createStudnetIntoDB(zodParsedData);

        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: "Something went wrong",
        //         error: error.details,
        //     })
        // }

        //will call service func to send this data 


        //send response
        res.status(200).json({
            success: true,
            message: "Student is created sucessfully",
            data: result,
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        })
    }
}


const getAllStudents = async (req: Request, res: Response) => {

    try {
        const result = await StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: "Students are retrieved",
            data: result,
        })
    }
    catch (err) {
        console.log(err);
    }
}

const getSingleStudent = async (req: Request, res: Response) => {

    try {
        const { studentId } = req.params;

        const result = await StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: "Student is retrieved successfully",
            data: result,
        })
    }
    catch (err) {
        console.log(err);
    }
}

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent
}